<script setup lang="ts">
import { onMounted } from 'vue'
import { musikNyala, pulihkanMusik, setMusik } from '../musik/status'

defineProps<{ besar?: boolean }>()
onMounted(pulihkanMusik)
</script>

<template>
  <button
    type="button"
    class="tombol-musik"
    :class="{ nyala: musikNyala, besar }"
    :aria-pressed="musikNyala"
    :title="musikNyala ? 'Matikan musik kampung' : 'Putar musik kampung'"
    @click="setMusik(!musikNyala)"
  >
    <span class="tm-ikon" aria-hidden="true">
      <span v-if="musikNyala" class="tm-bar"><i /><i /><i /></span>
      <template v-else>♪</template>
    </span>
    <span class="tm-teks">{{ musikNyala ? 'Musik nyala' : besar ? 'Putar musik kampung' : 'Musik' }}</span>
  </button>
</template>
