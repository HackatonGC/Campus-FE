<template>
  <div style="min-height:100vh; background:#FAFBFF;">

    <NavBar />

    <div v-if="project">

      <!-- 히어로 이미지 -->
      <div style="width:100%; height:380px; overflow:hidden;">
        <img :src="project.thumbnailUrl" :alt="project.title" style="width:100%; height:100%; object-fit:cover;" />
      </div>

      <!-- 본문 -->
      <div style="max-width:900px; margin:0 auto; padding:40px 40px 80px;">

        <!-- 뱃지 + 제목 -->
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
          <span v-if="project.status === 'RECRUITING'" style="background:#10b981; color:#fff; font-size:12px; font-weight:600; padding:3px 10px; border-radius:999px;">모집중</span>
          <span style="background:#F0F1FF; color:#4338CA; font-size:12px; font-weight:500; padding:3px 10px; border-radius:999px;">{{ project.projectType === 'TEAM' ? '팀 프로젝트' : '개인 프로젝트' }}</span>
        </div>
        <h1 style="font-size:32px; font-weight:800; color:#111827; margin:0 0 8px;">{{ project.title }}</h1>
        <p style="font-size:16px; color:#6b7280; margin:0 0 20px;">{{ project.summary }}</p>

        <!-- 기술 태그 -->
        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px;">
          <span v-for="tech in (project.techStacks ?? project.techStack ?? [])" :key="tech"
            style="font-size:13px; padding:5px 14px; border-radius:999px; background:#F0F1FF; color:#4338CA; border:1px solid #c7d2fe;">
            {{ tech }}
          </span>
        </div>

        <!-- 작성자 + 메타 -->
        <div style="display:flex; align-items:center; justify-content:space-between; padding:16px 0; border-top:1px solid #f3f4f6; border-bottom:1px solid #f3f4f6; margin-bottom:40px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:40px; height:40px; border-radius:50%; background:#e0e7ff; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; color:#4338CA;">
              {{ (project.authorName ?? project.author ?? '?').charAt(0) }}
            </div>
            <div>
              <div style="font-size:14px; font-weight:600; color:#111827;">{{ project.authorName ?? project.author }}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:20px; font-size:13px; color:#9ca3af;">
            <span>👁 {{ project.viewCount ?? project.views ?? 0 }}</span>
            <span>❤️ {{ project.likeCount ?? project.likes ?? 0 }}</span>
          </div>
        </div>

        <!-- 프로젝트 상세 내용 -->
        <section class="markdown-body" style="margin-bottom:40px;" v-html="renderedDescription"></section>

        <!-- 액션바 -->
        <div style="display:flex; align-items:center; justify-content:space-between; padding:20px 0; border-top:1px solid #f3f4f6; border-bottom:1px solid #f3f4f6; margin-bottom:40px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <button @click="toggleLike" :style="`display:flex; align-items:center; gap:6px; font-size:14px; padding:8px 14px; border-radius:8px; cursor:pointer; background:none; border:1px solid #d1d5db; color:${liked ? '#ef4444' : '#6b7280'};`">
              <img :src="iconLike" style="width:16px; height:16px;" alt="" /> 좋아요 {{ (project.likeCount ?? project.likes ?? 0) + (liked ? 1 : 0) }}
            </button>
            <button @click="toggleBookmark" :style="`display:flex; align-items:center; gap:6px; font-size:14px; padding:8px 14px; border-radius:8px; cursor:pointer; background:none; border:1px solid #d1d5db; color:${bookmarked ? '#6366f1' : '#6b7280'};`">
              <img :src="iconBookmark" style="width:16px; height:16px;" alt="" /> 북마크
            </button>
            <button style="display:flex; align-items:center; gap:6px; font-size:14px; padding:8px 14px; border-radius:8px; cursor:pointer; background:none; border:1px solid #d1d5db; color:#6b7280;">
              <img :src="iconComment" style="width:16px; height:16px;" alt="" /> 댓글 {{ comments.length }}
            </button>
          </div>
          <div style="display:flex; align-items:center; gap:12px;">
            <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" style="display:flex; align-items:center; gap:6px; font-size:14px; color:#6b7280; text-decoration:none; padding:8px 14px; border:1px solid #e5e7eb; border-radius:8px;">
              🐙 GitHub
            </a>
            <a v-if="project.deployUrl" :href="project.deployUrl" target="_blank" style="display:flex; align-items:center; gap:6px; font-size:14px; color:#6b7280; text-decoration:none; padding:8px 14px; border:1px solid #e5e7eb; border-radius:8px;">
              🚀 데모
            </a>
          </div>
        </div>

        <!-- 팀원 모집 -->
        <section v-if="project.status === 'RECRUITING'" style="background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:24px; margin-bottom:40px;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
            <h2 style="font-size:18px; font-weight:700; color:#111827; margin:0; display:flex; align-items:center; gap:8px;">
              <img :src="iconTeam" style="width:20px; height:20px;" alt="" /> 팀원 모집
            </h2>
            <span style="font-size:12px; color:#9ca3af;"></span>
          </div>
          <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:16px;">
            <div v-for="r in (project.recruitments ?? [])" :key="r.role" style="background:#FAFBFF; border:1px solid #e5e7eb; border-radius:12px; padding:16px;">
              <div style="font-size:14px; font-weight:600; color:#111827; margin-bottom:4px;">{{ r.role }}</div>
              <div style="font-size:12px; color:#9ca3af; margin-bottom:8px;">{{ r.count }}명 모집</div>
              <div v-if="r.description" style="font-size:12px; color:#6b7280;">{{ r.description }}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <span style="font-size:13px; color:#9ca3af;"></span>
            <RouterLink :to="`/project/${project.id}/apply`" style="background:#6366f1; color:#fff; font-size:14px; font-weight:600; padding:10px 24px; border-radius:10px; text-decoration:none; display:flex; align-items:center; gap:6px; border:1px solid #d1d5db;">
              <img :src="iconTeam" style="width:16px; height:16px; filter:brightness(0) invert(1);" alt="" /> 팀원 지원하기
            </RouterLink>
          </div>
        </section>

        <!-- 댓글 -->
        <section>
          <h2 style="font-size:20px; font-weight:700; color:#111827; margin:0 0 20px; display:flex; align-items:center; gap:8px;">
            <img :src="iconComment" style="width:20px; height:20px;" alt="" /> 댓글 {{ totalCommentCount }}
          </h2>
          <!-- 댓글 입력 -->
          <div style="margin-bottom:24px;">
            <textarea v-model="newComment" placeholder="댓글을 입력하세요..."
              style="width:100%; padding:14px 16px; border:1px solid #e5e7eb; border-radius:12px; font-size:14px; color:#374151; resize:none; outline:none; box-sizing:border-box; height:80px; background:#fff;"
            ></textarea>
            <div style="display:flex; justify-content:flex-end; margin-top:8px;">
              <button @click="addComment" style="background:#6366f1; color:#fff; font-size:14px; font-weight:600; padding:10px 24px; border-radius:10px; border:none; cursor:pointer;">
                댓글 작성
              </button>
            </div>
          </div>
          <!-- 댓글 목록 -->
          <div style="display:flex; flex-direction:column; gap:4px;">
            <div v-for="c in comments" :key="c.id" style="padding:16px 0; border-bottom:1px solid #f3f4f6;">
              <!-- 댓글 -->
              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                <div style="display:flex; align-items:center; gap:10px;">
                  <div style="width:32px; height:32px; border-radius:50%; background:#e0e7ff; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; color:#4338CA;">
                    {{ (c.authorName ?? '?').charAt(0) }}
                  </div>
                  <div>
                    <span style="font-size:14px; font-weight:600; color:#111827;">{{ c.authorName }}</span>
                    <span v-if="c.authorSchool" style="font-size:12px; color:#9ca3af; margin-left:6px;">{{ c.authorSchool }}</span>
                    <span style="font-size:12px; color:#d1d5db; margin-left:8px;">{{ formatDate(c.createdAt) }}</span>
                  </div>
                </div>
                <button v-if="String(c.authorId) === String(userId)" @click="removeComment(c.id)"
                  style="font-size:12px; color:#ef4444; background:none; border:none; cursor:pointer;">삭제</button>
              </div>
              <p style="font-size:14px; color:#374151; line-height:1.6; margin:0 0 8px 42px;">{{ c.content }}</p>
              <div style="display:flex; align-items:center; gap:12px; margin-left:42px;">
                <button @click="handleCommentLike(c.id)"
                  :style="`font-size:12px; background:none; border:none; cursor:pointer; display:flex; align-items:center; gap:4px; color:${likedComments[c.id] ? '#ef4444' : '#9ca3af'};`">
                  <svg width="13" height="13" viewBox="0 0 24 24" :fill="likedComments[c.id] ? '#ef4444' : 'none'" :stroke="likedComments[c.id] ? '#ef4444' : '#9ca3af'" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  {{ c.likeCount ?? 0 }}
                </button>
                <button @click="replyTo = replyTo?.id === c.id ? null : { id: c.id, authorName: c.authorName }"
                  style="font-size:12px; color:#9ca3af; background:none; border:none; cursor:pointer;">
                  답글
                </button>
              </div>
              <!-- 대댓글 입력 -->
              <div v-if="replyTo?.id === c.id" style="margin:12px 0 0 42px; display:flex; gap:8px;">
                <textarea v-model="replyContent" :placeholder="`${replyTo.authorName}에게 답글...`"
                  style="flex:1; padding:10px 14px; border:1px solid #c7d2fe; border-radius:10px; font-size:13px; color:#374151; resize:none; outline:none; height:60px; background:#fff;"
                ></textarea>
                <div style="display:flex; flex-direction:column; gap:4px;">
                  <button @click="addReply(c.id)" style="background:#6366f1; color:#fff; font-size:12px; font-weight:600; padding:8px 14px; border-radius:8px; border:none; cursor:pointer;">등록</button>
                  <button @click="replyTo = null" style="background:#f3f4f6; color:#6b7280; font-size:12px; padding:8px 14px; border-radius:8px; border:none; cursor:pointer;">취소</button>
                </div>
              </div>
              <!-- 대댓글 목록 -->
              <div v-if="c.replies?.length" style="margin-top:12px; margin-left:42px; display:flex; flex-direction:column; gap:12px;">
                <div v-for="r in c.replies" :key="r.id" style="background:#fafbff; border-radius:10px; padding:12px 14px;">
                  <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                      <div style="width:26px; height:26px; border-radius:50%; background:#e0e7ff; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#4338CA;">
                        {{ (r.authorName ?? '?').charAt(0) }}
                      </div>
                      <span style="font-size:13px; font-weight:600; color:#111827;">{{ r.authorName }}</span>
                      <span v-if="r.authorSchool" style="font-size:11px; color:#9ca3af;">{{ r.authorSchool }}</span>
                      <span style="font-size:11px; color:#d1d5db;">{{ formatDate(r.createdAt) }}</span>
                    </div>
                    <button v-if="String(r.authorId) === String(userId)" @click="removeComment(r.id)"
                      style="font-size:11px; color:#ef4444; background:none; border:none; cursor:pointer;">삭제</button>
                  </div>
                  <p style="font-size:13px; color:#374151; line-height:1.6; margin:0 0 6px 34px;">{{ r.content }}</p>
                  <button @click="handleCommentLike(r.id)"
                    :style="`font-size:11px; background:none; border:none; cursor:pointer; display:flex; align-items:center; gap:4px; margin-left:34px; color:${likedComments[r.id] ? '#ef4444' : '#9ca3af'};`">
                    <svg width="12" height="12" viewBox="0 0 24 24" :fill="likedComments[r.id] ? '#ef4444' : 'none'" :stroke="likedComments[r.id] ? '#ef4444' : '#9ca3af'" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    {{ r.likeCount ?? 0 }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>

    <!-- 로딩 중 -->
    <div v-else-if="loading" style="text-align:center; padding:120px 40px; color:#9ca3af; font-size:16px;">
      불러오는 중...
    </div>
    <!-- 프로젝트 없을 때 -->
    <div v-else style="text-align:center; padding:120px 40px; color:#9ca3af; font-size:16px;">
      프로젝트를 찾을 수 없어요.
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getProject, getComments, createComment, deleteComment, toggleCommentLike, addLike, removeLike, addBookmark, removeBookmark } from '../api/project.js'
import { marked } from 'marked'

