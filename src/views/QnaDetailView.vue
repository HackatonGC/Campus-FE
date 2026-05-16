<template>
  <div style="min-height:100vh; background:#FAFBFF;">

    <NavBar />

    <div v-if="qna" style="max-width:900px; margin:0 auto; padding:40px 40px 80px;">

      <!-- 질문 헤더 -->
      <div style="margin-bottom:32px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
          <span v-if="qna.solved" style="background:#d1fae5; color:#059669; font-size:12px; font-weight:600; padding:3px 10px; border-radius:999px;">✓ 해결됨</span>
          <span style="background:#F0F1FF; color:#4338CA; font-size:12px; padding:3px 10px; border-radius:999px;">Q&A</span>
        </div>
        <h1 style="font-size:28px; font-weight:800; color:#111827; margin:0 0 16px; line-height:1.4;">{{ qna.title }}</h1>

        <!-- 태그 -->
        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px;">
          <span
            v-for="tag in (qna.tags ?? [])"
            :key="tag"
            style="font-size:13px; padding:5px 14px; border-radius:999px; background:#F0F1FF; color:#4338CA; border:1px solid #c7d2fe;"
          >{{ tag }}</span>
        </div>

        <!-- 작성자 + 메타 -->
        <div style="display:flex; align-items:center; justify-content:space-between; padding:16px 0; border-top:1px solid #f3f4f6; border-bottom:1px solid #f3f4f6;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:40px; height:40px; border-radius:50%; background:#e0e7ff; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; color:#4338CA;">
              {{ (qna.authorName ?? '?').charAt(0) }}
            </div>
            <div>
              <div style="font-size:14px; font-weight:600; color:#111827;">{{ qna.authorName }}</div>
              <div v-if="qna.authorSchool" style="font-size:12px; color:#9ca3af;">{{ qna.authorSchool }}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:16px; font-size:13px; color:#9ca3af;">
            <span>{{ formatDate(qna.createdAt) }}</span>
            <span>👁 {{ qna.viewCount ?? 0 }}</span>
          </div>
        </div>
      </div>

      <!-- 질문 내용 -->
      <section class="markdown-body" style="margin-bottom:32px;" v-html="renderedContent"></section>

      <!-- 액션 -->
      <div style="display:flex; align-items:center; gap:10px; padding:16px 0; border-top:1px solid #f3f4f6; border-bottom:1px solid #f3f4f6; margin-bottom:40px;">
        <button
          @click="handleLike"
          :style="`display:flex; align-items:center; gap:6px; font-size:14px; padding:8px 14px; border-radius:8px; cursor:pointer; background:none; border:1px solid #d1d5db; color:${liked ? '#ef4444' : '#6b7280'};`"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" :fill="liked ? '#ef4444' : 'none'" :stroke="liked ? '#ef4444' : '#6b7280'" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          좋아요 {{ (qna.likeCount ?? 0) + (liked ? 1 : 0) }}
        </button>
        <button
          v-if="String(qna.authorId) === String(userId)"
          @click="handleDelete"
          style="display:flex; align-items:center; gap:6px; font-size:14px; padding:8px 14px; border-radius:8px; cursor:pointer; background:none; border:1px solid #fca5a5; color:#ef4444;"
        >삭제</button>
      </div>

      <!-- 답변 섹션 -->
      <section>
        <h2 style="font-size:20px; font-weight:700; color:#111827; margin:0 0 24px; display:flex; align-items:center; gap:8px;">
          💬 답변 {{ answers.length }}개
        </h2>

        <!-- 답변 목록 -->
        <div style="display:flex; flex-direction:column; gap:0;">
          <div
            v-for="answer in answers"
            :key="answer.id"
            :style="`padding:24px 0; border-bottom:1px solid #f3f4f6; ${answer.accepted ? 'background:linear-gradient(to right, rgba(16,185,129,0.04), transparent); border-left:3px solid #10b981; padding-left:20px; margin-left:-20px; border-radius:0 0 0 0;' : ''}`"
          >
            <div style="display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:12px;">
              <div style="display:flex; align-items:center; gap:10px;">
                <div style="width:36px; height:36px; border-radius:50%; background:#e0e7ff; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; color:#4338CA;">
                  {{ (answer.authorName ?? '?').charAt(0) }}
                </div>
                <div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span style="font-size:14px; font-weight:600; color:#111827;">{{ answer.authorName }}</span>
                    <span v-if="answer.accepted" style="background:#d1fae5; color:#059669; font-size:11px; font-weight:600; padding:2px 8px; border-radius:999px;">✓ 채택된 답변</span>
                  </div>
                  <div style="font-size:12px; color:#9ca3af;">{{ formatDate(answer.createdAt) }}</div>
                </div>
              </div>
              <div style="display:flex; align-items:center; gap:8px;">
                <!-- 채택 버튼 (질문 작성자만) -->
                <button
                  v-if="String(qna.authorId) === String(userId) && !qna.solved && !answer.accepted"
                  @click="handleAccept(answer.id)"
                  style="font-size:12px; padding:6px 12px; border-radius:8px; border:1px solid #10b981; background:none; color:#059669; cursor:pointer;"
                >채택하기</button>
                <!-- 삭제 버튼 (답변 작성자) -->
                <button
                  v-if="String(answer.authorId) === String(userId)"
                  @click="handleDeleteAnswer(answer.id)"
                  style="font-size:12px; color:#ef4444; background:none; border:none; cursor:pointer;"
                >삭제</button>
              </div>
            </div>

            <div class="markdown-body" style="margin:0 0 12px 46px;" v-html="renderMarkdown(answer.content)"></div>

            <!-- 답변 좋아요 -->
            <button
              @click="handleAnswerLike(answer.id)"
              :style="`margin-left:46px; display:flex; align-items:center; gap:4px; font-size:12px; background:none; border:none; cursor:pointer; color:${likedAnswers[answer.id] ? '#ef4444' : '#9ca3af'};`"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" :fill="likedAnswers[answer.id] ? '#ef4444' : 'none'" :stroke="likedAnswers[answer.id] ? '#ef4444' : '#9ca3af'" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              {{ answer.likeCount ?? 0 }}
            </button>
          </div>
        </div>

        <!-- 답변 입력 -->
        <div style="margin-top:32px;">
          <h3 style="font-size:16px; font-weight:700; color:#111827; margin:0 0 12px;">답변 작성</h3>
          <textarea
            v-model="newAnswer"
            placeholder="답변을 입력하세요. 마크다운을 지원합니다."
            style="width:100%; padding:16px; border:1px solid #e5e7eb; border-radius:12px; font-size:14px; color:#374151; resize:none; outline:none; box-sizing:border-box; height:120px; background:#fff; line-height:1.6;"
          ></textarea>
          <div style="display:flex; justify-content:flex-end; margin-top:10px;">
            <button
              @click="handleAddAnswer"
              style="background:#6366f1; color:#fff; font-size:14px; font-weight:600; padding:10px 28px; border-radius:10px; border:none; cursor:pointer;"
            >답변 등록</button>
          </div>
        </div>
      </section>

    </div>

    <div v-else-if="loading" style="text-align:center; padding:120px 40px; color:#9ca3af; font-size:16px;">불러오는 중...</div>
    <div v-else style="text-align:center; padding:120px 40px; color:#9ca3af; font-size:16px;">질문을 찾을 수 없어요.</div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import { getQna, getAnswers, createAnswer, deleteAnswer, toggleAnswerLike, acceptAnswer, toggleQnaLike, deleteQna } from '../api/qna.js'
