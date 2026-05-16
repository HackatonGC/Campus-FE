<template>
  <div style="min-height:100vh; background:#f4f4fd;">

    <!-- NAV -->
    <nav style="background:#fff; border-bottom:1px solid #e5e7eb; position:sticky; top:0; z-index:50;">
      <div style="max-width:1280px; margin:0 auto; padding:0 40px; height:68px; display:flex; align-items:center; justify-content:space-between;">
        <RouterLink to="/" style="display:flex; align-items:center; gap:12px; text-decoration:none;">
          <div style="width:44px; height:44px; background:#6366f1; border-radius:12px; display:flex; align-items:center; justify-content:center;">
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none"><path d="M25.66 4.36C25.14 4.12 24.57 4 24 4C23.43 4 22.86 4.12 22.34 4.36L5.2 12.16C4.85 12.32 4.54 12.57 4.33 12.9C4.12 13.22 4.01 13.6 4.01 13.99C4.01 14.38 4.12 14.76 4.33 15.08C4.54 15.41 4.85 15.66 5.2 15.82L22.36 23.64C22.88 23.88 23.45 24 24.02 24C24.59 24 25.16 23.88 25.68 23.64L42.84 15.84C43.2 15.68 43.5 15.43 43.71 15.1C43.92 14.78 44.03 14.4 44.03 14.01C44.03 13.62 43.92 13.24 43.71 12.92C43.5 12.59 43.2 12.34 42.84 12.18L25.66 4.36Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 24C4 24.38 4.11 24.76 4.31 25.08C4.52 25.4 4.81 25.66 5.16 25.82L22.36 33.64C22.88 33.87 23.44 33.99 24.01 33.99C24.58 33.99 25.14 33.87 25.66 33.64L42.82 25.84C43.17 25.68 43.47 25.42 43.68 25.1C43.89 24.77 44 24.39 44 24" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 34C4 34.38 4.11 34.76 4.31 35.08C4.52 35.4 4.81 35.66 5.16 35.82L22.36 43.64C22.88 43.87 23.44 43.99 24.01 43.99C24.58 43.99 25.14 43.87 25.66 43.64L42.82 35.84C43.17 35.68 43.47 35.42 43.68 35.1C43.89 34.77 44 34.39 44 34" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div>
            <div style="font-weight:700; font-size:16px; background:linear-gradient(to right,#6366f1,rgba(99,102,241,0.7)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">StackMate</div>
            <div style="color:#9ca3af; font-size:11px;">함께 성장하는 개발자</div>
          </div>
        </RouterLink>
        <RouterLink to="/project/new" style="font-size:14px; color:#6b7280; text-decoration:none;">← 유형 선택으로</RouterLink>
      </div>
    </nav>

    <div style="max-width:760px; margin:0 auto; padding:48px 40px 80px;">

      <!-- 헤더 -->
      <div style="margin-bottom:36px;">
        <div style="display:inline-flex; align-items:center; gap:8px; background:#ede9fe; color:#6366f1; font-size:13px; font-weight:600; padding:6px 14px; border-radius:999px; margin-bottom:14px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          팀원 모집
        </div>
        <h1 style="font-size:28px; font-weight:800; color:#111827; margin:0 0 8px;">함께할 팀원을 모집해요</h1>
        <p style="font-size:15px; color:#9ca3af; margin:0;">구체적으로 작성할수록 좋은 팀원을 만날 수 있어요</p>
      </div>

      <!-- 기본 정보 -->
      <div style="background:#fff; border-radius:20px; padding:32px; box-shadow:0 1px 4px rgba(0,0,0,0.06); margin-bottom:20px;">
        <h2 style="font-size:16px; font-weight:700; color:#111827; margin:0 0 24px; display:flex; align-items:center; gap:8px;">
          <span style="width:28px; height:28px; background:#6366f1; color:#fff; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700;">1</span>
          기본 정보
        </h2>

        <!-- 대표 이미지 -->
        <div style="margin-bottom:24px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">대표 이미지</label>
          <div v-if="thumbnailPreview" style="position:relative; margin-bottom:8px;">
            <img :src="thumbnailPreview" style="width:100%; height:200px; object-fit:cover; border-radius:12px;" />
            <button @click="thumbnailPreview=''; form.thumbnailUrl=''" style="position:absolute; top:10px; right:10px; background:rgba(0,0,0,0.5); color:#fff; border:none; border-radius:8px; padding:4px 10px; font-size:12px; cursor:pointer;">제거</button>
          </div>
          <label v-else style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:140px; border:2px dashed #c7d2fe; border-radius:12px; cursor:pointer; background:#fafbff; gap:8px; color:#6366f1;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span style="font-size:13px; font-weight:500;">이미지 업로드</span>
            <input type="file" accept="image/*" style="display:none;" @change="onThumbnailChange" />
          </label>
        </div>

        <!-- 제목 -->
        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">프로젝트 제목 <span style="color:#6366f1;">*</span></label>
          <input v-model="form.title" type="text" placeholder="프로젝트 이름을 입력하세요" style="width:100%; height:48px; padding:0 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; outline:none; box-sizing:border-box; background:#fafafa;" @focus="e=>e.target.style.borderColor='#6366f1'" @blur="e=>e.target.style.borderColor='#e5e7eb'" />
        </div>

        <!-- 한 줄 소개 -->
        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">한 줄 소개 <span style="color:#6366f1;">*</span></label>
          <input v-model="form.summary" type="text" placeholder="프로젝트를 한 줄로 소개해주세요" maxlength="80" style="width:100%; height:48px; padding:0 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; outline:none; box-sizing:border-box; background:#fafafa;" @focus="e=>e.target.style.borderColor='#6366f1'" @blur="e=>e.target.style.borderColor='#e5e7eb'" />
        </div>

        <!-- 상세 설명 -->
        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">프로젝트 상세 설명 <span style="color:#6366f1;">*</span></label>
          <textarea v-model="form.description" rows="5" placeholder="어떤 프로젝트인지, 목표가 무엇인지 자세히 설명해주세요" style="width:100%; padding:14px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; outline:none; box-sizing:border-box; resize:vertical; line-height:1.7; background:#fafafa;" @focus="e=>e.target.style.borderColor='#6366f1'" @blur="e=>e.target.style.borderColor='#e5e7eb'"></textarea>
        </div>

        <!-- 기술 스택 -->
        <div>
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">기술 스택 <span style="color:#6366f1;">*</span></label>
          <div style="display:flex; flex-wrap:wrap; gap:8px; padding:14px; border:1.5px solid #e5e7eb; border-radius:12px; background:#fafafa;">
            <button v-for="tech in techOptions" :key="tech" type="button" @click="toggleTech(tech)"
              :style="form.techStacks.includes(tech)
                ? 'padding:5px 14px; border-radius:999px; font-size:13px; border:1.5px solid #6366f1; background:#ede9fe; color:#6366f1; cursor:pointer; font-weight:500;'
                : 'padding:5px 14px; border-radius:999px; font-size:13px; border:1.5px solid #e5e7eb; background:#fff; color:#6b7280; cursor:pointer;'">
              {{ tech }}
            </button>
          </div>
        </div>
      </div>

      <!-- 진행 정보 -->
      <div style="background:#fff; border-radius:20px; padding:32px; box-shadow:0 1px 4px rgba(0,0,0,0.06); margin-bottom:20px;">
        <h2 style="font-size:16px; font-weight:700; color:#111827; margin:0 0 24px; display:flex; align-items:center; gap:8px;">
          <span style="width:28px; height:28px; background:#6366f1; color:#fff; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700;">2</span>
          프로젝트 진행 정보
        </h2>

        <!-- 예상 진행 기간 -->
        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">예상 진행 기간 <span style="color:#6366f1;">*</span></label>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            <button v-for="d in durationOptions" :key="d" type="button" @click="form.duration = d"
              :style="form.duration === d
                ? 'padding:8px 20px; border-radius:10px; font-size:13px; font-weight:600; border:1.5px solid #6366f1; background:#ede9fe; color:#6366f1; cursor:pointer;'
                : 'padding:8px 20px; border-radius:10px; font-size:13px; border:1.5px solid #e5e7eb; background:#fff; color:#6b7280; cursor:pointer;'">
              {{ d }}
            </button>
          </div>
        </div>

        <!-- 진행 방식 -->
        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">진행 방식 <span style="color:#6366f1;">*</span></label>
          <div style="display:flex; gap:10px;">
            <button v-for="m in meetingOptions" :key="m.value" type="button" @click="form.meetingType = m.value"
              :style="form.meetingType === m.value
                ? 'flex:1; padding:12px; border-radius:12px; font-size:13px; font-weight:600; border:1.5px solid #6366f1; background:#ede9fe; color:#6366f1; cursor:pointer;'
                : 'flex:1; padding:12px; border-radius:12px; font-size:13px; border:1.5px solid #e5e7eb; background:#fff; color:#6b7280; cursor:pointer;'">
              {{ m.label }}
            </button>
          </div>
        </div>

        <!-- 모집 마감일 -->
        <div>
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">모집 마감일</label>
          <input v-model="form.deadline" type="date" style="width:100%; height:48px; padding:0 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; outline:none; box-sizing:border-box; background:#fafafa;" @focus="e=>e.target.style.borderColor='#6366f1'" @blur="e=>e.target.style.borderColor='#e5e7eb'" />
        </div>
      </div>

      <!-- 링크 -->
      <div style="background:#fff; border-radius:20px; padding:32px; box-shadow:0 1px 4px rgba(0,0,0,0.06); margin-bottom:20px;">
        <h2 style="font-size:16px; font-weight:700; color:#111827; margin:0 0 24px; display:flex; align-items:center; gap:8px;">
          <span style="width:28px; height:28px; background:#6366f1; color:#fff; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700;">3</span>
          링크
        </h2>
        <div style="display:flex; flex-direction:column; gap:14px;">
          <div v-for="link in linkFields" :key="link.key">
            <label style="display:block; font-size:13px; font-weight:600; color:#6b7280; margin-bottom:6px;">{{ link.label }} <span style="font-size:12px; font-weight:400; color:#9ca3af;">(선택)</span></label>
            <input v-model="form[link.key]" type="url" :placeholder="link.placeholder" style="width:100%; height:44px; padding:0 14px; border:1.5px solid #e5e7eb; border-radius:10px; font-size:13px; color:#111827; outline:none; box-sizing:border-box; background:#fafafa;" @focus="e=>e.target.style.borderColor='#6366f1'" @blur="e=>e.target.style.borderColor='#e5e7eb'" />
          </div>
        </div>
      </div>

      <!-- 팀원 모집 -->
      <div style="background:#fff; border-radius:20px; padding:32px; box-shadow:0 1px 4px rgba(0,0,0,0.06); margin-bottom:20px;">
        <h2 style="font-size:16px; font-weight:700; color:#111827; margin:0 0 24px; display:flex; align-items:center; gap:8px;">
          <span style="width:28px; height:28px; background:#6366f1; color:#fff; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700;">4</span>
          팀원 모집
        </h2>

        <div style="display:flex; flex-direction:column; gap:16px; margin-bottom:16px;">
          <div v-for="(role, idx) in form.roles" :key="idx" style="border:1.5px solid #e5e7eb; border-radius:16px; padding:20px;">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;">
              <span style="font-size:13px; font-weight:700; color:#6366f1;">역할 {{ idx + 1 }}</span>
              <button v-if="form.roles.length > 1" @click="removeRole(idx)" style="font-size:12px; color:#9ca3af; background:none; border:none; cursor:pointer;">✕ 제거</button>
            </div>
            <div style="display:grid; grid-template-columns:1fr 100px; gap:12px; margin-bottom:12px;">
              <div>
                <label style="display:block; font-size:12px; font-weight:600; color:#6b7280; margin-bottom:5px;">역할 <span style="color:#6366f1;">*</span></label>
                <input v-model="role.name" type="text" placeholder="예: 프론트엔드, 백엔드, 디자이너" style="width:100%; height:40px; padding:0 12px; border:1.5px solid #e5e7eb; border-radius:10px; font-size:13px; color:#111827; outline:none; box-sizing:border-box;" @focus="e=>e.target.style.borderColor='#6366f1'" @blur="e=>e.target.style.borderColor='#e5e7eb'" />
              </div>
              <div>
                <label style="display:block; font-size:12px; font-weight:600; color:#6b7280; margin-bottom:5px;">모집 인원 <span style="color:#6366f1;">*</span></label>
                <input v-model.number="role.count" type="number" min="1" max="10" style="width:100%; height:40px; padding:0 12px; border:1.5px solid #e5e7eb; border-radius:10px; font-size:13px; color:#111827; outline:none; box-sizing:border-box;" @focus="e=>e.target.style.borderColor='#6366f1'" @blur="e=>e.target.style.borderColor='#e5e7eb'" />
              </div>
            </div>
            <div style="margin-bottom:12px;">
              <label style="display:block; font-size:12px; font-weight:600; color:#6b7280; margin-bottom:5px;">필요 기술</label>
              <input v-model="role.skills" type="text" placeholder="예: React, TypeScript (쉼표로 구분)" style="width:100%; height:40px; padding:0 12px; border:1.5px solid #e5e7eb; border-radius:10px; font-size:13px; color:#111827; outline:none; box-sizing:border-box;" @focus="e=>e.target.style.borderColor='#6366f1'" @blur="e=>e.target.style.borderColor='#e5e7eb'" />
            </div>
            <div>
              <label style="display:block; font-size:12px; font-weight:600; color:#6b7280; margin-bottom:5px;">역할 설명</label>
              <textarea v-model="role.description" rows="2" placeholder="해당 역할에서 맡게 될 업무를 설명해주세요" style="width:100%; padding:10px 12px; border:1.5px solid #e5e7eb; border-radius:10px; font-size:13px; color:#111827; outline:none; box-sizing:border-box; resize:none;" @focus="e=>e.target.style.borderColor='#6366f1'" @blur="e=>e.target.style.borderColor='#e5e7eb'"></textarea>
            </div>
          </div>
        </div>

        <button @click="addRole" style="width:100%; padding:12px; border-radius:12px; border:1.5px dashed #c7d2fe; background:#fafbff; color:#6366f1; font-size:14px; font-weight:600; cursor:pointer;">
          + 역할 추가
        </button>
      </div>

      <!-- 모집 메시지 -->
      <div style="background:#fff; border-radius:20px; padding:32px; box-shadow:0 1px 4px rgba(0,0,0,0.06); margin-bottom:32px;">
        <h2 style="font-size:16px; font-weight:700; color:#111827; margin:0 0 8px; display:flex; align-items:center; gap:8px;">
          <span style="width:28px; height:28px; background:#6366f1; color:#fff; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700;">5</span>
          모집 메시지
        </h2>
        <p style="font-size:13px; color:#9ca3af; margin:0 0 16px;">어떤 팀원을 찾고 있는지, 팀 분위기는 어떤지 자유롭게 적어주세요</p>
        <textarea v-model="form.recruitMessage" rows="5" placeholder="예: 매주 온라인 미팅을 진행하며 적극적으로 소통하는 팀원을 찾고 있어요. 처음이어도 괜찮아요, 함께 성장해요!" style="width:100%; padding:14px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; outline:none; box-sizing:border-box; resize:vertical; line-height:1.7; background:#fafafa;" @focus="e=>e.target.style.borderColor='#6366f1'" @blur="e=>e.target.style.borderColor='#e5e7eb'"></textarea>
      </div>

      <!-- 제출 버튼 -->
      <div style="display:flex; gap:12px; justify-content:flex-end;">
        <RouterLink to="/project/new" style="padding:14px 28px; border-radius:12px; border:1.5px solid #e5e7eb; background:#fff; color:#374151; font-size:15px; font-weight:600; text-decoration:none; display:flex; align-items:center;">취소</RouterLink>
        <button @click="submit" style="padding:14px 36px; border-radius:12px; border:none; background:#6366f1; color:#fff; font-size:15px; font-weight:700; cursor:pointer;">모집 공고 올리기</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { uploadImage } from '../utils/cloudinary.js'
