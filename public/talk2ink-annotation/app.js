import {encode,decode,isInk,paintDisk,validate} from './label-core.mjs';
const $=id=>document.getElementById(id);
const paint=$('paint'),clean=$('clean'),ctx=paint.getContext('2d',{willReadFrequently:true}),preview=clean.getContext('2d');
let dataset,records={},index=0,labels,pixels,ready=false,tool=1,zoom=1,stroke=null,lastPoint,version=0,frame=0;
let key,revision=0,serverEnabled=false,saveTimer,saveBusy=false,dirty=false,conflict=false,localOkay=true;
let recoveryLocal=null,recoveryDisk=null;
const histories=new Map(),redos=new Map();
const row=()=>dataset.rows[index];
const alertText=text=>{$('fatal').textContent=text;$('fatal').hidden=!text;};
const message=text=>{$('saveStatus').textContent=text;};
function bundle(){return {schema_version:1,dataset_sha256:dataset.dataset_sha256,source_stage:dataset.source_stage,
  coordinate_system:'original_image_pixels_row_major',mask_encoding:'[start_offset,length,label]',
  labels:{0:'unknown',1:'contamination_remove',2:'glyph_protect'},annotations:records};}
function persist(){
  try{localStorage.setItem(key,JSON.stringify(bundle()));localOkay=true;}catch(e){localOkay=false;alertText('浏览器存储已满或不可用，请导出标注备份。');}
  dirty=true;clearTimeout(saveTimer);saveTimer=setTimeout(saveServer,600);
  message(localOkay?'草稿已保存在本浏览器；正在保存备份…':'正在尝试保存磁盘备份…');
  if(!serverEnabled)message(localOkay?'已保存在本浏览器；请导出 JSON 备份':'保存失败，请立即导出 JSON');
}
async function saveServer(){
  if(!serverEnabled||!dirty||conflict||saveBusy)return;
  saveBusy=true;dirty=false;
  try{
    const response=await fetch('api/annotations',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({revision,bundle:bundle()})});
    if(response.status===409){await beginRecovery(bundle());throw Error('另一个窗口更新了标注。请先下载两个版本，再选择继续使用的版本。');}
    if(!response.ok)throw Error((await response.json()).error||'保存服务暂时不可用');
    const result=await response.json();revision=result.revision;
    $('retrySave').hidden=true;message(localOkay?'已自动保存到浏览器和服务器':'已保存到服务器；请另行导出备份');
  }catch(e){dirty=true;$('retrySave').hidden=conflict;message('服务器保存失败：'+e.message);if(conflict)alertText(e.message);}
  finally{saveBusy=false;if(dirty&&!conflict)saveTimer=setTimeout(saveServer,5000);}
}
$('retrySave').onclick=()=>{dirty=true;saveServer();};
async function beginRecovery(local,disk=null){
  recoveryLocal=structuredClone(local);
  if(!disk){const response=await fetch('api/annotations');if(!response.ok)throw Error('无法读取冲突版本，请导出当前标注');disk=await response.json();}
  validate(disk.bundle,dataset);recoveryDisk=disk;conflict=true;
  $('recoveryActions').hidden=false;document.querySelector('.workspace').inert=true;
  alertText('浏览器草稿与磁盘记录不同，已暂停编辑和覆盖。');
}
$('exportConflict').onclick=()=>download(new Blob([JSON.stringify({browser:recoveryLocal,disk:recoveryDisk},null,2)],{type:'application/json'}),'talk2ink_annotation144_recovery.json');
async function resolveRecovery(useLocal){
  if(!recoveryDisk)return;
  records=validate(useLocal?recoveryLocal:recoveryDisk.bundle,dataset);revision=recoveryDisk.revision;
  conflict=false;$('recoveryActions').hidden=true;document.querySelector('.workspace').inert=false;alertText('');
  histories.clear();redos.clear();await load();persist();
}
$('useDisk').onclick=()=>resolveRecovery(false);$('useBrowser').onclick=()=>resolveRecovery(true);
function formRecord(completed=false){
  const r=row();return {name:r.name,image_sha256:r.image_sha256,raw_sha256:r.raw_sha256,width:r.width,height:r.height,
    foreground:r.foreground,background_value:r.background_value,status:completed?'reviewed':'draft',
    image_judgment:document.querySelector('input[name=judgment]:checked')?.value||null,
    issues:[...document.querySelectorAll('input[name=issue]:checked')].map(x=>x.value),note:$('notes').value,
    runs:encode(labels),updated_at:new Date().toISOString()};
}
function record(completed=false){if(!ready)return;records[row().name]=formRecord(completed);persist();updateProgress();updateItemStatus();}
function updateItemStatus(){const a=records[row().name];$('itemStatus').textContent=a?.status==='reviewed'?(a.image_judgment==='uncertain'?'已复核，仍有存疑':'本张已完成'):a?'本张为草稿':'本张尚未标注';}
function updateProgress(){
  const complete=Object.values(records).filter(r=>r.status==='reviewed').length;
  $('progress').textContent=`${complete} / ${dataset.rows.length}`;$('progressBar').value=complete;$('progressBar').max=dataset.rows.length;
  for(const source of dataset.sources){const rows=dataset.rows.filter(r=>r.source_id===source.id);const n=rows.filter(r=>records[r.name]?.status==='reviewed').length;const el=document.querySelector(`[data-source-count="${source.id}"]`);if(el)el.textContent=`${n} / ${rows.length}`;}
  for(const b of document.querySelectorAll('[data-row-index]')){const r=dataset.rows[Number(b.dataset.rowIndex)],a=records[r.name];b.classList.toggle('reviewed',a?.status==='reviewed');b.classList.toggle('uncertain',a?.image_judgment==='uncertain');b.querySelector('.state').textContent=a?.image_judgment==='uncertain'?'?':a?.status==='reviewed'?'✓':a?'·':'';}
}
function matchFilter(r){const a=records[r.name];return $('filter').value==='all'||($('filter').value==='pending'&&a?.status!=='reviewed')||($('filter').value==='reviewed'&&a?.status==='reviewed')||($('filter').value==='uncertain'&&a?.image_judgment==='uncertain');}
function drawLibrary(){
  $('sources').replaceChildren();
  for(const source of dataset.sources){
    const block=document.createElement('div');block.className='source-block';const active=source.id===row().source_id;block.classList.toggle('expanded',active);
    const button=document.createElement('button');button.className='source-button';button.classList.toggle('active',active);button.setAttribute('aria-expanded',String(active));
    const title=document.createElement('span');title.textContent=source.work;const count=document.createElement('small');count.dataset.sourceCount=source.id;button.append(title,count);
    button.onclick=()=>{const target=dataset.rows.findIndex(r=>r.source_id===source.id&&matchFilter(r));if(target<0){message('当前筛选下，这件作品没有字图。');return;}go(target);};block.append(button);
    if(active){
      const grid=document.createElement('div');grid.className='glyph-grid';
      dataset.rows.forEach((r,i)=>{if(r.source_id!==source.id||!matchFilter(r))return;const b=document.createElement('button');b.className='glyph';b.dataset.rowIndex=i;b.title=r.character+' · '+r.name;b.setAttribute('aria-label',`选择 ${r.character}`);b.classList.toggle('active',i===index);if(i===index)b.setAttribute('aria-current','true');const im=document.createElement('img');im.src=r.image;im.alt=r.character;im.loading='lazy';const s=document.createElement('span');s.className='state';b.append(im,s);b.onclick=()=>go(i);grid.append(b);});
      if(!grid.children.length){const empty=document.createElement('p');empty.className='empty';empty.textContent='当前筛选下没有字图。';grid.append(empty);}block.append(grid);
    }
    $('sources').append(block);
  }
  updateProgress();
}
function render(){
  if(!ready)return;
  const a=new Uint8ClampedArray(pixels.data),b=new Uint8ClampedArray(pixels.data);let deleted=0,kept=0;
  for(let i=0;i<labels.length;i++){
    const o=i*4,l=labels[i];
    if(l===1&&isInk(pixels.data[o],row().background_value)){b[o]=b[o+1]=b[o+2]=row().background_value;deleted++;}
    if(l===2&&isInk(pixels.data[o],row().background_value))kept++;
    if(l&&$('overlay').checked){const color=l===1?[199,38,68]:[5,130,238];for(let c=0;c<3;c++)a[o+c]=Math.round(a[o+c]*.38+color[c]*.62);}
  }
  ctx.putImageData(new ImageData(a,row().width,row().height),0,0);preview.putImageData(new ImageData(b,row().width,row().height),0,0);
  $('counts').textContent=`该删 ${deleted} px　必保 ${kept} px`;$('undo').disabled=!(histories.get(row().name)?.length);$('redo').disabled=!(redos.get(row().name)?.length);
}
function scheduleRender(){if(!frame)frame=requestAnimationFrame(()=>{frame=0;render();});}
function applyZoom(value){if(!ready)return;zoom=Math.max(.1,Math.min(20,value));paint.style.width=`${row().width*zoom}px`;paint.style.height=`${row().height*zoom}px`;$('zoomValue').textContent=Math.round(zoom*100)+'%';$('brushCursor').hidden=true;}
function fit(){if(ready)applyZoom(Math.min(($('viewport').clientWidth-60)/row().width,($('viewport').clientHeight-60)/row().height,8));}
async function load(){
  const token=++version;ready=false;$('loading').hidden=false;$('loading').textContent='加载字图…';$('done').disabled=true;const r=row();
  $('work').textContent=`${r.work} · ${r.character}`;$('artist').textContent=`数据集署名：${r.artist}　${r.script}书`;$('position').textContent=`${index+1} / ${dataset.rows.length}`;
  $('dimensions').textContent=`${r.width} × ${r.height} 原始像素`;$('filename').textContent=r.name;
  $('evidence').textContent='筛选线索：'+r.screening.evidence.map(x=>x.label).join('、')+'。这些线索不是删除真值。';
  const source=dataset.sources.find(s=>s.id===r.source_id);$('sourceDetails').textContent=source.verification_scope+(source.attribution_note||'');
  $('reference').hidden=!source.reference;if(source.reference)$('reference').href=source.reference;$('originalLink').href=r.image;
  const existing=records[r.name];for(const radio of document.querySelectorAll('input[name=judgment]'))radio.checked=radio.value===existing?.image_judgment;
  for(const box of document.querySelectorAll('input[name=issue]'))box.checked=(existing?.issues||[]).includes(box.value);$('notes').value=existing?.note||'';
  drawLibrary();updateItemStatus();
  try{
    const response=await fetch(r.image);if(!response.ok)throw Error('无法读取图像');const blob=await response.blob();
    const digest=await crypto.subtle.digest('SHA-256',await blob.arrayBuffer());const hash=[...new Uint8Array(digest)].map(x=>x.toString(16).padStart(2,'0')).join('');
    if(hash!==r.image_sha256)throw Error('图像哈希不匹配，已阻止标注');
    const im=await createImageBitmap(blob);if(token!==version){im.close();return;}
    if(im.width!==r.width||im.height!==r.height){im.close();throw Error('图像尺寸不匹配');}
    for(const c of [paint,clean]){c.width=r.width;c.height=r.height;}
    ctx.drawImage(im,0,0);im.close();pixels=ctx.getImageData(0,0,r.width,r.height);labels=decode(existing?.runs||[],r.width*r.height);
    ready=true;$('loading').hidden=true;$('done').disabled=false;fit();render();$('viewport').scrollTop=$('viewport').scrollLeft=0;
  }catch(e){if(token===version){$('loading').textContent='加载失败：'+e.message;alertText(e.message);}}
}
function point(e){const box=paint.getBoundingClientRect();return {x:(e.clientX-box.left)*paint.width/box.width,y:(e.clientY-box.top)*paint.height/box.height};}
function dab(p){paintDisk(labels,pixels.data,row().width,row().height,p.x,p.y,Number($('brush').value),tool,row().background_value,$('inkOnly').checked,stroke);}
function showCursor(e){const outer=$('viewport').getBoundingClientRect(),diameter=Number($('brush').value)*zoom,c=$('brushCursor');c.hidden=false;c.style.width=c.style.height=diameter+'px';c.style.left=e.clientX-outer.left+$('viewport').scrollLeft-diameter/2+'px';c.style.top=e.clientY-outer.top+$('viewport').scrollTop-diameter/2+'px';}
let panMode=false,gesture=null,panOrigin=null;
const pointers=new Map();
function pinchState(){const [a,b]=[...pointers.values()];return {distance:Math.max(1,Math.hypot(a.x-b.x,a.y-b.y)),x:(a.x+b.x)/2,y:(a.y+b.y)/2};}
paint.addEventListener('pointerdown',e=>{
  if(!ready||e.button!==0)return;e.preventDefault();paint.focus({preventScroll:true});paint.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(pointers.size===2){
    if(stroke){for(const [i,value] of stroke)labels[i]=value;stroke=null;render();}
    const p=pinchState();gesture={...p,zoom};panOrigin=null;return;
  }
  if(pointers.size>1||gesture)return;
  if(panMode){panOrigin={x:e.clientX,y:e.clientY,left:$('viewport').scrollLeft,top:$('viewport').scrollTop};return;}
  stroke=new Map();lastPoint=point(e);dab(lastPoint);render();
});
paint.addEventListener('pointermove',e=>{
  if(!ready)return;
  if(pointers.has(e.pointerId))pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(gesture){
    if(pointers.size!==2)return;const p=pinchState(),before=paint.getBoundingClientRect();
    const anchorX=(gesture.x-before.left)/zoom,anchorY=(gesture.y-before.top)/zoom;
    applyZoom(zoom*p.distance/gesture.distance);const after=paint.getBoundingClientRect();
    $('viewport').scrollLeft+=after.left+anchorX*zoom-p.x;$('viewport').scrollTop+=after.top+anchorY*zoom-p.y;
    gesture={...p,zoom};return;
  }
  if(panOrigin){$('viewport').scrollLeft=panOrigin.left+panOrigin.x-e.clientX;$('viewport').scrollTop=panOrigin.top+panOrigin.y-e.clientY;return;}
  showCursor(e);if(!stroke)return;const p=point(e),distance=Math.hypot(p.x-lastPoint.x,p.y-lastPoint.y),n=Math.max(1,Math.ceil(distance/Math.max(.5,Number($('brush').value)/4)));
  for(let i=1;i<=n;i++)dab({x:lastPoint.x+(p.x-lastPoint.x)*i/n,y:lastPoint.y+(p.y-lastPoint.y)*i/n});lastPoint=p;scheduleRender();
});
function finish(){if(!stroke)return;if(stroke.size){const history=histories.get(row().name)||[];history.push([...stroke].map(([i,before])=>[i,before,labels[i]]));if(history.length>100)history.shift();histories.set(row().name,history);redos.set(row().name,[]);record();}stroke=null;render();}
for(const event of ['pointerup','pointercancel','lostpointercapture'])paint.addEventListener(event,e=>{pointers.delete(e.pointerId);if(gesture||panOrigin){if(!pointers.size){gesture=null;panOrigin=null;}return;}finish();});
$('panMode').onclick=()=>{finish();panMode=!panMode;$('panMode').setAttribute('aria-pressed',String(panMode));paint.style.cursor=panMode?'grab':'crosshair';};
$('touchUndo').onclick=()=>historyMove(false);
$('toggleLibrary').onclick=()=>{const visible=document.body.classList.toggle('show-library');$('toggleLibrary').setAttribute('aria-expanded',String(visible));};
$('touchBrush').oninput=()=>{$('brush').value=$('touchBrush').value;$('brush').oninput();};
paint.addEventListener('pointerleave',()=>{$('brushCursor').hidden=true;});
function setTool(value){panMode=false;$('panMode').setAttribute('aria-pressed','false');paint.style.cursor='crosshair';tool=value;for(const b of document.querySelectorAll('[data-tool]'))b.setAttribute('aria-pressed',String(Number(b.dataset.tool)===tool));$('brushCursor').style.borderColor=tool===1?'var(--remove)':tool===2?'var(--keep)':'var(--muted)';}
for(const b of document.querySelectorAll('[data-tool]'))b.onclick=()=>setTool(Number(b.dataset.tool));
function historyMove(redo){if(!ready)return;finish();const from=redo?redos:histories,to=redo?histories:redos;const item=from.get(row().name)?.pop();if(!item)return;for(const [i,before,after] of item)labels[i]=redo?after:before;const stack=to.get(row().name)||[];stack.push(item);to.set(row().name,stack);record();render();}
$('undo').onclick=()=>historyMove(false);$('redo').onclick=()=>historyMove(true);
function go(target){if(!dataset)return;finish();index=Math.min(dataset.rows.length-1,Math.max(0,target));load();}
function next(delta){if(!ready)return;let target=index+delta;while(target>=0&&target<dataset.rows.length&&!matchFilter(dataset.rows[target]))target+=delta;if(target>=0&&target<dataset.rows.length)go(target);else message(delta>0?'已到当前筛选的最后一张。':'已到当前筛选的第一张。');}
$('previous').onclick=()=>next(-1);$('next').onclick=()=>next(1);$('filter').onchange=drawLibrary;
$('done').onclick=()=>{
  if(!ready)return;finish();const candidate=formRecord(true);
  try{validate({...bundle(),annotations:{[row().name]:candidate}},dataset);}catch(e){message(e.message);alertText(e.message);return;}
  alertText('');record(true);drawLibrary();next(1);
};
for(const input of document.querySelectorAll('input[name=judgment],input[name=issue]'))input.onchange=()=>record();
$('notes').oninput=()=>record();$('brush').oninput=()=>{$('brushValue').textContent=$('brush').value+' px';$('touchBrush').value=$('brush').value;$('touchBrushValue').textContent=$('brush').value+' px';};
$('zoomIn').onclick=()=>applyZoom(zoom*1.35);$('zoomOut').onclick=()=>applyZoom(zoom/1.35);$('fit').onclick=fit;$('actual').onclick=()=>applyZoom(1);$('overlay').onchange=render;
function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('export').onclick=()=>{if(!dataset)return;finish();download(new Blob([JSON.stringify(bundle(),null,2)],{type:'application/json'}),'talk2ink_annotation144_labels.json');};
$('png').onclick=()=>{if(!ready)return;finish();clean.toBlob(blob=>{if(blob)download(blob,row().id+'_cleaned.png');});};
$('import').onclick=()=>$('importFile').click();
$('importFile').onchange=async e=>{const file=e.target.files[0];if(!file||!ready)return;finish();try{const incoming=validate(JSON.parse(await file.text()),dataset);for(const [name,item] of Object.entries(incoming))if(records[name]&&JSON.stringify(records[name])!==JSON.stringify(item))throw Error('有不同版本的现有标注，已取消导入以免覆盖：'+name);records={...records,...incoming};histories.clear();redos.clear();persist();await load();alertText('');message('导入成功，正在保存。');}catch(error){alertText('导入失败：'+error.message);}e.target.value='';};
document.addEventListener('keydown',e=>{
  if(!ready||e.repeat||e.isComposing||e.altKey||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;
  if(e.key==='Enter'&&e.target.tagName==='BUTTON')return;
  if(e.ctrlKey||e.metaKey){if(e.key.toLowerCase()==='z'){e.preventDefault();historyMove(e.shiftKey);}return;}
  if(stroke)return;const k=e.key.toLowerCase();
  if(['1','2','3'].includes(k))setTool({'1':1,'2':2,'3':0}[k]);
  else if(k==='z')historyMove(false);else if(k==='y')historyMove(true);
  else if(k==='arrowright')next(1);else if(k==='arrowleft')next(-1);
  else if(k==='enter')$('done').click();else if(k==='+'||k==='=')applyZoom(zoom*1.35);else if(k==='-')applyZoom(zoom/1.35);
  else if(k==='['||k===']'){$('brush').value=Number($('brush').value)+(k==='['?-1:1);$('brush').oninput();}
  else return;e.preventDefault();
});
window.addEventListener('beforeunload',e=>{finish();if(dirty&&serverEnabled){e.preventDefault();e.returnValue='';}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){finish();saveServer();}});
async function initialize(){
  try{
    const response=await fetch('data.json');if(!response.ok)throw Error('无法读取数据集');dataset=await response.json();key='talk2ink_annotation144_'+dataset.dataset_sha256;$('sourceCount').textContent=dataset.sources.length+' 个来源';
    let local=null;try{const stored=localStorage.getItem(key);if(stored)local=JSON.parse(stored);}catch(e){alertText('浏览器草稿无法读取。请保留浏览器数据；磁盘记录仍会载入。');}
    const browserOnly=document.querySelector('meta[name="talk2ink-storage"]')?.content==='browser';
    const remote=browserOnly?null:await fetch('api/annotations').catch(()=>null);
    if(browserOnly){$('saveStatus').textContent='GitHub Pages：标注保存在本浏览器，请定期导出 JSON。';}
    let disk=null;
    if(remote?.ok){disk=await remote.json();revision=disk.revision;serverEnabled=true;records=validate(disk.bundle,dataset);}
    if(local){const incoming=validate(local,dataset);for(const [name,item] of Object.entries(incoming)){
      if(!records[name])records[name]=item;
      else if(JSON.stringify(records[name])!==JSON.stringify(item)){
        // Both are preserved. Ask for review rather than guessing which label set is correct.
        await beginRecovery(local,disk);break;
      }
    }}
    const first=dataset.rows.findIndex(r=>records[r.name]?.status!=='reviewed');index=first<0?0:first;await load();
    if(!conflict)persist();else message('版本待核对；请保留导出的恢复文件。');
  }catch(e){alertText('初始化失败：'+e.message);message('未开始标注，请检查数据或服务。');}
}
initialize();
