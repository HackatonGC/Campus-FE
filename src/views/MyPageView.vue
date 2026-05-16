<template>
  <div style="min-height:100vh; background:#f4f4fd;">

    <NavBar />

    <!-- BODY -->
    <div style="max-width:1280px; margin:0 auto; padding:32px 40px; display:grid; grid-template-columns:280px 1fr; gap:24px; align-items:start;">

      <!-- SIDEBAR -->
      <div style="background:#fff; border-radius:16px; padding:28px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
        <!-- 프로필 -->
        <div style="display:flex; flex-direction:column; align-items:center; text-align:center; padding-bottom:24px; border-bottom:1px solid #f3f4f6;">
          <div style="font-size:20px; font-weight:700; color:#111827; margin-bottom:4px;">{{ user.name }}</div>
          <div style="font-size:13px; color:#6b7280;">{{ user.university }}</div>
          <div style="font-size:13px; color:#6b7280; margin-bottom:16px;">{{ user.department }}</div>
          <div style="width:100%;">
            <div style="font-size:12px; color:#9ca3af; margin-bottom:8px;">관심 기술스택</div>
            <div style="display:flex; flex-wrap:wrap; gap:6px; justify-content:center;">
              <span v-for="tech in user.techStack" :key="tech" style="font-size:12px; background:#ede9fe; color:#6366f1; padding:3px 10px; border-radius:999px; font-weight:500;">{{ tech }}</span>
              <span v-if="!user.techStack.length" style="font-size:12px; color:#9ca3af;">없음</span>
            </div>
          </div>
        </div>

        <!-- 활동 통계 -->
        <div style="margin-top:20px; display:flex; flex-direction:column; gap:6px;">
          <div style="border-radius:10px; padding:10px 14px; display:flex; align-items:center; gap:10px; background:#f9fafb;">
            <span style="font-size:12px; color:#6b7280; flex:1;">내 프로젝트</span>
            <span style="font-size:16px; font-weight:600; color:#111827;">{{ myProjects.length }}</span>
          </div>
          <div style="border-radius:10px; padding:10px 14px; display:flex; align-items:center; gap:10px; background:#f9fafb;">
            <span style="font-size:12px; color:#6b7280; flex:1;">지원한 프로젝트</span>
            <span style="font-size:16px; font-weight:600; color:#111827;">{{ appliedProjects.length }}</span>
          </div>
          <div style="border-radius:10px; padding:10px 14px; display:flex; align-items:center; gap:10px; background:#f9fafb;">
            <span style="font-size:12px; color:#6b7280; flex:1;">북마크</span>
            <span style="font-size:16px; font-weight:600; color:#111827;">{{ bookmarkedProjects.length }}</span>
          </div>
          <div style="border-radius:10px; padding:10px 14px; display:flex; align-items:center; gap:10px; background:#f9fafb;">
            <span style="font-size:12px; color:#6b7280; flex:1;">좋아요</span>
            <span style="font-size:16px; font-weight:600; color:#111827;">{{ likedProjects.length }}</span>
          </div>
        </div>

        <!-- 프로필 수정 버튼 -->
        <div style="margin-top:20px;">
          <RouterLink to="/settings" style="display:flex; align-items:center; justify-content:center; gap:6px; width:100%; padding:10px; border-radius:10px; border:1.5px solid #e5e7eb; font-size:13px; font-weight:600; color:#374151; text-decoration:none; box-sizing:border-box;" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='#fff'">
            프로필 수정
          </RouterLink>
        </div>
      </div>

      <!-- MAIN -->
      <div style="display:flex; flex-direction:column; gap:20px;">

        <!-- 탭 버튼 -->
        <div style="display:flex; gap:8px; background:#fff; border-radius:16px; padding:8px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
          <button v-for="menu in menus" :key="menu.key"
            @click="activeMenu = menu.key"
            :style="activeMenu === menu.key
              ? 'flex:1; padding:10px; border-radius:10px; font-size:14px; font-weight:700; border:none; background:#6366f1; color:#fff; cursor:pointer;'
              : 'flex:1; padding:10px; border-radius:10px; font-size:14px; font-weight:500; border:none; background:none; color:#6b7280; cursor:pointer;'"
          >{{ menu.label }}</button>
        </div>

        <!-- 내 프로젝트 -->
        <div v-if="activeMenu === 'projects'" style="background:#fff; border-radius:16px; padding:24px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <h2 style="font-size:16px; font-weight:700; color:#111827; margin:0;">내 프로젝트</h2>
            <RouterLink to="/project/new" style="background:#6366f1; color:#fff; text-decoration:none; padding:8px 16px; border-radius:10px; font-size:13px; font-weight:600;">새 프로젝트</RouterLink>
          </div>
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div v-for="p in myProjects" :key="p.id" style="display:flex; border:1px solid #f3f4f6; border-radius:12px; overflow:hidden;">
              <img :src="p.thumbnailUrl" style="width:220px; height:100%; min-height:160px; object-fit:cover; flex-shrink:0;" />
              <div style="flex:1; min-width:0; padding:16px;">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                  <span v-if="p.status === 'RECRUITING'" style="font-size:11px; background:#10b981; color:#fff; padding:2px 8px; border-radius:999px; font-weight:600;">모집중</span>
                  <span style="font-size:15px; font-weight:700; color:#111827;">{{ p.title }}</span>
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:8px;">
                  <span v-for="tech in (p.techStacks ?? p.techStack ?? [])" :key="tech" style="font-size:12px; background:#ede9fe; color:#6366f1; padding:2px 8px; border-radius:999px;">{{ tech }}</span>
                </div>
                <div style="font-size:12px; color:#9ca3af; display:flex; gap:12px; margin-bottom:10px;">
                  <span>👁 {{ p.viewCount ?? p.views ?? 0 }}</span>
                  <span>❤️ {{ p.likeCount ?? p.likes ?? 0 }}</span>
                </div>
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                  <RouterLink :to="`/project/${p.id}/manage`" style="font-size:12px; padding:5px 14px; border-radius:8px; border:none; background:#6366f1; color:#fff; cursor:pointer; display:flex; align-items:center; gap:5px; font-weight:600; text-decoration:none;">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M13.333 14v-1.333A2.667 2.667 0 0 0 10.667 10H5.333A2.667 2.667 0 0 0 2.667 12.667V14M8 7.333A2.667 2.667 0 1 0 8 2a2.667 2.667 0 0 0 0 5.333z" stroke="#fff" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    지원자 관리
                  </RouterLink>
                  <a :href="p.githubUrl" target="_blank" style="font-size:12px; padding:5px 14px; border-radius:8px; border:1px solid #e5e7eb; background:#fff; color:#374151; cursor:pointer; display:flex; align-items:center; gap:5px; text-decoration:none; font-weight:500;">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 1.333A6.67 6.67 0 0 0 1.333 8c0 2.946 1.912 5.44 4.559 6.32.333.06.454-.146.454-.323v-1.13c-1.853.4-2.247-.896-2.247-.896-.303-.77-.74-1.04-.74-1.04-.605-.413.046-.405.046-.405.669.047 1.02.687 1.02.687.595 1.02 1.561.725 1.941.554.06-.43.233-.725.424-.892-1.48-.168-3.034-.74-3.034-3.293 0-.727.26-1.323.687-1.788-.069-.168-.297-.847.065-1.766 0 0 .56-.179 1.834.683A6.4 6.4 0 0 1 8 4.67c.567.003 1.138.077 1.671.226 1.274-.862 1.833-.683 1.833-.683.363.919.135 1.598.066 1.766.428.465.686 1.06.686 1.788 0 2.56-1.557 3.123-3.04 3.288.239.206.451.612.451 1.234v1.83c0 .178.12.386.458.32A6.672 6.672 0 0 0 14.667 8 6.67 6.67 0 0 0 8 1.333z" fill="#374151"/></svg>
                    GitHub
                  </a>
                  <RouterLink :to="`/project/${p.status === 'RECRUITING' ? 'recruit' : 'complete'}/${p.id}/edit`" style="font-size:12px; padding:5px 14px; border-radius:8px; border:1px solid #e5e7eb; background:#fff; color:#374151; cursor:pointer; display:flex; align-items:center; gap:5px; font-weight:500; text-decoration:none;">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M11.333 2a1.886 1.886 0 0 1 2.667 2.667L5.333 13.333 2 14l.667-3.333L11.333 2z" stroke="#374151" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    수정
                  </RouterLink>
                  <button @click="handleDeleteProject(p.id)" style="font-size:12px; padding:5px 14px; border-radius:8px; border:1px solid #fee2e2; background:#fff; color:#ef4444; cursor:pointer; display:flex; align-items:center; gap:5px; font-weight:500;">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5.333 4V2.667A1.333 1.333 0 0 1 6.667 1.333h2.666A1.333 1.333 0 0 1 10.667 2.667V4M12.667 4l-.667 9.333A1.333 1.333 0 0 1 10.667 14.667H5.333A1.333 1.333 0 0 1 4 13.333L3.333 4" stroke="#ef4444" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 지원한 프로젝트 -->
        <div v-if="activeMenu === 'applied'" style="background:#fff; border-radius:16px; padding:24px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
          <h2 style="font-size:16px; font-weight:700; color:#111827; margin:0 0 20px;">지원한 프로젝트</h2>
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div v-for="p in appliedProjects" :key="p.id" style="padding:16px; border:1px solid #f3f4f6; border-radius:12px;">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                <span style="font-size:15px; font-weight:700; color:#111827;">{{ p.projectTitle }}</span>
                <span :style="p.status === 'PENDING'
                  ? 'font-size:11px; background:#fef3c7; color:#d97706; padding:2px 8px; border-radius:999px; font-weight:600; flex-shrink:0;'
                  : p.status === 'ACCEPTED'
                    ? 'font-size:11px; background:#d1fae5; color:#059669; padding:2px 8px; border-radius:999px; font-weight:600; flex-shrink:0;'
                    : 'font-size:11px; background:#fee2e2; color:#ef4444; padding:2px 8px; border-radius:999px; font-weight:600; flex-shrink:0;'">
                  {{ p.status === 'PENDING' ? '검토중' : p.status === 'ACCEPTED' ? '승인됨' : '거절됨' }}
                </span>
              </div>
              <p style="font-size:13px; color:#6b7280; margin:0 0 10px;">{{ p.projectSummary }}</p>
              <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:10px;">
                <span v-for="tech in (p.techStacks ?? [])" :key="tech" style="font-size:12px; background:#ede9fe; color:#6366f1; padding:2px 8px; border-radius:999px;">{{ tech }}</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="font-size:12px; color:#9ca3af; display:flex; gap:12px;">
                  <span>👤 {{ p.projectAuthorName }}</span>
                  <span v-if="p.role">🏷 {{ p.role }} 지원</span>
                  <span>🕐 {{ p.createdAt?.slice(0,10) }}</span>
                </div>
                <div style="display:flex; gap:8px;">
                  <RouterLink :to="`/project/${p.projectId}`" style="font-size:13px; padding:5px 14px; border-radius:8px; border:1px solid #e5e7eb; background:#fff; color:#374151; text-decoration:none; font-weight:500;">게시글 보기</RouterLink>
                  <button v-if="p.status === 'PENDING'" @click="handleCancelApplication(p.projectId, p.id)" style="font-size:13px; padding:5px 14px; border-radius:8px; border:1px solid #fee2e2; background:#fff; color:#ef4444; cursor:pointer; font-weight:500;">지원 취소</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 북마크 -->
        <div v-if="activeMenu === 'bookmarks'" style="background:#fff; border-radius:16px; padding:24px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
          <h2 style="font-size:16px; font-weight:700; color:#111827; margin:0 0 20px;">북마크</h2>
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div v-for="p in bookmarkedProjects" :key="p.bookmarkId" style="display:flex; border:1px solid #f3f4f6; border-radius:12px; overflow:hidden;">
              <img v-if="p.thumbnailUrl" :src="p.thumbnailUrl" style="width:120px; min-height:110px; object-fit:cover; flex-shrink:0;" />
              <div v-else style="width:120px; min-height:110px; flex-shrink:0; background:linear-gradient(135deg,#6366f1,#818cf8); display:flex; align-items:center; justify-content:center; font-size:24px; font-weight:900; color:#fff;">{{ (p.title ?? '?').charAt(0) }}</div>
              <div style="flex:1; min-width:0; padding:16px;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
                  <span style="font-size:15px; font-weight:700; color:#111827;">{{ p.title }}</span>
                  <span v-if="p.status === 'RECRUITING'" style="font-size:11px; background:#10b981; color:#fff; padding:2px 8px; border-radius:999px; font-weight:600; flex-shrink:0; margin-left:8px;">모집중</span>
                </div>
                <p style="font-size:13px; color:#6b7280; margin:0 0 10px;">{{ p.summary }}</p>
                <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:10px;">
                  <span v-for="tech in (p.techStacks ?? [])" :key="tech" style="font-size:12px; background:#ede9fe; color:#6366f1; padding:2px 8px; border-radius:999px;">{{ tech }}</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <div style="font-size:12px; color:#9ca3af; display:flex; gap:12px;">
                    <span>👁 {{ p.viewCount ?? 0 }}</span>
                    <span>❤️ {{ p.likeCount ?? 0 }}</span>
                  </div>
                  <RouterLink :to="`/project/${p.projectId}`" style="font-size:13px; padding:5px 14px; border-radius:8px; border:1px solid #e5e7eb; background:#fff; color:#374151; text-decoration:none; font-weight:500;">게시글 보기</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 좋아요 -->
        <div v-if="activeMenu === 'likes'" style="background:#fff; border-radius:16px; padding:24px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
          <h2 style="font-size:16px; font-weight:700; color:#111827; margin:0 0 20px;">좋아요</h2>
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div v-for="p in likedProjects" :key="p.likeId" style="display:flex; border:1px solid #f3f4f6; border-radius:12px; overflow:hidden;">
              <img v-if="p.thumbnailUrl" :src="p.thumbnailUrl" style="width:120px; min-height:110px; object-fit:cover; flex-shrink:0;" />
              <div v-else style="width:120px; min-height:110px; flex-shrink:0; background:linear-gradient(135deg,#6366f1,#818cf8); display:flex; align-items:center; justify-content:center; font-size:24px; font-weight:900; color:#fff;">{{ (p.title ?? '?').charAt(0) }}</div>
              <div style="flex:1; min-width:0; padding:16px;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
                  <span style="font-size:15px; font-weight:700; color:#111827;">{{ p.title }}</span>
                  <span v-if="p.status === 'RECRUITING'" style="font-size:11px; background:#10b981; color:#fff; padding:2px 8px; border-radius:999px; font-weight:600; flex-shrink:0; margin-left:8px;">모집중</span>
                </div>
                <p style="font-size:13px; color:#6b7280; margin:0 0 10px;">{{ p.summary }}</p>
                <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:10px;">
                  <span v-for="tech in (p.techStacks ?? [])" :key="tech" style="font-size:12px; background:#ede9fe; color:#6366f1; padding:2px 8px; border-radius:999px;">{{ tech }}</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <div style="font-size:12px; color:#9ca3af; display:flex; gap:12px;">
                    <span>👁 {{ p.viewCount ?? 0 }}</span>
                    <span style="color:#ef4444;">❤️ {{ p.likeCount ?? 0 }}</span>
                  </div>
                  <RouterLink :to="`/project/${p.projectId}`" style="font-size:13px; padding:5px 14px; border-radius:8px; border:1px solid #e5e7eb; background:#fff; color:#374151; text-decoration:none; font-weight:500;">게시글 보기</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getProjects, getMyBookmarks, getMyLikes, getMyApplications, cancelApplication, deleteProject } from '../api/project.js'
