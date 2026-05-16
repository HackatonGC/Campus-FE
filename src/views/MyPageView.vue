<template>
  <div style="min-height:100vh; background:#f4f4fd;">

    <!-- NAV -->
    <nav style="background:#fff; border-bottom:1px solid #e5e7eb; position:sticky; top:0; z-index:50;">
      <div style="max-width:1280px; margin:0 auto; padding:0 40px; height:68px; display:flex; align-items:center; justify-content:space-between;">
        <RouterLink to="/" style="display:flex; align-items:center; gap:12px; text-decoration:none;">
          <div style="width:44px; height:44px; background:#6366f1; border-radius:12px; display:flex; align-items:center; justify-content:center;">
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.66 4.36C25.14 4.12 24.57 4 24 4C23.43 4 22.86 4.12 22.34 4.36L5.2 12.16C4.85 12.32 4.54 12.57 4.33 12.9C4.12 13.22 4.01 13.6 4.01 13.99C4.01 14.38 4.12 14.76 4.33 15.08C4.54 15.41 4.85 15.66 5.2 15.82L22.36 23.64C22.88 23.88 23.45 24 24.02 24C24.59 24 25.16 23.88 25.68 23.64L42.84 15.84C43.2 15.68 43.5 15.43 43.71 15.1C43.92 14.78 44.03 14.4 44.03 14.01C44.03 13.62 43.92 13.24 43.71 12.92C43.5 12.59 43.2 12.34 42.84 12.18L25.66 4.36Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4 24C4 24.38 4.11 24.76 4.31 25.08C4.52 25.4 4.81 25.66 5.16 25.82L22.36 33.64C22.88 33.87 23.44 33.99 24.01 33.99C24.58 33.99 25.14 33.87 25.66 33.64L42.82 25.84C43.17 25.68 43.47 25.42 43.68 25.1C43.89 24.77 44 24.39 44 24" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4 34C4 34.38 4.11 34.76 4.31 35.08C4.52 35.4 4.81 35.66 5.16 35.82L22.36 43.64C22.88 43.87 23.44 43.99 24.01 43.99C24.58 43.99 25.14 43.87 25.66 43.64L42.82 35.84C43.17 35.68 43.47 35.42 43.68 35.1C43.89 34.77 44 34.39 44 34" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div>
            <div style="font-weight:700; font-size:16px; background:linear-gradient(to right,#6366f1,rgba(99,102,241,0.7)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">StackMate</div>
            <div style="color:#9ca3af; font-size:11px;">함께 성장하는 개발자</div>
          </div>
        </RouterLink>
        <div style="display:flex; align-items:center; gap:8px; cursor:pointer;">
          <div style="text-align:right;">
            <div style="font-weight:600; font-size:14px; color:#111827;">{{ user.name }}</div>
            <div style="font-size:12px; color:#9ca3af;">{{ user.university }}</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>
    </nav>

    <!-- BODY -->
    <div style="max-width:1280px; margin:0 auto; padding:32px 40px; display:grid; grid-template-columns:240px 1fr; gap:24px; align-items:start;">

      <!-- SIDEBAR -->
      <div style="background:#fff; border-radius:16px; padding:24px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
        <!-- 프로필 -->
        <div style="display:flex; flex-direction:column; align-items:center; padding-bottom:20px; border-bottom:1px solid #f3f4f6;">
          <div style="width:72px; height:72px; border-radius:50%; background:#f3f4f6; display:flex; align-items:center; justify-content:center; margin-bottom:12px; overflow:hidden;">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="14" r="7" fill="#d1d5db"/><path d="M4 32c0-7.7 6.3-14 14-14s14 6.3 14 14" fill="#d1d5db"/></svg>
          </div>
          <div style="font-weight:700; font-size:16px; color:#111827; margin-bottom:4px;">{{ user.name }}</div>
          <div style="font-size:13px; color:#6b7280;">{{ user.university }}</div>
          <div style="font-size:13px; color:#6b7280; margin-bottom:12px;">{{ user.department }}</div>
          <div style="width:100%;">
            <div style="font-size:12px; color:#9ca3af; margin-bottom:8px;">관심 기술 스택</div>
            <div style="display:flex; flex-wrap:wrap; gap:6px;">
              <span v-for="tech in user.techStack" :key="tech" style="font-size:12px; background:#ede9fe; color:#6366f1; padding:2px 8px; border-radius:999px; font-weight:500;">{{ tech }}</span>
            </div>
          </div>
        </div>
        <!-- 메뉴 -->
        <nav style="margin-top:16px; display:flex; flex-direction:column; gap:4px;">
          <button v-for="menu in menus" :key="menu.key"
            @click="activeMenu = menu.key"
            :style="activeMenu === menu.key
              ? 'background:#6366f1; color:#fff; border:none; cursor:pointer; width:100%; text-align:left; padding:10px 14px; border-radius:10px; font-size:14px; font-weight:600; display:flex; align-items:center; gap:10px;'
              : 'background:none; color:#374151; border:none; cursor:pointer; width:100%; text-align:left; padding:10px 14px; border-radius:10px; font-size:14px; font-weight:500; display:flex; align-items:center; gap:10px;'"
          >
            <span v-html="menu.icon"></span>{{ menu.label }}
          </button>
          <div style="border-top:1px solid #f3f4f6; margin:8px 0;"></div>
          <RouterLink to="/settings" style="background:none; color:#374151; text-decoration:none; cursor:pointer; width:100%; text-align:left; padding:10px 14px; border-radius:10px; font-size:14px; font-weight:500; display:flex; align-items:center; gap:10px;">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" stroke="#374151" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.933 10a1.1 1.1 0 0 0 .22 1.213l.04.04a1.333 1.333 0 1 1-1.886 1.887l-.04-.04a1.1 1.1 0 0 0-1.214-.22 1.1 1.1 0 0 0-.666 1.006v.114a1.333 1.333 0 0 1-2.667 0v-.06A1.1 1.1 0 0 0 6 12.933a1.1 1.1 0 0 0-1.213.22l-.04.04a1.333 1.333 0 1 1-1.887-1.886l.04-.04A1.1 1.1 0 0 0 3.12 10a1.1 1.1 0 0 0-1.006-.667H2a1.333 1.333 0 0 1 0-2.666h.06A1.1 1.1 0 0 0 3.067 6a1.1 1.1 0 0 0-.22-1.213l-.04-.04a1.333 1.333 0 1 1 1.886-1.887l.04.04A1.1 1.1 0 0 0 6 3.12a1.1 1.1 0 0 0 .667-1.006V2a1.333 1.333 0 0 1 2.666 0v.06A1.1 1.1 0 0 0 10 3.067a1.1 1.1 0 0 0 1.213-.22l.04-.04a1.333 1.333 0 1 1 1.887 1.886l-.04.04A1.1 1.1 0 0 0 12.88 6a1.1 1.1 0 0 0 1.006.667H14a1.333 1.333 0 0 1 0 2.666h-.06a1.1 1.1 0 0 0-1.007.667z" stroke="#374151" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>
            설정
          </RouterLink>
          <button @click="handleLogout" style="background:none; color:#ef4444; border:none; cursor:pointer; width:100%; text-align:left; padding:10px 14px; border-radius:10px; font-size:14px; font-weight:500; display:flex; align-items:center; gap:10px;">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10.667 11.333L14 8l-3.333-3.333M14 8H6M6.667 14H2.667C2.3 14 2 13.7 2 13.333V2.667C2 2.3 2.3 2 2.667 2h4" stroke="#ef4444" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>
            로그아웃
          </button>
        </nav>
      </div>

      <!-- MAIN -->
      <div style="display:flex; flex-direction:column; gap:20px;">

        <!-- 통계 카드 4개 -->
        <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px;">
          <div v-for="stat in stats" :key="stat.label" style="background:#fff; border-radius:16px; padding:20px; text-align:center; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
            <div style="width:40px; height:40px; border-radius:12px; margin:0 auto 10px; display:flex; align-items:center; justify-content:center;" :style="{background: stat.bgColor}">
              <span v-html="stat.icon"></span>
            </div>
            <div style="font-size:22px; font-weight:700; color:#111827; margin-bottom:4px;">{{ stat.value.value }}</div>
            <div style="font-size:13px; color:#9ca3af;">{{ stat.label }}</div>
          </div>
        </div>

        <!-- 내 프로젝트 -->
        <div v-if="activeMenu === 'projects'" style="background:#fff; border-radius:16px; padding:24px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <h2 style="font-size:16px; font-weight:700; color:#111827; margin:0;">내 프로젝트</h2>
            <RouterLink to="/project/new" style="background:#6366f1; color:#fff; text-decoration:none; padding:8px 16px; border-radius:10px; font-size:13px; font-weight:600;">새 프로젝트</RouterLink>
          </div>
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div v-for="p in myProjects" :key="p.id" style="display:flex; border:1px solid #f3f4f6; border-radius:12px; overflow:hidden;">
              <img :src="p.thumbnailUrl" style="width:220px; height:100%; min-height:160px; object-fit:cover; flex-shrink:0;" />
              <div style="flex:1; min-width:0; padding:16px;">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                  <span v-if="p.status === 'RECRUITING'" style="font-size:11px; background:#10b981; color:#fff; padding:2px 8px; border-radius:999px; font-weight:600;">모집중</span>
                  <span style="font-size:15px; font-weight:700; color:#111827;">{{ p.title }}</span>
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:8px;">
                  <span v-for="tech in (p.techStacks ?? p.techStack ?? [])" :key="tech" style="font-size:12px; background:#ede9fe; color:#6366f1; padding:2px 8px; border-radius:999px;">{{ tech }}</span>
                </div>
                <div style="font-size:12px; color:#9ca3af; display:flex; gap:12px; margin-bottom:10px;">
                  <span>👁 {{ p.viewCount ?? p.views ?? 0 }}</span>
                  <span>❤️ {{ p.likeCount ?? p.likes ?? 0 }}</span>
                </div>
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                  <RouterLink :to="`/project/${p.id}/manage`" style="font-size:12px; padding:5px 14px; border-radius:8px; border:none; background:#6366f1; color:#fff; cursor:pointer; display:flex; align-items:center; gap:5px; font-weight:600; text-decoration:none;">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" stroke="#fff" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.933 10a1.1 1.1 0 0 0 .22 1.213l.04.04a1.333 1.333 0 1 1-1.886 1.887l-.04-.04a1.1 1.1 0 0 0-1.214-.22 1.1 1.1 0 0 0-.666 1.006v.114a1.333 1.333 0 0 1-2.667 0v-.06A1.1 1.1 0 0 0 6 12.933a1.1 1.1 0 0 0-1.213.22l-.04.04a1.333 1.333 0 1 1-1.887-1.886l.04-.04A1.1 1.1 0 0 0 3.12 10a1.1 1.1 0 0 0-1.006-.667H2a1.333 1.333 0 0 1 0-2.666h.06A1.1 1.1 0 0 0 3.067 6a1.1 1.1 0 0 0-.22-1.213l-.04-.04a1.333 1.333 0 1 1 1.886-1.887l.04.04A1.1 1.1 0 0 0 6 3.12a1.1 1.1 0 0 0 .667-1.006V2a1.333 1.333 0 0 1 2.666 0v.06A1.1 1.1 0 0 0 10 3.067a1.1 1.1 0 0 0 1.213-.22l.04-.04a1.333 1.333 0 1 1 1.887 1.886l-.04.04A1.1 1.1 0 0 0 12.88 6a1.1 1.1 0 0 0 1.006.667H14a1.333 1.333 0 0 1 0 2.666h-.06a1.1 1.1 0 0 0-1.007.667z" stroke="#fff" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    관리
                  </RouterLink>
                  <button style="font-size:12px; padding:5px 14px; border-radius:8px; border:1px solid #e5e7eb; background:#fff; color:#374151; cursor:pointer; display:flex; align-items:center; gap:5px; font-weight:500;">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M13.333 14v-1.333A2.667 2.667 0 0 0 10.667 10H5.333A2.667 2.667 0 0 0 2.667 12.667V14M8 7.333A2.667 2.667 0 1 0 8 2a2.667 2.667 0 0 0 0 5.333z" stroke="#374151" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    지원자 관리
                    <span v-if="p.applicants" style="font-size:11px; background:#6366f1; color:#fff; padding:1px 6px; border-radius:999px; font-weight:700; line-height:1.6;">{{ p.applicants }}</span>
                  </button>
                  <a :href="p.githubUrl" target="_blank" style="font-size:12px; padding:5px 14px; border-radius:8px; border:1px solid #e5e7eb; background:#fff; color:#374151; cursor:pointer; display:flex; align-items:center; gap:5px; text-decoration:none; font-weight:500;">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 1.333A6.67 6.67 0 0 0 1.333 8c0 2.946 1.912 5.44 4.559 6.32.333.06.454-.146.454-.323v-1.13c-1.853.4-2.247-.896-2.247-.896-.303-.77-.74-1.04-.74-1.04-.605-.413.046-.405.046-.405.669.047 1.02.687 1.02.687.595 1.02 1.561.725 1.941.554.06-.43.233-.725.424-.892-1.48-.168-3.034-.74-3.034-3.293 0-.727.26-1.323.687-1.788-.069-.168-.297-.847.065-1.766 0 0 .56-.179 1.834.683A6.4 6.4 0 0 1 8 4.67c.567.003 1.138.077 1.671.226 1.274-.862 1.833-.683 1.833-.683.363.919.135 1.598.066 1.766.428.465.686 1.06.686 1.788 0 2.56-1.557 3.123-3.04 3.288.239.206.451.612.451 1.234v1.83c0 .178.12.386.458.32A6.672 6.672 0 0 0 14.667 8 6.67 6.67 0 0 0 8 1.333z" fill="#374151"/></svg>
                    GitHub
                  </a>
                  <button style="font-size:12px; padding:5px 14px; border-radius:8px; border:1px solid #fee2e2; background:#fff; color:#ef4444; cursor:pointer; display:flex; align-items:center; gap:5px; font-weight:500;">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5.333 4V2.667A1.333 1.333 0 0 1 6.667 1.333h2.666A1.333 1.333 0 0 1 10.667 2.667V4M12.667 4l-.667 9.333A1.333 1.333 0 0 1 10.667 14.667H5.333A1.333 1.333 0 0 1 4 13.333L3.333 4" stroke="#ef4444" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 지원한 프로젝트 -->
        <div v-if="activeMenu === 'applied'" style="background:#fff; border-radius:16px; padding:24px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
          <h2 style="font-size:16px; font-weight:700; color:#111827; margin:0 0 20px;">지원한 프로젝트</h2>
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div v-for="p in appliedProjects" :key="p.id" style="padding:16px; border:1px solid #f3f4f6; border-radius:12px;">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                <span style="font-size:15px; font-weight:700; color:#111827;">{{ p.projectTitle }}</span>
                <span :style="p.status === 'PENDING'
                  ? 'font-size:11px; background:#fef3c7; color:#d97706; padding:2px 8px; border-radius:999px; font-weight:600; flex-shrink:0;'
                  : p.status === 'ACCEPTED'
                    ? 'font-size:11px; background:#d1fae5; color:#059669; padding:2px 8px; border-radius:999px; font-weight:600; flex-shrink:0;'
                    : 'font-size:11px; background:#fee2e2; color:#ef4444; padding:2px 8px; border-radius:999px; font-weight:600; flex-shrink:0;'">
                  {{ p.status === 'PENDING' ? '검토중' : p.status === 'ACCEPTED' ? '승인됨' : '거절됨' }}
                </span>
              </div>
              <p style="font-size:13px; color:#6b7280; margin:0 0 10px;">{{ p.projectSummary }}</p>
              <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:10px;">
                <span v-for="tech in (p.techStacks ?? [])" :key="tech" style="font-size:12px; background:#ede9fe; color:#6366f1; padding:2px 8px; border-radius:999px;">{{ tech }}</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="font-size:12px; color:#9ca3af; display:flex; gap:12px;">
                  <span>👤 {{ p.projectAuthorName }}</span>
                  <span v-if="p.role">🏷 {{ p.role }} 지원</span>
                  <span>🕐 {{ p.createdAt?.slice(0,10) }}</span>
                </div>
                <div style="display:flex; gap:8px;">
                  <RouterLink :to="`/project/${p.projectId}`" style="font-size:13px; padding:5px 14px; border-radius:8px; border:1px solid #e5e7eb; background:#fff; color:#374151; text-decoration:none; font-weight:500;">게시글 보기</RouterLink>
                  <button v-if="p.status === 'PENDING'" @click="handleCancelApplication(p.projectId, p.id)" style="font-size:13px; padding:5px 14px; border-radius:8px; border:1px solid #fee2e2; background:#fff; color:#ef4444; cursor:pointer; font-weight:500;">지원 취소</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 북마크 -->
        <div v-if="activeMenu === 'bookmarks'" style="background:#fff; border-radius:16px; padding:24px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
          <h2 style="font-size:16px; font-weight:700; color:#111827; margin:0 0 20px;">북마크</h2>
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div v-for="p in bookmarkedProjects" :key="p.id" style="padding:16px; border:1px solid #f3f4f6; border-radius:12px;">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
                <span style="font-size:15px; font-weight:700; color:#111827;">{{ p.title }}</span>
                <span v-if="p.isRecruiting" style="font-size:11px; background:#10b981; color:#fff; padding:2px 8px; border-radius:999px; font-weight:600; flex-shrink:0; margin-left:8px;">모집중</span>
              </div>
              <p style="font-size:13px; color:#6b7280; margin:0 0 10px;">{{ p.summary }}</p>
              <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:10px;">
                <span v-for="tech in p.techStack" :key="tech" style="font-size:12px; background:#ede9fe; color:#6366f1; padding:2px 8px; border-radius:999px;">{{ tech }}</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="font-size:12px; color:#9ca3af; display:flex; gap:12px;">
                  <span>👤 {{ p.author }}</span>
                  <span>👁 {{ p.views }}</span>
                  <span>❤️ {{ p.likes }}</span>
                  <span>🕐 {{ p.date }}</span>
                </div>
                <RouterLink :to="`/project/${p.id}`" style="font-size:13px; padding:5px 14px; border-radius:8px; border:1px solid #e5e7eb; background:#fff; color:#374151; text-decoration:none; font-weight:500;">게시글 보기</RouterLink>
              </div>
            </div>
          </div>
        </div>

        <!-- 좋아요 -->
        <div v-if="activeMenu === 'likes'" style="background:#fff; border-radius:16px; padding:24px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
          <h2 style="font-size:16px; font-weight:700; color:#111827; margin:0 0 20px;">좋아요</h2>
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div v-for="p in likedProjects" :key="p.id" style="padding:16px; border:1px solid #f3f4f6; border-radius:12px;">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
                <span style="font-size:15px; font-weight:700; color:#111827;">{{ p.title }}</span>
                <span v-if="p.isRecruiting" style="font-size:11px; background:#10b981; color:#fff; padding:2px 8px; border-radius:999px; font-weight:600; flex-shrink:0; margin-left:8px;">모집중</span>
              </div>
              <p style="font-size:13px; color:#6b7280; margin:0 0 10px;">{{ p.summary }}</p>
              <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:10px;">
                <span v-for="tech in p.techStack" :key="tech" style="font-size:12px; background:#ede9fe; color:#6366f1; padding:2px 8px; border-radius:999px;">{{ tech }}</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="font-size:12px; color:#9ca3af; display:flex; gap:12px;">
                  <span>👤 {{ p.author }}</span>
                  <span>👁 {{ p.views }}</span>
                  <span style="color:#ef4444;">❤️ {{ p.likes }}</span>
                  <span>🕐 {{ p.date }}</span>
                </div>
                <RouterLink :to="`/project/${p.id}`" style="font-size:13px; padding:5px 14px; border-radius:8px; border:1px solid #e5e7eb; background:#fff; color:#374151; text-decoration:none; font-weight:500;">게시글 보기</RouterLink>
              </div>
            </div>
          </div>
        </div>

        <!-- 최근 활동 -->
        <div style="background:#fff; border-radius:16px; padding:24px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
          <h2 style="font-size:16px; font-weight:700; color:#111827; margin:0 0 16px;">📈 최근 활동</h2>
          <div style="display:flex; flex-direction:column; gap:0;">
            <div v-for="(act, i) in recentActivities" :key="i" style="display:flex; align-items:center; gap:14px; padding:12px 0; border-bottom:1px solid #f9fafb;">
              <div style="width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0;" :style="{background: act.bgColor}">
                <span v-html="act.icon"></span>
              </div>
              <div style="flex:1;">
                <div style="font-size:14px; color:#374151;">{{ act.text }}</div>
                <div style="font-size:12px; color:#9ca3af; margin-top:2px;">{{ act.time }}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProjects, getMyBookmarks, getMyLikes, getMyApplications, cancelApplication } from '../api/project.js'
