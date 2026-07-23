// app/services/AudioService.ts

class SoundManager {
  private audioCtx: AudioContext | null = null;

  public init() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // پخش یک ضربان (تیک-تاک) متناسب با زمان باقی‌مانده
  public playTick(timeLeft: number, totalTime: number) {
    this.init();
    if (!this.audioCtx) return;

    try {
      const ratio = Math.max(0, Math.min(1, timeLeft / totalTime)); // بین 0 تا 1
      
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      // با کم شدن زمان، فرکانس زیرتر و تیزتر می‌شود
      const pitch = 900 - ratio * 400; 

      osc.type = 'sawtooth'; 
      osc.frequency.setValueAtTime(pitch, this.audioCtx.currentTime);

      const volume = 0.2 - ratio * 0.05;
      gain.gain.setValueAtTime(volume, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.08);
    } catch (e) {
      console.error("Audio error:", e);
    }
  }

  public stop() {
    if (this.audioCtx) {
      this.audioCtx.suspend();
    }
  }
}

export const SoundService = new SoundManager();