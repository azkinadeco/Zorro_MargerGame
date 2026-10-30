// Web Audio API Synthesizer for Zorro Merge Cats
// 100% procedurally generated - zero audio downloads, zero lag, instant playback!

class AudioManager {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.bgmEnabled = true;
    this.hapticsEnabled = true;
    this.bgmInterval = null;
    this.masterGain = null;
    this.bgmGain = null;
    this.setupAutoplayUnlock();
  }

  setupAutoplayUnlock() {
    if (typeof window === 'undefined') return;
    const unlock = () => {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    };
    window.addEventListener('pointerdown', unlock, { once: true, passive: true });
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
    window.addEventListener('keydown', unlock, { once: true, passive: true });

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }
      });
    }
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.5;
        this.masterGain.connect(this.ctx.destination);

        this.bgmGain = this.ctx.createGain();
        this.bgmGain.gain.value = 0.15;
        this.bgmGain.connect(this.masterGain);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setSoundEnabled(enabled) {
    this.soundEnabled = enabled;
  }

  setBgmEnabled(enabled) {
    this.bgmEnabled = enabled;
    if (enabled) {
      this.startBgm();
    } else {
      this.stopBgm();
    }
  }

  setMasterVolume(val) {
    this.init();
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }

  setBgmVolume(val) {
    this.init();
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }

  setHapticsEnabled(enabled) {
    this.hapticsEnabled = enabled;
  }

  vibrate(ms = 15) {
    if (this.hapticsEnabled && typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(ms);
      } catch (e) {
        // Ignore haptics errors if blocked by browser policy
      }
    }
  }

  // Cute Pop for tapping & pickup
  playPop() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(380, t);
    osc.frequency.exponentialRampToValueAtTime(760, t + 0.08);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.09);
    this.vibrate(10);
  }

  // Spawner tap
  playSpawn() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.linearRampToValueAtTime(320, t + 0.06);
    osc.frequency.linearRampToValueAtTime(580, t + 0.12);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.15);
    this.vibrate([15, 30, 20]);
  }

  // Musical pentatonic merge chime that gets higher & sparklier with level!
  playMerge(level = 1) {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const baseNotes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51];
    const baseFreq = baseNotes[(level - 1) % baseNotes.length];

    const t = this.ctx.currentTime;

    // First note
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(baseFreq, t);

    gain1.gain.setValueAtTime(0.35, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    osc1.connect(gain1);
    gain1.connect(this.masterGain);
    osc1.start(t);
    osc1.stop(t + 0.23);

    // Harmonic fifth above
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(baseFreq * 1.5, t + 0.05);

    gain2.gain.setValueAtTime(0.25, t + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    osc2.connect(gain2);
    gain2.connect(this.masterGain);
    osc2.start(t + 0.05);
    osc2.stop(t + 0.36);

    // Sparkle chime if level >= 3
    if (level >= 3) {
      const osc3 = this.ctx.createOscillator();
      const gain3 = this.ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(baseFreq * 2, t + 0.1);
      gain3.gain.setValueAtTime(0.2, t + 0.1);
      gain3.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc3.connect(gain3);
      gain3.connect(this.masterGain);
      osc3.start(t + 0.1);
      osc3.stop(t + 0.42);
    }

    this.vibrate([20, 20, 30]);
  }

  // Fulfilling customer orders (Fanfare + Cash Coins!)
  playServe() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const chords = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio

    chords.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.07);

      gain.gain.setValueAtTime(0.3, t + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.07 + 0.3);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + idx * 0.07);
      osc.stop(t + idx * 0.07 + 0.32);
    });

    this.vibrate([30, 40, 50, 60]);
  }

  // Procedural Cat Vocal Inflections tailored to character personality
  playMeow(catType = 'zorro') {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const cat = (catType || 'zorro').toLowerCase();

    // Voice profiles:
    // - Thor: Chunky orange tabby (deep, warm, dignified baritone meow)
    // - Loki: Hyperactive kitten (high-pitch, chirpy, playful mew)
    // - Zorro: Elegant tuxedo hero (smooth velvet mid-pitch meow)
    let startFreq = 620;
    let peakFreq = 860;
    let endFreq = 460;
    let filterStart = 1450;
    let filterEnd = 900;
    let duration = 0.48;
    let vibePattern = [25, 40, 25];

    if (cat.includes('thor')) {
      startFreq = 420;
      peakFreq = 580;
      endFreq = 320;
      filterStart = 950;
      filterEnd = 580;
      duration = 0.58;
      vibePattern = [45, 55, 45];
    } else if (cat.includes('loki')) {
      startFreq = 880;
      peakFreq = 1260;
      endFreq = 640;
      filterStart = 2400;
      filterEnd = 1300;
      duration = 0.36;
      vibePattern = [15, 25, 15];
    } else if (cat.includes('calico')) {
      startFreq = 700;
      peakFreq = 960;
      endFreq = 510;
      filterStart = 1650;
      filterEnd = 1050;
      duration = 0.44;
      vibePattern = [20, 30, 20];
    }

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Sawtooth filtered gives a lifelike cat vocal tract
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(peakFreq, t + duration * 0.28);
    osc.frequency.exponentialRampToValueAtTime(endFreq, t + duration);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterStart, t);
    filter.frequency.exponentialRampToValueAtTime(filterEnd, t + duration * 0.85);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.28, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + duration + 0.02);
    this.vibrate(vibePattern);
  }

  // Alias for explicit personality calls
  playCatMeow(catType = 'zorro') {
    this.playMeow(catType);
  }

  // Soft Kitten Purr
  playPurr() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // LFO for purr pulsation
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(75, t); // low purr base

    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(26, t); // 26Hz purr flutter
    lfoGain.gain.setValueAtTime(0.12, t);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.2, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    osc.connect(gain);
    gain.connect(this.masterGain);

    lfo.start(t);
    osc.start(t);
    lfo.stop(t + 0.75);
    osc.stop(t + 0.75);
    this.vibrate([10, 15, 10, 15, 10]);
  }

  // Eating / Munching Sound for Cat Feeding
  playEat() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    [0, 0.12].forEach((delay) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, t + delay);
      osc.frequency.exponentialRampToValueAtTime(180, t + delay + 0.08);

      gain.gain.setValueAtTime(0.2, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + delay);
      osc.stop(t + delay + 0.09);
    });
    this.vibrate([15, 20, 15]);
  }

  // Snip Scissors Sound for Split Booster
  playScissors() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.09);

    gain.gain.setValueAtTime(0.28, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.1);
    this.vibrate([20, 10, 20]);
  }

  // Magic Shimmer Sparkle for Joker Card
  playMagic() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [880, 1108.73, 1318.51, 1760]; // A5, C#6, E6, A6
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.06);

      gain.gain.setValueAtTime(0.18, t + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + i * 0.06);
      osc.stop(t + i * 0.06 + 0.28);
    });
    this.vibrate([10, 15, 15, 20]);
  }

  // Triumphant Level Up Fanfare
  playLevelUp() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + i * 0.09);

      gain.gain.setValueAtTime(0.25, t + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.09 + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + i * 0.09);
      osc.stop(t + i * 0.09 + 0.4);
    });
    this.vibrate([30, 20, 30, 20, 50]);
  }

  // Cozy Lo-Fi Pastel Background Music (gentle arpeggios)
  startBgm() {
    if (!this.bgmEnabled || this.bgmInterval) return;
    this.init();
    if (!this.ctx) return;

    const chordProgression = [
      [329.63, 392.00, 493.88, 587.33], // Em7
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [293.66, 369.99, 440.00, 587.33], // D7
      [392.00, 493.88, 587.33, 739.99], // Gmaj7
    ];

    let chordIdx = 0;
    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.bgmEnabled || !this.ctx) return;
      const currentChord = chordProgression[chordIdx];
      const freq = currentChord[noteIdx];
      const t = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);

      osc.connect(gain);
      gain.connect(this.bgmGain);

      osc.start(t);
      osc.stop(t + 0.6);

      noteIdx++;
      if (noteIdx >= currentChord.length) {
        noteIdx = 0;
        chordIdx = (chordIdx + 1) % chordProgression.length;
      }
    };

    this.bgmInterval = setInterval(playNextNote, 520);
  }

  stopBgm() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const audio = new AudioManager();
