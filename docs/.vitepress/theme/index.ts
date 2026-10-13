import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Beranda from './components/Beranda.vue'
import KartuWarga from './components/KartuWarga.vue'
import EpisodeKartu from './components/EpisodeKartu.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Beranda', Beranda)
    app.component('KartuWarga', KartuWarga)
    app.component('EpisodeKartu', EpisodeKartu)
  },
} satisfies Theme
