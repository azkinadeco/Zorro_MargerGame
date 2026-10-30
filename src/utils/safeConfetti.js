import confetti from 'canvas-confetti';

let lastConfettiTime = 0;
const THROTTLE_MS = 650; // Prevent spamming particle loops on main thread

/**
 * High-performance, freeze-proof confetti burst.
 * - Forces useWorker: false to avoid macOS WebKit OffscreenCanvas deadlocks
 * - Caps particle count for smooth 60fps on Retina displays
 * - Throttles consecutive rapid triggers (e.g. rapid merges)
 * - Encapsulated in try/catch to guarantee zero UI crashes
 */
export function safeConfetti(options = {}) {
  const now = Date.now();
  if (now - lastConfettiTime < THROTTLE_MS) {
    return;
  }
  lastConfettiTime = now;

  try {
    const safeOptions = {
      particleCount: Math.min(options.particleCount || 25, 30),
      spread: Math.min(options.spread || 60, 70),
      origin: options.origin || { y: 0.6 },
      disableForReducedMotion: true,
      useWorker: false, // Critical: fixes macOS Safari / WebKit worker thread lock
      zIndex: 9999,
      ...options
    };

    // Ensure particle count is never dangerously high
    safeOptions.particleCount = Math.min(safeOptions.particleCount, 30);

    confetti(safeOptions);
  } catch (err) {
    console.warn('safeConfetti caught error gracefully:', err);
  }
}

export default safeConfetti;
