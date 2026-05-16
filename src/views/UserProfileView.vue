<template>
  <div style="min-height:100vh; background:#f4f4fd;">

    <!-- NAV -->
    <nav style="background:#fff; border-bottom:1px solid #e5e7eb; position:sticky; top:0; z-index:50;">
      <div style="max-width:1280px; margin:0 auto; padding:0 40px; height:68px; display:flex; align-items:center; justify-content:space-between;">
        <RouterLink to="/" style="display:flex; align-items:center; gap:12px; text-decoration:none;">
          <div style="width:44px; height:44px; background:#6366f1; border-radius:12px; display:flex; align-items:center; justify-content:center;">
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
              <path d="M25.66 4.36C25.14 4.12 24.57 4 24 4C23.43 4 22.86 4.12 22.34 4.36L5.2 12.16C4.85 12.32 4.54 12.57 4.33 12.9C4.12 13.22 4.01 13.6 4.01 13.99C4.01 14.38 4.12 14.76 4.33 15.08C4.54 15.41 4.85 15.66 5.2 15.82L22.36 23.64C22.88 23.88 23.45 24 24.02 24C24.59 24 25.16 23.88 25.68 23.64L42.84 15.84C43.2 15.68 43.5 15.43 43.71 15.1C43.92 14.78 44.03 14.4 44.03 14.01C44.03 13.62 43.92 13.24 43.71 12.92C43.5 12.59 43.2 12.34 42.84 12.18L25.66 4.36Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4 24C4 24.38 4.11 24.76 4.31 25.08C4.52 25.4 4.81 25.66 5.16 25.82L22.36 33.64C22.88 33.87 23.44 33.99 24.01 33.99C24.58 33.99 25.14 33.87 25.66 33.64L42.82 25.84C43.17 35.68 43.47 25.42 43.68 25.1C43.89 24.77 44 24.39 44 24" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4 34C4 34.38 4.11 34.76 4.31 35.08C4.52 35.4 4.81 35.66 5.16 35.82L22.36 43.64C22.88 43.87 23.44 43.99 24.01 43.99C24.58 43.99 25.14 43.87 25.66 43.64L42.82 35.84C43.17 35.68 43.47 35.42 43.68 35.1C43.89 34.77 44 34.39 44 34" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div>
            <div style="font-weight:700; font-size:16px; background:linear-gradient(to right,#6366f1,rgba(99,102,241,0.7)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">StackMate</div>
            <div style="color:#9ca3af; font-size:11px;">함께 성장하는 개발자</div>
          </div>
        </RouterLink>
        <div style="display:flex; align-items:center; gap:12px;">
          <button @click="$router.back()" style="display:flex; align-items:center; gap:6px; font-size:14px; color:#6b7280; background:none; border:none; cursor:pointer;">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            뒤로
          </button>
          <RouterLink to="/" style="display:flex; align-items:center; gap:6px; font-size:14px; color:#6b7280; text-decoration:none;">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            메인
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- 로딩 -->
    <div v-if="loading" style="display:flex; justify-content:center; padding:120px 0;">
      <div style="font-size:14px; color:#9ca3af;">불러오는 중...</div>
    </div>

    <!-- 로그인 필요 -->
    <div v-else-if="needLogin" style="display:flex; flex-direction:column; align-items:center; padding:120px 0; gap:12px;">
      <div style="font-size:48px;">🔒</div>
      <div style="font-size:16px; font-weight:600; color:#374151;">로그인이 필요합니다</div>
      <div style="font-size:14px; color:#6b7280;">프로필을 보려면 먼저 로그인해주세요</div>
      <RouterLink to="/login" style="margin-top:8px; padding:10px 24px; background:#6366f1; color:#fff; border-radius:10px; text-decoration:none; font-size:14px; font-weight:600;">로그인하기</RouterLink>
    </div>

    <!-- 유저 없음 -->
    <div v-else-if="!user" style="display:flex; flex-direction:column; align-items:center; padding:120px 0; gap:12px;">
      <div style="font-size:48px;">😕</div>
      <div style="font-size:16px; font-weight:600; color:#374151;">존재하지 않는 유저입니다</div>
      <RouterLink to="/" style="font-size:14px; color:#6366f1; text-decoration:none;">홈으로 돌아가기</RouterLink>
    </div>

    <!-- 프로필 본문 -->
    <div v-else style="max-width:1280px; margin:0 auto; padding:32px 40px; display:grid; grid-template-columns:280px 1fr; gap:24px; align-items:start;">

      <!-- 사이드바 -->
      <div style="background:#fff; border-radius:16px; padding:28px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
        <!-- 아바타 + 기본 정보 -->
        <div style="display:flex; flex-direction:column; align-items:center; text-align:center; padding-bottom:24px; border-bottom:1px solid #f3f4f6;">
          <div style="font-size:20px; font-weight:700; color:#111827; margin-bottom:4px;">{{ user.name }}</div>
          <div style="font-size:13px; color:#6b7280;">{{ user.school }}</div>
          <div style="font-size:13px; color:#6b7280; margin-bottom:16px;">{{ user.department }}</div>

          <!-- 관심 기술스택 -->
          <div style="width:100%;">
            <div style="font-size:12px; color:#9ca3af; margin-bottom:8px;">관심 기술스택</div>
            <div style="display:flex; flex-wrap:wrap; gap:6px; justify-content:center;">
              <span
                v-for="tech in (user.techStacks ?? user.techStack ?? [])"
                :key="tech"
                style="font-size:12px; background:#ede9fe; color:#6366f1; padding:3px 10px; border-radius:999px; font-weight:500;"
              >{{ tech }}</span>
              <span v-if="!(user.techStacks ?? user.techStack ?? []).length" style="font-size:12px; color:#9ca3af;">없음</span>
            </div>
          </div>
        </div>

        <!-- 활동 통계 -->
        <div style="margin-top:20px; display:flex; flex-direction:column; gap:6px;">
          <div style="border-radius:10px; padding:10px 14px; display:flex; align-items:center; gap:10px; background:#f9fafb;">
            <span style="font-size:12px; color:#6b7280; flex:1;">진행중인 프로젝트</span>
            <span style="font-size:16px; font-weight:600; color:#111827;">{{ projects.length - projects.filter(p => p.status === 'COMPLETED').length }}</span>
          </div>
          <div style="border-radius:10px; padding:10px 14px; display:flex; align-items:center; gap:10px; background:#f9fafb;">
            <span style="font-size:12px; color:#6b7280; flex:1;">완료한 프로젝트</span>
            <span style="font-size:16px; font-weight:600; color:#111827;">{{ projects.filter(p => p.status === 'COMPLETED').length }}</span>
          </div>
          <div style="border-radius:10px; padding:10px 14px; display:flex; align-items:center; gap:10px; background:#f9fafb;">
            <span style="font-size:12px; color:#6b7280; flex:1;">Q&A 답변 수</span>
            <span style="font-size:16px; font-weight:600; color:#111827;">0</span>
          </div>
        </div>

        <!-- 링크 -->
        <div style="margin-top:20px; display:flex; flex-direction:column; gap:10px;">
          <a v-if="user.githubUrl" :href="user.githubUrl" target="_blank" style="display:flex; align-items:center; gap:10px; font-size:13px; color:#374151; text-decoration:none; padding:8px 12px; border-radius:10px; background:#f9fafb;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='#f9fafb'">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
          <a v-if="user.blogUrl" :href="user.blogUrl" target="_blank" style="display:flex; align-items:center; gap:10px; font-size:13px; color:#374151; text-decoration:none; padding:8px 12px; border-radius:10px; background:#f9fafb;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='#f9fafb'">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
            블로그
          </a>
          <a v-if="user.portfolioUrl" :href="user.portfolioUrl" target="_blank" style="display:flex; align-items:center; gap:10px; font-size:13px; color:#374151; text-decoration:none; padding:8px 12px; border-radius:10px; background:#f9fafb;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='#f9fafb'">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            포트폴리오
          </a>
        </div>

        <!-- 가입일 -->
        <div v-if="user.createdAt" style="margin-top:20px; padding-top:16px; border-top:1px solid #f3f4f6; font-size:12px; color:#9ca3af; text-align:center;">
          {{ formatDate(user.createdAt) }} 가입
        </div>
      </div>

      <!-- 메인 콘텐츠 -->
      <div style="display:flex; flex-direction:column; gap:20px;">

        <!-- 자기소개 -->
        <div style="background:#fff; border-radius:16px; padding:28px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
          <h2 style="font-size:16px; font-weight:700; color:#111827; margin:0 0 16px;">자기소개</h2>
          <p v-if="user.bio" style="font-size:14px; color:#374151; line-height:1.8; margin:0; white-space:pre-wrap;">{{ user.bio }}</p>
          <p v-else style="font-size:14px; color:#9ca3af; margin:0;">아직 자기소개를 작성하지 않았습니다.</p>
        </div>

        <!-- 공개 프로젝트 -->
        <div style="background:#fff; border-radius:16px; padding:28px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
          <h2 style="font-size:16px; font-weight:700; color:#111827; margin:0 0 16px;">진행중/완료한 프로젝트</h2>

          <div v-if="projects.length === 0" style="font-size:14px; color:#9ca3af; padding:20px 0; text-align:center;">
            공개된 프로젝트가 없습니다.
          </div>

          <div style="display:flex; flex-direction:column; gap:12px;">
            <RouterLink
              v-for="project in projects"
              :key="project.id"
              :to="`/project/${project.id}`"
              style="display:flex; align-items:stretch; border:1px solid #e5e7eb; border-radius:12px; text-decoration:none; overflow:hidden; transition:background 0.15s;"
              onmouseover="this.style.background='#f9fafb'"
              onmouseout="this.style.background='#fff'"
            >
              <img v-if="project.thumbnailUrl" :src="project.thumbnailUrl" style="width:180px; flex-shrink:0; object-fit:cover;" />
              <div v-else style="width:180px; flex-shrink:0; background:#f3f4f6; display:flex; align-items:center; justify-content:center; min-height:120px;">
                <svg width="40" height="40" fill="none" stroke="#d1d5db" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
              <div style="flex:1; min-width:0; padding:20px 24px;">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                  <span style="font-size:15px; font-weight:600; color:#111827; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">{{ project.title }}</span>
                  <span v-if="project.status === 'RECRUITING'" style="flex-shrink:0; font-size:11px; font-weight:600; background:#d1fae5; color:#059669; padding:2px 8px; border-radius:999px;">모집중</span>
                </div>
                <p style="font-size:13px; color:#6b7280; margin:0 0 8px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">{{ project.summary }}</p>
                <div style="display:flex; flex-wrap:wrap; gap:4px;">
                  <span v-for="tech in (project.techStacks ?? []).slice(0, 3)" :key="tech" style="font-size:11px; background:#f0f1ff; color:#4338ca; padding:2px 8px; border-radius:999px; border:1px solid #c7d2fe;">{{ tech }}</span>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getUser, getPortfolio } from '../api/user.js'
import { getProjects } from '../api/project.js'

const route = useRoute()
const user = ref(null)
const projects = ref([])
const loading = ref(true)
const needLogin = ref(false)

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
}

onMounted(async () => {
  const id = route.params.id
  try {
    user.value = await getUser(id)
  } catch (e) {
    if (e.response?.status === 403) {
      needLogin.value = true
    } else {
      user.value = null
    }
    loading.value = false
    return
  }

  try {
    const portfolio = await getPortfolio(id)
    user.value = {
      ...user.value,
      bio: portfolio.bio,
      githubUrl: portfolio.githubUrl,
      blogUrl: portfolio.blogUrl,
      portfolioUrl: portfolio.portfolioUrl,
      techStacks: portfolio.techStacks ?? user.value.techStacks,
    }
  } catch {}

  try {
    const data = await getProjects({ authorId: id })
    projects.value = Array.isArray(data) ? data : []
  } catch {
    projects.value = []
  }

  loading.value = false
})
</script>
