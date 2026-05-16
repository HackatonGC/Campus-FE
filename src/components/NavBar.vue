<template>
  <nav style="background:#fff; border-bottom:1px solid #e5e7eb; position:sticky; top:0; z-index:50; width:100%;">
    <div style="max-width:1280px; margin:0 auto; padding:0 40px; height:68px; display:flex; align-items:center; justify-content:space-between;">

      <!-- 로고 -->
      <RouterLink to="/" style="display:flex; align-items:center; gap:12px; text-decoration:none;">
        <div style="width:44px; height:44px; background:#6366f1; border-radius:12px; display:flex; align-items:center; justify-content:center;">
          <img :src="iconLogo" style="width:28px; height:28px;" alt="StackMate" />
        </div>
        <div>
          <div style="font-weight:700; font-size:16px; line-height:1.2; background:linear-gradient(to right, #6366F1 0%, rgba(99,102,241,0.7) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">StackMate</div>
          <div style="color:#9ca3af; font-size:11px; line-height:1.2;">함께 성장하는 개발자</div>
        </div>
      </RouterLink>

      <!-- 메뉴 -->
      <div style="display:flex; align-items:center; gap:4px;">
        <RouterLink
          to="/"
          style="padding:8px 16px; border-radius:10px; font-size:14px; font-weight:500; text-decoration:none; transition:background 0.15s;"
          :style="isHome ? 'color:#6366f1; background:#f0f1ff;' : 'color:#6b7280;'"
          onmouseover="if(!this.classList.contains('active'))this.style.background='#f4f4fd'"
          onmouseout="if(!this.classList.contains('active'))this.style.background='none'"
        >프로젝트</RouterLink>
        <RouterLink
          to="/qna"
          style="padding:8px 16px; border-radius:10px; font-size:14px; font-weight:500; text-decoration:none; transition:background 0.15s;"
          :style="isQna ? 'color:#6366f1; background:#f0f1ff;' : 'color:#6b7280;'"
          onmouseover="if(!this.classList.contains('active'))this.style.background='#f4f4fd'"
          onmouseout="if(!this.classList.contains('active'))this.style.background='none'"
        >Q&A</RouterLink>
      </div>

      <!-- 프로필 / 로그인 -->
      <div v-if="isLoggedIn" style="position:relative;" data-profile>
        <button @click="profileOpen = !profileOpen" style="display:flex; align-items:center; gap:8px; background:none; border:none; cursor:pointer; padding:6px 8px; border-radius:10px;" :style="profileOpen ? 'background:#f4f4fd;' : ''">
          <div style="text-align:right;">
            <div style="font-size:14px; font-weight:600; color:#111827;">{{ userName }}</div>
            <div v-if="userSchool" style="font-size:11px; color:#9ca3af;">{{ userSchool }}</div>
          </div>
          <svg style="width:14px; height:14px; color:#9ca3af; transition:transform 0.2s;" :style="profileOpen ? 'transform:rotate(180deg)' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div v-if="profileOpen" style="position:absolute; right:0; top:calc(100% + 8px); width:220px; background:#fff; border:1px solid #e5e7eb; border-radius:16px; box-shadow:0 8px 24px rgba(0,0,0,0.1); padding:8px; z-index:100;">
          <div style="padding:12px 16px 10px; border-bottom:1px solid #f3f4f6; margin-bottom:4px;">
            <div style="font-size:15px; font-weight:700; color:#111827;">{{ userName }}</div>
            <div v-if="userSchool" style="font-size:12px; color:#6b7280; margin-top:2px;">{{ userSchool }}</div>
          </div>
          <RouterLink to="/mypage" @click="profileOpen=false" style="width:100%; display:flex; align-items:center; gap:10px; padding:10px 16px; font-size:14px; color:#374151; text-decoration:none; border-radius:10px;" onmouseover="this.style.background='#f4f4fd'" onmouseout="this.style.background='none'">마이페이지</RouterLink>
          <RouterLink to="/settings?tab=security" @click="profileOpen=false" style="width:100%; display:flex; align-items:center; gap:10px; padding:10px 16px; font-size:14px; color:#374151; text-decoration:none; border-radius:10px;" onmouseover="this.style.background='#f4f4fd'" onmouseout="this.style.background='none'">설정</RouterLink>
          <div style="border-top:1px solid #f3f4f6; margin:4px 0;"></div>
          <button @click="handleLogout" style="width:100%; display:flex; align-items:center; gap:10px; padding:10px 16px; font-size:14px; color:#ef4444; background:none; border:none; cursor:pointer; border-radius:10px; text-align:left;" onmouseover="this.style.background='#fff5f5'" onmouseout="this.style.background='none'">로그아웃</button>
        </div>
      </div>
      <RouterLink v-else to="/login" style="display:flex; align-items:center; gap:6px; font-size:14px; color:#4b5563; text-decoration:none;">로그인</RouterLink>

    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isLoggedIn, clearAuth } from '../store/auth.js'
import iconLogo from '../assets/Icon.svg'

const route = useRoute()
const router = useRouter()

const profileOpen = ref(false)
const userName = localStorage.getItem('userName') ?? '사용자'
const userSchool = localStorage.getItem('userSchool') ?? ''

const isHome = computed(() => route.path === '/')
const isQna = computed(() => route.path.startsWith('/qna'))

function handleLogout() {
  clearAuth()
  router.push('/login')
}

function closeProfile(e) {
  if (!e.target.closest('[data-profile]')) profileOpen.value = false
}
onMounted(() => document.addEventListener('click', closeProfile))
onUnmounted(() => document.removeEventListener('click', closeProfile))
</script>
