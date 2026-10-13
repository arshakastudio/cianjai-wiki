/** The desa's music: a pastoral, "Shire"-feel loop — a tin whistle over a lute and warm strings, in
 *  D major, 6/8, unhurried. Original phrases in that tradition (Irish/English folk jigs, hobbit-hole
 *  film-score warmth); nothing is quoted from any score.
 *
 *  Copied from themanager (frontend/src/world/shire.ts). Pure WebAudio, no assets: `ShireMusic.bar()`
 *  schedules one bar on any BaseAudioContext. */

export type Chord = "D" | "G" | "A" | "Bm";

/** D major, from D4: indices into this are what the phrases below use. */
export const SCALE = [293.66, 329.63, 369.99, 392.0, 440.0, 493.88, 554.37, 587.33, 659.25, 739.99, 783.99, 880.0];

/** Triad tones (Hz, octave 4) and bass roots/fifths (Hz, octave 3). */
const TRIAD: Record<Chord, [number, number, number]> = {
  D: [293.66, 369.99, 440.0],
  G: [392.0, 493.88, 587.33],
  A: [440.0, 554.37, 659.25],
  Bm: [493.88, 587.33, 739.99],
};
const BASS: Record<Chord, [number, number]> = {
  D: [146.83, 220.0],
  G: [196.0, 146.83],
  A: [110.0, 164.81],
  Bm: [123.47, 185.0],
};

/** One note of a bar's melody: [SCALE index, length in eighth notes]; a bar is six eighths (6/8). */
export type Note = [number, number];
export interface Phrase {
  name: string;
  chords: [Chord, Chord, Chord, Chord];
  bars: [Note[], Note[], Note[], Note[]];
}

export const PHRASES: Phrase[] = [
  {
    name: "A — question",
    chords: ["D", "G", "D", "A"],
    bars: [[[4, 3], [5, 1], [4, 1], [2, 1]], [[3, 2], [5, 2], [7, 2]], [[9, 3], [8, 1], [7, 1], [6, 1]], [[7, 2], [6, 2], [4, 2]]],
  },
  {
    name: "B — answer",
    chords: ["D", "Bm", "G", "A"],
    bars: [[[7, 3], [9, 3]], [[8, 2], [7, 2], [5, 2]], [[7, 3], [5, 1], [3, 1], [5, 1]], [[4, 3], [6, 3]]],
  },
  {
    name: "C — lilt",
    chords: ["D", "A", "Bm", "G"],
    bars: [[[2, 1], [4, 1], [7, 1], [9, 3]], [[8, 2], [6, 2], [4, 2]], [[5, 1], [7, 1], [9, 1], [8, 2], [7, 1]], [[5, 3], [3, 3]]],
  },
  {
    name: "D — home",
    chords: ["G", "D", "A", "D"],
    bars: [[[7, 2], [5, 2], [3, 2]], [[2, 3], [4, 3]], [[6, 2], [4, 2], [6, 2]], [[7, 6]]],
  },
];

/** Which phrase follows, and whether the whistle rests for one round (just lute and strings). */
export function nextPhrase(cur: number, rnd: () => number = Math.random): { phrase: number; rest: boolean } {
  // A→B→(A|C)→D→…, with the cadence D sometimes followed by a quiet round
  const order: Record<number, number[]> = { 0: [1, 1, 2], 1: [0, 2, 3], 2: [3, 3, 1], 3: [0, 0, 2] };
  const options = order[cur]!;
  return { phrase: options[Math.floor(rnd() * options.length)]!, rest: cur === 3 && rnd() < 0.4 };
}

const NIGHT_EIGHTH = 0.27;
const DAY_EIGHTH = 0.215; // dotted quarter ≈ 93 bpm
export const eighthFor = (night: boolean): number => (night ? NIGHT_EIGHTH : DAY_EIGHTH);

export class ShireMusic {
  constructor(
    private c: BaseAudioContext,
    /** Everything is mixed into this node (the caller adds the lowpass and the reverb). */
    private bus: AudioNode,
    private noise: AudioBuffer,
  ) {}

  /** Schedule one 6/8 bar starting at time `t`. `lead` null = the whistle rests this bar. */
  bar(t: number, chord: Chord, lead: Note[] | null, night: boolean, eighth: number): void {
    this.pad(t, chord, eighth * 6);
    this.lute(t, chord, eighth);
    if (!lead) return;
    let at = t;
    for (const [idx, len] of lead) {
      const f = SCALE[idx]!;
      const dur = len * eighth;
      // a little human drift in time; at night a soft plucked voice instead of the whistle
      const when = at + (Math.random() - 0.5) * 0.018;
      if (night) this.harp(f * 2, when, 0.34);
      else this.whistle(f, when, dur, len >= 3 && Math.random() < 0.45 ? SCALE[Math.min(SCALE.length - 1, idx + 1)]! : null);
      at += dur;
    }
  }