import { isLoggedIn, clearAuth, userId } from '../store/auth.js'
import NavBar from '../components/NavBar.vue'
import iconTeam    from '../assets/Icon (3).svg'
import iconComment  from '../assets/Icon (7).svg'
import iconLike     from '../assets/Icon (9).svg'
import iconBookmark from '../assets/Icon (10).svg'

const route = useRoute()
const project = ref(null)
const loading = ref(true)
const comments = ref([])
const newComment = ref('')
const replyTo = ref(null)
const replyContent = ref('')
const likedComments = reactive({})

onMounted(async () => {
  try {
    project.value = await getProject(route.params.id)
  } catch {
    project.value = null
  } finally {
    loading.value = false
  }
  fetchComments()
})

async function fetchComments() {
  try {
    const data = await getComments(route.params.id)
    comments.value = Array.isArray(data) ? data : []
  } catch {
    comments.value = []
  }
}

async function addComment() {
  if (!newComment.value.trim()) return
  try {
    await createComment(route.params.id, { content: newComment.value.trim(), parentId: null })
    newComment.value = ''
    fetchComments()
  } catch {}
}

async function addReply(parentId) {
  if (!replyContent.value.trim()) return
  try {
    await createComment(route.params.id, { content: replyContent.value.trim(), parentId })
    replyContent.value = ''
    replyTo.value = null
    fetchComments()
  } catch {}
}

