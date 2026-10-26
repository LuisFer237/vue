<template>
  <!-- Alto fijo y fluido: la imagen escala con la pantalla y no mueve el layout al revelarse -->
  <section class="flex h-[clamp(9rem,28dvh,16rem)] w-full items-center justify-center">
    <img
      v-if="!showPokemon"
      :src="pokemonImage"
      alt="Silueta de un Pokémon oculto"
      class="h-full w-auto max-w-full object-contain brightness-0"
    />
    <img
      v-else
      :src="pokemonImage"
      alt="Pokémon revelado"
      class="fade-in h-full w-auto max-w-full object-contain"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  pokemonId: number
  showPokemon: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showPokemon: false,
})

const pokemonImage = computed(
  () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`,
)
</script>

<style scoped>
img {
  user-select: none;
}
</style>
