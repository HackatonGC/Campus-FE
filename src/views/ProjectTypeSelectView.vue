<template>
  <div style="min-height:100vh; background:#f4f4fd;">

    <!-- NAV -->
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
        <RouterLink to="/" style="font-size:14px; color:#6b7280; text-decoration:none;">← 돌아가기</RouterLink>
      </div>
    </nav>

    <!-- 선택 화면 -->
    <div style="max-width:860px; margin:0 auto; padding:80px 40px;">

      <!-- 헤더 -->
      <div style="text-align:center; margin-bottom:56px;">
        <h1 style="font-size:32px; font-weight:800; color:#111827; margin:0 0 12px; letter-spacing:-0.5px;">어떤 프로젝트를 등록할까요?</h1>
        <p style="font-size:16px; color:#9ca3af; margin:0;">목적에 맞는 유형을 선택해주세요</p>
      </div>

      <!-- 카드 2개 -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">

        <!-- 팀원 모집 -->
        <RouterLink to="/project/recruit/new" style="text-decoration:none;">
          <div
            @mouseenter="hoverRecruit = true"
            @mouseleave="hoverRecruit = false"
            :style="`background:#fff; border-radius:24px; padding:40px 36px; border:2px solid ${hoverRecruit ? '#6366f1' : '#e5e7eb'}; cursor:pointer; transition:all 0.2s; box-shadow:${hoverRecruit ? '0 8px 32px rgba(99,102,241,0.15)' : '0 1px 4px rgba(0,0,0,0.06)'}; transform:${hoverRecruit ? 'translateY(-4px)' : 'none'};`"
          >
            <div style="width:64px; height:64px; background:#ede9fe; border-radius:20px; display:flex; align-items:center; justify-content:center; margin-bottom:24px;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h2 style="font-size:22px; font-weight:800; color:#111827; margin:0 0 10px;">팀원 모집하기</h2>
            <p style="font-size:14px; color:#6b7280; line-height:1.7; margin:0 0 28px;">함께 개발할 팀원을 찾고 있나요?<br>모집 공고를 올리고 마음 맞는 팀원을 구해보세요.</p>
            <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:32px;">
              <span style="font-size:12px; background:#f0f1ff; color:#4338ca; padding:4px 12px; border-radius:999px; font-weight:500;">역할별 모집</span>
              <span style="font-size:12px; background:#f0f1ff; color:#4338ca; padding:4px 12px; border-radius:999px; font-weight:500;">진행 방식 설정</span>
              <span style="font-size:12px; background:#f0f1ff; color:#4338ca; padding:4px 12px; border-radius:999px; font-weight:500;">마감일 지정</span>
            </div>
            <div :style="`display:flex; align-items:center; justify-content:center; height:48px; border-radius:12px; font-size:15px; font-weight:700; color:#fff; background:${hoverRecruit ? '#6366f1' : '#818cf8'}; transition:background 0.2s;`">
              모집 시작하기 →
            </div>
          </div>
        </RouterLink>

        <!-- 프로젝트 공유 -->
        <RouterLink to="/project/complete/new" style="text-decoration:none;">
          <div
            @mouseenter="hoverComplete = true"
            @mouseleave="hoverComplete = false"
            :style="`background:#fff; border-radius:24px; padding:40px 36px; border:2px solid ${hoverComplete ? '#10b981' : '#e5e7eb'}; cursor:pointer; transition:all 0.2s; box-shadow:${hoverComplete ? '0 8px 32px rgba(16,185,129,0.15)' : '0 1px 4px rgba(0,0,0,0.06)'}; transform:${hoverComplete ? 'translateY(-4px)' : 'none'};`"
          >
            <div style="width:64px; height:64px; background:#d1fae5; border-radius:20px; display:flex; align-items:center; justify-content:center; margin-bottom:24px;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <h2 style="font-size:22px; font-weight:800; color:#111827; margin:0 0 10px;">프로젝트 공유하기</h2>
            <p style="font-size:14px; color:#6b7280; line-height:1.7; margin:0 0 28px;">완성한 프로젝트가 있나요?<br>경험과 노하우를 공유하고 후배들에게 도움을 줘보세요.</p>
            <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:32px;">
              <span style="font-size:12px; background:#d1fae5; color:#065f46; padding:4px 12px; border-radius:999px; font-weight:500;">경험 공유</span>
              <span style="font-size:12px; background:#d1fae5; color:#065f46; padding:4px 12px; border-radius:999px; font-weight:500;">포트폴리오</span>
              <span style="font-size:12px; background:#d1fae5; color:#065f46; padding:4px 12px; border-radius:999px; font-weight:500;">코드 리뷰</span>
            </div>
            <div :style="`display:flex; align-items:center; justify-content:center; height:48px; border-radius:12px; font-size:15px; font-weight:700; color:#fff; background:${hoverComplete ? '#10b981' : '#34d399'}; transition:background 0.2s;`">
              공유 시작하기 →
            </div>
          </div>
        </RouterLink>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const hoverRecruit = ref(false)
const hoverComplete = ref(false)
</script>