async function removeComment(commentId) {
  try {
    await deleteComment(route.params.id, commentId)
    fetchComments()
  } catch {}
}

async function handleCommentLike(commentId) {
  try {
    await toggleCommentLike(route.params.id, commentId)
    likedComments[commentId] = !likedComments[commentId]
    updateLikeCount(commentId, likedComments[commentId] ? 1 : -1)
  } catch {}
}

function updateLikeCount(id, delta) {
  for (const c of comments.value) {
    if (c.id === id) { c.likeCount = (c.likeCount ?? 0) + delta; return }
    for (const r of (c.replies ?? [])) {
      if (r.id === id) { r.likeCount = (r.likeCount ?? 0) + delta; return }
    }
  }
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const diff = (Date.now() - d) / 1000
  if (diff < 60) return '방금'
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
  return `${d.getMonth() + 1}/${d.getDate()}`
}

const renderedDescription = computed(() =>
  project.value?.description ? marked(project.value.description) : ''
)

const totalCommentCount = computed(() =>
  comments.value.reduce((sum, c) => sum + 1 + (c.replies?.length ?? 0), 0)
)

const liked = ref(false)
const bookmarked = ref(false)

async function toggleLike() {
  try {
    if (liked.value) {
      await removeLike(route.params.id)
    } else {
      await addLike(route.params.id)
    }
    liked.value = !liked.value
    if (project.value) project.value.likeCount = (project.value.likeCount ?? 0) + (liked.value ? 1 : -1)
  } catch {}
}

async function toggleBookmark() {
  try {
    if (bookmarked.value) {
      await removeBookmark(route.params.id)
    } else {
      await addBookmark(route.params.id)
    }
    bookmarked.value = !bookmarked.value
  } catch {}
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
