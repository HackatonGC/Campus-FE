<template>
  <div style="min-height:100vh; background:#f4f4fd;">
        <NavBar />

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
import NavBar from '../components/NavBar.vue'

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

