import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import ReviewRequestView from '../views/ReviewRequestView.vue'
import TeamApplyView from '../views/TeamApplyView.vue'
import ProjectRegisterView from '../views/ProjectRegisterView.vue'
import ProjectTypeSelectView from '../views/ProjectTypeSelectView.vue'
import ProjectRecruitView from '../views/ProjectRecruitView.vue'
import ProjectCompleteView from '../views/ProjectCompleteView.vue'
import ProjectPreviewView from '../views/ProjectPreviewView.vue'
import LoginView from '../views/LoginView.vue'
import MyPageView from '../views/MyPageView.vue'
import SettingsView from '../views/SettingsView.vue'
import ProjectManageView from '../views/ProjectManageView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/mypage', component: MyPageView },
  { path: '/settings', component: SettingsView },
  { path: '/project/new', component: ProjectTypeSelectView },
  { path: '/project/recruit/new', component: ProjectRecruitView },
  { path: '/project/complete/new', component: ProjectCompleteView },
  { path: '/project/:id/edit', component: ProjectRegisterView },
  { path: '/project/preview', component: ProjectPreviewView },
  { path: '/project/:id', component: DetailView },
  { path: '/project/:id/review', component: ReviewRequestView },
  { path: '/project/:id/apply', component: TeamApplyView },
  { path: '/project/:id/manage', component: ProjectManageView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
