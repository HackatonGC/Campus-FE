<template>
  <div style="min-height:100vh; background:#f4f4fd;">

    <NavBar />

    <!-- ===== HERO ===== -->
    <section style="background:#fff; padding:32px 40px 36px; text-align:center;">
      <div style="max-width:1280px; margin:0 auto;">
        <h1 style="font-size:40px; font-weight:800; color:#111827; margin:0 0 12px; letter-spacing:-1px;">프로젝트 메이트를 만나보세요</h1>
        <p style="font-size:15px; color:#6B7280; line-height:1.7; margin:0 0 20px;">
          실제 경험과 노하우가 담긴 프로젝트를 탐색하고,<br />
          코드 리뷰를 받으며 함께 성장할 팀원을 찾아보세요
        </p>
        <!-- 검색바 -->
        <div style="display:flex; justify-content:center; margin-bottom:0;">
          <div style="position:relative; width:680px; max-width:100%;">
            <svg style="position:absolute; left:18px; top:50%; transform:translateY(-50%); width:18px; height:18px; color:#818cf8;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="프로젝트, 기술 스택 검색... (띄어쓰기 무시)"
              style="width:100%; padding:16px 20px 16px 50px; border-radius:16px; border:1.5px solid #c7d2fe; font-size:14px; color:#374151; background:#fff; outline:none; box-sizing:border-box;"
            />
          </div>
        </div>
      </div>
    </section>


    <!-- ===== 검색 통계 ===== -->
    <div v-if="searchQuery" style="background:#f4f4fd; padding:24px 40px 0;">
      <div style="max-width:1280px; margin:0 auto; display:grid; grid-template-columns:repeat(3,1fr); gap:16px;">
        <div style="background:#fff; border-radius:16px; padding:24px; text-align:center; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
          <div style="font-size:32px; font-weight:800; color:#6366f1; margin-bottom:4px;">{{ projects.length }}</div>
          <div style="font-size:13px; color:#6b7280;">검색 결과</div>
        </div>
        <div style="background:#fff; border-radius:16px; padding:24px; text-align:center; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
          <div style="font-size:32px; font-weight:800; color:#10b981; margin-bottom:4px;">{{ projects.filter(p => p.status === 'RECRUITING').length }}</div>
          <div style="font-size:13px; color:#6b7280;">팀원 모집중</div>
        </div>
        <div style="background:#fff; border-radius:16px; padding:24px; text-align:center; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
          <div style="font-size:32px; font-weight:800; color:#9ca3af; margin-bottom:4px;">{{ projects.filter(p => p.status !== 'RECRUITING').length }}</div>
          <div style="font-size:13px; color:#6b7280;">완료된 프로젝트</div>
        </div>
      </div>
    </div>

    <!-- ===== BODY ===== -->
    <div style="max-width:1280px; margin:0 auto; padding:24px 40px 60px; display:flex; gap:32px; align-items:flex-start;">

      <!-- 사이드바 -->
      <aside style="width:240px; flex-shrink:0;">
        <div style="background:#fff; border-radius:16px; border:1px solid #e5e7eb; padding:24px; margin-bottom:16px;">
          <div style="display:flex; align-items:center; gap:8px; font-size:15px; font-weight:700; color:#111827; margin-bottom:20px;">
            <img :src="iconFilter" style="width:16px; height:16px;" alt="" /> 필터
          </div>
          <div style="font-size:13px; font-weight:600; color:#6b7280; margin-bottom:12px; text-transform:uppercase; letter-spacing:0.05em;">기술 스택</div>
          <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px;">
            <button
              v-for="tech in techOptions"
              :key="tech"
              @click="toggleTag(tech)"
              :style="selectedTags.includes(tech)
                ? 'padding:5px 12px; border-radius:999px; font-size:12px; border:1px solid #6366f1; background:#6366f1; color:#fff; cursor:pointer;'
                : 'padding:5px 12px; border-radius:999px; font-size:12px; border:1px solid #c7d2fe; background:#F0F1FF; color:#4338CA; cursor:pointer;'"
            >
              {{ tech }}
            </button>
          </div>
        </div>
        <RouterLink
          to="/project/new"
          style="display:block; width:100%; padding:14px; border-radius:12px; font-size:14px; font-weight:600; background:#6366f1; color:#fff; text-align:center; text-decoration:none; box-sizing:border-box;"
        >
          + 프로젝트 등록
        </RouterLink>
      </aside>

      <!-- 메인 -->
      <main style="flex:1; min-width:0;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
          <span style="font-size:14px; color:#9ca3af;">{{ projects.length }}개의 프로젝트</span>
          <div style="display:flex; gap:8px;">
            <select v-model="statusFilter" style="font-size:13px; color:#374151; border:1px solid #e5e7eb; border-radius:8px; padding:6px 12px; background:#fff; outline:none; cursor:pointer;">
              <option value="">전체</option>
              <option value="RECRUITING">모집중인 프로젝트</option>
              <option value="COMPLETED">공유된 프로젝트</option>
            </select>
            <select v-model="sortOrder" style="font-size:13px; color:#374151; border:1px solid #e5e7eb; border-radius:8px; padding:6px 12px; background:#fff; outline:none; cursor:pointer;">
              <option value="latest">최신순</option>
              <option value="popular">인기순</option>
            </select>
          </div>
        </div>

        <div v-if="projects.length === 0" style="text-align:center; color:#9ca3af; padding:80px 0; font-size:14px;">
          조건에 맞는 프로젝트가 없어요.
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
          <div
            v-for="project in projects"
            :key="project.id"
            style="background:#fff; border-radius:18px; overflow:hidden; display:flex; flex-direction:column; transition:box-shadow 0.2s, transform 0.2s; border:1.5px solid #f0f1ff;"
            @mouseenter="e => { e.currentTarget.style.boxShadow='0 8px 28px rgba(99,102,241,0.12)'; e.currentTarget.style.transform='translateY(-2px)' }"
            @mouseleave="e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }"
          >
            <!-- 썸네일 -->
            <div style="position:relative;">
              <img v-if="project.thumbnailUrl" :src="project.thumbnailUrl" :alt="project.title" style="width:100%; height:180px; object-fit:cover;" />
              <div v-else style="width:100%; height:180px; background:linear-gradient(135deg,#ede9fe,#dbeafe); display:flex; align-items:center; justify-content:center;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </div>
              <!-- 상태 뱃지 -->
              <span v-if="project.status === 'RECRUITING'"
                style="position:absolute; top:12px; left:12px; background:#6366f1; color:#fff; font-size:11px; font-weight:700; padding:4px 10px; border-radius:999px; display:flex; align-items:center; gap:4px;">
                <span style="width:6px; height:6px; background:#fff; border-radius:50%; display:inline-block; animation:pulse 1.5s infinite;"></span>
                팀원 모집중
              </span>
              <span v-else-if="project.status === 'COMPLETED'"
                style="position:absolute; top:12px; left:12px; background:#10b981; color:#fff; font-size:11px; font-weight:700; padding:4px 10px; border-radius:999px;">
                ✓ 완료
              </span>
              <!-- 북마크 -->
              <button @click.prevent="toggleBookmark(project.id)"
                style="position:absolute; top:10px; right:10px; background:rgba(255,255,255,0.9); border:none; cursor:pointer; width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(4px);">
                <svg style="width:16px; height:16px;" :fill="bookmarkedIds[project.id] ? '#10b981' : 'none'" :stroke="bookmarkedIds[project.id] ? '#10b981' : '#9ca3af'" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
              </button>
            </div>

            <!-- 내용 -->
            <div style="padding:20px; display:flex; flex-direction:column; flex:1;">
              <!-- 작성자 -->
              <div style="display:flex; align-items:center; gap:6px; margin-bottom:10px;">
                <div style="width:22px; height:22px; border-radius:50%; background:#ede9fe; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; color:#6366f1; flex-shrink:0;">
                  {{ (project.authorName ?? '?').charAt(0) }}
                </div>
                <span style="font-size:12px; color:#9ca3af;">{{ project.authorName }}</span>
                <span v-if="project.authorSchool" style="font-size:11px; color:#d1d5db;">· {{ project.authorSchool }}</span>
              </div>

              <!-- 제목 -->
              <h3 style="font-size:16px; font-weight:700; color:#111827; margin:0 0 6px; line-height:1.4;">{{ project.title }}</h3>
              <p style="font-size:13px; color:#6b7280; line-height:1.6; margin:0 0 12px; flex:1; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">{{ project.summary }}</p>

              <!-- 기술스택 -->
              <div style="display:flex; flex-wrap:wrap; gap:5px; margin-bottom:14px;">
                <span v-for="tech in (project.techStacks ?? []).slice(0,3)" :key="tech"
                  style="font-size:11px; padding:3px 10px; border-radius:999px; border:1px solid #c7d2fe; color:#4338CA; background:#F0F1FF;">
                  {{ tech }}
                </span>
                <span v-if="(project.techStacks ?? []).length > 3" style="font-size:11px; color:#9ca3af; display:flex; align-items:center;">
                  +{{ (project.techStacks ?? []).length - 3 }}
                </span>
              </div>

              <!-- 모집중 전용 정보 -->
              <div v-if="project.status === 'RECRUITING'" style="background:#f5f3ff; border-radius:10px; padding:10px 12px; margin-bottom:14px; display:flex; flex-direction:column; gap:5px;">
                <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
                  <span v-if="project.meetingType" style="font-size:11px; color:#6366f1; font-weight:600; display:flex; align-items:center; gap:3px;">
                    {{ project.meetingType === 'ONLINE' ? '🖥️ 온라인' : project.meetingType === 'OFFLINE' ? '🤝 오프라인' : '⚡ 혼합' }}
                  </span>
                  <span v-if="project.duration" style="font-size:11px; color:#6b7280;">⏱ {{ project.duration }}</span>
                  <span v-if="project.deadline" style="font-size:11px; color:#ef4444; font-weight:500;">📅 {{ project.deadline }} 마감</span>
                </div>
              </div>

              <!-- 완료 전용 정보 -->
              <div v-else-if="project.status === 'COMPLETED'" style="background:#f0fdf4; border-radius:10px; padding:10px 12px; margin-bottom:14px; display:flex; flex-direction:column; gap:5px;">
                <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
                  <span style="font-size:11px; color:#059669; font-weight:600;">
                    {{ project.projectType === 'TEAM' ? '👥 팀 프로젝트' : '👤 개인 프로젝트' }}
                  </span>
                  <span v-if="project.startDate && project.endDate" style="font-size:11px; color:#6b7280;">
                    📆 {{ project.startDate?.slice(0,7) }} ~ {{ project.endDate?.slice(0,7) }}
                  </span>
                </div>
              </div>

              <!-- 하단 -->
              <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px solid #f3f4f6; padding-top:12px;">
                <div style="display:flex; align-items:center; gap:10px; font-size:11px; color:#9ca3af;">
                  <span>👁 {{ project.viewCount ?? 0 }}</span>
                  <span>❤️ {{ project.likeCount ?? 0 }}</span>
                </div>
                <RouterLink :to="`/project/${project.id}`"
                  :style="`font-size:12px; font-weight:600; padding:6px 14px; border-radius:8px; text-decoration:none; color:#fff; background:${project.status === 'RECRUITING' ? '#6366f1' : '#10b981'};`">
                  자세히 보기
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

  <!-- 토스트 -->
  <transition name="home-toast">
    <div
      v-if="toast.show"
      style="position:fixed; top:84px; left:50%; transform:translateX(-50%); background:#10b981; color:#fff; font-size:14px; font-weight:600; padding:14px 28px; border-radius:12px; z-index:100; white-space:nowrap; display:flex; align-items:center; gap:8px; box-shadow:0 4px 20px rgba(16,185,129,0.35);"
    >
      <svg style="width:18px; height:18px; flex-shrink:0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
      </svg>
      {{ toast.message }}
    </div>
  </transition>

  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { techOptions } from '../data/dummy.js'
