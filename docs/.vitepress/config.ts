import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'id-ID',
  title: 'Kampung Cianj.AI',
  description: 'Wiki Kampung Cianj.AI — warga, tempat, dan episode dari kampung pixel-art di Instagram @cianj.ai.',
  cleanUrls: true,
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: '/karakter/pak-lurah/portrait-transparent@4x.png' }]],
  themeConfig: {
    logo: '/karakter/pak-lurah/portrait-transparent@4x.png',
    nav: [
      { text: 'Tentang', link: '/tentang' },
      { text: 'Karakter', link: '/karakter/' },
      { text: 'Tempat', link: '/tempat' },
      { text: 'Episode', link: '/episode/' },
    ],
    sidebar: [
      { text: 'Kampung', items: [
        { text: 'Tentang Kampung', link: '/tentang' },
        { text: 'Tempat', link: '/tempat' },
      ] },
      { text: 'Karakter', items: [
        { text: 'Semua karakter', link: '/karakter/' },
        { text: 'Pak Lurah', link: '/karakter/pak-lurah' },
        { text: 'Bang Hos', link: '/karakter/bang-hos' },
        { text: 'Neng Lia', link: '/karakter/neng-lia' },
        { text: 'Ceu Enung', link: '/karakter/ceu-enung' },
        { text: 'Warga lainnya', link: '/karakter/warga-lain' },
      ] },
      { text: 'Episode', items: [
        { text: 'Daftar episode', link: '/episode/' },
      ] },
    ],
    search: { provider: 'local' },
    socialLinks: [{ icon: 'instagram', link: 'https://www.instagram.com/cianj.ai/' }],
    outline: { label: 'Di halaman ini' },
    docFooter: { prev: 'Sebelumnya', next: 'Berikutnya' },
    lastUpdated: { text: 'Terakhir diperbarui' },
    returnToTopLabel: 'Ke atas',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Tema',
    footer: { message: 'Kampung kecil, mimpinya sedunia 🌏' },
  },
})
