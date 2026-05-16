<template>
  <div style="min-height:100vh; background:#f4f4fd;">

    <NavBar />

    <div style="max-width:800px; margin:0 auto; padding:48px 40px 80px;">
      <h1 style="font-size:28px; font-weight:800; color:#111827; margin:0 0 8px;">질문하기</h1>
      <p style="font-size:14px; color:#9ca3af; margin:0 0 40px;">구체적으로 작성할수록 빠른 답변을 받을 수 있어요.</p>

      <div style="background:#fff; border-radius:16px; border:1px solid #e5e7eb; padding:36px; display:flex; flex-direction:column; gap:28px;">

        <!-- 제목 -->
        <div>
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">제목 <span style="color:#ef4444;">*</span></label>
          <input
            v-model="form.title"
            type="text"
            placeholder="질문 제목을 입력하세요"
            maxlength="200"
            style="width:100%; padding:12px 16px; border:1px solid #e5e7eb; border-radius:10px; font-size:15px; color:#111827; outline:none; box-sizing:border-box; background:#fafafa;"
            @focus="e => e.target.style.borderColor='#6366f1'"
            @blur="e => e.target.style.borderColor='#e5e7eb'"
          />
          <div style="text-align:right; font-size:12px; color:#d1d5db; margin-top:4px;">{{ form.title.length }}/200</div>
        </div>

        <!-- 태그 -->
        <div>
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:12px;">태그</label>

          <!-- 카테고리 태그 -->
          <div style="margin-bottom:16px;">
            <div style="font-size:12px; font-weight:600; color:#9ca3af; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.05em;">카테고리</div>
            <div style="display:flex; flex-wrap:wrap; gap:8px;">
              <button
                v-for="tag in categoryTags"
                :key="tag"
                type="button"
                @click="toggleCategoryTag(tag)"
                :style="form.selectedCategory.includes(tag)
                  ? 'padding:6px 14px; border-radius:999px; font-size:13px; border:1px solid #6366f1; background:#6366f1; color:#fff; cursor:pointer;'
                  : 'padding:6px 14px; border-radius:999px; font-size:13px; border:1px solid #c7d2fe; background:#F0F1FF; color:#4338CA; cursor:pointer;'"
              >{{ tag }}</button>
              <input
                v-model="customCategoryTag"
                type="text"
                placeholder="+ 직접 입력"
                style="padding:6px 14px; border-radius:999px; font-size:13px; border:1px dashed #c7d2fe; background:#fff; color:#4338CA; outline:none; width:110px;"
                @keydown.enter.prevent="addCustomTag(customCategoryTag, 'category')"
                @blur="addCustomTag(customCategoryTag, 'category')"
              />
            </div>
            <div v-if="form.selectedCategory.length" style="display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-top:8px;">
              <span style="font-size:12px; color:#9ca3af;">선택됨:</span>
              <span
                v-for="tag in form.selectedCategory"
                :key="tag"
                style="font-size:12px; padding:3px 10px; border-radius:999px; background:#6366f1; color:#fff; display:flex; align-items:center; gap:4px;"
              >
                {{ tag }}
                <button type="button" @click="toggleCategoryTag(tag)" style="background:none; border:none; cursor:pointer; color:#fff; line-height:1; padding:0; font-size:14px;">×</button>
              </span>
            </div>
          </div>

          <!-- 기술 태그 -->
          <div style="margin-bottom:12px;">
            <div style="font-size:12px; font-weight:600; color:#9ca3af; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.05em;">기술 스택</div>
            <div style="display:flex; flex-wrap:wrap; gap:8px;">
              <button
                v-for="tag in techTags"
                :key="tag"
                type="button"
                @click="toggleTechTag(tag)"
                :style="form.selectedTech.includes(tag)
                  ? 'padding:6px 14px; border-radius:999px; font-size:13px; border:1px solid #6366f1; background:#6366f1; color:#fff; cursor:pointer;'
                  : 'padding:6px 14px; border-radius:999px; font-size:13px; border:1px solid #c7d2fe; background:#F0F1FF; color:#4338CA; cursor:pointer;'"
              >{{ tag }}</button>
              <input
                v-model="customTechTag"
                type="text"
                placeholder="+ 직접 입력"
                style="padding:6px 14px; border-radius:999px; font-size:13px; border:1px dashed #c7d2fe; background:#fff; color:#4338CA; outline:none; width:110px;"
                @keydown.enter.prevent="addCustomTag(customTechTag, 'tech')"
                @blur="addCustomTag(customTechTag, 'tech')"
              />
            </div>
            <div v-if="form.selectedTech.length" style="display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-top:8px;">
              <span style="font-size:12px; color:#9ca3af;">선택됨:</span>
              <span
                v-for="tag in form.selectedTech"
                :key="tag"
                style="font-size:12px; padding:3px 10px; border-radius:999px; background:#6366f1; color:#fff; display:flex; align-items:center; gap:4px;"
              >
                {{ tag }}
                <button type="button" @click="toggleTechTag(tag)" style="background:none; border:none; cursor:pointer; color:#fff; line-height:1; padding:0; font-size:14px;">×</button>
              </span>
            </div>
          </div>
        </div>

        <!-- 내용 -->
        <div>
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">내용 <span style="color:#ef4444;">*</span></label>
          <p style="font-size:12px; color:#9ca3af; margin:0 0 10px;">마크다운을 지원합니다. 코드는 백틱(`)으로 감싸주세요.</p>
          <textarea
            v-model="form.content"
            placeholder="문제 상황을 자세히 설명해주세요.&#10;&#10;**시도한 것:**&#10;&#10;**에러 메시지:**&#10;&#10;**코드:**&#10;```&#10;// 코드를 여기에 붙여넣으세요&#10;```"
            style="width:100%; padding:16px; border:1px solid #e5e7eb; border-radius:10px; font-size:14px; color:#374151; resize:vertical; outline:none; box-sizing:border-box; min-height:300px; background:#fafafa; line-height:1.7; font-family:inherit;"
            @focus="e => e.target.style.borderColor='#6366f1'"
            @blur="e => e.target.style.borderColor='#e5e7eb'"
          ></textarea>
        </div>

        <!-- 에러 메시지 -->
        <p v-if="errorMsg" style="color:#ef4444; font-size:14px; margin:0;">{{ errorMsg }}</p>

        <!-- 버튼 -->
        <div style="display:flex; justify-content:flex-end; gap:12px;">
          <RouterLink to="/qna" style="padding:12px 24px; border-radius:10px; font-size:14px; font-weight:600; color:#6b7280; background:#f3f4f6; border:none; cursor:pointer; text-decoration:none; display:flex; align-items:center;">취소</RouterLink>
          <button
            @click="handleSubmit"
            :disabled="submitting"
            style="padding:12px 32px; border-radius:10px; font-size:14px; font-weight:600; background:#6366f1; color:#fff; border:none; cursor:pointer;"
            :style="submitting ? 'opacity:0.6; cursor:not-allowed;' : ''"
          >{{ submitting ? '등록 중...' : '질문 등록' }}</button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createQna } from '../api/qna.js'
