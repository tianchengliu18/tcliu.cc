"use client";

import { useLayoutEffect, useRef, useState } from "react";
import "./HomeExperience.css";

const brushes = [
  { name: "wood-red", color: "#ac4939", tipX: 6.67, tipY: 99.0 },
  { name: "porcelain-blue", color: "#427db0", tipX: 11.13, tipY: 97.75 },
  { name: "jade-green", color: "#65936e", tipX: 12.04, tipY: 97.91 },
  { name: "violet", color: "#9474bb", tipX: 13.11, tipY: 98.33 },
  { name: "blossom-pink", color: "#c77f99", tipX: 5.75, tipY: 98.48 },
];

type Kind = "text" | "frame" | "media" | "line" | "duplicate";
type Task = { element: HTMLElement; kind: Kind; parent?: Task; master?: Task; done: boolean };
type TextLine = { x: number; y: number; width: number; height: number };
type Job = { task: Task; start: number; duration: number; lines: TextLine[]; source?: DOMRect };

function textLines(element: HTMLElement, bounds: DOMRect) {
  const lines: TextLine[] = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  while (walker.nextNode()) {
    if (!walker.currentNode.textContent?.trim()) continue;
    range.selectNodeContents(walker.currentNode);
    for (const rect of range.getClientRects()) {
      if (!rect.width || !rect.height) continue;
      const line = lines.find(item => Math.abs(item.y - (rect.top - bounds.top)) < 3);
      if (line) {
        const right = Math.max(line.x + line.width, rect.right - bounds.left);
        line.x = Math.min(line.x, rect.left - bounds.left);
        line.width = right - line.x;
        line.height = Math.max(line.height, rect.height);
      } else lines.push({ x: rect.left - bounds.left, y: rect.top - bounds.top, width: rect.width, height: rect.height });
    }
  }
  return lines.sort((a, b) => a.y - b.y);
}

// Compile the existing page into construction tasks. A card's contents wait
// for its frame; repeated cards wait for their master before being duplicated.
function blueprint(container: HTMLElement) {
  const tasks: Task[] = [];
  const masters = new Map<string, Task>();
  const add = (element: HTMLElement, kind: Kind, parent?: Task, group?: string) => {
    const master = group ? masters.get(group) : undefined;
    const task: Task = { element, kind: master ? "duplicate" : kind, parent, master, done: false };
    tasks.push(task);
    if (group) masters.set(group, task);
    return task;
  };
  for (const element of container.querySelectorAll<HTMLElement>("[data-build]")) {
    const kind = element.dataset.build;
    if (kind === "draw" && element.querySelector("article")) {
      const task = add(element, "frame", undefined, element.dataset.buildGroup);
      const children = element.querySelectorAll<HTMLElement>("h3, h4, p, img, a");
      for (const child of children) {
        if (child.closest("h3, h4, p") !== child && child.closest("h3, h4, p")) continue;
        if (child.tagName === "A" && child.querySelector("img")) continue;
        add(child, child.tagName === "IMG" ? "media" : "text", task);
      }
    } else if (kind === "place" && element.children.length > 1 && element.querySelector("a")) {
      const group = `links-${tasks.length}`;
      for (const child of element.children) add(child as HTMLElement, "frame", undefined, group);
    } else add(element, kind === "write" ? "text" : kind === "draw" ? "line" : "media");
  }
  return tasks;
}

