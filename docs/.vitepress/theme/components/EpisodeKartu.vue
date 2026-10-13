<script setup lang="ts">
import { withBase } from 'vitepress'

defineProps<{ no: number; judul: string; gambar: string; tayang: string; durasi: string; href: string }>()
</script>

<template>
  <a class="episode-kartu" :href="href" target="_blank" rel="noopener">
    <div class="ek-gambar">
      <img :src="withBase(gambar)" :alt="`Episode ${no}: ${judul}`" loading="lazy" />
      <span class="ek-no">EP {{ no }}</span>
      <span class="ek-main" aria-hidden="true">▶</span>
    </div>
    <div class="ek-teks">
      <strong>{{ judul }}</strong>
      <span>{{ tayang }} · {{ durasi }}</span>
    </div>
  </a>
</template>