import { isLoggedIn } from '../store/auth.js'
import NavBar from '../components/NavBar.vue'
import { techOptions, categoryTags } from '../data/dummy.js'

const router = useRouter()

onMounted(() => {
  if (!isLoggedIn.value) router.push('/login')
})

const form = ref({
  title: '',
  content: '',
  selectedCategory: [],
  selectedTech: [],
})
const submitting = ref(false)
const errorMsg = ref('')

const techTags = techOptions

const customCategoryTag = ref('')
const customTechTag = ref('')

function toggleCategoryTag(tag) {
  const idx = form.value.selectedCategory.indexOf(tag)
  if (idx === -1) form.value.selectedCategory.push(tag)
  else form.value.selectedCategory.splice(idx, 1)
}

function toggleTechTag(tag) {
  const idx = form.value.selectedTech.indexOf(tag)
  if (idx === -1) form.value.selectedTech.push(tag)
  else form.value.selectedTech.splice(idx, 1)
}

function addCustomTag(value, type) {
  const tag = value.trim()
  if (!tag) return
  if (type === 'category') {
    if (!form.value.selectedCategory.includes(tag)) form.value.selectedCategory.push(tag)
    customCategoryTag.value = ''
  } else {
    if (!form.value.selectedTech.includes(tag)) form.value.selectedTech.push(tag)
    customTechTag.value = ''
  }
}

async function handleSubmit() {
  errorMsg.value = ''
  if (!form.value.title.trim()) { errorMsg.value = '제목을 입력해주세요.'; return }
  if (!form.value.content.trim()) { errorMsg.value = '내용을 입력해주세요.'; return }

  submitting.value = true
  try {
    const res = await createQna({
      title: form.value.title.trim(),
      content: form.value.content.trim(),
      tags: [...form.value.selectedCategory, ...form.value.selectedTech],
    })
    const id = res?.id ?? res
    router.replace(id ? `/qna/${id}` : '/qna')
  } catch (e) {
    const status = e?.response?.status
    const msg = e?.response?.data?.message ?? e?.message ?? ''
    errorMsg.value = `등록 실패 (${status ?? 'network error'}): ${msg}`
  } finally {
    submitting.value = false
  }
}
</script>
