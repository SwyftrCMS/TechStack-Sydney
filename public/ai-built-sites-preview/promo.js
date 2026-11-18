import { sceneParts } from './promo-parts.js';
import { sceneDefinitions } from './promo-scenes.js';
(() => {
// Playback and DOM rendering for the four scenes in websiteDesign-services.
const canvas = document.querySelector('#promo-canvas');
const player = document.querySelector('#promo-player');
const button = document.querySelector('#promo-playback');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const svgNamespace = 'http://www.w3.org/2000/svg';
const unitless = new Set(['flex', 'flexGrow', 'flexShrink', 'fontWeight', 'lineHeight', 'opacity', 'scale', 'zIndex']);
const svgHyphenated = new Set([
  'clipPath', 'floodColor', 'floodOpacity', 'fontFamily', 'fontSize', 'fontWeight',
  'shapeRendering', 'stopColor', 'stopOpacity', 'strokeDasharray', 'strokeDashoffset',
  'strokeLinecap', 'strokeLinejoin', 'strokeOpacity', 'strokeWidth', 'textAnchor'
]);
const kebab = (name) => name.replace(/[A-Z]/g, (letter) => '-' + letter.toLowerCase());
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const Fragment = ({ children }) => children;
const childrenOf = (children) => children.flat(Infinity)
  .filter((child) => child != null && typeof child !== 'boolean')
  .map((child) => typeof child === 'object' ? child : String(child));

function createSceneElement(tag, props, ...children) {
  if (typeof tag === 'function') return tag({ ...props, children });
  return { tag, props: props || {}, children: childrenOf(children) };
}

function patch(parent, previous, next, index, svg = false) {
  let node = parent.childNodes[index];
  if (next === undefined) {
    if (node) node.remove();
    return;
  }
  if (typeof next === 'string') {
    if (typeof previous !== 'string') {
      const replacement = document.createTextNode(next);
      if (node) node.replaceWith(replacement);
      else parent.append(replacement);
    } else if (next !== previous) {
      node.nodeValue = next;
    }
    return;
  }
  svg = svg || next.tag === 'svg';
  if (previous?.tag !== next.tag) {
    const replacement = svg ? document.createElementNS(svgNamespace, next.tag) : document.createElement(next.tag);
    if (node) node.replaceWith(replacement);
    else parent.append(replacement);
    node = replacement;
    previous = undefined;
  }

  const oldProps = previous?.props || {};
  for (const key of new Set([...Object.keys(oldProps), ...Object.keys(next.props)])) {
    if (key === 'key') continue;
    const value = next.props[key];
    if (key === 'style') {
      const oldStyle = oldProps.style || {};
      const style = value || {};
      for (const prop of new Set([...Object.keys(oldStyle), ...Object.keys(style)])) {
        const part = style[prop];
        if (part === oldStyle[prop]) continue;
        const css = kebab(prop).replace(/^ms-/, '-ms-');
        if (part == null) node.style.removeProperty(css);
        else node.style.setProperty(css, typeof part === 'number' && part !== 0 && !unitless.has(prop) ? part + 'px' : String(part));
      }
    } else if (value !== oldProps[key]) {
      const attr = key === 'className' ? 'class' : svgHyphenated.has(key) ? kebab(key) : key;
      if (value == null || value === false) node.removeAttribute(attr);
      else node.setAttribute(attr, value === true ? '' : String(value));
    }
  }
  const oldChildren = previous?.children || [];
  next.children.forEach((child, childIndex) => patch(node, oldChildren[childIndex], child, childIndex, svg));
  while (node.childNodes.length > next.children.length) node.lastChild.remove();
}

function bezier(x1, y1, x2, y2) {
  const coordinate = (t, a, b) => 3 * (1 - t) ** 2 * t * a + 3 * (1 - t) * t ** 2 * b + t ** 3;
  return (x) => {
    if (x <= 0 || x >= 1) return x;
    let low = 0;
    let high = 1;
    for (let i = 0; i < 16; i++) {
      const middle = (low + high) / 2;
      if (coordinate(middle, x1, x2) < x) low = middle;
      else high = middle;
    }
    return coordinate((low + high) / 2, y1, y2);
  };
}

function interpolate(frame, [start, end], [from, to], { easing }) {
  return from + (to - from) * easing(clamp((frame - start) / (end - start), 0, 1));
}

function spring({ frame, fps, config: { damping, mass, stiffness } }) {
  const seconds = Math.max(frame, 0) / fps;
  const natural = Math.sqrt(stiffness / mass);
  const decay = damping / (2 * mass);
  const frequency = Math.sqrt(Math.abs(natural ** 2 - decay ** 2));
  if (decay < natural) {
    return 1 - Math.exp(-decay * seconds) *
      (Math.cos(frequency * seconds) + decay / frequency * Math.sin(frequency * seconds));
  }
  if (frequency === 0) return 1 - Math.exp(-decay * seconds) * (1 + decay * seconds);
  return 1 - ((decay + frequency) * Math.exp((-decay + frequency) * seconds) -
    (decay - frequency) * Math.exp((-decay - frequency) * seconds)) / (2 * frequency);
}

let localFrame = 0;
const motion = {
  AbsoluteFill: ({ style, children }) => createSceneElement('div', {
    style: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', ...style }
  }, ...children),
  Easing: { bezier },
  interpolate,
  spring,
  useCurrentFrame: () => localFrame,
  useVideoConfig: () => ({ fps: 30, width: 1080, height: 1440 })
};

const modules = { ...sceneParts(createSceneElement, Fragment), ...sceneDefinitions(createSceneElement, Fragment) };
const loaded = new Map();
function load(id) {
  if (id === 'remotion') return motion;
  if (id === 'react') return { Fragment };
  if (loaded.has(id)) return loaded.get(id);
  const exports = {};
  loaded.set(id, exports);
  modules[id](exports, (relative) => {
    if (!relative.startsWith('.')) return load(relative);
    const segments = id.split('/').slice(0, -1);
    for (const part of relative.split('/')) {
      if (part === '..') segments.pop();
      else if (part !== '.') segments.push(part);
    }
    return load(segments.join('/'));
  });
  return exports;
}
const { Scene1DiscoveryCall } = load('scenes/Scene1DiscoveryCall');
const { Scene2Scope } = load('scenes/Scene2Scope');
const { Scene3AiBuild } = load('scenes/Scene3AiBuild');
const { Scene4Live } = load('scenes/Scene4Live');

const scenes = [
  [0, Scene1DiscoveryCall], [90, Scene2Scope], [180, Scene3AiBuild], [360, Scene4Live]
];
const lastFrame = 479;
let previous;
let frame = 0;
let paintedFrame = -1;
let playing = false;
let request = 0;
let lastTime = 0;

function draw(nextFrame) {
  if (nextFrame === paintedFrame) return;
  const [start, scene] = scenes.findLast(([start]) => start <= nextFrame);
  localFrame = nextFrame - start;
  const next = scene();
  patch(canvas, previous, next, 0);
  previous = next;
  paintedFrame = nextFrame;
}

function resize() {
  canvas.style.transform = 'scale(' + player.clientWidth / 1080 + ')';
}

function stop() {
  playing = false;
  cancelAnimationFrame(request);
  button.textContent = frame >= lastFrame ? 'Replay' : 'Play';
}

function advance(time) {
  frame = Math.min(lastFrame, frame + (time - lastTime) * 0.03);
  lastTime = time;
  draw(Math.floor(frame));
  if (frame >= lastFrame) stop();
  else request = requestAnimationFrame(advance);
}

function play() {
  if (frame >= lastFrame) frame = 0;
  draw(Math.floor(frame));
  playing = true;
  lastTime = performance.now();
  button.textContent = 'Pause';
  request = requestAnimationFrame(advance);
}

button.addEventListener('click', () => {
  if (playing) stop();
  else play();
});
reducedMotion.addEventListener('change', () => {
  if (!reducedMotion.matches) return;
  frame = lastFrame;
  stop();
  draw(frame);
});
new ResizeObserver(resize).observe(player);
resize();
if (reducedMotion.matches) {
  frame = lastFrame;
  draw(frame);
  stop();
} else {
  draw(0);
  play();
}

})();
