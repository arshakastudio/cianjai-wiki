<script setup lang="ts">
import { withBase } from 'vitepress'
import { cari, pasFoto } from '../warga'

const props = defineProps<{ slug: string; besar?: boolean }>()
const w = cari(props.slug)
</script>

<template>
  <component
    :is="besar ? 'div' : 'a'"
    :href="besar ? undefined : withBase(`/karakter/${w.slug}`)"
    class="kartu-warga"
    :class="{ besar }"
    :style="{ '--aksen': w.aksen }"
  >
    <div class="kw-kepala">
      <img :src="withBase('/brand/logo.svg')" alt="" />
      <span>Kartu Warga</span>
      <span class="kw-kampung">Kampung Cianj.AI</span>
    </div>
    <div class="kw-isi">
      <div class="kw-foto">
        <img :src="withBase(pasFoto(w.slug))" :alt="`Pas foto ${w.panggilan}`" />
      </div>
      <dl class="kw-data">
        <div><dt>Nama</dt><dd>{{ w.nama }}</dd></div>
        <div><dt>Dipanggil</dt><dd>{{ w.panggilan }}</dd></div>
        <div><dt>Umur</dt><dd>{{ w.umur }} tahun</dd></div>
        <div v-if="w.asal"><dt>Asal</dt><dd>{{ w.asal }}</dd></div>
        <div><dt>Pekerjaan</dt><dd>{{ w.pekerjaan }}</dd></div>
        <div v-if="besar"><dt>Tempat</dt><dd>{{ w.tempat }}</dd></div>
      </dl>
    </div>
    <p class="kw-ucapan">“{{ w.ucapan }}”</p>
    <span v-if="!besar" class="kw-lihat">Lihat profil →</span>
  </component>
</template>
