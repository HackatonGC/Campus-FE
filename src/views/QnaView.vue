<template>
  <div style="min-height:100vh; background:#f4f4fd;">

    <NavBar />

    <!-- HERO -->
    <section style="background:#fff; padding:56px 40px 0; text-align:center;">
      <div style="max-width:1280px; margin:0 auto;">
        <h1 style="font-size:40px; font-weight:800; color:#111827; margin:0 0 12px; letter-spacing:-1px;">Q&A 게시판</h1>
        <p style="font-size:16px; color:#6b7280; margin:0 0 36px;">개발하다 막힌 것, 함께 해결해요</p>
        <div style="display:flex; justify-content:center;">
          <div style="position:relative; width:680px; max-width:100%;">
            <svg style="position:absolute; left:18px; top:50%; transform:translateY(-50%); width:18px; height:18px; color:#818cf8;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="질문 검색..."
              style="width:100%; padding:16px 20px 16px 50px; border-radius:16px; border:1.5px solid #c7d2fe; font-size:14px; color:#374151; background:#fff; outline:none; box-sizing:border-box;"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 탭 -->
    <div style="background:#fff; border-bottom:1px solid #e5e7eb; padding:0 40px;">
      <div style="max-width:1280px; margin:0 auto; display:flex; gap:0;">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :style="activeTab === tab.value
            ? 'padding:16px 20px; font-size:14px; font-weight:600; color:#6366f1; background:none; border:none; border-bottom:2px solid #6366f1; cursor:pointer;'
            : 'padding:16px 20px; font-size:14px; color:#6b7280; background:none; border:none; border-bottom:2px solid transparent; cursor:pointer;'"
        >{{ tab.label }}</button>
      </div>
    </div>

    <!-- BODY -->
    <div style="max-width:1280px; margin:0 auto; padding:40px 40px 60px; display:flex; gap:32px; align-items:flex-start;">

      <!-- 사이드바 -->
      <aside style="width:240px; flex-shrink:0;">
        <div style="background:#fff; border-radius:16px; border:1px solid #e5e7eb; padding:24px; margin-bottom:16px;">
          <div style="font-size:15px; font-weight:700; color:#111827; margin-bottom:16px;">태그 필터</div>

          <!-- 카테고리 -->
          <div style="margin-bottom:14px;">
            <div style="font-size:11px; font-weight:600; color:#9ca3af; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.05em;">카테고리</div>
            <div style="display:flex; flex-wrap:wrap; gap:6px;">
              <button
                v-for="tag in categoryTags"
                :key="tag"
                @click="toggleTag(tag)"
                :style="selectedTags.includes(tag)
                  ? 'padding:5px 12px; border-radius:999px; font-size:12px; border:1px solid #6366f1; background:#6366f1; color:#fff; cursor:pointer;'
                  : 'padding:5px 12px; border-radius:999px; font-size:12px; border:1px solid #c7d2fe; background:#F0F1FF; color:#4338CA; cursor:pointer;'"
              >{{ tag }}</button>
            </div>
          </div>

          <!-- 기술 스택 -->
          <div>
            <div style="font-size:11px; font-weight:600; color:#9ca3af; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.05em;">기술 스택</div>
            <div style="display:flex; flex-wrap:wrap; gap:6px;">
              <button
                v-for="tag in techTags"
                :key="tag"
                @click="toggleTag(tag)"
                :style="selectedTags.includes(tag)
                  ? 'padding:5px 12px; border-radius:999px; font-size:12px; border:1px solid #6366f1; background:#6366f1; color:#fff; cursor:pointer;'
                  : 'padding:5px 12px; border-radius:999px; font-size:12px; border:1px solid #c7d2fe; background:#F0F1FF; color:#4338CA; cursor:pointer;'"
              >{{ tag }}</button>
            </div>
          </div>
        </div>
        <RouterLink
          to="/qna/write"
          style="display:block; width:100%; padding:14px; border-radius:12px; font-size:14px; font-weight:600; background:#6366f1; color:#fff; text-align:center; text-decoration:none; box-sizing:border-box;"
        >
          + 질문하기
        </RouterLink>
      </aside>

      <!-- 메인 -->
      <main style="flex:1; min-width:0;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
          <span style="font-size:14px; color:#9ca3af;">{{ filteredQnas.length }}개의 질문</span>
          <select v-model="sortOrder" style="font-size:13px; color:#374151; border:1px solid #e5e7eb; border-radius:8px; padding:6px 12px; background:#fff; outline:none; cursor:pointer;">
            <option value="latest">최신순</option>
            <option value="popular">인기순</option>
          </select>
        </div>

        <div v-if="loading" style="text-align:center; color:#9ca3af; padding:80px 0; font-size:14px;">불러오는 중...</div>

        <div v-else-if="filteredQnas.length === 0" style="text-align:center; color:#9ca3af; padding:80px 0; font-size:14px;">
          조건에 맞는 질문이 없어요.
        </div>

        <div v-else style="display:flex; flex-direction:column; gap:12px;">
          <RouterLink
            v-for="qna in filteredQnas"
            :key="qna.id"
            :to="`/qna/${qna.id}`"
            style="background:#fff; border-radius:16px; border:1px solid #e5e7eb; padding:24px; display:flex; gap:20px; text-decoration:none; transition:box-shadow 0.2s;"
            @mouseenter="e => e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'"
            @mouseleave="e => e.currentTarget.style.boxShadow='none'"
          >
            <!-- 통계 -->
            <div style="display:flex; flex-direction:column; align-items:center; gap:12px; min-width:56px; padding-top:4px;">
              <div :style="`text-align:center; padding:8px 12px; border-radius:10px; ${qna.answerCount > 0 ? (qna.solved ? 'background:#d1fae5; border:1px solid #6ee7b7;' : 'background:#e0e7ff; border:1px solid #c7d2fe;') : 'background:#f3f4f6; border:1px solid #e5e7eb;'}`">
                <div :style="`font-size:18px; font-weight:700; ${qna.answerCount > 0 ? (qna.solved ? 'color:#059669;' : 'color:#4338ca;') : 'color:#9ca3af;'}`">{{ qna.answerCount ?? 0 }}</div>
                <div :style="`font-size:11px; ${qna.answerCount > 0 ? (qna.solved ? 'color:#059669;' : 'color:#6366f1;') : 'color:#9ca3af;'}`">답변</div>
              </div>
              <div style="text-align:center;">
                <div style="font-size:14px; font-weight:600; color:#9ca3af;">{{ qna.viewCount ?? 0 }}</div>
                <div style="font-size:11px; color:#d1d5db;">조회</div>
              </div>
            </div>

            <!-- 내용 -->
            <div style="flex:1; min-width:0;">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                <span v-if="qna.solved" style="background:#d1fae5; color:#059669; font-size:11px; font-weight:600; padding:2px 8px; border-radius:999px;">해결됨</span>
                <h3 style="font-size:16px; font-weight:700; color:#111827; margin:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">{{ qna.title }}</h3>
              </div>
              <p style="font-size:13px; color:#6b7280; margin:0 0 12px; line-height:1.6; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">{{ qna.content }}</p>
              <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
                <div style="display:flex; flex-wrap:wrap; gap:6px;">
                  <span
                    v-for="tag in (qna.tags ?? []).slice(0, 4)"
                    :key="tag"
                    style="font-size:12px; padding:3px 10px; border-radius:999px; border:1px solid #c7d2fe; color:#4338CA; background:#F0F1FF;"
                  >{{ tag }}</span>
                </div>
                <div style="display:flex; align-items:center; gap:12px; font-size:12px; color:#9ca3af; flex-shrink:0;">
                  <span>{{ qna.authorName }}</span>
                  <span>{{ formatDate(qna.createdAt) }}</span>
                  <span style="display:flex; align-items:center; gap:3px;">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    {{ qna.likeCount ?? 0 }}
                  </span>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
      </main>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { getQnas } from '../api/qna.js'