/** Build a semantic task graph for standalone pages, without editing their content. */
function pageBlueprint(container: HTMLElement) {
  const tasks: Task[] = [];
  const frames = new Map<HTMLElement, Task>();
  const masters = new Map<Element, Task>();
  const frameSelector = "article, a.group, div.border.rounded-lg";
  const candidates = container.querySelectorAll<HTMLElement>(`${frameSelector}, h1, h2, h3, h4, p, li, a, img, iframe, video, hr`);
  const textSelector = "h1,h2,h3,h4,p,li";
  for (const element of candidates) {
    if (element.closest("form, [role='dialog'], [data-build-ignore]")) continue;
    const ancestorFrame = element.parentElement?.closest<HTMLElement>(frameSelector);
    const isFrame = element.matches(frameSelector) && !ancestorFrame;
    const textAncestor = element.parentElement?.closest<HTMLElement>(textSelector);
    // Inline links and nested list text belong to their enclosing text layer.
    if (!isFrame && textAncestor && container.contains(textAncestor)) continue;
    if (!isFrame && element.tagName === "A" && element.querySelector("img")) continue;
    const parent = ancestorFrame ? frames.get(ancestorFrame) : undefined;
    const kind: Kind = isFrame ? "frame" : element.matches("img,iframe,video") ? "media" : element.tagName === "HR" ? "line" : "text";
    const master = isFrame && element.parentElement ? masters.get(element.parentElement) : undefined;
    const task: Task = { element, kind: master ? "duplicate" : kind, parent, master, done: false };
    tasks.push(task);
    if (isFrame) {
      frames.set(element, task);
      if (element.parentElement) masters.set(element.parentElement, task);
    }
  }
  return tasks;
}

function preview(element: HTMLElement) {
  // An embedded PDF/video is placed as a single media layer. Do not instantiate
  // another viewer or start another video inside a temporary drag preview.
  if (element.matches("iframe,video")) {
    const placeholder = document.createElement("div");
    placeholder.className = "build-media-placeholder";
    placeholder.textContent = element.tagName === "IFRAME" ? "PDF" : "▶";
    return placeholder;
  }
  const clone = element.cloneNode(true) as HTMLElement;
  for (const node of [clone, ...clone.querySelectorAll<HTMLElement>("*")]) {
    node.removeAttribute("id");
    node.removeAttribute("data-pending");
    node.removeAttribute("data-building");
    node.removeAttribute("data-build");
    node.style.removeProperty("opacity");
    node.style.removeProperty("clip-path");
  }
  clone.setAttribute("inert", "");
  clone.style.margin = "0";
  clone.style.width = "100%";
  clone.style.height = "100%";
  if (clone.tagName === "IMG") { clone.style.position = "static"; clone.style.objectFit = "contain"; }
  return clone;
}

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => 1 - Math.pow(1 - clamp(value), 3);

