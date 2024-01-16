<template>
  <div class="card" 
  :style="{'background-image': 'url(' + imageCard + ')'}"
  v-motion
  :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0, scale: 1 }"
    :variants="{ custom: { scale: 2 } }"
    :hovered="{ scale: 1.2 }"
    :delay="200"
  >
    <h1 class="title">{{ title }}</h1>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  imageCard: {
    type: String,
    default: ''
  },
})
</script>

<style scoped>
.card {
  cursor: pointer;
  width: 200px;
  height: 100px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
}

.title {
  font-size: 1rem;
  color: #ffffff;
  z-index: 1;
  text-align: center;
}
</style>