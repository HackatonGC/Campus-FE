<template>
  <div style="min-height:100vh; background:#f4f4fd;">

    <!-- NAV -->
    <nav style="background:#fff; border-bottom:1px solid #e5e7eb; position:sticky; top:0; z-index:50;">
      <div style="max-width:1280px; margin:0 auto; padding:0 40px; height:68px; display:flex; align-items:center; justify-content:space-between;">
        <RouterLink to="/" style="display:flex; align-items:center; gap:12px; text-decoration:none;">
          <div style="width:44px; height:44px; background:#6366f1; border-radius:12px; display:flex; align-items:center; justify-content:center;">
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
              <path d="M25.66 4.36C25.14 4.12 24.57 4 24 4C23.43 4 22.86 4.12 22.34 4.36L5.2 12.16C4.85 12.32 4.54 12.57 4.33 12.9C4.12 13.22 4.01 13.6 4.01 13.99C4.01 14.38 4.12 14.76 4.33 15.08C4.54 15.41 4.85 15.66 5.2 15.82L22.36 23.64C22.88 23.88 23.45 24 24.02 24C24.59 24 25.16 23.88 25.68 23.64L42.84 15.84C43.2 15.68 43.5 15.43 43.71 15.1C43.92 14.78 44.03 14.4 44.03 14.01C44.03 13.62 43.92 13.24 43.71 12.92C43.5 12.59 43.2 12.34 42.84 12.18L25.66 4.36Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4 24C4 24.38 4.11 24.76 4.31 25.08C4.52 25.4 4.81 25.66 5.16 25.82L22.36 33.64C22.88 33.87 23.44 33.99 24.01 33.99C24.58 33.99 25.14 33.87 25.66 33.64L42.82 25.84C43.17 25.68 43.47 25.42 43.68 25.1C43.89 24.77 44 24.39 44 24" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4 34C4 34.38 4.11 34.76 4.31 35.08C4.52 35.4 4.81 35.66 5.16 35.82L22.36 43.64C22.88 43.87 23.44 43.99 24.01 43.99C24.58 43.99 25.14 43.87 25.66 43.64L42.82 35.84C43.17 35.68 43.47 35.42 43.68 35.1C43.89 34.77 44 34.39 44 34" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div>
            <div style="font-weight:700; font-size:16px; background:linear-gradient(to right,#6366f1,rgba(99,102,241,0.7)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">StackMate</div>
            <div style="color:#9ca3af; font-size:11px;">함께 성장하는 개발자</div>
          </div>
        </RouterLink>
        <div style="display:flex; align-items:center; gap:8px; cursor:pointer;">
          <div style="text-align:right;">
            <div style="font-weight:600; font-size:14px; color:#111827;">김개발</div>
            <div style="font-size:12px; color:#9ca3af;">가천대학교</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>
    </nav>

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
            <span v-if="project.isRecruiting" style="font-size:11px; background:#10b981; color:#fff; padding:2px 10px; border-radius:999px; font-weight:600;">모집중</span>
          </div>
          <div style="display:flex; gap:8px;">
            <button style="font-size:13px; padding:6px 14px; border-radius:8px; border:1px solid #e5e7eb; background:#fff; color:#374151; cursor:pointer; display:flex; align-items:center; gap:5px; font-weight:500;">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M11.333 2a1.886 1.886 0 0 1 2.667 2.667L5.333 13.333 2 14l.667-3.333L11.333 2z" stroke="#374151" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>
              수정
            </button>
            <button style="font-size:13px; padding:6px 14px; border-radius:8px; border:1px solid #fee2e2; background:#fff; color:#ef4444; cursor:pointer; display:flex; align-items:center; gap:5px; font-weight:500;">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5.333 4V2.667A1.333 1.333 0 0 1 6.667 1.333h2.666A1.333 1.333 0 0 1 10.667 2.667V4M12.667 4l-.667 9.333A1.333 1.333 0 0 1 10.667 14.667H5.333A1.333 1.333 0 0 1 4 13.333L3.333 4" stroke="#ef4444" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>
              삭제
            </button>
          </div>
        </div>
        <p style="font-size:13px; color:#6b7280; margin:0 0 12px;">{{ project.description }}</p>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">
          <span v-for="tech in project.techStack" :key="tech" style="font-size:12px; background:#ede9fe; color:#6366f1; padding:2px 10px; border-radius:999px;">{{ tech }}</span>
        </div>
      </div>

      <!-- 모집 현황 -->
      <div style="background:#fff; border-radius:16px; padding:24px; box-shadow:0 1px 4px rgba(0,0,0,0.06); margin-bottom:20px;">
        <h2 style="font-size:15px; font-weight:700; color:#111827; margin:0 0 16px;">모집 현황</h2>
        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:12px;">
          <div v-for="slot in project.slots" :key="slot.role"
            :style="slot.current >= slot.total
              ? 'background:#f0fdf4; border:1.5px solid #bbf7d0; border-radius:12px; padding:16px;'
              : 'background:#f9fafb; border:1.5px solid #f3f4f6; border-radius:12px; padding:16px;'"
          >
            <div style="font-size:13px; color:#6b7280; margin-bottom:6px;">{{ slot.role }}</div>
            <div style="font-size:24px; font-weight:700; color:#111827; margin-bottom:8px;">{{ slot.current }}/{{ slot.total }}</div>
            <span v-if="slot.current >= slot.total" style="font-size:11px; background:#10b981; color:#fff; padding:2px 10px; border-radius:999px; font-weight:600;">모집완료</span>
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
                  <span style="font-size:15px; font-weight:700; color:#111827;">{{ a.name }}</span>
                  <span :style="a.status === '검토중'
                    ? 'font-size:11px; background:#fef3c7; color:#d97706; padding:2px 8px; border-radius:999px; font-weight:600;'
                    : a.status === '승인됨'
                      ? 'font-size:11px; background:#d1fae5; color:#059669; padding:2px 8px; border-radius:999px; font-weight:600;'
                      : 'font-size:11px; background:#fee2e2; color:#ef4444; padding:2px 8px; border-radius:999px; font-weight:600;'">
                    {{ a.status }}
                  </span>
                </div>
                <!-- 소속 -->
                <div style="font-size:13px; color:#6b7280; margin-bottom:8px;">{{ a.university }} · {{ a.department }}</div>
                <!-- 자기소개 -->
                <p style="font-size:13px; color:#374151; margin:0 0 10px; line-height:1.6;">{{ a.introduction }}</p>
                <!-- 기술 스택 -->
                <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:10px;">
                  <span v-for="(tech, i) in a.techStack.slice(0,3)" :key="tech" style="font-size:12px; background:#ede9fe; color:#6366f1; padding:2px 8px; border-radius:999px;">{{ tech }}</span>
                  <span v-if="a.techStack.length > 3" style="font-size:12px; background:#f3f4f6; color:#6b7280; padding:2px 8px; border-radius:999px;">+{{ a.techStack.length - 3 }}</span>
                </div>
                <!-- 지원 정보 -->
                <div style="display:flex; align-items:center; gap:16px; font-size:12px; color:#9ca3af; margin-bottom:10px;">
                  <span>{{ a.role }} 지원</span>
                  <span>{{ a.date }}</span>
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
                <button style="font-size:13px; padding:6px 16px; border-radius:8px; border:1px solid #e5e7eb; background:#fff; color:#374151; cursor:pointer; font-weight:500; white-space:nowrap;">상세 보기</button>
                <div v-if="a.status === '검토중'" style="display:flex; gap:6px;">
                  <button @click="updateStatus(a.id, '거절됨')" style="font-size:13px; padding:6px 14px; border-radius:8px; border:1.5px solid #fca5a5; background:#fff; color:#ef4444; cursor:pointer; font-weight:600; display:flex; align-items:center; gap:4px;">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/></svg>
                    거절
                  </button>
                  <button @click="updateStatus(a.id, '승인됨')" style="font-size:13px; padding:6px 14px; border-radius:8px; border:none; background:#10b981; color:#fff; cursor:pointer; font-weight:600; display:flex; align-items:center; gap:4px;">
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
import { ref, computed } from 'vue'

