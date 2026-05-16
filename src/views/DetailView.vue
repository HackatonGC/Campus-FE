<template>
  <div style="min-height:100vh; background:#f4f4fd;">

    <NavBar />

    <!-- 로딩 -->
    <div v-if="loading" style="text-align:center; padding:120px 0; color:#9ca3af; font-size:15px;">불러오는 중...</div>

    <!-- 에러 -->
    <div v-else-if="!project" style="text-align:center; padding:120px 0; color:#9ca3af; font-size:15px;">프로젝트를 찾을 수 없어요.</div>

    <div v-else>

      <!-- 히어로 -->
      <div :style="`width:100%; height:320px; position:relative; overflow:hidden; background:${project.thumbnailUrl ? '#111' : project.status === 'RECRUITING' ? 'linear-gradient(135deg,#4f46e5 0%,#6366f1 40%,#818cf8 100%)' : 'linear-gradient(135deg,#047857 0%,#059669 40%,#10b981 100%)'};`">
        <img v-if="project.thumbnailUrl" :src="project.thumbnailUrl" style="width:100%; height:100%; object-fit:cover; opacity:1;" />
        <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);"></div>
        <div style="position:absolute; inset:0; display:flex; flex-direction:column; justify-content:flex-end; padding:0 40px 40px; max-width:1100px; margin:0 auto; width:100%; box-sizing:border-box;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:16px;">
            <span v-if="project.status === 'RECRUITING'" style="background:rgba(255,255,255,0.22); color:#fff; font-size:12px; font-weight:700; padding:5px 16px; border-radius:999px; backdrop-filter:blur(6px); display:flex; align-items:center; gap:6px; border:1px solid rgba(255,255,255,0.3);">
              <span style="width:7px; height:7px; background:#fff; border-radius:50%; display:inline-block; box-shadow:0 0 0 2px rgba(255,255,255,0.4);"></span> 팀원 모집중
            </span>
            <span v-else-if="project.status === 'COMPLETED'" style="background:rgba(255,255,255,0.22); color:#fff; font-size:12px; font-weight:700; padding:5px 16px; border-radius:999px; backdrop-filter:blur(6px); border:1px solid rgba(255,255,255,0.3);">
              ✓ 완료된 프로젝트
            </span>
            <span style="background:rgba(255,255,255,0.12); color:rgba(255,255,255,0.9); font-size:12px; padding:5px 14px; border-radius:999px; border:1px solid rgba(255,255,255,0.2);">
              {{ project.projectType === 'TEAM' ? '👥 팀 프로젝트' : '👤 개인 프로젝트' }}
            </span>
          </div>
          <h1 style="font-size:44px; font-weight:900; color:#fff; margin:0 0 10px; text-shadow:0 2px 16px rgba(0,0,0,0.25); letter-spacing:-0.5px; line-height:1.15;">{{ project.title }}</h1>
          <p style="font-size:16px; color:rgba(255,255,255,0.9); margin:0; text-shadow:0 1px 4px rgba(0,0,0,0.2); max-width:600px; line-height:1.5;">{{ project.summary }}</p>
        </div>
      </div>

      <!-- 본문 -->
      <div style="max-width:1100px; margin:0 auto; padding:32px 40px 80px; display:grid; grid-template-columns:1fr 340px; gap:28px; align-items:start;">

        <!-- 왼쪽 메인 -->
        <div>

          <!-- RECRUITING: 작성자 + 액션 (메인에 표시) -->
          <div v-if="project.status === 'RECRUITING'" style="background:#fff; border-radius:16px; padding:20px 24px; box-shadow:0 1px 4px rgba(0,0,0,0.06); margin-bottom:20px; display:flex; align-items:center; justify-content:space-between;">
            <RouterLink :to="`/user/${project.authorId}`" style="display:flex; align-items:center; gap:12px; text-decoration:none;">
              <div style="width:44px; height:44px; border-radius:50%; background:#ede9fe; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:800; color:#6366f1;">
                {{ (project.authorName ?? '?').charAt(0) }}
              </div>
              <div>
                <div style="font-size:15px; font-weight:700; color:#111827;">{{ project.authorName }}</div>
                <div v-if="project.authorSchool" style="font-size:12px; color:#9ca3af;">{{ project.authorSchool }}</div>
              </div>
            </RouterLink>
            <div style="display:flex; align-items:center; gap:8px;">
              <button @click="toggleLike" :style="`display:flex; align-items:center; gap:5px; font-size:13px; padding:8px 16px; border-radius:10px; cursor:pointer; border:1.5px solid ${liked ? '#ef4444' : '#e5e7eb'}; background:${liked ? '#fff5f5' : '#fff'}; color:${liked ? '#ef4444' : '#6b7280'}; font-weight:500;`">
                <svg width="15" height="15" viewBox="0 0 24 24" :fill="liked ? '#ef4444' : 'none'" :stroke="liked ? '#ef4444' : '#6b7280'" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                {{ (project.likeCount ?? 0) + (liked ? 1 : 0) }}
              </button>
              <button @click="toggleBookmark" :style="`display:flex; align-items:center; gap:5px; font-size:13px; padding:8px 16px; border-radius:10px; cursor:pointer; border:1.5px solid ${bookmarked ? '#10b981' : '#e5e7eb'}; background:${bookmarked ? '#f0fdf4' : '#fff'}; color:${bookmarked ? '#10b981' : '#6b7280'}; font-weight:500;`">
                <svg width="15" height="15" viewBox="0 0 24 24" :fill="bookmarked ? '#10b981' : 'none'" :stroke="bookmarked ? '#10b981' : '#6b7280'" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                북마크
              </button>
              <div style="font-size:12px; color:#9ca3af; display:flex; align-items:center; gap:10px; margin-left:4px;">
                <span>👁 {{ project.viewCount ?? 0 }}</span>
              </div>
            </div>
          </div>

          <!-- RECRUITING: 기술 스택 (메인에 표시) -->
          <div v-if="project.status === 'RECRUITING'" style="background:#fff; border-radius:16px; padding:24px; box-shadow:0 1px 4px rgba(0,0,0,0.06); margin-bottom:20px;">
            <h3 style="font-size:14px; font-weight:700; color:#374151; margin:0 0 14px; text-transform:uppercase; letter-spacing:0.05em;">기술 스택</h3>
            <div style="display:flex; flex-wrap:wrap; gap:8px;">
              <span v-for="tech in (project.techStacks ?? [])" :key="tech"
                style="font-size:13px; padding:6px 16px; border-radius:999px; background:#f0f1ff; color:#4338ca; border:1px solid #c7d2fe; font-weight:500;">
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- 프로젝트 설명 -->
          <div v-if="project.description" style="background:#fff; border-radius:16px; padding:28px; box-shadow:0 1px 4px rgba(0,0,0,0.06); margin-bottom:20px;">
            <h3 style="font-size:14px; font-weight:700; color:#374151; margin:0 0 16px; text-transform:uppercase; letter-spacing:0.05em;">프로젝트 소개</h3>
            <div class="markdown-body" v-html="renderedDescription"></div>
          </div>

          <!-- 완료 프로젝트 전용 섹션 -->
          <template v-if="project.status === 'COMPLETED'">

            <!-- 주요 기능 -->
            <div v-if="project.features" style="background:#fff; border-radius:16px; padding:28px; box-shadow:0 1px 4px rgba(0,0,0,0.06); margin-bottom:20px;">
              <h3 style="font-size:14px; font-weight:700; color:#374151; margin:0 0 14px; text-transform:uppercase; letter-spacing:0.05em;">주요 기능</h3>
              <p style="font-size:14px; color:#374151; line-height:1.8; margin:0; white-space:pre-line;">{{ project.features }}</p>
            </div>

            <!-- 개발 경험 + 시연 이미지 통합 카드 -->
            <div v-if="project.hardPart || project.learned || project.messageToJunior || (project.demoImages ?? []).length"
              style="background:#fff; border-radius:16px; box-shadow:0 1px 4px rgba(0,0,0,0.06); margin-bottom:20px; overflow:hidden;">

              <!-- 개발 경험 -->
              <div v-if="project.hardPart || project.learned || project.messageToJunior" style="padding:24px 28px;">
                <h3 style="font-size:15px; font-weight:700; color:#111827; margin:0 0 20px;">개발 경험</h3>
                <div style="display:flex; flex-direction:column; gap:18px;">
                  <div v-if="project.hardPart" style="padding-left:14px; border-left:3px solid #f59e0b;">
                    <div style="font-size:11px; font-weight:700; color:#d97706; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:5px;">힘들었던 점</div>
                    <p style="font-size:14px; color:#374151; line-height:1.85; margin:0; white-space:pre-line;">{{ project.hardPart }}</p>
                  </div>
                  <div v-if="project.learned" style="padding-left:14px; border-left:3px solid #10b981;">
                    <div style="font-size:11px; font-weight:700; color:#059669; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:5px;">배운 점</div>
                    <p style="font-size:14px; color:#374151; line-height:1.85; margin:0; white-space:pre-line;">{{ project.learned }}</p>
                  </div>
                  <div v-if="project.messageToJunior" style="padding-left:14px; border-left:3px solid #6366f1;">
                    <div style="font-size:11px; font-weight:700; color:#6366f1; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:5px;">후배에게 한마디</div>
                    <p style="font-size:14px; color:#374151; line-height:1.85; margin:0;">{{ project.messageToJunior }}</p>
                  </div>
                </div>
              </div>

              <!-- 구분선 -->
              <div v-if="(project.hardPart || project.learned || project.messageToJunior) && (project.demoImages ?? []).length"
                style="height:1px; background:#f3f4f6; margin:0 28px;"></div>

              <!-- 시연 이미지 -->
              <div v-if="(project.demoImages ?? []).length" style="padding:24px 28px;">
                <h3 style="font-size:15px; font-weight:700; color:#111827; margin:0 0 14px;">시연 화면</h3>
                <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:10px;">
                  <img v-for="(img,i) in project.demoImages" :key="i" :src="img"
                    style="width:100%; border-radius:10px; object-fit:cover; aspect-ratio:16/9; cursor:pointer; transition:transform 0.15s;"
                    onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'" />
                </div>
              </div>
            </div>
          </template>

          <!-- 댓글 -->
          <div style="background:#fff; border-radius:16px; padding:20px 24px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
            <h3 style="font-size:15px; font-weight:700; color:#111827; margin:0 0 14px; display:flex; align-items:center; gap:6px;">
              💬 댓글 <span style="font-size:13px; color:#9ca3af; font-weight:400;">{{ totalCommentCount }}</span>
            </h3>
            <!-- 입력 -->
            <div style="margin-bottom:16px; display:flex; gap:10px; align-items:flex-start;">
              <textarea v-model="newComment" placeholder="댓글을 입력하세요..." rows="2"
                style="flex:1; padding:10px 14px; border:1.5px solid #e5e7eb; border-radius:10px; font-size:13px; color:#374151; resize:none; outline:none; box-sizing:border-box; line-height:1.6; background:#fafafa;"
                @focus="e=>e.target.style.borderColor='#6366f1'" @blur="e=>e.target.style.borderColor='#e5e7eb'"></textarea>
              <button @click="addComment" style="background:#6366f1; color:#fff; font-size:13px; font-weight:600; padding:10px 18px; border-radius:10px; border:none; cursor:pointer; white-space:nowrap; flex-shrink:0;">등록</button>
            </div>
            <!-- 댓글 목록 -->
            <div style="display:flex; flex-direction:column; gap:0;">
              <div v-for="c in comments" :key="c.id" style="padding:16px 0; border-bottom:1px solid #f3f4f6;">
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <div style="width:30px; height:30px; border-radius:50%; background:#ede9fe; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#6366f1;">
                      {{ (c.authorName ?? '?').charAt(0) }}
                    </div>
                    <span style="font-size:13px; font-weight:600; color:#111827;">{{ c.authorName }}</span>
                    <span v-if="c.authorSchool" style="font-size:11px; color:#9ca3af;">{{ c.authorSchool }}</span>
                    <span style="font-size:11px; color:#d1d5db;">{{ formatDate(c.createdAt) }}</span>
                  </div>
                  <button v-if="String(c.authorId) === String(userId)" @click="removeComment(c.id)" style="font-size:11px; color:#ef4444; background:none; border:none; cursor:pointer;">삭제</button>
                </div>
                <p style="font-size:14px; color:#374151; line-height:1.6; margin:0 0 8px 38px;">{{ c.content }}</p>
                <div style="display:flex; align-items:center; gap:12px; margin-left:38px;">
                  <button @click="handleCommentLike(c.id)" :style="`font-size:12px; background:none; border:none; cursor:pointer; display:flex; align-items:center; gap:3px; color:${likedComments[c.id] ? '#ef4444' : '#9ca3af'};`">
                    <svg width="12" height="12" viewBox="0 0 24 24" :fill="likedComments[c.id] ? '#ef4444' : 'none'" :stroke="likedComments[c.id] ? '#ef4444' : '#9ca3af'" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    {{ c.likeCount ?? 0 }}
                  </button>
                  <button @click="replyTo = replyTo?.id === c.id ? null : { id: c.id, authorName: c.authorName }" style="font-size:12px; color:#9ca3af; background:none; border:none; cursor:pointer;">답글</button>
                </div>
                <!-- 대댓글 입력 -->
                <div v-if="replyTo?.id === c.id" style="margin:10px 0 0 38px; display:flex; gap:8px;">
                  <textarea v-model="replyContent" :placeholder="`${replyTo.authorName}에게 답글...`" rows="2"
                    style="flex:1; padding:10px 14px; border:1.5px solid #c7d2fe; border-radius:10px; font-size:13px; color:#374151; resize:none; outline:none; background:#fafbff;"></textarea>
                  <div style="display:flex; flex-direction:column; gap:4px;">
                    <button @click="addReply(c.id)" style="background:#6366f1; color:#fff; font-size:12px; font-weight:600; padding:8px 14px; border-radius:8px; border:none; cursor:pointer;">등록</button>
                    <button @click="replyTo = null" style="background:#f3f4f6; color:#6b7280; font-size:12px; padding:8px 14px; border-radius:8px; border:none; cursor:pointer;">취소</button>
                  </div>
                </div>
                <!-- 대댓글 목록 -->
                <div v-if="c.replies?.length" style="margin-top:10px; margin-left:38px; display:flex; flex-direction:column; gap:8px;">
                  <div v-for="r in c.replies" :key="r.id" style="background:#f8f9ff; border-radius:10px; padding:12px 14px;">
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
                      <div style="display:flex; align-items:center; gap:6px;">
                        <div style="width:24px; height:24px; border-radius:50%; background:#ede9fe; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; color:#6366f1;">
                          {{ (r.authorName ?? '?').charAt(0) }}
                        </div>
                        <span style="font-size:12px; font-weight:600; color:#111827;">{{ r.authorName }}</span>
                        <span style="font-size:11px; color:#d1d5db;">{{ formatDate(r.createdAt) }}</span>
                      </div>
                      <button v-if="String(r.authorId) === String(userId)" @click="removeComment(r.id)" style="font-size:11px; color:#ef4444; background:none; border:none; cursor:pointer;">삭제</button>
                    </div>
                    <p style="font-size:13px; color:#374151; line-height:1.6; margin:0 0 6px 30px;">{{ r.content }}</p>
                    <button @click="handleCommentLike(r.id)" :style="`font-size:11px; background:none; border:none; cursor:pointer; display:flex; align-items:center; gap:3px; margin-left:30px; color:${likedComments[r.id] ? '#ef4444' : '#9ca3af'};`">
                      <svg width="11" height="11" viewBox="0 0 24 24" :fill="likedComments[r.id] ? '#ef4444' : 'none'" :stroke="likedComments[r.id] ? '#ef4444' : '#9ca3af'" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      {{ r.likeCount ?? 0 }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- 오른쪽 사이드바 -->
        <div style="display:flex; flex-direction:column; gap:16px; position:sticky; top:84px;">

          <!-- 모집중 전용: 팀원 모집 카드 -->
          <div v-if="project.status === 'RECRUITING'" style="background:#fff; border-radius:16px; padding:24px; box-shadow:0 1px 4px rgba(0,0,0,0.06); border-top:3px solid #6366f1;">
            <h3 style="font-size:15px; font-weight:700; color:#111827; margin:0 0 16px;">👥 팀원 모집</h3>

            <!-- 진행 정보 -->
            <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
              <div v-if="project.meetingType" style="display:flex; align-items:center; gap:8px; font-size:13px; color:#374151;">
                <span style="width:28px; height:28px; background:#f0f1ff; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:14px;">
                  {{ project.meetingType === 'ONLINE' ? '🖥️' : project.meetingType === 'OFFLINE' ? '🤝' : '⚡' }}
                </span>
                {{ project.meetingType === 'ONLINE' ? '온라인' : project.meetingType === 'OFFLINE' ? '오프라인' : '온/오프라인 혼합' }}
              </div>
              <div v-if="project.duration" style="display:flex; align-items:center; gap:8px; font-size:13px; color:#374151;">
                <span style="width:28px; height:28px; background:#f0f1ff; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:14px;">⏱</span>
                {{ project.duration }}
              </div>
              <div v-if="project.deadline" style="display:flex; align-items:center; gap:8px; font-size:13px; color:#ef4444; font-weight:500;">
                <span style="width:28px; height:28px; background:#fff5f5; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:14px;">📅</span>
                {{ project.deadline }} 마감
              </div>
            </div>

            <!-- 역할 -->
            <div v-if="(project.recruitments ?? []).length" style="display:flex; flex-direction:column; gap:8px; margin-bottom:20px;">
              <div v-for="r in project.recruitments" :key="r.role"
                :style="`background:#fafbff; border:1px solid #e5e7eb; border-radius:10px; padding:12px 14px; opacity:${(r.acceptedCount ?? 0) >= r.count ? '0.6' : '1'};`">
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px;">
                  <span style="font-size:13px; font-weight:700; color:#111827;">{{ r.role }}</span>
                  <span v-if="(r.acceptedCount ?? 0) >= r.count" style="font-size:11px; background:#fce7f3; color:#be185d; padding:2px 8px; border-radius:999px; font-weight:600;">마감</span>
                  <span v-else style="font-size:11px; background:#ede9fe; color:#6366f1; padding:2px 8px; border-radius:999px; font-weight:600;">{{ r.count - (r.acceptedCount ?? 0) }}명 남음</span>
                </div>
                <div v-if="r.skills" style="font-size:11px; color:#6b7280; margin-bottom:2px;">🛠 {{ r.skills }}</div>
                <div v-if="r.description" style="font-size:11px; color:#9ca3af;">{{ r.description }}</div>
              </div>
            </div>

            <!-- 모집 메시지 -->
            <div v-if="project.recruitMessage" style="background:#f0f1ff; border-radius:10px; padding:12px 14px; margin-bottom:16px; font-size:13px; color:#4338ca; line-height:1.6;">
              💬 {{ project.recruitMessage }}
            </div>

            <RouterLink v-if="!isMyProject" :to="`/project/${project.id}/apply`"
              style="display:block; width:100%; padding:13px; border-radius:12px; border:none; background:#6366f1; color:#fff; font-size:14px; font-weight:700; cursor:pointer; text-decoration:none; text-align:center; box-sizing:border-box;">
              팀원 지원하기 →
            </RouterLink>
            <div v-else style="text-align:center; font-size:13px; color:#9ca3af; padding:10px 0;">내가 작성한 프로젝트예요</div>
          </div>

          <!-- 완료 전용: 작성자 + 액션 -->
          <div v-if="project.status === 'COMPLETED'" style="background:#fff; border-radius:16px; padding:20px 24px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
            <RouterLink :to="`/user/${project.authorId}`" style="display:flex; align-items:center; gap:10px; margin-bottom:16px; padding-bottom:16px; border-bottom:1px solid #f3f4f6; text-decoration:none;">
              <div style="width:40px; height:40px; border-radius:50%; background:#d1fae5; display:flex; align-items:center; justify-content:center; font-size:15px; font-weight:800; color:#059669;">
                {{ (project.authorName ?? '?').charAt(0) }}
              </div>
              <div>
                <div style="font-size:14px; font-weight:700; color:#111827;">{{ project.authorName }}</div>
                <div v-if="project.authorSchool" style="font-size:12px; color:#9ca3af;">{{ project.authorSchool }}</div>
              </div>
            </RouterLink>
            <div style="display:flex; gap:8px;">
              <button @click="toggleLike" :style="`flex:1; display:flex; align-items:center; justify-content:center; gap:5px; font-size:13px; padding:9px; border-radius:10px; cursor:pointer; border:1.5px solid ${liked ? '#ef4444' : '#e5e7eb'}; background:${liked ? '#fff5f5' : '#fff'}; color:${liked ? '#ef4444' : '#6b7280'}; font-weight:500;`">
                <svg width="14" height="14" viewBox="0 0 24 24" :fill="liked ? '#ef4444' : 'none'" :stroke="liked ? '#ef4444' : '#6b7280'" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                좋아요 {{ (project.likeCount ?? 0) + (liked ? 1 : 0) }}
              </button>
              <button @click="toggleBookmark" :style="`flex:1; display:flex; align-items:center; justify-content:center; gap:5px; font-size:13px; padding:9px; border-radius:10px; cursor:pointer; border:1.5px solid ${bookmarked ? '#10b981' : '#e5e7eb'}; background:${bookmarked ? '#f0fdf4' : '#fff'}; color:${bookmarked ? '#10b981' : '#6b7280'}; font-weight:500;`">
                <svg width="14" height="14" viewBox="0 0 24 24" :fill="bookmarked ? '#10b981' : 'none'" :stroke="bookmarked ? '#10b981' : '#6b7280'" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                북마크
              </button>
            </div>
            <div style="text-align:center; margin-top:10px; font-size:12px; color:#d1d5db;">👁 {{ project.viewCount ?? 0 }} 조회</div>
          </div>

          <!-- 완료 전용: 기술 스택 -->
          <div v-if="project.status === 'COMPLETED'" style="background:#fff; border-radius:16px; padding:20px 24px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
            <h3 style="font-size:13px; font-weight:700; color:#374151; margin:0 0 12px; text-transform:uppercase; letter-spacing:0.05em;">기술 스택</h3>
            <div style="display:flex; flex-wrap:wrap; gap:6px;">
              <span v-for="tech in (project.techStacks ?? [])" :key="tech"
                style="font-size:12px; padding:5px 12px; border-radius:999px; background:#f0fdf4; color:#065f46; border:1px solid #a7f3d0; font-weight:500;">
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- 완료 전용: 프로젝트 정보 카드 -->
          <div v-if="project.status === 'COMPLETED'" style="background:#fff; border-radius:16px; padding:20px 24px; box-shadow:0 1px 4px rgba(0,0,0,0.06); border-top:3px solid #10b981;">
            <h3 style="font-size:13px; font-weight:700; color:#374151; margin:0 0 14px; text-transform:uppercase; letter-spacing:0.05em;">프로젝트 정보</h3>
            <div style="display:flex; flex-direction:column; gap:12px;">
              <div v-if="project.startDate && project.endDate" style="display:flex; gap:8px; align-items:flex-start;">
                <span style="font-size:12px; color:#9ca3af; width:52px; flex-shrink:0; padding-top:1px;">기간</span>
                <span style="font-size:13px; color:#374151; font-weight:500;">{{ project.startDate?.slice(0,7) }} ~ {{ project.endDate?.slice(0,7) }}</span>
              </div>
              <div v-if="project.myRole" style="display:flex; gap:8px; align-items:flex-start;">
                <span style="font-size:12px; color:#9ca3af; width:52px; flex-shrink:0; padding-top:1px;">내 역할</span>
                <span style="font-size:13px; color:#374151; font-weight:500;">{{ project.myRole }}</span>
              </div>
              <div v-if="(project.teamMembers ?? []).length" style="display:flex; gap:8px; align-items:flex-start;">
                <span style="font-size:12px; color:#9ca3af; width:52px; flex-shrink:0; padding-top:1px;">팀 구성</span>
                <div style="display:flex; flex-wrap:wrap; gap:4px;">
                  <span v-for="m in project.teamMembers" :key="m.role" style="font-size:11px; background:#d1fae5; color:#065f46; padding:2px 8px; border-radius:999px; font-weight:500;">{{ m.role }} {{ m.count }}명</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 링크 카드 -->
          <div v-if="project.githubUrl || project.deployUrl || project.figmaUrl || project.notionUrl" style="background:#fff; border-radius:16px; padding:20px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
            <h3 style="font-size:14px; font-weight:700; color:#374151; margin:0 0 12px;">🔗 링크</h3>
            <div style="display:flex; flex-direction:column; gap:8px;">
              <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" style="display:flex; align-items:center; gap:8px; font-size:13px; color:#374151; text-decoration:none; padding:9px 12px; border:1px solid #e5e7eb; border-radius:10px; font-weight:500; transition:background 0.15s;" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='#fff'">
                🐙 GitHub Repository
              </a>
              <a v-if="project.deployUrl" :href="project.deployUrl" target="_blank" style="display:flex; align-items:center; gap:8px; font-size:13px; color:#374151; text-decoration:none; padding:9px 12px; border:1px solid #e5e7eb; border-radius:10px; font-weight:500;" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='#fff'">
                🚀 배포 링크
              </a>
              <a v-if="project.figmaUrl" :href="project.figmaUrl" target="_blank" style="display:flex; align-items:center; gap:8px; font-size:13px; color:#374151; text-decoration:none; padding:9px 12px; border:1px solid #e5e7eb; border-radius:10px; font-weight:500;" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='#fff'">
                🎨 Figma
              </a>
              <a v-if="project.notionUrl" :href="project.notionUrl" target="_blank" style="display:flex; align-items:center; gap:8px; font-size:13px; color:#374151; text-decoration:none; padding:9px 12px; border:1px solid #e5e7eb; border-radius:10px; font-weight:500;" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='#fff'">
                📝 Notion
              </a>
            </div>
          </div>

        </div>
      </div>
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
const liked = ref(false)
const bookmarked = ref(false)

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

const isMyProject = computed(() =>
  project.value?.authorId != null && String(project.value.authorId) === String(userId.value)
)

const renderedDescription = computed(() =>
  project.value?.description ? marked(project.value.description) : ''
)

const totalCommentCount = computed(() =>
  comments.value.reduce((sum, c) => sum + 1 + (c.replies?.length ?? 0), 0)
)

async function toggleLike() {
  try {
    if (liked.value) await removeLike(route.params.id)
    else await addLike(route.params.id)
    liked.value = !liked.value
    if (project.value) project.value.likeCount = (project.value.likeCount ?? 0) + (liked.value ? 1 : -1)
  } catch {}
}

async function toggleBookmark() {
  try {
    if (bookmarked.value) await removeBookmark(route.params.id)
    else await addBookmark(route.params.id)
    bookmarked.value = !bookmarked.value
  } catch (e) {
    console.error('[북마크 실패]', e?.response?.status)
  }
}
</script>

<style scoped>
.markdown-body :deep(h2) { font-size:17px; font-weight:700; color:#111827; margin:24px 0 10px; }
.markdown-body :deep(h3) { font-size:15px; font-weight:600; color:#374151; margin:18px 0 8px; }
.markdown-body :deep(p) { font-size:14px; color:#374151; line-height:1.8; margin:0 0 10px; }
.markdown-body :deep(ul), .markdown-body :deep(ol) { padding-left:20px; margin:0 0 10px; }
.markdown-body :deep(li) { font-size:14px; color:#374151; line-height:1.8; }
.markdown-body :deep(pre) { background:#1e1e2e; color:#cdd6f4; border-radius:10px; padding:16px; font-size:13px; line-height:1.7; overflow-x:auto; margin:12px 0; }
.markdown-body :deep(code) { background:#f3f4f6; color:#6366f1; padding:2px 6px; border-radius:4px; font-size:13px; }
.markdown-body :deep(pre code) { background:none; color:inherit; padding:0; }
.markdown-body :deep(blockquote) { border-left:3px solid #6366f1; padding-left:14px; color:#6b7280; margin:12px 0; }
</style>
