// Sound manager leve usando WebAudio (sem assets)
class SoundManager {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }
  setEnabled(on) {
    this.enabled = !!on;
  }
  ensureCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
  }
  async unlock() {
    this.ensureCtx();
    try {
      if (this.ctx && this.ctx.state === "suspended") await this.ctx.resume();
    } catch {}
  }
  beep({ freq = 440, duration = 0.08, type = "sine", gain = 0.07 }) {
    if (!this.enabled) return;
    this.ensureCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    g.gain.setValueAtTime(gain, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(g).connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }
  play(name) {
    // Pequenos padrões para eventos
    if (!this.enabled) return;
    if (name === "correct") {
      // Arpejo curtinho
      this.beep({ freq: 660, duration: 0.06, type: "sine" });
      setTimeout(() => this.beep({ freq: 880, duration: 0.06, type: "sine" }), 70);
      setTimeout(() => this.beep({ freq: 1320, duration: 0.06, type: "sine" }), 140);
    } else if (name === "wrong") {
      this.beep({ freq: 200, duration: 0.12, type: "sawtooth", gain: 0.05 });
      setTimeout(() => this.beep({ freq: 140, duration: 0.12, type: "sawtooth", gain: 0.045 }), 90);
    } else if (name === "next") {
      this.beep({ freq: 520, duration: 0.05, type: "triangle", gain: 0.05 });
    } else if (name === "hint") {
      this.beep({ freq: 500, duration: 0.04, type: "square", gain: 0.045 });
      setTimeout(() => this.beep({ freq: 420, duration: 0.04, type: "square", gain: 0.04 }), 60);
    }
  }
}
export const Sound = new SoundManager();