export default function HomeExperience({ children, isZh, autoDetect = false }: { children: React.ReactNode; isZh: boolean; autoDetect?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const controller = useRef<{ finish: () => void; replay: () => void } | null>(null);
  const [playing, setPlaying] = useState(true);

  useLayoutEffect(() => {
    const container = content.current;
    const overlay = layer.current!;
    if (!container || !overlay) return;
    let tasks = autoDetect ? pageBlueprint(container) : blueprint(container);
    const pens = Array.from(overlay.querySelectorAll<HTMLElement>(".brush-cursor"));
    const visuals = Array.from(overlay.querySelectorAll<HTMLElement>(".build-visual"));
    const boxes = visuals.map(visual => visual.querySelector<HTMLElement>(".build-box")!);
    const labels = visuals.map(visual => visual.querySelector<HTMLElement>(".build-label")!);
    const badges = visuals.map(visual => visual.querySelector<HTMLElement>(".build-size")!);
    const ghosts = visuals.map(visual => visual.querySelector<HTMLElement>(".build-preview")!);
    const carets = visuals.map(visual => visual.querySelector<HTMLElement>(".build-caret")!);
    const guidesX = visuals.map(visual => visual.querySelector<HTMLElement>(".build-guide-x")!);
    const guidesY = visuals.map(visual => visual.querySelector<HTMLElement>(".build-guide-y")!);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const jobs: (Job | null)[] = brushes.map(() => null);
    let frame = 0;
    let enabled = false;
    let disposed = false;
    let nextBrush = 0;
    let lastScroll = window.scrollY;
    let lastScrollTime = performance.now();
    let rushingUntil = 0;

    const reveal = (task: Task) => {
      task.done = true;
      task.element.removeAttribute("data-pending");
      task.element.removeAttribute("data-building");
      task.element.style.removeProperty("clip-path");
      task.element.style.removeProperty("opacity");
    };
    const hideVisual = (i: number) => {
      pens[i].style.opacity = "0";
      visuals[i].style.display = "none";
      ghosts[i].replaceChildren();
    };
    const finish = () => {
      enabled = false;
      cancelAnimationFrame(frame);
      frame = 0;
      tasks.forEach(reveal);
      jobs.forEach((_, i) => { jobs[i] = null; hideVisual(i); });
      delete overlay.dataset.active;
    };
    const schedule = () => {
      if (!frame && enabled && !disposed) frame = requestAnimationFrame(tick);
    };
    const boxAt = (i: number, x: number, y: number, width: number, height: number) => {
      boxes[i].style.transform = `translate3d(${x}px,${y}px,0)`;
      boxes[i].style.width = `${Math.max(1, width)}px`;
      boxes[i].style.height = `${Math.max(1, height)}px`;
    };

    function tick(now: number) {
      frame = 0;
      if (!enabled || disposed) return;
      const fast = now < rushingUntil;
      const active = new Set(jobs.flatMap(job => job ? [job.task] : []));
      const bounds = new Map(tasks.filter(task => !task.done).map(task => [task, task.element.getBoundingClientRect()]));
      for (const [task, rect] of bounds) {
        if (!active.has(task) && (rect.bottom < 0 || !rect.width || !rect.height)) reveal(task);
      }
      const ready = tasks.filter(task => {
        const rect = bounds.get(task);
        return !task.done && !active.has(task) && rect && rect.top < innerHeight && rect.bottom > 0 && (!task.parent || task.parent.done) && (!task.master || task.master.done);
      }).sort((a, b) => Number(a.kind === "text") - Number(b.kind === "text"));
      const capacity = innerWidth < 600 ? 3 : 5;
      const order = brushes.map((_, i) => (nextBrush + i) % brushes.length);
      for (const i of order) {
        if (jobs.filter(Boolean).length >= capacity) break;
        if (jobs[i] || !ready.length) continue;
        const task = ready.shift()!;
        const rect = bounds.get(task)!;
        const kind = task.kind;
        const duration = fast ? 420 : kind === "text" ? Math.min(2600, 1450 + (task.element.textContent?.length || 0) * 3) : 1700;
        jobs[i] = { task, start: now, duration, lines: kind === "text" ? textLines(task.element, rect) : [], source: task.master?.element.getBoundingClientRect() };
        task.element.setAttribute("data-building", kind);
        visuals[i].style.display = "block";
        visuals[i].dataset.kind = kind;
        carets[i].style.display = "none";
        ghosts[i].replaceChildren();
        ghosts[i].style.transform = "none";
        if (kind === "duplicate" || kind === "media") ghosts[i].append(preview(task.master?.element || task.element));
        nextBrush = (i + 1) % brushes.length;
      }

      jobs.forEach((job, i) => {
        if (!job) { hideVisual(i); return; }
        const { task } = job;
        const rect = bounds.get(task) || task.element.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > innerHeight || (fast && now - job.start > 420)) {
          reveal(task); jobs[i] = null; hideVisual(i); return;
        }
        const progress = clamp((now - job.start) / job.duration);
        const kind = task.kind;
        let x = rect.left;
        let y = rect.top;
        let tool = "Frame";
        ghosts[i].style.opacity = "0";
        carets[i].style.display = "none";
        guidesX[i].style.top = `${rect.top}px`;
        guidesY[i].style.left = `${rect.left}px`;
        boxes[i].style.opacity = `${clamp((1 - progress) * 8)}`;

        if (kind === "text") {
          // Drag a text box, then type line by line with a real insertion caret.
          const draw = ease(progress / 0.22);
          boxAt(i, rect.left, rect.top, rect.width * draw, rect.height * draw);
          tool = progress < 0.22 ? "Text box" : "T";
          x = rect.left + rect.width * draw;
          y = rect.top + rect.height * draw;
          const typing = clamp((progress - 0.24) / 0.64);
          if (typing > 0 && job.lines.length) {
            let remaining = job.lines.reduce((sum, line) => sum + line.width, 0) * typing;
            let line = job.lines.at(-1)!;
            for (const candidate of job.lines) {
              line = candidate;
              if (remaining <= candidate.width) break;
              remaining -= candidate.width;
            }
            const edge = line.x + Math.min(line.width, Math.floor(remaining / 7) * 7);
            task.element.style.opacity = "1";
            task.element.style.clipPath = `polygon(0 0,100% 0,100% ${line.y}px,${edge}px ${line.y}px,${edge}px ${line.y + line.height}px,0 ${line.y + line.height}px)`;
            x = rect.left + edge;
            y = rect.top + line.y + line.height * 0.82;
            carets[i].style.display = "block";
            carets[i].style.transform = `translate3d(${x}px,${rect.top + line.y}px,0)`;
            carets[i].style.height = `${line.height}px`;
          }
        } else if (kind === "line") {
          const draw = ease(progress / 0.82);
          boxAt(i, rect.left, rect.top, rect.width * draw, 1);
          x = rect.left + rect.width * draw;
          tool = "Pen";
        } else if (kind === "duplicate") {
          // Select the completed master, Option-drag a ghost, snap to the target.
          const source = job.source!;
          const sx = source.left;
          const sy = Math.max(65, Math.min(innerHeight - source.height, source.top));
          const drag = ease((progress - 0.18) / 0.52);
          const bx = sx + (rect.left - sx) * drag;
          const by = sy + (rect.top - sy) * drag;
          const width = source.width + (rect.width - source.width) * drag;
          const height = source.height + (rect.height - source.height) * drag;
          boxAt(i, bx, by, width, height);
          ghosts[i].style.opacity = progress > 0.16 ? "0.55" : "0";
          x = bx + width * 0.65;
          y = by + Math.min(32, height * 0.5);
          tool = progress < 0.18 ? "Select" : progress < 0.72 ? "⌥ Duplicate" : "Snap";
        } else {
          // Crosshair-draw a frame; place media into it and align the selection.
          const draw = ease(progress / 0.45);
          boxAt(i, rect.left, rect.top, rect.width * draw, rect.height * draw);
          x = rect.left + rect.width * draw;
          y = rect.top + rect.height * draw;
          if (kind === "media" && progress > 0.45) {
            const drop = ease((progress - 0.45) / 0.35);
            ghosts[i].style.opacity = `${drop}`;
            ghosts[i].style.transform = `translate(${(1 - drop) * 40}px,${(1 - drop) * -24}px)`;
            x = rect.left + rect.width * 0.6 + (1 - drop) * 40;
            y = rect.top + rect.height * 0.45 - (1 - drop) * 24;
            tool = drop < 1 ? "Place image" : "Align";
          }
        }
        // Real elements replace the temporary design layers only after the operation.
        if (kind !== "text" && progress > 0.86) {
          task.element.style.opacity = `${clamp((progress - 0.86) / 0.1)}`;
          ghosts[i].style.opacity = "0";
        }
        labels[i].textContent = tool;
        badges[i].textContent = kind === "duplicate" && progress > 0.18 && progress < 0.72 ? `${Math.round(Math.abs(rect.top - (job.source?.bottom || 0)))} px` : `${Math.round(rect.width)} × ${Math.round(rect.height)}`;
        pens[i].style.transform = `translate3d(${x}px,${y}px,0)`;
        pens[i].style.opacity = progress > 0.97 ? "0" : "1";
        pens[i].style.setProperty("--pen-tilt", `${Math.sin(progress * 12) * 3}deg`);
        if (progress === 1) { reveal(task); jobs[i] = null; hideVisual(i); }
      });
      if (jobs.some(Boolean)) overlay.dataset.active = ""; else delete overlay.dataset.active;
      if (jobs.some(Boolean) || ready.length) schedule();
      // Completing a frame unlocks children even without another scroll event.
      else if (tasks.some(task => !task.done && bounds.get(task) && bounds.get(task)!.top < innerHeight && bounds.get(task)!.bottom > 0)) schedule();
      else if (tasks.every(task => task.done)) { enabled = false; setPlaying(false); }
    }

    const replay = () => {
      finish();
      if (reduced.matches) return;
      if (autoDetect) tasks = pageBlueprint(container);
      rushingUntil = 0;
      lastScroll = scrollY;
      lastScrollTime = performance.now();
      enabled = true;
      for (const task of tasks) {
        if (task.element.getBoundingClientRect().bottom > 0) {
          task.done = false;
          task.element.setAttribute("data-pending", "");
        }
      }
      schedule();
    };
    const onScroll = () => {
      const now = performance.now();
      if (Math.abs(scrollY - lastScroll) > Math.max(35, (now - lastScrollTime) * 1.4)) rushingUntil = now + 800;
      lastScroll = scrollY;
      lastScrollTime = now;
      schedule();
    };
    const onAnchor = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (anchor?.hash && anchor.pathname === location.pathname) { rushingUntil = performance.now() + 2400; schedule(); }
    };
    const onFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      for (const task of tasks) {
        if (task.element.contains(target)) {
          reveal(task);
          jobs.forEach((job, i) => { if (job?.task === task) { jobs[i] = null; hideVisual(i); } });
        }
      }
    };
    const onResize = () => {
      // A resize invalidates measured text lines; finish the active tasks cleanly.
      jobs.forEach((job, i) => { if (job) { reveal(job.task); jobs[i] = null; hideVisual(i); } });
      schedule();
    };
    const onPreference = () => { if (reduced.matches) { finish(); setPlaying(false); } };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { finish(); setPlaying(false); } };
    const onVisibility = () => { if (document.hidden) { finish(); setPlaying(false); } };
    controller.current = { finish, replay };
    replay();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    container.addEventListener("focusin", onFocus);
    reduced.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("click", onAnchor);
    // Filtering a publication list replaces React-owned nodes. Complete the
    // current presentation instead of animating stale nodes or hiding results.
    const observer = new MutationObserver(() => {
      if (enabled) { finish(); setPlaying(false); }
    });
    if (autoDetect) observer.observe(container, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      disposed = true;
      finish();
      controller.current = null;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
      container.removeEventListener("focusin", onFocus);
      reduced.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("click", onAnchor);
    };
  }, [autoDetect]);

  return (
    <div ref={root} className={`home-experience${autoDetect ? " page-experience" : ""}`}>
      <div className="brush-toolbar">
        <span className="brush-swatch" aria-hidden="true">{brushes.map(brush => <i key={brush.name} style={{ background: brush.color }} />)}</span>
        <button type="button" onClick={() => {
          if (playing) controller.current?.finish(); else controller.current?.replay();
          setPlaying(!playing);
        }}>{playing ? (isZh ? "直接阅读" : "Skip animation") : (isZh ? "重播毛笔动画" : "Replay brushes")}</button>
      </div>
      <div ref={content} className="experience-content">{children}</div>
      <div className="brush-overlay" ref={layer} aria-hidden="true">
        <div className="build-ruler build-ruler-top" /><div className="build-ruler build-ruler-left" />
        {brushes.map(brush => <div key={`${brush.name}-visual`} className="build-visual" style={{ "--brush-color": brush.color } as React.CSSProperties}>
          <div className="build-guide-x" /><div className="build-guide-y" />
          <div className="build-box"><span className="build-label" /><span className="build-size" /><div className="build-preview" /><i /><i /><i /><i /></div>
          <div className="build-caret" />
        </div>)}
        {brushes.map(brush => <div key={brush.name} className="brush-cursor" style={{ "--brush-color": brush.color, "--tip-x": `${brush.tipX}%`, "--tip-y": `${brush.tipY}%` } as React.CSSProperties}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/brushes/${brush.name}.webp`} alt="" width={96} height={96} />
          <span className="brush-tip" />
        </div>)}
      </div>
    </div>
  );
}
