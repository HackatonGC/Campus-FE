<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span class="text-white text-xs font-bold">S</span>
            </div>
            <div>
              <div class="font-bold text-gray-900 text-sm leading-none">StackMate</div>
              <div class="text-gray-400 text-[10px]">함께 성장하는 개발자</div>
            </div>
          </div>
          <div class="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#" class="hover:text-gray-900">프로젝트</a>
            <a href="#" class="hover:text-gray-900">인기 기술</a>
            <a href="#" class="hover:text-gray-900">팀원 구하기</a>
            <a href="#" class="hover:text-gray-900">팀원 되기</a>
          </div>
        </div>
        <button class="text-sm text-gray-600 border border-gray-300 rounded-lg px-4 py-1.5 hover:bg-gray-50">
          로그인
        </button>
      </div>
    </nav>

    <!-- Hero -->
    <section class="bg-white py-14 text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-3">프로젝트 메이트를 만나보세요</h1>
      <p class="text-gray-500 text-sm mb-8">
        실제 경험을 가진 선배 개발자의 프로젝트를 찾아보고,<br />
        함께 팀을 만들어 성장할 팀원을 만나보세요
      </p>
      <!-- Search -->
      <div class="max-w-xl mx-auto px-4">
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="프로젝트 검색..."
            class="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      <!-- Tech tag chips -->
      <div class="flex flex-wrap justify-center gap-2 mt-4 px-4">
        <button
          v-for="tag in popularTags"
          :key="tag"
          @click="toggleTag(tag)"
          :class="[
            'px-3 py-1 rounded-full text-xs font-medium border transition-colors',
            selectedTags.includes(tag)
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400 hover:text-indigo-600'
          ]"
        >
          {{ tag }}
        </button>
      </div>
    </section>

    <!-- Body -->
    <div class="max-w-7xl mx-auto px-6 pb-16 flex gap-6">
      <!-- Sidebar Filter -->
      <aside class="w-44 shrink-0">
        <div class="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">필터</div>
        <div class="text-xs text-gray-500 mb-1">기술 스택</div>
        <div class="flex flex-col gap-1 mb-4">
          <label
            v-for="tech in techOptions"
            :key="tech"
            class="flex items-center gap-2 text-xs text-gray-700 cursor-pointer"
          >
            <input
              type="checkbox"
              :value="tech"
              v-model="selectedTags"
              class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            {{ tech }}
          </label>
        </div>
        <button
          @click="selectedTags = []"
          class="w-full text-xs text-indigo-600 border border-indigo-200 rounded-lg py-1.5 hover:bg-indigo-50 mb-4"
        >
          필터 초기화
        </button>
        <button class="w-full text-xs bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700">
          + 프로젝트 등록
        </button>
      </aside>

      <!-- Project Grid -->
      <main class="flex-1">
        <div class="text-xs text-gray-400 mb-3">프로젝트 목록</div>
        <div v-if="filteredProjects.length === 0" class="text-center text-gray-400 py-20 text-sm">
          조건에 맞는 프로젝트가 없어요.
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <RouterLink
            v-for="project in filteredProjects"
            :key="project.id"
            :to="`/project/${project.id}`"
            class="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow block"
          >
            <!-- Thumbnail -->
            <div class="relative">
              <img
                :src="project.thumbnailUrl"
                :alt="project.title"
                class="w-full h-40 object-cover"
              />
              <span
                v-if="project.isRecruiting"
                class="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full"
              >
                모집중
              </span>
            </div>
            <!-- Content -->
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 text-sm mb-1">{{ project.title }}</h3>
              <p class="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{{ project.summary }}</p>
              <div class="flex flex-wrap gap-1 mb-3">
                <span
                  v-for="tech in project.techStack.slice(0, 3)"
                  :key="tech"
                  class="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                >
                  {{ tech }}
                </span>
                <span v-if="project.techStack.length > 3" class="text-[10px] text-gray-400">
                  +{{ project.techStack.length - 3 }}
                </span>
              </div>
              <div class="flex items-center justify-between text-[10px] text-gray-400">
                <div class="flex items-center gap-3">
                  <span>👁 {{ project.views }}</span>
                  <span>❤️ {{ project.likes }}</span>
                </div>
                <button class="text-gray-400 hover:text-indigo-500">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                  </svg>
                </button>
              </div>
            </div>
          </RouterLink>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { projects, techOptions } from '../data/dummy.js'

const searchQuery = ref('')
const selectedTags = ref([])

const popularTags = ['전체', 'React', 'Spring', 'Android', 'AI/ML', 'Unity']

function toggleTag(tag) {
  if (tag === '전체') {
    selectedTags.value = []
    return
  }
  const idx = selectedTags.value.indexOf(tag)
  if (idx === -1) selectedTags.value.push(tag)
  else selectedTags.value.splice(idx, 1)
}

const filteredProjects = computed(() => {
  return projects.filter(p => {
    const matchesSearch =
      !searchQuery.value ||
      p.title.includes(searchQuery.value) ||
      p.summary.includes(searchQuery.value) ||
      p.techStack.some(t => t.toLowerCase().includes(searchQuery.value.toLowerCase()))

    const matchesTags =
      selectedTags.value.length === 0 ||
      selectedTags.value.every(tag => p.techStack.includes(tag))

    return matchesSearch && matchesTags
  })
})
</script>
