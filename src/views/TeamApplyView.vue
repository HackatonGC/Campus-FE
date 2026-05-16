<template>
  <div style="min-height:100vh; background:#f4f4fd;">
    <nav style="background:#fff; border-bottom:1px solid #e5e7eb; position:sticky; top:0; z-index:50;">
      <div style="max-width:1280px; margin:0 auto; padding:0 40px; height:68px; display:flex; align-items:center; justify-content:space-between;">
        <RouterLink to="/" style="display:flex; align-items:center; gap:12px; text-decoration:none;">
          <div style="width:44px; height:44px; background:#6366f1; border-radius:12px; display:flex; align-items:center; justify-content:center;">
            <img :src="iconLogo" style="width:28px; height:28px;" alt="StackMate" />
          </div>
          <div>
            <div style="font-weight:700; font-size:16px; background:linear-gradient(to right,#6366f1,rgba(99,102,241,0.7)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">StackMate</div>
            <div style="color:#9ca3af; font-size:11px;">함께 성장하는 개발자</div>
          </div>
        </RouterLink>
      </div>
    </nav>

    <div style="max-width:640px; margin:0 auto; padding:48px 40px;">
      <RouterLink :to="`/project/${route.params.id}`" style="display:inline-flex; align-items:center; gap:6px; font-size:13px; color:#6b7280; text-decoration:none; margin-bottom:28px;">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="#6b7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        프로젝트로 돌아가기
      </RouterLink>

      <div v-if="loading" style="text-align:center; padding:80px 0; color:#9ca3af; font-size:14px;">불러오는 중...</div>

      <div v-else style="display:flex; flex-direction:column; gap:16px;">

        <!-- 프로젝트 요약 -->
        <div style="background:#fff; border-radius:16px; padding:18px 22px; box-shadow:0 1px 4px rgba(0,0,0,0.06); display:flex; align-items:center; gap:14px;">
          <div style="width:44px; height:44px; border-radius:12px; background:linear-gradient(135deg,#6366f1,#818cf8); display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:900; color:#fff; flex-shrink:0;">
            {{ (project?.title ?? '?').charAt(0) }}
          </div>
          <div>
            <div style="font-size:15px; font-weight:700; color:#111827;">{{ project?.title }}</div>
            <div style="font-size:12px; color:#9ca3af; margin-top:2px;">{{ project?.authorName }}<span v-if="project?.authorSchool"> · {{ project?.authorSchool }}</span></div>
          </div>
        </div>

        <!-- 폼 카드 -->
        <div style="background:#fff; border-radius:16px; padding:32px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
          <h1 style="font-size:20px; font-weight:800; color:#111827; margin:0 0 4px;">팀원 지원하기</h1>
          <p style="font-size:14px; color:#9ca3af; margin:0 0 28px;">지원할 역할을 선택하고 소개를 작성해주세요</p>

          <!-- 역할 선택 -->
          <div style="margin-bottom:24px;">
            <label style="display:block; font-size:14px; font-weight:700; color:#374151; margin-bottom:10px;">
              지원 역할 <span style="color:#ef4444;">*</span>
            </label>

            <div v-if="(project?.recruitments ?? []).length" style="display:flex; flex-direction:column; gap:8px;">
              <div v-for="r in project.recruitments" :key="r.role"
                @click="!isFull(r) && (selectedRole = r.role)"
                :style="`border-radius:12px; padding:14px 16px; border:2px solid ${selectedRole === r.role ? '#6366f1' : '#e5e7eb'}; background:${isFull(r) ? '#f9fafb' : selectedRole === r.role ? '#fafbff' : '#fff'}; cursor:${isFull(r) ? 'not-allowed' : 'pointer'}; opacity:${isFull(r) ? '0.6' : '1'}; transition:border-color 0.15s, background 0.15s;`">
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px;">
                  <div style="display:flex; align-items:center; gap:9px;">
                    <div :style="`width:16px; height:16px; border-radius:50%; border:2px solid ${selectedRole === r.role ? '#6366f1' : '#d1d5db'}; background:${selectedRole === r.role ? '#6366f1' : '#fff'}; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all 0.15s;`">
                      <div v-if="selectedRole === r.role" style="width:5px; height:5px; border-radius:50%; background:#fff;"></div>
                    </div>
                    <span style="font-size:14px; font-weight:700; color:#111827;">{{ r.role }}</span>
                  </div>
                  <span v-if="isFull(r)" style="font-size:11px; font-weight:600; padding:3px 10px; border-radius:999px; background:#fce7f3; color:#be185d;">
                    마감
                  </span>
                  <span v-else :style="`font-size:11px; font-weight:600; padding:3px 10px; border-radius:999px; ${selectedRole === r.role ? 'background:#ede9fe; color:#6366f1;' : 'background:#f3f4f6; color:#9ca3af;'}`">
                    {{ r.count - (r.acceptedCount ?? 0) }}명 남음
                  </span>
                </div>
                <div v-if="r.skills || r.description" style="margin-left:25px; margin-top:4px; display:flex; flex-direction:column; gap:2px;">
                  <span v-if="r.skills" style="font-size:12px; color:#6b7280;">🛠 {{ r.skills }}</span>
                  <span v-if="r.description" style="font-size:12px; color:#9ca3af;">{{ r.description }}</span>
                </div>
              </div>
            </div>

            <div v-else style="padding:20px; background:#f9fafb; border-radius:12px; border:1.5px dashed #e5e7eb; text-align:center; font-size:13px; color:#9ca3af;">
              모집 중인 역할 정보가 없어요
            </div>
          </div>

          <!-- 지원 메시지 -->
          <div style="margin-bottom:24px;">
            <label style="display:block; font-size:14px; font-weight:700; color:#374151; margin-bottom:8px;">
              지원 메시지 <span style="color:#ef4444;">*</span>
            </label>
            <textarea
              v-model="message"
              placeholder="참여 동기, 기여할 수 있는 부분, 관련 경험 등을 자유롭게 작성해주세요"
              maxlength="500"
              rows="6"
              style="width:100%; padding:14px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; resize:none; outline:none; box-sizing:border-box; line-height:1.7; background:#f9fafb;"
              @focus="e=>e.target.style.borderColor='#6366f1'" @blur="e=>e.target.style.borderColor='#e5e7eb'"
            ></textarea>
            <div style="text-align:right; font-size:12px; color:#9ca3af; margin-top:4px;">{{ message.length }}/500</div>
          </div>

          <p v-if="errorMsg" style="font-size:13px; color:#ef4444; margin:0 0 16px;">{{ errorMsg }}</p>

          <div style="display:flex; gap:10px; justify-content:flex-end;">
            <RouterLink :to="`/project/${route.params.id}`"
              style="padding:11px 24px; border-radius:10px; border:1.5px solid #e5e7eb; background:#fff; color:#374151; font-size:14px; font-weight:600; text-decoration:none; display:flex; align-items:center;">
              취소
            </RouterLink>
            <button @click="handleApply" :disabled="!canSubmit || submitting"
              :style="`padding:11px 28px; border-radius:10px; border:none; background:${canSubmit && !submitting ? '#6366f1' : '#c7d2fe'}; color:#fff; font-size:14px; font-weight:700; cursor:${canSubmit && !submitting ? 'pointer' : 'not-allowed'};`">
              {{ submitting ? '신청 중...' : '지원하기 →' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { applyToProject, getProject } from '../api/project.js'
import iconLogo from '../assets/Icon.svg'

const route = useRoute()
const router = useRouter()

const project = ref(null)
const loading = ref(true)
const selectedRole = ref('')
const message = ref('')
const submitting = ref(false)
const errorMsg = ref('')

const isFull = (r) => (r.acceptedCount ?? 0) >= r.count

const canSubmit = computed(() => selectedRole.value && message.value.trim().length > 0)

onMounted(async () => {
  try {
    project.value = await getProject(route.params.id)
    if (project.value?.recruitments?.length === 1) {
      selectedRole.value = project.value.recruitments[0].role
    }
  } catch {
    project.value = null
  } finally {
    loading.value = false
  }
})

async function handleApply() {
  if (!canSubmit.value) return
  submitting.value = true
  errorMsg.value = ''
  try {
    await applyToProject(route.params.id, { role: selectedRole.value, message: message.value.trim() })
    router.push(`/project/${route.params.id}`)
  } catch (e) {
    const status = e?.response?.status
    errorMsg.value =
      status === 409 ? '이미 신청한 프로젝트예요.' :
      status === 403 ? '본인이 등록한 프로젝트에는 지원할 수 없어요.' :
      status === 400 ? '모집이 마감되었거나 존재하지 않는 역할이에요.' :
      '신청에 실패했어요. 다시 시도해주세요.'
  } finally {
    submitting.value = false
  }
}
</script>
