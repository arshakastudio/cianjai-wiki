import { PHRASES, ShireMusic, eighthFor, makeImpulse, nextPhrase } from './shire'

/** The desa's sound from themanager (frontend/src/world/sound.ts), trimmed to what a wiki needs:
 *  wind, birds by day / crickets by night, and the Shire-feel music. Synthesised, no assets.
 *  Off until the visitor turns it on (browsers block audio before a gesture anyway). */

/** 0 = day, 1 = night, from the visitor's own clock. */
const malam = (): number => {
  const h = new Date().getHours()
  return h >= 18 || h < 5 ? 1 : 0
}

export class Suara {
  on = false
  private ctx: AudioContext | null = null
  private out!: GainNode
  private nb!: AudioBuffer
  private mus!: GainNode

  private ensure(): boolean {
    if (this.ctx) return true
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return false
    const c = (this.ctx = new Ctx())
    this.out = c.createGain()
    this.out.gain.value = 0
    this.out.connect(c.destination)
    const b = c.createBuffer(1, c.sampleRate * 2, c.sampleRate)
    const d = b.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
    this.nb = b
    this.ambient()
    this.life()
    this.music()
    return true
  }

  set(v: boolean): void {
    this.on = v
    if (v) {
      if (!this.ensure()) return
      void this.ctx!.resume()
      this.out.gain.setTargetAtTime(0.6, this.ctx!.currentTime, 0.3)
    } else if (this.ctx) this.out.gain.setTargetAtTime(0, this.ctx.currentTime, 0.12)
  }

  private loopNoise(filters: [BiquadFilterType, number, number?][], vol: number): GainNode {
    const c = this.ctx!, s = c.createBufferSource()
    s.buffer = this.nb
    s.loop = true
    let n: AudioNode = s
    filters.forEach(([type, f, q]) => {
      const bq = c.createBiquadFilter()
      bq.type = type
      bq.frequency.value = f
      if (q) bq.Q.value = q
      n.connect(bq)
      n = bq
    })
    const g = c.createGain()
    g.gain.value = vol
    n.connect(g)
    g.connect(this.out)
    s.start()
    return g
  }

  private ambient(): void {
    const wind = this.loopNoise([['bandpass', 420, 0.5]], 0.05)
    const lfo = this.ctx!.createOscillator(), lg = this.ctx!.createGain()
    lfo.frequency.value = 0.07
    lg.gain.value = 0.035
    lfo.connect(lg)
    lg.connect(wind.gain)
    lfo.start()
    this.loopNoise([['highpass', 1800], ['lowpass', 5200]], 0.011)
  }

  private blip(f: number, t: number, dur: number, vol: number, type: OscillatorType = 'sine'): void {
    const c = this.ctx!, o = c.createOscillator(), g = c.createGain()
    o.type = type
    o.frequency.value = f
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(vol, t + 0.004)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    o.connect(g)
    g.connect(this.out)
    o.start(t)
    o.stop(t + dur + 0.05)
  }

  private chirp(t: number): void {
    const c = this.ctx!, o = c.createOscillator(), g = c.createGain(), f = 2600 + Math.random() * 1400
    o.frequency.setValueAtTime(f, t)
    o.frequency.exponentialRampToValueAtTime(f * 1.35, t + 0.07)
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.04, t + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.1)
    o.connect(g)
    g.connect(this.out)
    o.start(t)
    o.stop(t + 0.12)
  }

  private cricket(t: number): void {
    for (let k = 0; k < 5; k++) this.blip(4300, t + k * 0.05, 0.03, 0.014)
  }

  private life(): void {
    const go = (): void => {
      if (this.on && this.ctx) {
        const t = this.ctx.currentTime + 0.05
        if (malam()) {
          const n = 1 + Math.floor(Math.random() * 3)
          for (let i = 0; i < n; i++) this.cricket(t + i * 0.4)
        } else if (Math.random() < 0.75) {
          const n = 2 + Math.floor(Math.random() * 3)
          for (let i = 0; i < n; i++) this.chirp(t + i * 0.13)
        }
      }
      window.setTimeout(go, 1500 + Math.random() * 3500)
    }
    go()
  }

  private music(): void {
    const c = this.ctx!
    this.mus = c.createGain()
    this.mus.gain.value = 0.12
    const lp = c.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 3600
    const verb = c.createConvolver(), wet = c.createGain()
    verb.buffer = makeImpulse(c)
    wet.gain.value = 0.34
    this.mus.connect(lp)
    lp.connect(this.out)
    lp.connect(verb)
    verb.connect(wet)
    wet.connect(this.out)

    const music = new ShireMusic(c, this.mus, this.nb)
    const st = { phrase: 0, bar: 0, next: 0, rest: false }
    const tick = (): void => {
      if (this.on && this.ctx) {
        const night = malam() > 0.5
        const eighth = eighthFor(night)
        const now = this.ctx.currentTime
        if (st.next < now + 0.05) st.next = now + 0.15
        while (st.next < now + 2.6) {
          const ph = PHRASES[st.phrase]!
          music.bar(st.next, ph.chords[st.bar]!, st.rest ? null : ph.bars[st.bar]!, night, eighth)
          st.next += eighth * 6
          if (++st.bar === 4) {
            st.bar = 0
            const nx = nextPhrase(st.phrase)
            st.phrase = nx.phrase
            st.rest = nx.rest
          }
        }
      } else st.next = 0
      window.setTimeout(tick, 500)
    }
    tick()
  }
}

/** One player for the whole site, so the music keeps playing across page navigation. */
let suara: Suara | null = null
export const pemutar = (): Suara => (suara ??= new Suara())
