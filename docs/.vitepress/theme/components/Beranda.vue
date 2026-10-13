<script setup lang="ts">
import { withBase } from 'vitepress'
import KartuWarga from './KartuWarga.vue'
import EpisodeKartu from './EpisodeKartu.vue'
import KartuSegera from './KartuSegera.vue'
import TombolMusik from './TombolMusik.vue'
import { warga, badan } from '../warga'
</script>

<template>
  <div class="beranda">
    <section class="b-hero">
      <div class="b-hero-teks">
        <span class="chip">Wiki · Instagram @cianj.ai</span>
        <h1>
          <img :src="withBase('/brand/logo.svg')" alt="" />
          Kampung Cianj.AI
        </h1>
        <p class="b-tagline">Kampung kecil, mimpinya sedunia.</p>
        <p class="b-lede">
          Kampung pixel-art tempat para warga bekerja, dipimpin Pak Lurah yang lampu balainya
          jarang dimatikan. Satu episode pendek tiap hari.
        </p>
        <div class="b-aksi">
          <a class="tombol utama" :href="withBase('/karakter/')">Kenalan sama warganya</a>
          <a class="tombol" :href="withBase('/episode/')">Tonton episodenya</a>
        </div>
      </div>

      <div class="b-panggung-bungkus">
      <div class="b-panggung" aria-hidden="true">
        <div class="b-langit"><span class="awan a1" /><span class="awan a2" /></div>
        <img class="b-pohon p1" :src="withBase('/sprite/pohon.png')" alt="" />
        <img class="b-pohon p2" :src="withBase('/sprite/pohon.png')" alt="" />
        <img class="b-tokoh t1" :src="withBase(badan('pak-lurah'))" alt="" />
        <img class="b-tokoh t2" :src="withBase(badan('bang-hos'))" alt="" />
        <img class="b-tokoh t3" :src="withBase(badan('mang-enjen'))" alt="" />
        <img class="b-ayam" :src="withBase('/sprite/ayam-putih.png')" alt="" />
        <div class="b-tanah" />
      </div>
      <TombolMusik besar />
      </div>
    </section>

    <section class="b-bagian">
      <header>
        <span class="chip">Warga</span>
        <h2>Yang tinggal di kampung</h2>
      </header>
      <div class="grid-warga">
        <KartuWarga v-for="w in warga" :key="w.slug" :slug="w.slug" />
        <KartuSegera />
      </div>
    </section>

    <section class="b-bagian">
      <header>
        <span class="chip">Episode</span>
        <h2>Sudah tayang</h2>
        <a class="b-semua" :href="withBase('/episode/')">Semua episode →</a>
      </header>
      <div class="grid-episode">
        <EpisodeKartu :no="2" judul="Warga Kedua" gambar="/episode/warga-kedua-adegan.jpg"
          tayang="13 Okt 2026" durasi="35 dtk" href="https://www.instagram.com/reel/DebAeqwAIjy/" />
        <EpisodeKartu :no="1" judul="Warga Pertama" gambar="/episode/warga-pertama-adegan.jpg"
          tayang="12 Okt 2026" durasi="37 dtk" href="https://www.instagram.com/reel/DeYt-o_CodK/" />
      </div>
    </section>

    <section class="b-bagian">
      <header>
        <span class="chip">Jelajahi</span>
        <h2>Isi kampung</h2>
      </header>
      <div class="grid-jelajah">
        <a class="ubin" :href="withBase('/tentang')">
          <img :src="withBase('/karakter/pak-lurah/scene-dunia@4x.png')" alt="" />
          <strong>Tentang kampung</strong>
          <span>Dari tanah kosong sampai mimpi mendunia</span>
        </a>
        <a class="ubin" :href="withBase('/tempat')">
          <img :src="withBase('/karakter/hosnan-mawardi/scene-warung-malam@4x.png')" alt="" />
          <strong>Tempat</strong>
          <span>Balai, warung, sawah, pos ronda, kentongan</span>
        </a>
      </div>
    </section>
  </div>
</template>
