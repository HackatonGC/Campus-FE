import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import ReviewRequestView from '../views/ReviewRequestView.vue'
import TeamApplyView from '../views/TeamApplyView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/project/:id', component: DetailView },
  { path: '/project/:id/review', component: ReviewRequestView },
  { path: '/project/:id/apply', component: TeamApplyView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
