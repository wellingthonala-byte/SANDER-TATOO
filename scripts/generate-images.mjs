/**
 * Procedural placeholder imagery for the Sander Tattoo Ink landing page.
 *
 * Renders "ink on lit skin": a relief-shaded warm skin base carved by ridged
 * fractal noise (the ink filaments), vignetted and encoded to WebP via sharp.
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const OUT = process.argv[2] ?? "./out";
mkdirSync(OUT, { recursive: true });

/* ---------------------------------------------------------------- noise --- */

function hash2(ix, iy, seed) {
  let h = ix * 374761393 + iy * 668265263 + seed * 1442695040888963407;
  h = (h ^ (h >> 13)) * 1274126177;
  h = h ^ (h >> 16);
  return ((h >>> 0) % 100000) / 100000;
}

const smooth = (t) => t * t * (3 - 2 * t);

function noise2(x, y, seed) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = smooth(x - ix);
  const fy = smooth(y - iy);
  const a = hash2(ix, iy, seed);
  const b = hash2(ix + 1, iy, seed);
  const c = hash2(ix, iy + 1, seed);
  const d = hash2(ix + 1, iy + 1, seed);
  return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
}

function fbm(x, y, seed, octaves = 5, lacunarity = 2.05, gain = 0.5) {
  let sum = 0;
  let amp = 1;
  let norm = 0;
  let fx = x;
  let fy = y;
  for (let o = 0; o < octaves; o++) {
    sum += amp * noise2(fx, fy, seed + o * 131);
    norm += amp;
    amp *= gain;
    fx *= lacunarity;
    fy *= lacunarity;
  }
  return sum / norm;
}

