// Only characters that already have a sheet AND pixel art. Facts come from the character sheets;
// do not add fields that are not in them.
export interface Warga {
  slug: string
  panggilan: string
  nama?: string
  umur?: number
  asal?: string
  pekerjaan: string
  tempat?: string
  ucapan: string
  aksen: string
}

export const warga: Warga[] = [
  {
    slug: 'pak-lurah',
    panggilan: 'Pak Lurah',
    nama: 'Rohimin Sarkawi',
    umur: 58,
    asal: 'Cipicung, Banten',
    pekerjaan: 'Kepala Kampung',
    tempat: 'Balai desa',
    ucapan: 'Dulu kalah 37 suara. Sekarang bangun dunia',
    aksen: '#b0702a',
  },
  {
    slug: 'bang-hos',
    panggilan: 'Bang Hos',
    nama: 'Hosnan Mawardi',
    umur: 41,
    asal: 'Sumenep, Madura',
    pekerjaan: 'Pemilik Warung Madura',
    tempat: 'Warung Madura 24 jam',
    ucapan: 'Warung saya buka duluan, balai belakangan',
    aksen: '#c8452f',
  },
  {
    slug: 'mang-enjen',
    panggilan: 'Mang Enjen',
    nama: 'Enjen Sumarna',
    umur: 56,
    pekerjaan: 'Marbot musholla',
    tempat: 'Musholla',
    ucapan: 'Bilangnya jaga musholla. Sebenarnya jaga toa',
    aksen: '#3f8a4f',
  },
  {
    // Belum punya lembar karakter: nama lengkap, umur, asal, dan tempat belum ada di sumber mana pun, jadi tidak ditulis.
    slug: 'pak-sekdes',
    panggilan: 'Pak Sekdes',
    pekerjaan: 'Sekretaris desa (sekdes)',
    ucapan: 'Rakyatnya kan saya juga, Pak',
    aksen: '#8b7f5a',
  },
]

const aset: Record<string, string> = {
  'pak-lurah': 'pak-lurah',
  'bang-hos': 'hosnan-mawardi',
  'mang-enjen': 'mang-enjen',
  'pak-sekdes': 'pak-sekdes',
}

export const pasFoto = (slug: string) => `/karakter/${aset[slug]}/pas-foto.png`
export const badan = (slug: string) => `/karakter/${aset[slug]}/full@4x.png`
export const cari = (slug: string) => warga.find((w) => w.slug === slug)!
