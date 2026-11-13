<template>
  <router-view></router-view>
  <vue-query-devtools></vue-query-devtools>
</template>

<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
</script>