/** Ridged fractal — sharp filaments, the backbone of the "ink" look. */
function ridged(x, y, seed, octaves = 5) {
  let sum = 0;
  let amp = 1;
  let norm = 0;
  let fx = x;
  let fy = y;
  for (let o = 0; o < octaves; o++) {
    const n = 1 - Math.abs(2 * noise2(fx, fy, seed + o * 977) - 1);
    sum += amp * n * n;
    norm += amp;
    amp *= 0.55;
    fx *= 2.1;
    fy *= 2.1;
  }
  return sum / norm;
}

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const mix = (a, b, t) => a + (b - a) * t;
const smoothstep = (e0, e1, x) => {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

/* --------------------------------------------------------------- render --- */

/**
 * @param {object} o
 * @param {[number,number,number]} o.skinLo  deep shadow tone
 * @param {[number,number,number]} o.skinHi  lit skin tone
 * @param {[number,number,number]} o.ink     ink tone
 * @param {[number,number,number]} [o.accent] secondary ink tone (colour work)
 */
async function render(file, w, h, o) {
  const {
    seed = 1,
    scale = 3.2,
    skinLo = [16, 11, 8],
    skinHi = [216, 168, 122],
    ink = [8, 7, 8],
    accent = null,
    accentAmount = 0,
    inkDensity = 0.5,
    /** number of contour bands — higher means finer, denser linework */
    bands = 26,
    /** stroke width in pixels */
    lineWidth = 2,
    warp = 0.55,
    light = [0.42, 0.3],
    /** [centerX, centerY, radiusX, radiusY] in normalised units */
    composition = [0.5, 0.5, 0.62, 0.62],
    exposure = 1,
    vignette = 1,
    quality = 74,
  } = o;

  const aspect = w / h;
  const N = w * h;
  const height = new Float32Array(N);
  const inkMask = new Float32Array(N);

  for (let y = 0; y < h; y++) {
    const v = (y / h) * scale;
    for (let x = 0; x < w; x++) {
      const u = (x / w) * scale * aspect;
      // domain warp -> smoky, organic flow instead of regular noise
      const wx = u + warp * fbm(u * 0.9 + 4.7, v * 0.9, seed + 11, 3);
      const wy = v + warp * fbm(u * 0.9, v * 0.9 + 8.3, seed + 29, 3);
      const i = y * w + x;
      height[i] = fbm(wx, wy, seed, 6);
      inkMask[i] = ridged(wx * 1.35, wy * 1.35, seed + 401, 5);
    }
  }

  const [lx, ly] = light;
  const buf = Buffer.allocUnsafe(N * 3);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;

      // relief normal from the height field
      const xl = height[i - (x > 0 ? 1 : 0)];
      const xr = height[i + (x < w - 1 ? 1 : 0)];
      const yu = height[i - (y > 0 ? w : 0)];
      const yd = height[i + (y < h - 1 ? w : 0)];
      const nx = (xl - xr) * 5.5;
      const ny = (yu - yd) * 5.5;
      const len = Math.hypot(nx, ny, 1);

      // single key light from the upper left, no fill — hard chiaroscuro
      const diffuse = clamp01((nx * -0.5 + ny * -0.58 + 0.68) / len);
      const spec = Math.pow(diffuse, 26) * 0.6;

      // distance falloff from the light source keeps the frame moody
      const dx = (x / w - lx) * aspect;
      const dy = y / h - ly;
      const falloff = Math.exp(-(dx * dx + dy * dy) * 3.1);

      const ex = x / w - 0.5;
      const ey = y / h - 0.5;
      const vig = clamp01(1 - vignette * (ex * ex + ey * ey) * 2.9);

      const lit =
        Math.pow(clamp01((0.05 + 0.95 * diffuse) * (0.06 + 0.94 * falloff) * vig), 1.5) * exposure;

      let r = mix(skinLo[0], skinHi[0], lit) + spec * 70 * falloff;
      let g = mix(skinLo[1], skinHi[1], lit) + spec * 62 * falloff;
      let b = mix(skinLo[2], skinHi[2], lit) + spec * 54 * falloff;

      // the piece occupies a soft elliptical area with an organic, ragged edge
      const cd =
        Math.hypot(
          (x / w - composition[0]) / composition[2],
          (y / h - composition[1]) / composition[3],
        ) + (inkMask[i] - 0.5) * 0.34;
      const inside = smoothstep(1.06, 0.42, cd);

      // Ink is drawn as contour lines of the height field: dividing the field
      // into bands and inking each band edge yields dense, flowing linework
      // whose width stays constant because it is normalised by the gradient.
      const gradient = Math.hypot(xl - xr, yu - yd) * 0.5 + 1e-5;
      const phase = height[i] * bands;
      const distPx = Math.abs(phase - Math.round(phase)) / (gradient * bands);
      const line = 1 - smoothstep(lineWidth * 0.5, lineWidth * 0.5 + 0.85, distPx);

      // solid black passages (shading / blackwork fills)
      const fill = smoothstep(0.5 + (1 - inkDensity) * 0.28, 0.34, height[i]) * inkDensity;

      const m = clamp01(Math.max(line, fill) * inside * (0.5 + 0.65 * falloff));
      let ir = ink[0];
      let ig = ink[1];
      let ib = ink[2];
      if (accent && accentAmount) {
        const a = clamp01(smoothstep(0.74, 0.97, inkMask[i]) * accentAmount);
        ir = mix(ir, accent[0], a);
        ig = mix(ig, accent[1], a);
        ib = mix(ib, accent[2], a);
      }
      // slight sheen on fresh ink
      const sheen = spec * 55 * m;
      r = mix(r, ir, m) + sheen;
      g = mix(g, ig, m) + sheen;
      b = mix(b, ib, m) + sheen;

      const o3 = i * 3;
      buf[o3] = Math.max(0, Math.min(255, r | 0));
      buf[o3 + 1] = Math.max(0, Math.min(255, g | 0));
      buf[o3 + 2] = Math.max(0, Math.min(255, b | 0));
    }
  }

  await sharp(buf, { raw: { width: w, height: h, channels: 3 } })
    .blur(0.3)
    .modulate({ saturation: 0.88 })
    .webp({ quality, effort: 6 })
    .toFile(path.join(OUT, file));
}

/* -------------------------------------------------------------- palettes --- */

const PALETTES = [
  {
    name: "realismo",
    skinHi: [206, 158, 114], ink: [10, 8, 9],
    inkDensity: 0.55, bands: 22, lineWidth: 2.3, scale: 3.0,
  },
  {
    name: "fine-line",
    skinHi: [214, 170, 130], ink: [20, 17, 18],
    inkDensity: 0.16, bands: 36, lineWidth: 1.3, scale: 4.4,
  },
  {
    name: "blackwork",
    skinHi: [186, 148, 112], ink: [4, 4, 6],
    inkDensity: 0.8, bands: 15, lineWidth: 3.4, scale: 2.5,
  },
  {
    name: "fechamento",
    skinHi: [196, 150, 106], ink: [7, 6, 8],
    inkDensity: 0.7, bands: 18, lineWidth: 2.9, scale: 2.2,
  },
  {
    name: "coloridas",
    skinHi: [216, 172, 128], ink: [24, 12, 12],
    accent: [176, 40, 40], accentAmount: 0.9,
    inkDensity: 0.5, bands: 24, lineWidth: 2.2, scale: 3.2,
  },
];

