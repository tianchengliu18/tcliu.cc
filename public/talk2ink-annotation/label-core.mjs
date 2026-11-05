export function encode(mask) {
  const runs=[];
  for(let i=0;i<mask.length;) {
    if(!mask[i]) {i++;continue;}
    const start=i,value=mask[i];
    while(i<mask.length&&mask[i]===value)i++;
    runs.push([start,i-start,value]);
  }
  return runs;
}
export function decode(runs,size) {
  if(!Array.isArray(runs)||!Number.isSafeInteger(size)||size<1)throw Error('标注格式错误');
  const mask=new Uint8Array(size);let end=0;
  for(const r of runs) {
    if(!Array.isArray(r)||r.length!==3||!r.every(Number.isSafeInteger))throw Error('标注区间格式错误');
    const [start,length,value]=r;
    if(start<end||length<1||start+length>size||![1,2].includes(value))throw Error('标注越界或重叠');
    mask.fill(value,start,start+length);end=start+length;
  }
  return mask;
}
export const isInk=(gray,bg)=>bg===255?gray<128:gray>=128;
export function paintDisk(mask,pixels,w,h,x,y,diameter,value,background,onlyInk,changes) {
  const radius=diameter/2;
  for(let yy=Math.max(0,Math.floor(y-radius));yy<Math.min(h,Math.ceil(y+radius));yy++)
    for(let xx=Math.max(0,Math.floor(x-radius));xx<Math.min(w,Math.ceil(x+radius));xx++){
      if((xx+.5-x)**2+(yy+.5-y)**2>radius**2)continue;
      const i=yy*w+xx;
      if(value===1&&mask[i]===2)continue;
      if(value!==0&&onlyInk&&!isInk(pixels[4*i],background))continue;
      if(mask[i]!==value){if(!changes.has(i))changes.set(i,mask[i]);mask[i]=value;}
    }
}
export function validate(bundle,dataset) {
  if(bundle.schema_version!==1||bundle.dataset_sha256!==dataset.dataset_sha256)throw Error('标注文件不属于本批字图');
  if(!bundle.annotations||typeof bundle.annotations!=='object'||Array.isArray(bundle.annotations))throw Error('缺少标注记录');
  const byName=new Map(dataset.rows.map(r=>[r.name,r]));
  for(const [name,a] of Object.entries(bundle.annotations)){
    const r=byName.get(name);
    if(!r||a.name!==name||a.image_sha256!==r.image_sha256||a.raw_sha256!==r.raw_sha256||a.width!==r.width||a.height!==r.height||a.background_value!==r.background_value)throw Error('图像哈希或坐标不匹配：'+name);
    if(!['draft','reviewed'].includes(a.status))throw Error('标注状态无效');
    if(![null,'needs_cleanup','no_cleanup_needed','uncertain'].includes(a.image_judgment))throw Error('清理判断无效');
    if(!Array.isArray(a.issues)||a.issues.some(x=>!['tip','dry_ink','edge','connection','border','source_problem'].includes(x)))throw Error('疑点类型无效');
    if(typeof a.note!=='string'||a.note.length>10000)throw Error('备注格式无效');
    const mask=decode(a.runs,r.width*r.height);
    if(a.status==='reviewed'){
      if(!a.image_judgment)throw Error('已完成记录缺少清理判断');
      const deleted=mask.includes(1);
      if(a.image_judgment==='needs_cleanup'&&!deleted)throw Error('需要清理的完成记录没有该删标注');
      if(a.image_judgment==='no_cleanup_needed'&&deleted)throw Error('无需清理记录仍含该删标注');
    }
  }
  return bundle.annotations;
}
