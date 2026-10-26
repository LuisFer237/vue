<template>
  <div class="flex justify-between gap-5">
    <span>Record: {{ bestScore }}</span>
    <span class="text-right"> Puntuación: {{ gameCounter }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  gameCounter: number
  bestScore: number
}

defineProps<Props>()
</script>
