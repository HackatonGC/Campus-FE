<template>
  <div style="min-height:100vh; background:#f4f4fd;">

    <!-- 미리보기 배너 -->
    <div style="background:#f59e0b; padding:10px 24px; display:flex; align-items:center; justify-content:center; gap:16px; position:sticky; top:0; z-index:60;">
      <svg style="width:16px; height:16px; color:#fff; flex-shrink:0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
      </svg>
      <span style="font-size:13px; font-weight:700; color:#fff;">미리보기 모드 — 실제 등록된 내용이 아닙니다</span>
      <button
        @click="goBack"
        style="background:rgba(255,255,255,0.25); border:none; border-radius:6px; padding:4px 14px; font-size:12px; font-weight:700; color:#fff; cursor:pointer;"
      >← 돌아가기</button>
    </div>

    <!-- NAV -->
    <nav style="background:#fff; border-bottom:1px solid #e5e7eb; position:sticky; top:38px; z-index:50;">
      <div style="max-width:1280px; margin:0 auto; padding:0 40px; height:68px; display:flex; align-items:center; justify-content:space-between;">
        <RouterLink to="/" style="display:flex; align-items:center; gap:12px; text-decoration:none;">
          <div style="width:44px; height:44px; background:#6366f1; border-radius:12px; display:flex; align-items:center; justify-content:center;">
            <img :src="iconLogo" style="width:28px; height:28px;" alt="StackMate" />
          </div>
          <div>
            <div style="font-weight:700; font-size:16px; line-height:1.2; background:linear-gradient(to right,#6366F1,rgba(99,102,241,0.7)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">StackMate</div>
            <div style="color:#9ca3af; font-size:11px; line-height:1.2;">함께 성장하는 개발자</div>
          </div>
        </RouterLink>
        <button style="font-size:14px; color:#4b5563; background:none; border:none; cursor:pointer;">로그인</button>
      </div>
    </nav>

    <!-- 히어로 이미지 -->
    <div style="width:100%; height:320px; overflow:hidden; background:#e0e7ff;">
      <img
        :src="heroImage"
        style="width:100%; height:100%; object-fit:cover;"
        alt="프로젝트 대표 이미지"
      />
    </div>

    <!-- 본문 컨테이너 -->
    <div style="max-width:860px; margin:0 auto; padding:0 24px 80px;">

      <!-- 프로젝트 메타 -->
      <div style="background:#fff; border-radius:16px; border:1px solid #e5e7eb; padding:32px; margin-top:-48px; position:relative; z-index:10;">
        <!-- 배지 -->
        <div style="display:flex; gap:8px; margin-bottom:14px;">
          <span style="background:#eef2ff; color:#6366f1; font-size:12px; font-weight:700; padding:4px 12px; border-radius:999px; border:1px solid #c7d2fe;">
            {{ statusLabel }}
          </span>
          <span style="background:transparent; color:#6366f1; font-size:12px; font-weight:700; padding:4px 12px; border-radius:999px; border:1px solid #c7d2fe;">
            팀 프로젝트
          </span>
        </div>

        <!-- 제목 -->
        <h1 style="font-size:28px; font-weight:800; color:#111827; margin:0 0 8px; line-height:1.3;">
          {{ project.title || '프로젝트 제목' }}
        </h1>
        <p style="font-size:15px; color:#6b7280; margin:0 0 20px; line-height:1.6;">
          {{ project.summary || '한 줄 소개가 없습니다.' }}
        </p>

        <!-- 기술 스택 -->
        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px;">
          <span
            v-for="tech in project.techStack"
            :key="tech"
            style="font-size:13px; font-weight:500; padding:5px 14px; border-radius:999px; border:1px solid #c7d2fe; color:#4338ca; background:#f0f1ff;"
          >{{ tech }}</span>
        </div>

        <!-- 구분선 -->
        <div style="border-top:1px solid #f3f4f6; padding-top:20px; display:flex; align-items:center; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:40px; height:40px; border-radius:50%; background:#6366f1; display:flex; align-items:center; justify-content:center; color:#fff; font-size:15px; font-weight:700;">
              {{ authorInitial }}
            </div>
            <div>
              <div style="font-size:14px; font-weight:700; color:#111827;">작성자</div>
              <div style="font-size:12px; color:#9ca3af;">미리보기</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:20px; font-size:13px; color:#9ca3af;">
            <span style="display:flex; align-items:center; gap:4px;">
              <svg style="width:14px; height:14px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              {{ today }}
            </span>
            <span>조회 0</span>
            <span>좋아요 0</span>
          </div>
        </div>
      </div>

      <!-- 본문 내용 -->
      <div style="background:#fff; border-radius:16px; border:1px solid #e5e7eb; padding:40px; margin-top:16px;">
        <div v-for="(section, idx) in parsedBody" :key="idx" style="margin-bottom:36px;">

          <!-- 섹션 헤딩 -->
          <h2 v-if="section.heading" style="font-size:18px; font-weight:800; color:#111827; margin:0 0 16px; display:flex; align-items:center; gap:8px;">
            {{ section.heading }}
          </h2>

          <!-- 이미지 플레이스홀더 (시연 화면 섹션) -->
          <div v-if="section.isImageSection" style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:8px;">
            <img
              v-for="(img, i) in demoImages"
              :key="i"
              :src="img"
              style="width:100%; height:200px; object-fit:cover; border-radius:12px; border:1px solid #e5e7eb;"
              :style="i === 2 ? 'grid-column: 1 / 2;' : ''"
            />
          </div>

          <!-- 코드 블록 -->
          <div
            v-else-if="section.code"
            style="background:#1e1e2e; border-radius:12px; padding:24px; overflow-x:auto;"
          >
            <div style="display:flex; align-items:center; gap:6px; margin-bottom:14px;">
              <span style="width:10px; height:10px; border-radius:50%; background:#ff5f57; display:inline-block;"></span>
              <span style="width:10px; height:10px; border-radius:50%; background:#febc2e; display:inline-block;"></span>
              <span style="width:10px; height:10px; border-radius:50%; background:#28c840; display:inline-block;"></span>
              <span style="margin-left:8px; font-size:11px; color:#6e7191;">{{ section.codeLang || 'code' }}</span>
            </div>
            <pre style="margin:0; font-size:13px; line-height:1.7; color:#cdd6f4; font-family:'JetBrains Mono',monospace; white-space:pre-wrap; word-break:break-all;">{{ section.code }}</pre>
          </div>

          <!-- 일반 내용 -->
          <div v-else>
            <ul v-if="section.bullets && section.bullets.length" style="margin:0 0 12px; padding-left:20px;">
              <li
                v-for="(b, i) in section.bullets"
                :key="i"
                style="font-size:15px; color:#374151; line-height:1.8; margin-bottom:4px;"
              >{{ b }}</li>
            </ul>
            <p
              v-for="(line, i) in section.texts"
              :key="i"
              style="font-size:15px; color:#374151; line-height:1.8; margin:0 0 8px;"
            >{{ line }}</p>
          </div>

        </div>

        <!-- 본문이 없을 때 -->
        <div v-if="parsedBody.length === 0" style="color:#9ca3af; font-size:14px; text-align:center; padding:40px 0;">
          본문 내용이 없습니다.
        </div>
      </div>

      <!-- 액션 바 -->
      <div style="background:#fff; border-radius:16px; border:1px solid #e5e7eb; padding:20px 28px; margin-top:16px; display:flex; align-items:center; justify-content:space-between;">
        <div style="display:flex; align-items:center; gap:8px;">
          <button style="display:flex; align-items:center; gap:6px; padding:8px 18px; border-radius:999px; border:1.5px solid #e5e7eb; background:#fff; font-size:14px; font-weight:600; color:#6b7280; cursor:pointer;">
            <svg style="width:16px; height:16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            좋아요 0
          </button>
          <button style="display:flex; align-items:center; gap:6px; padding:8px 18px; border-radius:999px; border:1.5px solid #e5e7eb; background:#fff; font-size:14px; font-weight:600; color:#6b7280; cursor:pointer;">
            <svg style="width:16px; height:16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
            </svg>
            북마크
          </button>
          <button style="display:flex; align-items:center; gap:6px; padding:8px 18px; border-radius:999px; border:1.5px solid #e5e7eb; background:#fff; font-size:14px; font-weight:600; color:#6b7280; cursor:pointer;">
            <svg style="width:16px; height:16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            댓글 0
          </button>
        </div>
        <div style="display:flex; gap:8px;">
          <a
            v-if="project.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            style="display:flex; align-items:center; gap:6px; padding:8px 18px; border-radius:999px; border:1.5px solid #e5e7eb; background:#fff; font-size:14px; font-weight:600; color:#111827; text-decoration:none;"
          >
            <svg style="width:16px; height:16px;" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a
            v-if="project.deployUrl"
            :href="project.deployUrl"
            target="_blank"
            style="display:flex; align-items:center; gap:6px; padding:8px 18px; border-radius:999px; border:1.5px solid #e5e7eb; background:#fff; font-size:14px; font-weight:600; color:#111827; text-decoration:none;"
          >
            <svg style="width:16px; height:16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
            데모
          </a>
          <a
            v-if="project.figmaUrl"
            :href="project.figmaUrl"
            target="_blank"
            style="display:flex; align-items:center; gap:6px; padding:8px 18px; border-radius:999px; border:1.5px solid #e5e7eb; background:#fff; font-size:14px; font-weight:600; color:#111827; text-decoration:none;"
          >
            <svg style="width:16px; height:16px;" viewBox="0 0 38 57" fill="none">
              <path d="M19 28.5C19 25.98 20 23.56 21.78 21.78C23.56 20 25.98 19 28.5 19C31.02 19 33.44 20 35.22 21.78C36.99 23.56 38 25.98 38 28.5C38 31.02 36.99 33.44 35.22 35.22C33.44 36.99 31.02 38 28.5 38C25.98 38 23.56 36.99 21.78 35.22C20 33.44 19 31.02 19 28.5Z" fill="#1ABCFE"/>
              <path d="M0 47.5C0 44.98 1 42.56 2.78 40.78C4.56 39 6.98 38 9.5 38H19V47.5C19 50.02 18 52.44 16.22 54.22C14.44 55.99 12.02 57 9.5 57C6.98 57 4.56 55.99 2.78 54.22C1 52.44 0 50.02 0 47.5Z" fill="#0ACF83"/>
              <path d="M19 0V19H28.5C31.02 19 33.44 18 35.22 16.22C36.99 14.44 38 12.02 38 9.5C38 6.98 36.99 4.56 35.22 2.78C33.44 1 31.02 0 28.5 0H19Z" fill="#FF7262"/>
              <path d="M0 9.5C0 12.02 1 14.44 2.78 16.22C4.56 18 6.98 19 9.5 19H19V0H9.5C6.98 0 4.56 1 2.78 2.78C1 4.56 0 6.98 0 9.5Z" fill="#F24E1E"/>
              <path d="M0 28.5C0 31.02 1 33.44 2.78 35.22C4.56 36.99 6.98 38 9.5 38H19V19H9.5C6.98 19 4.56 20 2.78 21.78C1 23.56 0 25.98 0 28.5Z" fill="#A259FF"/>
            </svg>
            Figma
          </a>
          <a
            v-if="project.notionUrl"
            :href="project.notionUrl"
            target="_blank"
            style="display:flex; align-items:center; gap:6px; padding:8px 18px; border-radius:999px; border:1.5px solid #e5e7eb; background:#fff; font-size:14px; font-weight:600; color:#111827; text-decoration:none;"
          >
            <svg style="width:16px; height:16px;" viewBox="0 0 100 100" fill="currentColor">
              <path d="M6.7 6.8c2.4 1.9 3.3 1.8 7.8 1.5l42.4-2.5c.9 0 .1-.9-.3-1.1L50.3.5c-.8-.6-1.9-1.3-4-.1L6.4 3.9C5.5 4.2 5.3 5.4 6.7 6.8z"/>
              <path d="M9.1 17.1V77c0 3.1 1.5 4.3 5 4.1l54.5-3.1c3.5-.2 3.9-2.3 3.9-4.9V14.4c0-2.6-1-4-3.3-3.7l-56.9 3.3C9.9 14.3 9.1 15.3 9.1 17.1zm49.6 3.4c.3 1.4 0 2.8-1.4 2.9l-2.3.4V64c-2 1-3.9 1.6-5.4.7L32 40.5v22.6l5.4 1.2s0 2.8-3.9 3.1l-10.8.6c-.3-.6 0-2.1.9-2.4l2.8-.8V25.9l-3.8-.3c-.3-1.4.4-3.4 2.4-3.5l11.6-.7 18.1 27.6V23.1l-4.5-.5c-.3-1.7.8-2.9 2.2-3l10.3-.1z"/>
              <path d="M93.2 8.6l-16.1 1.2c-1.9.2-2.6 1.3-2.6 2.7v53.7c0 1.3.5 2.1 2.1 2.1.5 0 1.5-.3 2.4-.6l16.7-9.7c1.5-.9 2.3-2.3 2.3-4.7V11.6c0-2.1-.5-3.1-4.8-3z"/>
            </svg>
            Notion
          </a>
        </div>
      </div>

      <!-- 팀원 모집 섹션 -->
      <div
        v-if="recruitingRoles.length > 0"
        style="background:#fff; border-radius:16px; border:1px solid #e5e7eb; padding:28px; margin-top:16px;"
      >
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
          <h3 style="font-size:16px; font-weight:800; color:#111827; margin:0; display:flex; align-items:center; gap:8px;">
            <svg style="width:18px; height:18px; color:#6366f1;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            팀원 모집
          </h3>
          <span style="font-size:12px; color:#9ca3af; background:#f9fafb; padding:4px 12px; border-radius:999px; border:1px solid #e5e7eb;">
            마감일 미정
          </span>
        </div>

        <div :style="`display:grid; grid-template-columns:repeat(${Math.min(recruitingRoles.length, 3)}, 1fr); gap:12px; margin-bottom:20px;`">
          <div
            v-for="role in recruitingRoles"
            :key="role.name"
            style="border:1px solid #e0e7ff; border-radius:12px; padding:16px; background:#fafafe;"
          >
            <div style="font-size:15px; font-weight:700; color:#111827; margin-bottom:6px;">{{ role.name || '역할 미정' }}</div>
            <div style="font-size:13px; color:#6b7280; margin-bottom:10px;">
              <span style="color:#6366f1; font-weight:700;">0</span> / {{ role.count }}명 모집
            </div>
            <div
              style="font-size:12px; color:#6366f1; font-weight:600; background:#eef2ff; padding:4px 10px; border-radius:6px; display:inline-block;"
            >{{ role.count }}명 모집</div>
            <p v-if="role.description" style="font-size:12px; color:#9ca3af; margin:10px 0 0; line-height:1.5;">{{ role.description }}</p>
          </div>
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between;">
          <span style="font-size:13px; color:#6b7280;">
            전체 {{ totalSeats }}명의 자리가 있습니다
          </span>
          <button style="display:flex; align-items:center; gap:6px; padding:12px 24px; border-radius:10px; border:none; background:#6366f1; font-size:14px; font-weight:700; color:#fff; cursor:pointer;">
            <svg style="width:16px; height:16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>
            팀원 지원하기
          </button>
        </div>
      </div>

      <!-- 댓글 섹션 -->
      <div style="background:#fff; border-radius:16px; border:1px solid #e5e7eb; padding:28px; margin-top:16px;">
        <h3 style="font-size:16px; font-weight:800; color:#111827; margin:0 0 20px; display:flex; align-items:center; gap:8px;">
          <svg style="width:18px; height:18px; color:#6b7280;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          댓글 0
        </h3>
        <div style="position:relative; margin-bottom:12px;">
          <textarea
            placeholder="댓글을 입력하세요..."
            disabled
            rows="3"
            style="width:100%; padding:14px 16px; border-radius:10px; border:1.5px solid #e5e7eb; font-size:14px; color:#9ca3af; background:#f9fafb; resize:none; box-sizing:border-box;"
          ></textarea>
          <button
            disabled
            style="position:absolute; bottom:12px; right:12px; padding:8px 18px; border-radius:8px; border:none; background:#6366f1; color:#fff; font-size:13px; font-weight:700; cursor:not-allowed; opacity:0.6;"
          >댓글 작성</button>
        </div>
        <p style="font-size:13px; color:#d1d5db; text-align:center; padding:24px 0;">
          미리보기 모드에서는 댓글을 작성할 수 없습니다
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import iconLogo from '../assets/Icon.svg'

