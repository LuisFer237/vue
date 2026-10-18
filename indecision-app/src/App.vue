<template>
  <header class="mx-auto mt-8 max-w-md text-center">
    <h1 class="text-4xl font-extrabold tracking-tight text-slate-900">Mi primera app</h1>
    <hr class="mx-auto mt-4 h-1 w-16 rounded-full border-0 bg-indigo-600" />
  </header>

  <!-- <MyCounter :value="10" />
  <MyCounterScript :value="10" /> -->
  <MyCounterScript2 :value="10" />
</template>

<script lang="ts" setup>
import MyCounter from './components/MyCounter.vue';
import MyCounterScript from './components/MyCounterScript.vue';
import MyCounterScript2 from './components/my-counter-script/MyCounterScript2.vue';
</script>
