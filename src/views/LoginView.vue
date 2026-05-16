<template>
  <div class="min-h-screen flex flex-col items-center justify-center" style="background: #eeeeff">

    <!-- Logo (카드 밖) -->
    <div class="flex items-center justify-center gap-3">
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center"
        style="background: #6366f1"
      >
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.66 4.35998C25.1389 4.12228 24.5728 3.99927 24 3.99927C23.4273 3.99927 22.8612 4.12228 22.34 4.35998L5.20005 12.16C4.84515 12.3165 4.54341 12.5728 4.33158 12.8977C4.11974 13.2226 4.00696 13.6021 4.00696 13.99C4.00696 14.3779 4.11974 14.7574 4.33158 15.0823C4.54341 15.4072 4.84515 15.6635 5.20005 15.82L22.3601 23.64C22.8812 23.8777 23.4473 24.0007 24.0201 24.0007C24.5928 24.0007 25.1589 23.8777 25.68 23.64L42.84 15.84C43.195 15.6835 43.4967 15.4272 43.7085 15.1023C43.9204 14.7774 44.0331 14.3979 44.0331 14.01C44.0331 13.6221 43.9204 13.2426 43.7085 12.9177C43.4967 12.5928 43.195 12.3365 42.84 12.18L25.66 4.35998Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4.00001 24C3.99906 24.3825 4.10784 24.7573 4.31344 25.0799C4.51904 25.4025 4.81285 25.6593 5.16001 25.82L22.36 33.64C22.8784 33.8747 23.4409 33.9962 24.01 33.9962C24.5791 33.9962 25.1416 33.8747 25.66 33.64L42.82 25.84C43.174 25.6809 43.4741 25.4222 43.6836 25.0955C43.8931 24.7687 44.0031 24.3881 44 24" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4.00001 34C3.99906 34.3825 4.10784 34.7573 4.31344 35.0799C4.51904 35.4025 4.81285 35.6593 5.16001 35.82L22.36 43.64C22.8784 43.8747 23.4409 43.9962 24.01 43.9962C24.5791 43.9962 25.1416 43.8747 25.66 43.64L42.82 35.84C43.174 35.6809 43.4741 35.4222 43.6836 35.0955C43.8931 34.7687 44.0031 34.3881 44 34" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="text-2xl font-bold" style="color: #6366f1">StackMate</span>
    </div>

    <!-- 공백 -->
    <div class="h-[20px]"></div>

    <!-- Card -->
    <div
      class="bg-white rounded-2xl px-10 py-8 flex flex-col items-center"
      :style="{
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        width: '450px',
        height: activeTab === 'login' ? '390px' : '630px'
      }"
    >
      <!-- 공백 -->
      <div class="h-[20px]"></div>

      <!-- Tabs -->
      <div class="flex rounded-xl p-1 mb-6 w-[400px]" style="background: #f3f3f3">
        <button
          class="flex-1 h-[40px] rounded-lg text-sm font-medium transition-all"
          :class="activeTab === 'login' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'"
          @click="activeTab = 'login'"
        >로그인</button>
        <button
          class="flex-1 h-[40px] rounded-lg text-sm font-medium transition-all"
          :class="activeTab === 'signup' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'"
          @click="activeTab = 'signup'"
        >회원가입</button>
      </div>

      <!-- 로그인 폼 -->
      <div v-if="activeTab === 'login'">
        <!-- 공백 -->
        <div class="h-[20px]"></div>

        <h2 class="mb-1" style="color: #1A1A2E; font-family: Inter; font-size: 24px; font-weight: 500; line-height: 32px">로그인</h2>
        <p class="text-sm" style="color: #9ca3af">계정에 로그인하세요</p>

        <!-- 공백 -->
        <div class="h-[20px]"></div>

        <form id="login-form" @submit.prevent="handleLogin">
        <div class="w-[400px] mx-auto">
          <label class="block text-sm font-medium mb-1.5" style="color: #374151">이메일</label>
          <input
            v-model="email"
            type="email"
            placeholder="your@email.com"
            class="rounded-xl text-sm outline-none transition"
            style="display: flex; width: 400px; height: 44px; padding: 4px 12px; align-items: center; background: #F9FAFB; color: #111827"
          />

          <!-- 공백 -->
          <div class="h-[20px]"></div>

          <label class="block text-sm font-medium mb-1.5" style="color: #374151">비밀번호</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="rounded-xl text-sm outline-none transition"
              style="display: flex; width: 400px; height: 44px; padding: 4px 12px; align-items: center; background: #F9FAFB; color: #111827; padding-right: 44px"
            />
            <button
              type="button"
              class="absolute right-3.5 top-1/2 -translate-y-1/2"
              :style="{ opacity: showPassword ? 1 : 0.5 }"
              @click="showPassword = !showPassword"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.37468 8.232C1.31912 8.08232 1.31912 7.91767 1.37468 7.768C1.91581 6.4559 2.83435 5.33402 4.01386 4.5446C5.19336 3.75517 6.58071 3.33374 8.00001 3.33374C9.41932 3.33374 10.8067 3.75517 11.9862 4.5446C13.1657 5.33402 14.0842 6.4559 14.6253 7.768C14.6809 7.91767 14.6809 8.08232 14.6253 8.232C14.0842 9.54409 13.1657 10.666 11.9862 11.4554C10.8067 12.2448 9.41932 12.6663 8.00001 12.6663C6.58071 12.6663 5.19336 12.2448 4.01386 11.4554C2.83435 10.666 1.91581 9.54409 1.37468 8.232Z" stroke="#6B7280" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="#6B7280" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <!-- 공백 -->
          <div class="h-[20px]"></div>

          <button
            type="submit"
            class="w-[400px] h-[44px] rounded-xl text-white text-sm font-semibold transition hover:opacity-90 active:scale-[0.98]"
            style="background: #6366f1"
          >로그인</button>
        </div>
        </form>
      </div>

      <!-- 회원가입 폼 -->
      <div v-if="activeTab === 'signup'">
        <!-- 공백 -->
        <div class="h-[20px]"></div>

        <h2 class="mb-1" style="color: #1A1A2E; font-family: Inter; font-size: 24px; font-weight: 500; line-height: 32px">회원가입</h2>
        <p class="text-sm" style="color: #9ca3af">StackMate에 가입하세요</p>

        <!-- 공백 -->
        <div class="h-[20px]"></div>

        <form @submit.prevent="handleSignup">
        <div class="w-[400px] mx-auto">
          <!-- 스크롤 영역 -->
          <div style="height: 380px; overflow-y: auto;">

          <!-- 이름 -->
          <label class="block text-sm font-medium mb-1.5" style="color: #374151">이름</label>
          <input
            v-model="signupName"
            type="text"
            placeholder="홍길동"
            class="rounded-xl text-sm outline-none transition"
            style="display: flex; width: 100%; height: 44px; padding: 4px 12px; align-items: center; background: #F9FAFB; color: #111827"
          />

          <!-- 공백 -->
          <div class="h-[15px]"></div>

          <!-- 학교 + 학과 -->
          <div class="flex gap-3">
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1.5" style="color: #374151">학교</label>
              <input
                v-model="signupSchool"
                type="text"
                placeholder="서울대학교"
                class="rounded-xl text-sm outline-none transition"
                style="display: flex; width: 100%; height: 44px; padding: 4px 12px; align-items: center; background: #F9FAFB; color: #111827"
              />
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium mb-1.5" style="color: #374151">학과</label>
              <input
                v-model="signupDept"
                type="text"
                placeholder="컴퓨터공학과"
                class="rounded-xl text-sm outline-none transition"
                style="display: flex; width: 100%; height: 44px; padding: 4px 12px; align-items: center; background: #F9FAFB; color: #111827"
              />
            </div>
          </div>

          <!-- 공백 -->
          <div class="h-[15px]"></div>

          <!-- 이메일 + 인증 -->
          <label class="block text-sm font-medium mb-1.5" style="color: #374151">이메일</label>
          <div class="flex gap-2">
            <input
              v-model="signupEmail"
              type="email"
              placeholder="your@university.ac.kr"
              class="flex-1 rounded-xl text-sm outline-none transition"
              style="height: 44px; padding: 4px 12px; background: #F9FAFB; color: #111827"
            />
            <button
              type="button"
              class="rounded-xl text-sm font-medium transition hover:opacity-90"
              style="height: 44px; padding-left: 21px; padding-right: 21px; border: 1.5px solid #e5e7eb; color: #374151; white-space: nowrap"
            >인증</button>
          </div>

          <!-- 공백 -->
          <div class="h-[15px]"></div>

          <!-- 비밀번호 -->
          <label class="block text-sm font-medium mb-1.5" style="color: #374151">비밀번호</label>
          <input
            v-model="signupPassword"
            type="password"
            placeholder="8자 이상 입력하세요"
            class="rounded-xl text-sm outline-none transition"
            style="display: flex; width: 100%; height: 44px; padding: 4px 12px; align-items: center; background: #F9FAFB; color: #111827"
          />

          <!-- 공백 -->
          <div class="h-[15px]"></div>

          <!-- 관심 기술 스택 -->
          <label class="block text-sm font-medium mb-2" style="color: #374151">관심 기술 스택 (최대 5개)</label>
          <div
            class="flex flex-wrap gap-2 rounded-xl"
            style="border: 1.5px solid #e5e7eb; padding: 8px 12px;"
          >
    

            <button
              v-for="tag in techOptions"
              :key="tag"
              type="button"
              class="rounded-full text-sm transition"
              :style="selectedTech.includes(tag)
                ? 'padding: 2px 5px; background: #ede9fe; color: #6366f1; border: 1.5px solid #6366f1'
                : 'padding: 2px 5px; background: #f9fafb; color: #6b7280; border: 1.5px solid #e5e7eb'"
              @click="toggleTech(tag)"
            >{{ tag }}</button>
          </div>

          </div><!-- 스크롤 영역 끝 -->

          <!-- 공백 -->
          <div class="h-[15px]"></div>

          <button
            type="submit"
            class="w-[400px] h-[44px] rounded-xl text-white text-sm font-semibold transition hover:opacity-90 active:scale-[0.98]"
            style="background: #6366f1"
          >회원가입</button>
        </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('login')

// 로그인
const email = ref('')
const password = ref('')
const showPassword = ref(false)

// 회원가입
const signupName = ref('')
const signupSchool = ref('')
const signupDept = ref('')
const signupEmail = ref('')
const signupPassword = ref('')
const techOptions = ['React', 'Spring', 'Android', 'Unity', 'Python', 'Vue', 'Flutter', 'Node.js', 'Swift', 'Kotlin']
const selectedTech = ref([])

function toggleTech(tag) {
  if (selectedTech.value.includes(tag)) {
    selectedTech.value = selectedTech.value.filter(t => t !== tag)
  } else if (selectedTech.value.length < 5) {
    selectedTech.value.push(tag)
  }
}

function handleLogin() {
  console.log('login', email.value, password.value)
}

function handleSignup() {
  console.log('signup', signupName.value, signupEmail.value, selectedTech.value)
}
</script>

