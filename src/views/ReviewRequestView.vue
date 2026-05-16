<template>
  <div style="min-height:100vh; background:#f4f4fd;">
        <NavBar />

    <div style="max-width:760px; margin:0 auto; padding:48px 40px;">
      <RouterLink :to="`/project/${route.params.id}`" style="display:inline-flex; align-items:center; gap:6px; font-size:13px; color:#6b7280; text-decoration:none; margin-bottom:24px;">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="#6b7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        프로젝트로 돌아가기
      </RouterLink>

      <div style="background:#fff; border-radius:20px; padding:36px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
        <div style="margin-bottom:28px;">
          <h1 style="font-size:22px; font-weight:800; color:#111827; margin:0 0 6px;">코드 리뷰 요청</h1>
          <p style="font-size:14px; color:#9ca3af; margin:0;">선배에게 궁금한 점이나 리뷰를 요청해보세요</p>
        </div>

        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">제목 <span style="color:#ef4444;">*</span></label>
          <input
            v-model="form.title"
            type="text"
            placeholder="예: JWT 구조가 이해되지 않습니다"
            maxlength="100"
            style="width:100%; height:44px; padding:0 14px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; background:#f9fafb; outline:none; box-sizing:border-box;"
          />
        </div>

        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">내용 <span style="color:#ef4444;">*</span></label>
          <textarea
            v-model="form.content"
            placeholder="궁금한 점이나 리뷰받고 싶은 내용을 상세히 작성해주세요"
            maxlength="2000"
            rows="7"
            style="width:100%; padding:14px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; resize:none; outline:none; box-sizing:border-box; line-height:1.7; background:#f9fafb;"
          ></textarea>
          <div style="text-align:right; font-size:12px; color:#9ca3af; margin-top:4px;">{{ form.content.length }}/2000</div>
        </div>

        <div style="margin-bottom:28px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">GitHub 링크 <span style="color:#9ca3af; font-weight:400;">(선택)</span></label>
          <input
            v-model="form.githubUrl"
            type="url"
            placeholder="https://github.com/username/repo"
            style="width:100%; height:44px; padding:0 14px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; background:#f9fafb; outline:none; box-sizing:border-box;"
          />
        </div>

        <p v-if="errorMsg" style="font-size:13px; color:#ef4444; margin:0 0 16px;">{{ errorMsg }}</p>

        <div style="display:flex; gap:12px; justify-content:flex-end;">
          <RouterLink :to="`/project/${route.params.id}`"
            style="padding:11px 24px; border-radius:10px; border:1.5px solid #e5e7eb; background:#fff; color:#374151; font-size:14px; font-weight:600; text-decoration:none; display:flex; align-items:center;">
            취소
          </RouterLink>
          <button @click="handleSubmit" :disabled="!form.title.trim() || !form.content.trim() || submitting"
            :style="`padding:11px 28px; border-radius:10px; border:none; background:${form.title.trim() && form.content.trim() && !submitting ? '#6366f1' : '#c7d2fe'}; color:#fff; font-size:14px; font-weight:600; cursor:${form.title.trim() && form.content.trim() && !submitting ? 'pointer' : 'not-allowed'};`">
            {{ submitting ? '제출 중...' : '리뷰 요청하기' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createReview } from '../api/project.js'
import NavBar from '../components/NavBar.vue'

const route = useRoute()
const router = useRouter()

const form = reactive({ title: '', content: '', githubUrl: '' })
const submitting = ref(false)
const errorMsg = ref('')

async function handleSubmit() {
  if (!form.title.trim() || !form.content.trim()) return
  submitting.value = true
  errorMsg.value = ''
  try {
    await createReview(route.params.id, {
      title: form.title.trim(),
      content: form.content.trim(),
      githubUrl: form.githubUrl.trim() || null,
    })
    router.push(`/project/${route.params.id}`)
  } catch {
    errorMsg.value = '제출에 실패했습니다. 다시 시도해주세요.'
  } finally {
    submitting.value = false
  }
}
</script>