const router = useRouter()

function goBack() {
  router.push({ path: '/project/new', state: { fromPreview: true } })
}

const PREVIEW_KEY = 'stackmate_project_preview'

const raw = localStorage.getItem(PREVIEW_KEY)
const project = raw ? JSON.parse(raw) : {}

const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace('.', '')

const authorInitial = 'ME'

const statusMap = {
  recruiting: { label: '모집중', color: '#10b981' },
  developing: { label: '개발중', color: '#6366f1' },
  done: { label: '완료', color: '#9ca3af' },
}
const statusLabel = statusMap[project.status]?.label ?? '모집중'
const statusColor = statusMap[project.status]?.color ?? '#10b981'

const isTeam = project.roles?.some(r => r.name) || false

const recruitingRoles = computed(() =>
  (project.roles || []).filter(r => r.name?.trim())
)
const totalSeats = computed(() =>
  recruitingRoles.value.reduce((sum, r) => sum + (Number(r.count) || 0), 0)
)

const heroImage = computed(() => {
  const stack = (project.techStack || [])[0] || ''
  const colorMap = {
    'React': '6366f1', 'Next.js': '111827', 'Vue': '42b883',
    'Spring': '6db33f', 'Android': '3ddc84', 'Unity': '000000',
    'Python': '3776ab', 'AI/ML': '7c3aed', 'Flutter': '02569b',
    'Django': '092e20', 'Node.js': '339933', 'Firebase': 'ff6d00',
  }
  const color = colorMap[stack] || '6366f1'
  return `https://placehold.co/1200x320/${color}/ffffff?text=Preview`
})

