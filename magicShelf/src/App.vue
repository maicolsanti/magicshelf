<script setup>
import { RouterView } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
</script>
<template>
  <header>
    <AppNavbar></AppNavbar>
  </header>
  <RouterView class="mx-5"  />
</template>