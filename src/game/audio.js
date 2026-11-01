// Tiny Web Audio synth: sound effects + a soft music-box loop. No asset files.
let ctx = null;
let master = null;
let sfxOn = true;
let musicOn = true;
let musicTimer = null;
let musicGain = null;

function ac() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone({ f = 440, f2, t = 0, d = 0.15, type = 'sine', v = 0.25, dest, attack = 0.005 }) {
  const c = ac();
  if (!c) return;
  const now = c.currentTime + t;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f, now);
  if (f2) o.frequency.exponentialRampToValueAtTime(f2, now + d);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(v, now + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, now + d);
  o.connect(g);
  g.connect(dest || master);
  o.start(now);
  o.stop(now + d + 0.05);
}

function noise({ t = 0, d = 0.1, v = 0.15, hp = 2000 }) {
  const c = ac();
  if (!c) return;
  const now = c.currentTime + t;
  const buf = c.createBuffer(1, Math.floor(c.sampleRate * d), c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const src = c.createBufferSource();
  src.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = 'highpass';
  f.frequency.value = hp;
  const g = c.createGain();
  g.gain.value = v;
  src.connect(f);
  f.connect(g);
  g.connect(master);
  src.start(now);
}

const NOTE = (n) => 440 * 2 ** ((n - 69) / 12);

const SFX = {
  tap: () => tone({ f: 660, f2: 880, d: 0.06, type: 'triangle', v: 0.12 }),
  select: () => tone({ f: 520, f2: 640, d: 0.07, type: 'triangle', v: 0.1 }),
  spawn: () => {
    tone({ f: 380, f2: 760, d: 0.12, type: 'sine', v: 0.25 });
    tone({ f: 1200, d: 0.05, t: 0.06, type: 'triangle', v: 0.08 });
  },
  move: () => tone({ f: 300, f2: 240, d: 0.08, type: 'sine', v: 0.15 }),
  merge: (tier = 2) => {
    const base = 72 + Math.min(tier, 8) * 2;
    [0, 4, 7, 12].forEach((s, i) => tone({ f: NOTE(base + s), t: i * 0.045, d: 0.22, type: 'triangle', v: 0.16 }));
    noise({ t: 0, d: 0.12, v: 0.05, hp: 6000 });
  },
  unbox: () => {
    noise({ d: 0.15, v: 0.12, hp: 800 });
    tone({ f: 500, f2: 900, d: 0.15, t: 0.05, type: 'triangle', v: 0.12 });
  },
  coin: () => {
    tone({ f: NOTE(88), d: 0.07, type: 'square', v: 0.06 });
    tone({ f: NOTE(93), t: 0.06, d: 0.18, type: 'square', v: 0.06 });
  },
  serve: () => {
    [76, 79, 84, 88].forEach((n, i) => tone({ f: NOTE(n), t: i * 0.07, d: 0.25, type: 'triangle', v: 0.15 }));
    tone({ f: NOTE(100), t: 0.3, d: 0.3, type: 'sine', v: 0.08 });
  },
  error: () => {
    tone({ f: 220, f2: 180, d: 0.12, type: 'square', v: 0.07 });
    tone({ f: 200, f2: 160, d: 0.14, t: 0.1, type: 'square', v: 0.07 });
  },
  levelUp: () => {
    [72, 76, 79, 84, 88, 91, 96].forEach((n, i) => tone({ f: NOTE(n), t: i * 0.08, d: 0.35, type: 'triangle', v: 0.14 }));
  },
  task: () => {
    [84, 88, 91, 96, 100].forEach((n, i) => tone({ f: NOTE(n), t: i * 0.06, d: 0.4, type: 'sine', v: 0.12 }));
    noise({ t: 0.05, d: 0.4, v: 0.04, hp: 7000 });
  },
  meow: () => {
    tone({ f: 600, f2: 900, d: 0.12, type: 'sawtooth', v: 0.05 });
    tone({ f: 900, f2: 520, d: 0.28, t: 0.11, type: 'sawtooth', v: 0.05 });
  },
  pop: () => tone({ f: 900, f2: 300, d: 0.09, type: 'sine', v: 0.2 }),
  whoosh: () => noise({ d: 0.18, v: 0.06, hp: 1500 }),
};

export function sfx(name, arg) {
  if (!sfxOn) return;
  try {
    SFX[name]?.(arg);
  } catch {
    /* audio is optional */
  }
}

// ---------------------------------------------------------------- music box
const PROG = [
  [60, 64, 67, 71],
  [57, 60, 64, 67],
  [62, 65, 69, 72],
  [55, 59, 62, 65],
];
const MELODY = [
  [76, 79, 81, 79, 76, 74, 72, 74],
  [72, 76, 74, 72, 69, 72, 71, 69],
  [74, 77, 81, 79, 77, 76, 74, 72],
  [71, 74, 79, 77, 74, 71, 72, 74],
];

function startMusic() {
  const c = ac();
  if (!c || musicTimer) return;
  musicGain = c.createGain();
  musicGain.gain.value = 0.0001;
  musicGain.gain.exponentialRampToValueAtTime(0.18, c.currentTime + 2);
  musicGain.connect(master);
  const beat = 0.42;
  let bar = 0;
  let next = c.currentTime + 0.1;
  const schedule = () => {
    while (next < c.currentTime + 1.5) {
      const chord = PROG[bar % 4];
      const mel = MELODY[bar % 4];
      chord.forEach((n, i) => tone({ f: NOTE(n - 12), t: next - c.currentTime + i * 0.02, d: beat * 7.5, type: 'sine', v: 0.05, dest: musicGain, attack: 0.08 }));
      mel.forEach((n, i) => {
        if (bar % 2 === 1 && i % 2 === 1) return;
        tone({ f: NOTE(n), t: next - c.currentTime + i * beat, d: beat * 1.6, type: 'triangle', v: 0.07, dest: musicGain });
        tone({ f: NOTE(n + 12), t: next - c.currentTime + i * beat, d: beat * 0.8, type: 'sine', v: 0.02, dest: musicGain });
      });
      next += beat * 8;
      bar++;
    }
  };
  schedule();
  musicTimer = setInterval(schedule, 400);
}

function stopMusic() {
  if (musicTimer) clearInterval(musicTimer);
  musicTimer = null;
  if (musicGain && ctx) {
    const g = musicGain;
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    setTimeout(() => g.disconnect(), 700);
  }
  musicGain = null;
}

export function configureAudio({ sfx: s, music: m }) {
  sfxOn = s;
  musicOn = m;
  if (!musicOn) stopMusic();
  else if (ctx && ctx.state !== 'closed') startMusic();
}

// Browsers require a user gesture before audio can play.
export function unlockAudio() {
  ac();
  if (musicOn) startMusic();
}

export function vibrate(on, ms = 12) {
  if (on && navigator.vibrate) {
    try {
      navigator.vibrate(ms);
    } catch {
      /* ignore */
    }
  }
}

document.addEventListener('visibilitychange', () => {
  if (!ctx) return;
  if (document.hidden) ctx.suspend();
  else ctx.resume();
});
