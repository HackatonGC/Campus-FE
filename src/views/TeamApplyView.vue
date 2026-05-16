<template>
  <div style="min-height:100vh; background:#f4f4fd;">
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
      </div>
    </nav>

    <div style="max-width:640px; margin:0 auto; padding:48px 40px;">
      <RouterLink :to="`/project/${route.params.id}`" style="display:inline-flex; align-items:center; gap:6px; font-size:13px; color:#6b7280; text-decoration:none; margin-bottom:24px;">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="#6b7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        프로젝트로 돌아가기
      </RouterLink>

      <div style="background:#fff; border-radius:20px; padding:36px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
        <div style="margin-bottom:28px;">
          <h1 style="font-size:22px; font-weight:800; color:#111827; margin:0 0 6px;">팀원 신청</h1>
          <p style="font-size:14px; color:#9ca3af; margin:0;">팀에 합류하고 싶은 이유를 자유롭게 작성해주세요</p>
        </div>

        <div style="margin-bottom:24px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">신청 메시지 <span style="color:#ef4444;">*</span></label>
          <textarea
            v-model="message"
            placeholder="참여 동기, 기여할 수 있는 부분, 관심 기술 등을 자유롭게 작성해주세요"
            maxlength="500"
            rows="6"
            style="width:100%; padding:14px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; resize:none; outline:none; box-sizing:border-box; line-height:1.7; background:#f9fafb;"
          ></textarea>
          <div style="text-align:right; font-size:12px; color:#9ca3af; margin-top:4px;">{{ message.length }}/500</div>
        </div>

        <p v-if="errorMsg" style="font-size:13px; color:#ef4444; margin:0 0 16px;">{{ errorMsg }}</p>

        <div style="display:flex; gap:12px; justify-content:flex-end;">
          <RouterLink :to="`/project/${route.params.id}`"
            style="padding:11px 24px; border-radius:10px; border:1.5px solid #e5e7eb; background:#fff; color:#374151; font-size:14px; font-weight:600; text-decoration:none; display:flex; align-items:center;">
            취소
          </RouterLink>
          <button @click="handleApply" :disabled="!message.trim() || submitting"
            :style="`padding:11px 28px; border-radius:10px; border:none; background:${message.trim() && !submitting ? '#6366f1' : '#c7d2fe'}; color:#fff; font-size:14px; font-weight:600; cursor:${message.trim() && !submitting ? 'pointer' : 'not-allowed'};`">
            {{ submitting ? '신청 중...' : '신청하기' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { applyToProject } from '../api/project.js'

const route = useRoute()
const router = useRouter()

const message = ref('')
const submitting = ref(false)
const errorMsg = ref('')

async function handleApply() {
  if (!message.value.trim()) return
  submitting.value = true
  errorMsg.value = ''
  try {
    await applyToProject(route.params.id, { message: message.value.trim() })
    router.push(`/project/${route.params.id}`)
  } catch (e) {
    errorMsg.value = e?.response?.status === 409 ? '이미 신청한 프로젝트예요.' : '신청에 실패했습니다. 다시 시도해주세요.'
  } finally {
    submitting.value = false
  }
}
</script>