const project = {
  title: 'AI 기반 학습 관리 시스템',
  isRecruiting: true,
  description: '학생들의 학습 패턴을 분석하고 맞춤형 학습 경로를 추천하는 플랫폼',
  techStack: ['React', 'TypeScript', 'Python', 'TensorFlow'],
  slots: [
    { role: 'Frontend', current: 1, total: 2 },
    { role: 'Backend', current: 1, total: 1 },
    { role: 'AI Engineer', current: 0, total: 1 },
  ],
}

const applicants = ref([
  { id: 1, name: '이프론트', status: '검토중', university: '연세대학교', department: '컴퓨터과학과', introduction: 'React와 TypeScript를 활용한 프론트엔드 개발 경험이 3년 있습니다. 사용자 경험을 최우선으로 생각하며, 성능 최적화에 관심이 많습니다.', techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind'], role: 'Frontend', date: '2024-03-15', github: true, portfolio: true },
  { id: 2, name: '박백엔드', status: '승인됨', university: '고려대학교', department: '소프트웨어학과', introduction: 'Spring Boot와 Python을 사용한 백엔드 개발 경험이 있습니다. RESTful API 설계와 데이터베이스 최적화에 강점이 있습니다.', techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'], role: 'Backend', date: '2024-03-14', github: true, portfolio: false },
  { id: 3, name: '최인공', status: '검토중', university: 'KAIST', department: '인공지능학과', introduction: '머신러닝과 딥러닝 모델 개발 경험이 있습니다. TensorFlow와 PyTorch를 활용한 다양한 프로젝트를 진행했습니다.', techStack: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn'], role: 'AI Engineer', date: '2024-03-16', github: true, portfolio: true },
  { id: 4, name: '김리액트', status: '거절됨', university: '서울대학교', department: '전기정보공학부', introduction: 'UI/UX에 관심이 많고, 반응형 웹 개발에 능숙합니다. 컴포넌트 재사용성과 코드 품질을 중요하게 생각합니다.', techStack: ['React', 'TypeScript', 'Redux', 'Styled-components'], role: 'Frontend', date: '2024-03-13', github: true, portfolio: false },
])

const activeTab = ref('전체')

const tabs = computed(() => {
  const roles = [...new Set(applicants.value.map(a => a.role))]
  return [
    { key: '전체', label: `전체 (${applicants.value.length})` },
    ...roles.map(r => ({ key: r, label: `${r} (${applicants.value.filter(a => a.role === r).length})` })),
  ]
})

const filteredApplicants = computed(() =>
  activeTab.value === '전체' ? applicants.value : applicants.value.filter(a => a.role === activeTab.value)
)

function updateStatus(id, status) {
  const a = applicants.value.find(a => a.id === id)
  if (a) a.status = status
}
</script>