/* ------------------------------------------------------------------ run --- */

const jobs = [];

// Lit toward the right so the artwork stays readable next to the headline.
jobs.push(["hero-tattoo.webp", 1250, 1400, {
  seed: 7717, scale: 2.7, inkDensity: 0.62, bands: 21, lineWidth: 2.8,
  light: [0.66, 0.4], skinHi: [232, 182, 134],
  composition: [0.66, 0.48, 0.6, 0.62],
  accent: [150, 34, 34], accentAmount: 0.4, exposure: 1.3, vignette: 0.85, quality: 80,
}]);

jobs.push(["studio.webp", 1200, 900, {
  seed: 3391, scale: 3.4, inkDensity: 0.45, bands: 20, lineWidth: 2.4,
  light: [0.46, 0.42], skinHi: [186, 146, 108], exposure: 1.05, vignette: 1.0,
  composition: [0.5, 0.5, 0.8, 0.8],
}]);

jobs.push(["cta-bg.webp", 1920, 900, {
  seed: 5127, scale: 4.2, inkDensity: 0.62, bands: 24, lineWidth: 2.6,
  light: [0.5, 0.5], skinHi: [158, 120, 88], exposure: 0.72, vignette: 1.2,
  accent: [150, 34, 34], accentAmount: 0.45, composition: [0.5, 0.5, 0.95, 0.95],
}]);

jobs.push(["faq-bg.webp", 1600, 1000, {
  seed: 9081, scale: 3.8, inkDensity: 0.7, bands: 20, lineWidth: 2.8,
  light: [0.5, 0.5], skinHi: [146, 112, 82], exposure: 0.62, vignette: 1.25,
  composition: [0.5, 0.5, 0.95, 0.95],
}]);

jobs.push(["og-image.webp", 1200, 630, {
  seed: 4242, scale: 2.9, inkDensity: 0.6, bands: 20, lineWidth: 2.4,
  light: [0.66, 0.45], skinHi: [206, 158, 112],
  accent: [160, 36, 36], accentAmount: 0.45, quality: 82,
}]);

for (let k = 0; k < 30; k++) {
  const p = PALETTES[Math.floor(k / 6)];
  jobs.push([`work-${String(k + 1).padStart(2, "0")}.webp`, 800, 1000, {
    seed: 1000 + k * 977,
    scale: p.scale * (0.86 + 0.3 * ((k % 3) / 2)),
    skinHi: p.skinHi,
    ink: p.ink,
    accent: p.accent ?? null,
    accentAmount: p.accentAmount ?? 0,
    inkDensity: p.inkDensity,
    bands: p.bands,
    lineWidth: p.lineWidth,
    light: [0.34 + 0.32 * ((k % 5) / 4), 0.28 + 0.3 * ((k % 4) / 3)],
    composition: [
      0.44 + 0.12 * ((k % 3) / 2),
      0.46 + 0.1 * ((k % 2) / 1),
      0.6 + 0.12 * ((k % 4) / 3),
      0.62 + 0.14 * ((k % 5) / 4),
    ],
    exposure: 0.88 + 0.14 * ((k % 3) / 2),
  }]);
}

for (let k = 0; k < 6; k++) {
  jobs.push([`avatar-${k + 1}.webp`, 240, 240, {
    seed: 500 + k * 313, scale: 2.2, inkDensity: 0.22, bands: 12, lineWidth: 2,
    light: [0.5, 0.4], skinHi: [188, 150, 118], vignette: 0.9, quality: 82,
    composition: [0.5, 0.62, 0.5, 0.5],
  }]);
}

const t0 = Date.now();
const only = process.env.ONLY ? jobs.filter(([f]) => f.startsWith(process.env.ONLY)) : jobs;
for (const [file, w, h, opts] of only) {
  await render(file, w, h, opts);
}
console.log(`rendered ${only.length} images in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