import { getPortfolio } from '../api/user.js'
import { userId } from '../store/auth.js'
import { useRouter, useRoute } from 'vue-router'
import NavBar from '../components/NavBar.vue'

const router = useRouter()
const route = useRoute()
const validTabs = ['projects', 'applied', 'bookmarks', 'likes']
const activeMenu = ref(validTabs.includes(route.query.tab) ? route.query.tab : 'projects')

const user = ref({
  name: localStorage.getItem('userName') ?? '사용자',
  university: localStorage.getItem('userSchool') ?? '',
  department: localStorage.getItem('userDepartment') ?? '',
  techStack: [],
})

const menus = [
  { key: 'projects', label: '내 프로젝트' },
  { key: 'applied', label: '지원한 프로젝트' },
  { key: 'bookmarks', label: '북마크' },
  { key: 'likes', label: '좋아요' },
]

const myProjects = ref([])
const appliedProjects = ref([])
const bookmarkedProjects = ref([])
const likedProjects = ref([])

onMounted(async () => {
  try {
    const portfolio = await getPortfolio(userId.value)
    user.value.techStack = portfolio.techStacks ?? []
  } catch {}

  try {
    const all = await getProjects()
    const uid = String(userId.value)
    myProjects.value = (Array.isArray(all) ? all : []).filter(p =>
      String(p.userId) === uid || String(p.authorId) === uid
    )
  } catch {}

  try {
    const data = await getMyBookmarks()
    bookmarkedProjects.value = Array.isArray(data) ? data : []
  } catch {}

  try {
    const data = await getMyLikes()
    likedProjects.value = Array.isArray(data) ? data : []
  } catch {}

  try {
    const data = await getMyApplications()
    appliedProjects.value = Array.isArray(data) ? data : []
  } catch (e) {
    console.error('[내 신청 목록 실패]', e?.response?.status, e?.response?.data)
  }
})

async function handleDeleteProject(projectId) {
  if (!confirm('프로젝트를 삭제할까요?')) return
  try {
    await deleteProject(projectId, userId.value)
    myProjects.value = myProjects.value.filter(p => p.id !== projectId)
  } catch {}
}

async function handleCancelApplication(projectId, applicationId) {
  try {
    await cancelApplication(projectId, applicationId)
    appliedProjects.value = appliedProjects.value.filter(a => a.id !== applicationId)
  } catch {}
}
</script>
