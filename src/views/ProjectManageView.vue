<template>
  <div style="min-height:100vh; background:#f4f4fd;">

    <NavBar />

    <!-- BODY -->
    <div style="max-width:960px; margin:0 auto; padding:32px 40px;">

      <!-- 뒤로가기 + 타이틀 -->
      <RouterLink to="/mypage" style="display:inline-flex; align-items:center; gap:6px; font-size:13px; color:#6b7280; text-decoration:none; margin-bottom:16px;">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="#6b7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        내 프로젝트로 돌아가기
      </RouterLink>
      <h1 style="font-size:22px; font-weight:700; color:#111827; margin:0 0 24px;">프로젝트 관리</h1>

      <!-- 프로젝트 정보 카드 -->
      <div style="background:#fff; border-radius:16px; padding:24px; box-shadow:0 1px 4px rgba(0,0,0,0.06); margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:18px; font-weight:700; color:#111827;">{{ project.title }}</span>
            <span v-if="project.status === 'RECRUITING'" style="font-size:11px; background:#10b981; color:#fff; padding:2px 10px; border-radius:999px; font-weight:600;">모집중</span>
          </div>
          <div style="display:flex; gap:8px;">
            <RouterLink :to="`/project/${project.status === 'RECRUITING' ? 'recruit' : 'complete'}/${route.params.id}/edit`" style="font-size:13px; padding:6px 14px; border-radius:8px; border:1px solid #e5e7eb; background:#fff; color:#374151; cursor:pointer; display:flex; align-items:center; gap:5px; font-weight:500; text-decoration:none;">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M11.333 2a1.886 1.886 0 0 1 2.667 2.667L5.333 13.333 2 14l.667-3.333L11.333 2z" stroke="#374151" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>
              수정
            </RouterLink>
            <button @click="handleDelete" style="font-size:13px; padding:6px 14px; border-radius:8px; border:1px solid #fee2e2; background:#fff; color:#ef4444; cursor:pointer; display:flex; align-items:center; gap:5px; font-weight:500;">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5.333 4V2.667A1.333 1.333 0 0 1 6.667 1.333h2.666A1.333 1.333 0 0 1 10.667 2.667V4M12.667 4l-.667 9.333A1.333 1.333 0 0 1 10.667 14.667H5.333A1.333 1.333 0 0 1 4 13.333L3.333 4" stroke="#ef4444" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>
              삭제
            </button>
          </div>
        </div>
        <p style="font-size:13px; color:#6b7280; margin:0 0 12px;">{{ project.description }}</p>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">
          <span v-for="tech in (project.techStacks ?? [])" :key="tech" style="font-size:12px; background:#ede9fe; color:#6366f1; padding:2px 10px; border-radius:999px;">{{ tech }}</span>
        </div>
      </div>

      <!-- 모집 현황 -->
      <div v-if="(project.recruitments ?? []).length" style="background:#fff; border-radius:16px; padding:24px; box-shadow:0 1px 4px rgba(0,0,0,0.06); margin-bottom:20px;">
        <h2 style="font-size:15px; font-weight:700; color:#111827; margin:0 0 16px;">모집 현황</h2>
        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:12px;">
          <div v-for="r in project.recruitments" :key="r.role"
            :style="(r.acceptedCount ?? 0) >= r.count
              ? 'background:#f0fdf4; border:1.5px solid #bbf7d0; border-radius:12px; padding:16px;'
              : 'background:#f9fafb; border:1.5px solid #f3f4f6; border-radius:12px; padding:16px;'"
          >
            <div style="font-size:13px; color:#6b7280; margin-bottom:6px;">{{ r.role }}</div>
            <div style="font-size:24px; font-weight:700; color:#111827; margin-bottom:8px;">{{ r.acceptedCount ?? 0 }}/{{ r.count }}</div>
            <span v-if="(r.acceptedCount ?? 0) >= r.count" style="font-size:11px; background:#10b981; color:#fff; padding:2px 10px; border-radius:999px; font-weight:600;">모집완료</span>
            <span v-else style="font-size:11px; color:#9ca3af;">{{ r.count - (r.acceptedCount ?? 0) }}명 남음</span>
          </div>
        </div>
      </div>

      <!-- 지원자 관리 -->
      <div style="background:#fff; border-radius:16px; padding:24px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <h2 style="font-size:15px; font-weight:700; color:#111827; margin:0;">지원자 관리</h2>
          <div style="display:flex; align-items:center; gap:6px; font-size:13px; color:#6b7280;">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M13.333 14v-1.333A2.667 2.667 0 0 0 10.667 10H5.333A2.667 2.667 0 0 0 2.667 12.667V14M8 7.333A2.667 2.667 0 1 0 8 2a2.667 2.667 0 0 0 0 5.333z" stroke="#6b7280" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>
            총 {{ applicants.length }}명
          </div>
        </div>

        <!-- 필터 탭 -->
        <div style="display:flex; gap:8px; margin-bottom:20px; flex-wrap:wrap;">
          <button v-for="tab in tabs" :key="tab.key"
            @click="activeTab = tab.key"
            :style="activeTab === tab.key
              ? 'font-size:13px; padding:6px 16px; border-radius:999px; border:none; background:#6366f1; color:#fff; cursor:pointer; font-weight:600;'
              : 'font-size:13px; padding:6px 16px; border-radius:999px; border:1.5px solid #e5e7eb; background:#fff; color:#374151; cursor:pointer; font-weight:500;'"
          >{{ tab.label }}</button>
        </div>

        <!-- 지원자 카드 목록 -->
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div v-for="a in filteredApplicants" :key="a.id"
            style="border:1px solid #f3f4f6; border-radius:12px; padding:18px;"
          >
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div style="flex:1; min-width:0;">
                <!-- 이름 + 상태 -->
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                  <span style="font-size:15px; font-weight:700; color:#111827;">{{ a.userName }}</span>
                  <span :style="a.status === 'PENDING'
                    ? 'font-size:11px; background:#fef3c7; color:#d97706; padding:2px 8px; border-radius:999px; font-weight:600;'
                    : a.status === 'ACCEPTED'
                      ? 'font-size:11px; background:#d1fae5; color:#059669; padding:2px 8px; border-radius:999px; font-weight:600;'
                      : 'font-size:11px; background:#fee2e2; color:#ef4444; padding:2px 8px; border-radius:999px; font-weight:600;'">
                    {{ a.status === 'PENDING' ? '검토중' : a.status === 'ACCEPTED' ? '승인됨' : '거절됨' }}
                  </span>
                </div>
                <!-- 소속 -->
                <!-- 자기소개 -->
                <p style="font-size:13px; color:#374151; margin:0 0 10px; line-height:1.6;">{{ a.message }}</p>
                <!-- 기술 스택 -->
                <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:10px;">
                  <span v-for="tech in (a.techStacks ?? []).slice(0,3)" :key="tech" style="font-size:12px; background:#ede9fe; color:#6366f1; padding:2px 8px; border-radius:999px;">{{ tech }}</span>
                  <span v-if="(a.techStacks ?? []).length > 3" style="font-size:12px; background:#f3f4f6; color:#6b7280; padding:2px 8px; border-radius:999px;">+{{ a.techStacks.length - 3 }}</span>
                </div>
                <!-- 지원 정보 -->
                <div style="display:flex; align-items:center; gap:16px; font-size:12px; color:#9ca3af; margin-bottom:10px;">
                  <span v-if="a.role">{{ a.role }} 지원</span>
                  <span>{{ a.createdAt?.slice(0,10) }}</span>
                </div>
                <!-- 링크 -->
                <div style="display:flex; gap:12px;">
                  <a v-if="a.github" href="#" style="font-size:12px; color:#6366f1; text-decoration:none; display:flex; align-items:center; gap:4px;">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 1.333A6.67 6.67 0 0 0 1.333 8c0 2.946 1.912 5.44 4.559 6.32.333.06.454-.146.454-.323v-1.13c-1.853.4-2.247-.896-2.247-.896-.303-.77-.74-1.04-.74-1.04-.605-.413.046-.405.046-.405.669.047 1.02.687 1.02.687.595 1.02 1.561.725 1.941.554.06-.43.233-.725.424-.892-1.48-.168-3.034-.74-3.034-3.293 0-.727.26-1.323.687-1.788-.069-.168-.297-.847.065-1.766 0 0 .56-.179 1.834.683A6.4 6.4 0 0 1 8 4.67c.567.003 1.138.077 1.671.226 1.274-.862 1.833-.683 1.833-.683.363.919.135 1.598.066 1.766.428.465.686 1.06.686 1.788 0 2.56-1.557 3.123-3.04 3.288.239.206.451.612.451 1.234v1.83c0 .178.12.386.458.32A6.672 6.672 0 0 0 14.667 8 6.67 6.67 0 0 0 8 1.333z" fill="#6366f1"/></svg>
                    GitHub
                  </a>
                  <a v-if="a.portfolio" href="#" style="font-size:12px; color:#6366f1; text-decoration:none; display:flex; align-items:center; gap:4px;">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M14 8.667A6 6 0 0 1 8 14M14 8.667A6 6 0 0 0 8 3M14 8.667H2M8 14A6 6 0 0 1 2 8.667M8 14c.667 0 2-2.667 2-5.333S8.667 3 8 3m0 11c-.667 0-2-2.667-2-5.333S7.333 3 8 3M2 8.667A6 6 0 0 1 8 3" stroke="#6366f1" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    Portfolio
                  </a>
                </div>
              </div>

              <!-- 우측 버튼 -->
              <div style="display:flex; flex-direction:column; align-items:flex-end; gap:8px; margin-left:20px; flex-shrink:0;">
                <RouterLink :to="`/user/${a.userId}`" style="font-size:13px; padding:6px 16px; border-radius:8px; border:1px solid #e5e7eb; background:#fff; color:#374151; cursor:pointer; font-weight:500; white-space:nowrap; text-decoration:none; display:inline-block;">상세 보기</RouterLink>
                <div v-if="a.status === 'PENDING'" style="display:flex; gap:6px;">
                  <button @click="updateStatus(a.id, 'REJECTED')" style="font-size:13px; padding:6px 14px; border-radius:8px; border:1.5px solid #fca5a5; background:#fff; color:#ef4444; cursor:pointer; font-weight:600; display:flex; align-items:center; gap:4px;">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/></svg>
                    거절
                  </button>
                  <button @click="updateStatus(a.id, 'ACCEPTED')" style="font-size:13px; padding:6px 14px; border-radius:8px; border:none; background:#10b981; color:#fff; cursor:pointer; font-weight:600; display:flex; align-items:center; gap:4px;">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M10.5 3.5L5 9 2.5 6.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    승인
                  </button>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProject, getProjectApplications, updateApplicationStatus, deleteProject } from '../api/project.js'
