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
            <li v-for="recipe in ingredientCount" :key="recipe">{{ mealsData[`strIngredient${recipe}`] }} {{ mealsData[`strMeasure${recipe}`] }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="meals-youtube">
  <div class="iframe-container">
    <iframe v-if="youtubeEmbedUrl" :src="youtubeEmbedUrl" frameborder="0" allowfullscreen></iframe>
  </div>
</div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";

const mealsData = ref([]);
const route = useRoute();
const mealsId = ref("");
const youtubeEmbedUrl = ref("")

const getData = () => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${route.params.mealsId}`;
  axios.get(url).then((res) => {
    if (res.data.meals && res.data.meals.length > 0) {
      mealsData.value = res.data.meals[0];
    }
    mealsId.value = route.params.mealsId;
    youtubeEmbedUrl.value = getYoutubeEmbedUrl(mealsData.value.strYoutube);
  });
};

const getYoutubeEmbedUrl = (url) => {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length == 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return null;
};

const ingredientCount = computed(() => {
  let count = 0;
  for (let i = 1; i <= 20; i++) {
    if (mealsData.value[`strIngredient${i}`]) {
      count++;
    }
  }
  return count;
});

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
  flex-wrap: wrap;
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

.content-recipes {
  margin-bottom: 20px;  
}

.content-recipes li {
  margin-left: 20px;
  font-size: 0.8rem;
}

.link {
  text-decoration: none;
  color: rgb(67, 67, 67);
}

.meals-youtube .iframe-container {
  position: relative;
  width: 100%;
  padding-top: 50%;
  margin-bottom: 20px;
}

.meals-youtube iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 10px;
}


@media screen and (max-width: 860px) {
  .content {
    display: block;
  }
}

@media screen and (max-width: 480px) {
  .title {
    font-size: 1.5rem;
  }
}
</style>
