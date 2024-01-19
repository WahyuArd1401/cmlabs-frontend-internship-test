<template>
  <Header />
  <router-view />
  <!-- <MealsDetail /> -->
</template>

<script setup>
//components
import Header from '../src/components/Header.vue'
import MealsDetail from './pages/MealsDetail.vue';
</script>