import { createProject } from '../api/project.js'

const router = useRouter()

const techOptions = [
  'React', 'Next.js', 'Vue', 'Angular',
  'Spring', 'Spring Boot', 'Node.js', 'Express', 'Django', 'FastAPI',
  'Android', 'iOS', 'Flutter', 'React Native',
  'Unity', 'Unreal', 'AI/ML', 'TensorFlow', 'PyTorch',
  'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
  'Docker', 'Kubernetes', 'AWS', 'Firebase',
]

const durationOptions = ['1개월', '2개월', '3개월', '4개월', '6개월', '6개월 이상']
const meetingOptions = [
  { value: 'ONLINE', label: '🖥️ 온라인' },
  { value: 'OFFLINE', label: '🤝 오프라인' },
  { value: 'HYBRID', label: '⚡ 혼합' },
]
const linkFields = [
  { key: 'githubUrl', label: 'GitHub Repository', placeholder: 'https://github.com/...' },
  { key: 'figmaUrl', label: 'Figma 링크', placeholder: 'https://figma.com/...' },
  { key: 'notionUrl', label: 'Notion 링크', placeholder: 'https://notion.so/...' },
  { key: 'deployUrl', label: '배포 링크', placeholder: 'https://...' },
]


const thumbnailPreview = ref('')