import { userId } from '../store/auth.js'
import NavBar from '../components/NavBar.vue'

const route = useRoute()
const router = useRouter()

const qna = ref(null)
const loading = ref(true)
const answers = ref([])
const newAnswer = ref('')
const liked = ref(false)
const likedAnswers = reactive({})

const renderedContent = computed(() =>
  qna.value?.content ? marked(qna.value.content) : ''
)

function renderMarkdown(text) {
  return text ? marked(text) : ''
}

onMounted(async () => {
  try {
    qna.value = await getQna(route.params.id)
  } catch {
    qna.value = null
  } finally {
    loading.value = false
  }
  fetchAnswers()
})

async function fetchAnswers() {
  try {
    const data = await getAnswers(route.params.id)
    answers.value = Array.isArray(data) ? data : []
  } catch {
    answers.value = []
  }
}

async function handleAddAnswer() {
  if (!newAnswer.value.trim()) return
  try {
    await createAnswer(route.params.id, { content: newAnswer.value.trim() })
    newAnswer.value = ''
    fetchAnswers()
  } catch {}
}

async function handleDeleteAnswer(answerId) {
  try {
    await deleteAnswer(route.params.id, answerId)
    fetchAnswers()
  } catch {}
}

async function handleAnswerLike(answerId) {
  try {
    await toggleAnswerLike(route.params.id, answerId)
    likedAnswers[answerId] = !likedAnswers[answerId]
    const answer = answers.value.find(a => a.id === answerId)
    if (answer) answer.likeCount = (answer.likeCount ?? 0) + (likedAnswers[answerId] ? 1 : -1)
  } catch {}
}

async function handleAccept(answerId) {
  try {
    await acceptAnswer(route.params.id, answerId)
    if (qna.value) qna.value.solved = true
    answers.value = answers.value.map(a => ({ ...a, accepted: a.id === answerId }))
  } catch {}
}

async function handleLike() {
  try {
    await toggleQnaLike(route.params.id)
    liked.value = !liked.value
  } catch {}
}

async function handleDelete() {
  if (!confirm('질문을 삭제하시겠습니까?')) return
  try {
    await deleteQna(route.params.id)
    router.push('/qna')
  } catch {}
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const diff = (Date.now() - d) / 1000
  if (diff < 60) return '방금'
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}일 전`
  return `${d.getMonth() + 1}/${d.getDate()}`
}
</script>

<style scoped>
.markdown-body :deep(h2) { font-size: 18px; font-weight: 700; color: #111827; margin: 28px 0 12px; }
.markdown-body :deep(h3) { font-size: 16px; font-weight: 600; color: #374151; margin: 20px 0 8px; }
.markdown-body :deep(p) { font-size: 15px; color: #374151; line-height: 1.8; margin: 0 0 12px; }
.markdown-body :deep(ul), .markdown-body :deep(ol) { padding-left: 20px; margin: 0 0 12px; }
.markdown-body :deep(li) { font-size: 15px; color: #374151; line-height: 1.8; }
.markdown-body :deep(pre) { background: #1e1e2e; color: #cdd6f4; border-radius: 12px; padding: 20px; font-size: 13px; line-height: 1.7; overflow-x: auto; margin: 16px 0; }
.markdown-body :deep(code) { background: #f3f4f6; color: #6366f1; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
.markdown-body :deep(pre code) { background: none; color: inherit; padding: 0; }
.markdown-body :deep(blockquote) { border-left: 3px solid #6366f1; padding-left: 16px; color: #6b7280; margin: 16px 0; }
</style>