  /** Tin whistle: a nearly pure tone with a breath of noise at the attack, a late vibrato, and
   *  sometimes a quick "cut" (a grace note a step above) before a long note. */
  private whistle(f: number, t: number, dur: number, cut: number | null): void {
    let start = t;
    if (cut) {
      this.whistleTone(cut, t, 0.045, 0.5, false);
      start = t + 0.05;
    }
    this.whistleTone(f, start, Math.max(0.12, dur * 0.94 - (start - t)), 0.62, true);
  }
  private whistleTone(f: number, t: number, dur: number, vol: number, vibrato: boolean): void {
    const c = this.c;
    const o = c.createOscillator(), o2 = c.createOscillator(), g = c.createGain(), g2 = c.createGain();
    o.type = "sine";
    o2.type = "sine";
    o.frequency.value = f;
    o2.frequency.value = f * 2;
    g2.gain.value = 0.1; // a whisper of the octave: the whistle's hollow edge
    const end = t + dur;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.07);
    g.gain.linearRampToValueAtTime(vol * 0.82, t + Math.max(0.08, dur * 0.7));
    g.gain.linearRampToValueAtTime(0, end + 0.1);
    if (vibrato && dur > 0.4) {
      const lfo = c.createOscillator(), lg = c.createGain(), lg2 = c.createGain();
      lfo.frequency.value = 5.1;
      lg.gain.setValueAtTime(0, t);
      lg.gain.linearRampToValueAtTime(f * 0.0042, t + Math.min(0.45, dur * 0.6));
      lg2.gain.value = 0;
      lg2.gain.setValueAtTime(0, t);
      lg2.gain.linearRampToValueAtTime(f * 2 * 0.0042, t + Math.min(0.45, dur * 0.6));
      lfo.connect(lg);
      lfo.connect(lg2);
      lg.connect(o.frequency);
      lg2.connect(o2.frequency);
      lfo.start(t);
      lfo.stop(end + 0.15);
    }
    o.connect(g);
    o2.connect(g2);
    g2.connect(g);
    g.connect(this.bus);
    o.start(t);
    o2.start(t);
    o.stop(end + 0.15);
    o2.stop(end + 0.15);
    // breath: a short airy burst at the start of the note
    const n = c.createBufferSource(), bp = c.createBiquadFilter(), ng = c.createGain();
    n.buffer = this.noise;
    bp.type = "bandpass";
    bp.frequency.value = Math.min(5200, f * 5.5);
    bp.Q.value = 1.1;
    ng.gain.setValueAtTime(0, t);
    ng.gain.linearRampToValueAtTime(vol * 0.07, t + 0.015);
    ng.gain.exponentialRampToValueAtTime(vol * 0.012, t + 0.18);
    ng.gain.linearRampToValueAtTime(0, end + 0.05);
    n.connect(bp);
    bp.connect(ng);
    ng.connect(this.bus);
    n.start(t, Math.random());
    n.stop(end + 0.1);
  }

  /** Lute / acoustic guitar: bass on 1, its fifth on 4, a rolling arpeggio between — the 6/8 lilt. */
  private lute(t: number, chord: Chord, eighth: number): void {
    const [root, fifth] = BASS[chord];
    const [, b, d] = TRIAD[chord];
    const steps: [number, number, number][] = [
      [0, root, 0.5], [1, b, 0.26], [2, d, 0.26], [3, fifth, 0.4], [4, d, 0.24], [5, b, 0.24],
    ];
    for (const [i, f, v] of steps) this.pluck(f, t + i * eighth + (Math.random() - 0.5) * 0.012, v, i === 0 || i === 3 ? 2.2 : 1.5);
  }
  private pluck(f: number, t: number, vol: number, decay: number): void {
    const c = this.c;
    for (const [mul, v, type] of [[1, 1, "triangle"], [2, 0.16, "sine"], [3, 0.05, "sine"]] as const) {
      const o = c.createOscillator(), g = c.createGain();
      o.type = type;
      o.frequency.value = f * mul;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol * v, t + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
      o.connect(g);
      g.connect(this.bus);
      o.start(t);
      o.stop(t + decay + 0.05);
    }
  }
  /** Night voice for the melody: a soft harp pluck, longer ring. */
  private harp(f: number, t: number, vol: number): void {
    this.pluck(f, t, vol, 3);
  }

  /** Warm strings under it all: two slightly detuned saws per chord tone through a low filter. */
  private pad(t: number, chord: Chord, dur: number): void {
    const c = this.c;
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 950;
    lp.Q.value = 0.4;
    const g = c.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.085, t + 0.55);
    g.gain.linearRampToValueAtTime(0.07, t + dur * 0.8);
    g.gain.linearRampToValueAtTime(0, t + dur + 0.7);
    lp.connect(g);
    g.connect(this.bus);
    const [r] = BASS[chord];
    for (const f of [r * 2, ...TRIAD[chord].map((x) => x / 2)]) {
      for (const cents of [-7, 7]) {
        const o = c.createOscillator();
        o.type = "sawtooth";
        o.frequency.value = f;
        o.detune.value = cents;
        o.connect(lp);
        o.start(t);
        o.stop(t + dur + 0.8);
      }
    }
  }
}

/** A short, dark-ish impulse for a pastoral room: exponentially decaying noise (stereo). */
export function makeImpulse(c: BaseAudioContext, seconds = 2.4, decay = 3): AudioBuffer {
  const len = Math.floor(c.sampleRate * seconds);
  const buf = c.createBuffer(2, len, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
  }
  return buf;
}