import { userId, clearAuth } from '../store/auth.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeMenu = ref('projects')

const user = {
  name: localStorage.getItem('userName') ?? '사용자',
  university: localStorage.getItem('userSchool') ?? '',
  department: localStorage.getItem('userDepartment') ?? '',
  techStack: [],
}

const menus = [
  { key: 'projects', label: '내 프로젝트', icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.33"/><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.33"/><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.33"/><rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.33"/></svg>' },
  { key: 'applied', label: '지원한 프로젝트', icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.333 14v-1.333A2.667 2.667 0 0 0 10.667 10H5.333A2.667 2.667 0 0 0 2.667 12.667V14M8 7.333A2.667 2.667 0 1 0 8 2a2.667 2.667 0 0 0 0 5.333z" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
  { key: 'bookmarks', label: '북마크', icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.333 1.333H4.667C4.3 1.333 4 1.633 4 2v12l4-2.667L12 14V2c0-.367-.3-.667-.667-.667z" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
  { key: 'likes', label: '좋아요', icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.893 3.107a3.667 3.667 0 0 0-5.18 0L8 3.813l-.713-.706a3.667 3.667 0 0 0-5.18 5.18L8 14.187l5.893-5.9a3.667 3.667 0 0 0 0-5.18z" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
]

const stats = [
  { label: '작성 프로젝트', value: ref(0), bgColor: '#ede9fe', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2.5" y="2.5" width="6" height="6" rx="1.5" stroke="#6366f1" stroke-width="1.5"/><rect x="11.5" y="2.5" width="6" height="6" rx="1.5" stroke="#6366f1" stroke-width="1.5"/><rect x="2.5" y="11.5" width="6" height="6" rx="1.5" stroke="#6366f1" stroke-width="1.5"/><rect x="11.5" y="11.5" width="6" height="6" rx="1.5" stroke="#6366f1" stroke-width="1.5"/></svg>' },
  { label: '받은 좋아요', value: ref(0), bgColor: '#fce7f3', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M17.367 3.883a4.583 4.583 0 0 0-6.475 0L10 4.767l-.892-.884a4.583 4.583 0 0 0-6.475 6.475L10 17.733l7.367-7.375a4.583 4.583 0 0 0 0-6.475z" stroke="#ec4899" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
  { label: '코드 리뷰', value: ref(0), bgColor: '#dbeafe', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M17.5 13.333c0 .442-.176.866-.488 1.179-.313.312-.737.488-1.179.488H5.833L2.5 17.5V4.167c0-.442.176-.866.488-1.179C3.3 2.676 3.724 2.5 4.167 2.5h11.666c.442 0 .866.176 1.179.488.312.313.488.737.488 1.179v9.166z" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
  { label: '팀 참여', value: ref(0), bgColor: '#d1fae5', icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M14.167 17.5v-1.667A3.333 3.333 0 0 0 10.833 12.5H4.167a3.333 3.333 0 0 0-3.334 3.333V17.5M19.167 17.5v-1.667a3.333 3.333 0 0 0-2.5-3.225M13.333 2.608a3.333 3.333 0 0 1 0 6.459M7.5 9.167a3.333 3.333 0 1 0 0-6.667 3.333 3.333 0 0 0 0 6.667z" stroke="#10b981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
]

const myProjects = ref([])
const appliedProjects = ref([])
const bookmarkedProjects = ref([])
const likedProjects = ref([])
const recentActivities = ref([])

onMounted(async () => {
  try {
    const all = await getProjects()
    const uid = String(userId.value)
    myProjects.value = (Array.isArray(all) ? all : []).filter(p =>
      String(p.userId) === uid || String(p.authorId) === uid
    )
    stats[0].value.value = myProjects.value.length
    stats[1].value.value = myProjects.value.reduce((s, p) => s + (p.likeCount ?? 0), 0)
  } catch {}

  try {
    const data = await getMyBookmarks()
    bookmarkedProjects.value = Array.isArray(data) ? data : []
  } catch {}

  try {
    const data = await getMyLikes()
    likedProjects.value = Array.isArray(data) ? data : []
  } catch {}

  try {
    const data = await getMyApplications()
    console.log('[내 신청 목록]', data)
    appliedProjects.value = Array.isArray(data) ? data : []
  } catch (e) {
    console.error('[내 신청 목록 실패]', e?.response?.status, e?.response?.data)
  }
})

async function handleCancelApplication(projectId, applicationId) {
  try {
    await cancelApplication(projectId, applicationId)
    appliedProjects.value = appliedProjects.value.filter(a => a.id !== applicationId)
  } catch {}
}

function handleLogout() {
  clearAuth()
  router.push('/login')
}
</script>
