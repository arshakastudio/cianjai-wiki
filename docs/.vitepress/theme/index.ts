import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Beranda from './components/Beranda.vue'
import KartuWarga from './components/KartuWarga.vue'
import KartuSegera from './components/KartuSegera.vue'
import EpisodeKartu from './components/EpisodeKartu.vue'
import TombolMusik from './components/TombolMusik.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, { 'nav-bar-content-after': () => h(TombolMusik) }),
  enhanceApp({ app }) {
    app.component('Beranda', Beranda)
    app.component('KartuWarga', KartuWarga)
    app.component('KartuSegera', KartuSegera)
    app.component('EpisodeKartu', EpisodeKartu)
    app.component('TombolMusik', TombolMusik)
  },
} satisfies Theme
