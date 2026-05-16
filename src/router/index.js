import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import ReviewRequestView from '../views/ReviewRequestView.vue'
import TeamApplyView from '../views/TeamApplyView.vue'
import ProjectRegisterView from '../views/ProjectRegisterView.vue'
import ProjectPreviewView from '../views/ProjectPreviewView.vue'
import LoginView from '../views/LoginView.vue'
import MyPageView from '../views/MyPageView.vue'
import SettingsView from '../views/SettingsView.vue'
import ProjectManageView from '../views/ProjectManageView.vue'
import QnaView from '../views/QnaView.vue'
import QnaDetailView from '../views/QnaDetailView.vue'
import QnaWriteView from '../views/QnaWriteView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/mypage', component: MyPageView },
  { path: '/settings', component: SettingsView },
  { path: '/project/new', component: ProjectRegisterView },
  { path: '/project/preview', component: ProjectPreviewView },
  { path: '/project/:id', component: DetailView },
  { path: '/project/:id/review', component: ReviewRequestView },
  { path: '/project/:id/apply', component: TeamApplyView },
  { path: '/project/:id/manage', component: ProjectManageView },
  { path: '/qna', component: QnaView },
  { path: '/qna/write', component: QnaWriteView },
  { path: '/qna/:id', component: QnaDetailView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
