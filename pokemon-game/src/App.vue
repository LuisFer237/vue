<template>
  <PokemonGame />
</template>

<script setup lang="ts">
import PokemonGame from '@/modules/pokemon/pages/PokemonGame.vue'
</script>

<style>
/* css-pokemon-gameboy.css pone `body { padding: 4em }`, que estrecha el contenido y fuerza
   scroll. El espaciado lo controla cada página, así que se anula aquí. */
body {
  padding: 0;
}
</style>