import { getProjects, getPopularTags, addBookmark, removeBookmark } from '../api/project.js'
import { isLoggedIn, clearAuth } from '../store/auth.js'
import iconBookmark from '../assets/Icon (10).svg'
import iconLike     from '../assets/Icon (9).svg'
import iconTrend   from '../assets/Icon (5).svg'
import iconFilter  from '../assets/Icon (6).svg'
import NavBar from '../components/NavBar.vue'

const searchQuery = ref('')
const selectedTags = ref([])
const onlyRecruiting = ref(false)
const statusFilter = ref('')
const sortOrder = ref('latest')
const toast = ref({ show: false, message: '' })
const projects = ref([])

async function fetchProjects() {
  const params = {}
  if (searchQuery.value) params.keyword = searchQuery.value
  if (selectedTags.value.length) params.techStack = selectedTags.value
  if (statusFilter.value) params.status = statusFilter.value
  if (sortOrder.value) params.sort = sortOrder.value
  try {
    const data = await getProjects(params)
    projects.value = Array.isArray(data) ? data : []
  } catch {
    projects.value = []
  }
}

let searchTimer = null
watch(searchQuery, () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(fetchProjects, 300)
})
watch([selectedTags, sortOrder, statusFilter], fetchProjects)

onMounted(async () => {
  if (history.state?.registered) {
    toast.value = { show: true, message: '프로젝트가 등록되었습니다! 🎉' }
    setTimeout(() => { toast.value.show = false }, 3000)
    history.replaceState({}, '')
  }
  fetchProjects()
})

const bookmarkedIds = reactive({})

async function toggleBookmark(projectId) {
  try {
    if (bookmarkedIds[projectId]) {
      await removeBookmark(projectId)
    } else {
      await addBookmark(projectId)
    }
    bookmarkedIds[projectId] = !bookmarkedIds[projectId]
  } catch (e) {
    console.error('[북마크 실패]', e?.response?.status)
  }
}

function toggleTag(tag) {
  const idx = selectedTags.value.indexOf(tag)
  if (idx === -1) selectedTags.value.push(tag)
  else selectedTags.value.splice(idx, 1)
}
</script>

<style scoped>
.home-toast-enter-active, .home-toast-leave-active { transition: opacity 0.25s, transform 0.25s; }
.home-toast-enter-from, .home-toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(-10px); }
</style>
