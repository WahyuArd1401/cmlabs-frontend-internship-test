import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { MotionPlugin } from '@vueuse/motion'

import Home from '@/pages/Home.vue'
import DetailsView from '@/pages/DetailsView.vue'
import MealsDetail from '@/pages/MealsDetail.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/category/:categoryName', name: 'category', component: DetailsView, props: true },
  { path: '/category/:categoryName/:mealsId', name: 'mealsDetail', component: MealsDetail, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(MotionPlugin).use(router).mount('#app')
