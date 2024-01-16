<template>
  <div>
    <div class="jumbotron">
      <div class="icon-list">
        <i class="bi bi-cup-hot-fill"></i>
        <i class="bi bi-cake2-fill"></i>
        <i class="bi bi-virus"></i>
      </div>
      <h3 class="title">mealapp API website</h3>
      <h1 class="subtitle" v-motion-pop :delay="500">See All The Delicious Foods</h1>
    </div>
    <div class="list-item ">
      <router-link
        v-for="meal in meals"
        :key="meal.idCategory"
        :to="{ name: 'category', params: { categoryName: meal.strCategory } }"
      >
        <Card :title="meal.strCategory" :imageCard="meal.strCategoryThumb" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onBeforeMount, ref } from "vue";
import Card from "@/components/Card.vue";

const meals = ref([]);

const getData = () => {
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
  axios
    .get(url)
    .then((res) => {
      meals.value = res.data.categories;
    })
    .catch((err) => {
      console.error("Gagal mendapatkan data", err);
    });
};

onBeforeMount(() => {
  getData();
});
</script>

<style scoped>
.list-item a {
  text-decoration: none;
}
.list-item {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-content: center;
  justify-items: center;
  grid-auto-flow: row;
  padding: 70px 20%;
}
.jumbotron {
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: whitesmoke;
}

.title {
  font-size: 0.8rem;
}

.subtitle {
  font-size: 3rem;
  text-align: center;
  margin-inline: 50px;
}

.icon-list {
  display: flex;
  gap: 10px;
  font-size: 1rem;
  color: rgb(255, 132, 0);
}

@media (min-width: 1000px) {
  .list-item {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 999px) {
  .list-item {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 832px) {
  .list-item {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 620px) {
  .list-item {
    grid-template-columns: 1fr;
  }
}
</style>