import NavBar from '../components/NavBar.vue'
import { techOptions, categoryTags } from '../data/dummy.js'

const searchQuery = ref('')
const selectedTags = ref([])
const sortOrder = ref('latest')
const activeTab = ref('all')
const loading = ref(false)
const qnas = ref([])

const tabs = [
  { value: 'all', label: '전체' },
  { value: 'unanswered', label: '미답변' },
  { value: 'solved', label: '해결됨' },
]

const techTags = techOptions

const filteredQnas = computed(() => {
  let list = qnas.value
  if (activeTab.value === 'unanswered') list = list.filter(q => !q.answerCount)
  if (activeTab.value === 'solved') list = list.filter(q => q.solved)
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(item => item.title?.toLowerCase().includes(q) || item.content?.toLowerCase().includes(q))
  }
  if (selectedTags.value.length) {
    list = list.filter(item => selectedTags.value.some(t => (item.tags ?? []).includes(t)))
  }
  if (sortOrder.value === 'popular') list = [...list].sort((a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0))
  return list
})

async function fetchQnas() {
  loading.value = true
  try {
    const params = {}
    if (searchQuery.value) params.keyword = searchQuery.value
    if (selectedTags.value.length) params.tags = selectedTags.value
    if (sortOrder.value) params.sort = sortOrder.value
    const data = await getQnas(params)
    qnas.value = Array.isArray(data) ? data : []
  } catch {
    qnas.value = []
  } finally {
    loading.value = false
  }
}

let searchTimer = null
watch(searchQuery, () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(fetchQnas, 300)
})
watch([selectedTags, sortOrder], fetchQnas)

onMounted(fetchQnas)

function toggleTag(tag) {
  const idx = selectedTags.value.indexOf(tag)
  if (idx === -1) selectedTags.value.push(tag)
  else selectedTags.value.splice(idx, 1)
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
