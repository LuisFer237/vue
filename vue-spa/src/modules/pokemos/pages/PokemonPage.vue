<template>
  <section class="flex flex-col">
    <h1 class="text-3xl font-bold">
      Pokemon
      <small class="text-blue-500">{{ id }}</small>
    </h1>

    <img
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`"
      alt="pokemon"
      class="size-50 mt-5"
    />

    <RouterLink
      class="bg-blue-500 text-white p-2 rounded mt-5 text-center"
      :to="{ name: 'pokemon', params: { id: id + 1 } }"
      >Siguiente</RouterLink
    >
  </section>
</template>

<script lang="ts" setup>
interface Props {
  id: number;
}

defineProps<Props>();
</script>
