import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'id-ID',
  title: 'Kampung Cianj.AI',
  description: 'Wiki Kampung Cianj.AI — warga, tempat, dan episode dari kampung pixel-art di Instagram @cianj.ai.',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/brand/logo.svg' }],
    ['link', { rel: 'apple-touch-icon', href: '/brand/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#2f6b2a' }],
    ['meta', { property: 'og:image', content: '/brand/logo.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600..800;1,9..144,500&family=Nunito+Sans:opsz,wght@6..12,400..800&family=Pixelify+Sans:wght@500..700&display=swap',
      },
    ],
  ],
  themeConfig: {
    logo: '/brand/logo.svg',
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
