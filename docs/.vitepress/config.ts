import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'id-ID',
  title: 'The Manager Wiki',
  description: 'Wiki untuk themanager — konsol manajer di atas Hermes.',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [{ text: 'Beranda', link: '/' }],
    sidebar: [],
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/arshakastudio/themanager-wiki' }],
  },
})