const form = reactive({
  title: '',
  summary: '',
  description: '',
  techStacks: [],
  duration: '',
  meetingType: '',
  deadline: '',
  githubUrl: '',
  figmaUrl: '',
  notionUrl: '',
  deployUrl: '',
  thumbnailUrl: '',
  roles: [{ name: '', count: 1, skills: '', description: '' }],
  recruitMessage: '',
})

async function onThumbnailChange(e) {
  const file = e.target.files[0]
  if (!file) return
  try {
    const url = await uploadImage(file)
    form.thumbnailUrl = url
    thumbnailPreview.value = url
  } catch {
    alert('이미지 업로드에 실패했습니다.')
  }
}

function toggleTech(tech) {
  const idx = form.techStacks.indexOf(tech)
  if (idx === -1) form.techStacks.push(tech)
  else form.techStacks.splice(idx, 1)
}

function addRole() {
  form.roles.push({ name: '', count: 1, skills: '', description: '' })
}

function removeRole(idx) {
  form.roles.splice(idx, 1)
}

async function submit() {
  if (!form.title.trim()) return alert('프로젝트 제목을 입력해주세요')
  if (!form.summary.trim()) return alert('한 줄 소개를 입력해주세요')
  if (!form.description.trim()) return alert('프로젝트 상세 설명을 입력해주세요')
  if (form.techStacks.length === 0) return alert('기술 스택을 하나 이상 선택해주세요')
  if (!form.duration) return alert('예상 진행 기간을 선택해주세요')
  if (!form.meetingType) return alert('진행 방식을 선택해주세요')
  if (form.roles.some(r => !r.name.trim())) return alert('역할 이름을 입력해주세요')

  const payload = {
    title: form.title,
    summary: form.summary,
    description: form.description,
    techStacks: [...form.techStacks],
    status: 'RECRUITING',
    projectType: 'TEAM',
    duration: form.duration,
    meetingType: form.meetingType,
    deadline: form.deadline || null,
    thumbnailUrl: form.thumbnailUrl || null,
    githubUrl: form.githubUrl || null,
    figmaUrl: form.figmaUrl || null,
    notionUrl: form.notionUrl || null,
    deployUrl: form.deployUrl || null,
    recruitMessage: form.recruitMessage || null,
    recruitments: form.roles
      .filter(r => r.name.trim())
      .map(r => ({
        role: r.name,
        count: r.count,
        skills: r.skills || null,
        description: r.description || null,
      })),
  }

  try {
    await createProject(payload)
    router.push({ path: '/', state: { registered: true } })
  } catch (e) {
    console.error('[모집 등록 실패]', e?.response?.status, e?.response?.data)
    alert('등록에 실패했습니다. 다시 시도해주세요.')
  }
}
</script>