const demoImages = [
  'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&auto=format&fit=crop',
]

const parsedBody = computed(() => {
  const body = project.body || ''
  if (!body.trim()) return []

  const lines = body.split('\n')
  const sections = []
  let currentSection = null
  let inCode = false
  let codeLang = ''
  let codeLines = []

  for (const line of lines) {
    if (line.startsWith('```')) {
      if (inCode) {
        sections.push({ code: codeLines.join('\n'), codeLang })
        inCode = false
        codeLines = []
        codeLang = ''
        currentSection = null
      } else {
        inCode = true
        codeLang = line.slice(3).trim()
      }
      continue
    }
    if (inCode) { codeLines.push(line); continue }

    if (line.startsWith('## ') || line.startsWith('# ')) {
      const heading = line.replace(/^#{1,2}\s/, '')
      const isImageSection = heading.includes('시연') || heading.includes('화면') || heading.includes('이미지') || heading.includes('스크린')
      currentSection = { heading, bullets: [], texts: [], isImageSection }
      sections.push(currentSection)
    } else if (line.startsWith('- ')) {
      if (!currentSection) { currentSection = { heading: null, bullets: [], texts: [], isImageSection: false }; sections.push(currentSection) }
      currentSection.bullets.push(line.slice(2))
    } else if (line.trim()) {
      if (!currentSection) { currentSection = { heading: null, bullets: [], texts: [], isImageSection: false }; sections.push(currentSection) }
      currentSection.texts.push(line)
    }
  }

  if (inCode && codeLines.length > 0) {
    sections.push({ code: codeLines.join('\n'), codeLang })
  }

  return sections
})
</script>
