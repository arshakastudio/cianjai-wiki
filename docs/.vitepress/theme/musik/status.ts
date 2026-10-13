import { ref } from 'vue'
import { pemutar } from './suara'

const KUNCI = 'kc-musik'

/** Shared on/off state for every music button on the site. */
export const musikNyala = ref(false)

export function setMusik(v: boolean): void {
  musikNyala.value = v
  pemutar().set(v)
  try {
    localStorage.setItem(KUNCI, v ? '1' : '0')
  } catch {}
}

/** A visitor who left the music on hears it again after their first click or key press
 *  (browsers do not allow audio before a gesture). */
export function pulihkanMusik(): void {
  let mau = false
  try {
    mau = localStorage.getItem(KUNCI) === '1'
  } catch {}
  if (!mau) return
  const mulai = (): void => {
    if (!musikNyala.value) setMusik(true)
    window.removeEventListener('pointerdown', mulai)
    window.removeEventListener('keydown', mulai)
  }
  window.addEventListener('pointerdown', mulai)
  window.addEventListener('keydown', mulai)
}
