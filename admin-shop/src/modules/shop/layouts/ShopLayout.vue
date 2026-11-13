<template>
  <!-- Header Navbar -->
  <TopMenu></TopMenu>

  <router-view></router-view>

  <!-- Footer -->
  <CustomFooter></CustomFooter>
</template>

<script setup lang="ts">
import TopMenu from '../components/TopMenu.vue';
import CustomFooter from '../components/CustomFooter.vue';
import HomeView from '../views/HomeView.vue';
import { RouterView } from 'vue-router';
</script>
