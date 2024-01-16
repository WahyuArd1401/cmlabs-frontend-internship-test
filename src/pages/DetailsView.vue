<template>
  <div class="details">
    <div class="route">
      <i class="bi bi-house-door-fill"></i>
      <router-link to="/" class="link">Home</router-link>
      <i class="bi bi-caret-right-fill"></i>
      <p>Foods</p>
      <i class="bi bi-caret-right-fill"></i>
      <p>{{ categoryName }}</p>
    </div>
    <h1 class="title">{{ categoryName }} Meals</h1>
  </div>
  <div class="list-item">
    <Card
      v-for="meal in mealsCategory"
      :key="meal.idMeals"
      :title="meal.strMeal"
      :imageCard="meal.strMealThumb"
    />
  </div>
</template>

<script setup>
import Card from "@/components/Card.vue";
import axios from "axios";
import { ref, onBeforeMount, onMounted } from "vue";
import { useRoute } from "vue-router";

const mealsCategory = ref([]);
const route = useRoute();
const categoryName = ref("");

const getData = () => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${route.params.categoryName}`;
  axios
    .get(url)
    .then((res) => {
      mealsCategory.value = res.data.meals;
      categoryName.value = route.params.categoryName;
    })
    .catch((err) => {
      console.error("Gagal mendapatkan data", err);
    });
};

onMounted(() => {
  getData();
});
</script>

<style scoped>
.details {
  margin-inline: 20%;
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  color: rgb(67, 67, 67);
}

.route {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 0;
}

.title {
  font-size: 3rem;
  font-weight: 400;
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

.list-item a:hover {
  transform: scale(1.1);
}

.link {
  text-decoration: none;
  color: rgb(67, 67, 67);
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