import { userId } from '../store/auth.js'
import NavBar from '../components/NavBar.vue'

const route = useRoute()
const router = useRouter()
const project = ref({})
const applicants = ref([])

onMounted(async () => {
  try {
    project.value = await getProject(route.params.id)
  } catch {}
  try {
    const data = await getProjectApplications(route.params.id)
    applicants.value = Array.isArray(data) ? data : []
    console.log('[지원자 데이터]', applicants.value[0])
  } catch {}
})

const activeTab = ref('전체')

const tabs = computed(() => [
  { key: '전체', label: `전체 (${applicants.value.length})` },
  { key: 'PENDING', label: `검토중 (${applicants.value.filter(a => a.status === 'PENDING').length})` },
  { key: 'ACCEPTED', label: `승인됨 (${applicants.value.filter(a => a.status === 'ACCEPTED').length})` },
  { key: 'REJECTED', label: `거절됨 (${applicants.value.filter(a => a.status === 'REJECTED').length})` },
])

const filteredApplicants = computed(() =>
  activeTab.value === '전체' ? applicants.value : applicants.value.filter(a => a.status === activeTab.value)
)

async function handleDelete() {
  if (!confirm('프로젝트를 삭제할까요?')) return
  try {
    await deleteProject(route.params.id, userId.value)
    router.push('/mypage')
  } catch (e) {
    console.error('[삭제 실패]', e?.response?.status, e?.response?.data)
    alert('삭제에 실패했습니다.')
  }
}

async function updateStatus(applicationId, status) {
  try {
    await updateApplicationStatus(route.params.id, applicationId, status)
    const a = applicants.value.find(a => a.id === applicationId)
    if (a) a.status = status
  } catch (e) {
    console.error('[지원 상태 변경 실패]', e?.response?.status, e?.response?.data)
    alert(`처리 실패: ${e?.response?.status ?? '알 수 없는 오류'}`)
  }
}
</script>
