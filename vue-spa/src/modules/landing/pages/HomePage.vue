<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold tracking-tighter sm:text-5xl">Bienvenido a nuestro sitio web</h1>
    <p class="mx-auto max-w-[600px] text-gray-500 md:text-xl">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    <button class="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white" @click="count++">
      Contador: {{ count }}
    </button>
  </div>
</template>

<script lang="ts" src="./HomePage.ts"></script>
