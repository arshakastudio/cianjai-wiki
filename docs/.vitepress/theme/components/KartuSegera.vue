<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<template>
  <div class="kartu-warga segera" aria-label="Warga lain segera datang">
    <div class="kw-kepala">
      <img :src="withBase('/brand/logo.svg')" alt="" />
      <span>Kartu Warga</span>
      <span class="kw-kampung">Kampung Cianj.AI</span>
    </div>
    <div class="kw-isi">
      <div class="kw-foto kw-kosong"><span>?</span></div>
      <div class="ks-teks">
        <strong>Warga lain segera datang</strong>
        <span>Kampung ini tumbuh seiring episode. Warga baru datang satu per satu dari ujung jalan.</span>
      </div>
    </div>
    <p class="kw-ucapan">“Eh… saha eta?”</p>
  </div>
</template>
