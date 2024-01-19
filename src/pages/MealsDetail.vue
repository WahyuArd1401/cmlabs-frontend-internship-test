<template>
  <div class="meals">
    <div class="details">
      <div class="route">
        <i class="bi bi-house-door-fill"></i>
        <router-link to="/" class="link">Home</router-link>
        <i class="bi bi-caret-right-fill"></i>
        <p>Foods</p>
        <i class="bi bi-caret-right-fill"></i>
        <router-link
          :to="{
            name: 'category',
            params: { categoryName: mealsData.strCategory },
          }"
          class="link"
        >
          <p>{{ mealsData.strCategory }}</p>
        </router-link>
        <i class="bi bi-caret-right-fill"></i>
        <p>{{ mealsData.strMeal }}</p>
      </div>
      <h1 class="title">{{ mealsData.strMeal }}</h1>
    </div>
    <p class="meals-country">{{ mealsData.strArea }} Culinary</p>
    <div class="content">
      <div class="content-image">
        <img :src="mealsData.strMealThumb" alt="Meals Image" />
      </div>
      <div class="content-body">
        <h1 class="content-title main">Instructions</h1>
        <p class="content-instructions">{{ mealsData.strInstructions }}</p>
        <h1 class="content-title secondary">Recipes</h1>
        <div class="content-recipes">
          <ul>
            <li>step 1</li>
            <li>step 2</li>
            <li>step 3</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="meals-youtube">
      <iframe :src="mealsData.strYoutube" frameborder="0" width="100%" allowfullscreen></iframe>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const mealsData = ref([]);
const route = useRoute();
const mealsId = ref("");

const getData = () => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${route.params.mealsId}`;
  axios.get(url).then((res) => {
    if (res.data.meals && res.data.meals.length > 0) {
      mealsData.value = res.data.meals[0];
    }
    mealsId.value = route.params.mealsId;
  });
};

onMounted(() => {
  getData();
});
</script>

<style scoped>
.meals {
  margin-inline: 20%;
  padding: 20px 0;
}
.details {
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  color: rgb(67, 67, 67);
  padding-bottom: 40px;
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

.meals-country {
  margin: 40px 0 20px 0;
  font-size: 1rem;
  font-weight: 700;
  color: rgb(232, 127, 0);
}

.content {
  display: flex;
  gap: 20px;
}

.content-image {
  flex: 1;
}

.content-image img {
  width: 100%;
  height: 350px;
  border-radius: 10px;
}

.content-body {
  flex: 1;
}

.content-title {
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 10px;
}

.content-instructions {
  margin-bottom: 20px;
  font-size: 0.8rem;
}

.content-recipes li {
  margin-left: 20px;
  font-size: 0.8rem;
}

.link {
  text-decoration: none;
  color: rgb(67, 67, 67);
}
</style>
