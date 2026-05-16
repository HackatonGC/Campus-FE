<template>
  <div style="min-height:100vh; background:#FAFBFF;">

    <!-- NAV -->
    <nav style="background:#fff; border-bottom:1px solid rgba(99,102,241,0.15); position:sticky; top:0; z-index:50; width:100%;">
      <div style="max-width:1280px; margin:0 auto; padding:0 40px; height:68px; display:flex; align-items:center; justify-content:space-between;">
        <RouterLink to="/" style="display:flex; align-items:center; gap:12px; text-decoration:none;">
          <div style="width:44px; height:44px; background:#6366f1; border-radius:12px; display:flex; align-items:center; justify-content:center;">
            <img :src="iconLogo" style="width:28px; height:28px;" alt="StackMate" />
          </div>
          <div>
            <div style="font-weight:700; font-size:16px; line-height:1.2; background:linear-gradient(to right, #6366F1 0%, rgba(99,102,241,0.7) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">StackMate</div>
            <div style="color:#9ca3af; font-size:11px; line-height:1.2;">함께 성장하는 개발자</div>
          </div>
        </RouterLink>
        <button style="display:flex; align-items:center; gap:6px; font-size:14px; color:#4b5563; background:none; border:none; cursor:pointer;">
          <img :src="iconLogout" style="width:16px; height:16px;" alt="" /> 로그인
        </button>
      </div>
    </nav>

    <div v-if="project">

      <!-- 히어로 이미지 -->
      <div style="width:100%; height:380px; overflow:hidden;">
        <img :src="project.thumbnailUrl" :alt="project.title" style="width:100%; height:100%; object-fit:cover;" />
      </div>

      <!-- 본문 -->
      <div style="max-width:900px; margin:0 auto; padding:40px 40px 80px;">

        <!-- 뱃지 + 제목 -->
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
          <span v-if="project.isRecruiting" style="background:#10b981; color:#fff; font-size:12px; font-weight:600; padding:3px 10px; border-radius:999px;">모집중</span>
          <span style="background:#F0F1FF; color:#4338CA; font-size:12px; font-weight:500; padding:3px 10px; border-radius:999px;">{{ project.isTeam ? '팀 프로젝트' : '개인 프로젝트' }}</span>
        </div>
        <h1 style="font-size:32px; font-weight:800; color:#111827; margin:0 0 8px;">{{ project.title }}</h1>
        <p style="font-size:16px; color:#6b7280; margin:0 0 20px;">{{ project.summary }}</p>

        <!-- 기술 태그 -->
        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px;">
          <span v-for="tech in project.techStack" :key="tech"
            style="font-size:13px; padding:5px 14px; border-radius:999px; background:#F0F1FF; color:#4338CA; border:1px solid #c7d2fe;">
            {{ tech }}
          </span>
        </div>

        <!-- 작성자 + 메타 -->
        <div style="display:flex; align-items:center; justify-content:space-between; padding:16px 0; border-top:1px solid #f3f4f6; border-bottom:1px solid #f3f4f6; margin-bottom:40px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:40px; height:40px; border-radius:50%; background:#e0e7ff; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; color:#4338CA;">
              {{ project.author.charAt(0) }}
            </div>
            <div>
              <div style="font-size:14px; font-weight:600; color:#111827;">{{ project.author }}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:20px; font-size:13px; color:#9ca3af;">
            <span>👁 {{ project.views }}</span>
            <span>❤️ {{ project.likes }}</span>
          </div>
        </div>

        <!-- 프로젝트 소개 -->
        <section style="margin-bottom:40px;">
          <h2 style="font-size:20px; font-weight:700; color:#111827; margin:0 0 16px; display:flex; align-items:center; gap:8px;">
            🗂 프로젝트 소개
          </h2>
          <p style="font-size:15px; color:#374151; line-height:1.8; margin:0;">{{ project.description }}</p>
        </section>

        <!-- 주요 기능 -->
        <section style="margin-bottom:40px;">
          <h2 style="font-size:20px; font-weight:700; color:#111827; margin:0 0 16px; display:flex; align-items:center; gap:8px;">
            ✨ 주요 기능
          </h2>
          <ul style="margin:0; padding-left:20px; display:flex; flex-direction:column; gap:10px;">
            <li v-for="(feature, i) in demoFeatures" :key="i" style="font-size:15px; color:#374151; line-height:1.6;">
              {{ feature }}
            </li>
          </ul>
        </section>

        <!-- 기술 스택 & 아키텍처 -->
        <section style="margin-bottom:40px;">
          <h2 style="font-size:20px; font-weight:700; color:#111827; margin:0 0 16px; display:flex; align-items:center; gap:8px;">
            ⚙️ 기술 스택 &amp; 아키텍처
          </h2>
          <p style="font-size:15px; color:#374151; line-height:1.8; margin:0;">{{ project.learned }}</p>
        </section>

        <!-- 시연 화면 -->
        <section v-if="project.demoImages && project.demoImages.length" style="margin-bottom:40px;">
          <h2 style="font-size:20px; font-weight:700; color:#111827; margin:0 0 16px; display:flex; align-items:center; gap:8px;">
            🖥 시연 화면
          </h2>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
            <img v-for="(img, i) in project.demoImages" :key="i" :src="img" style="width:100%; border-radius:12px; object-fit:cover;" />
          </div>
        </section>

        <!-- 트러블 슈팅 -->
        <section style="margin-bottom:40px;">
          <h2 style="font-size:20px; font-weight:700; color:#111827; margin:0 0 16px; display:flex; align-items:center; gap:8px;">
            🔥 트러블 슈팅
          </h2>
          <p style="font-size:15px; color:#374151; line-height:1.8; margin:0;">{{ project.hardPart }}</p>
        </section>

        <!-- 코드 예시 -->
        <section style="margin-bottom:40px;">
          <h2 style="font-size:20px; font-weight:700; color:#111827; margin:0 0 16px; display:flex; align-items:center; gap:8px;">
            &lt;/&gt; 코드 예시
          </h2>
          <pre style="background:#1e1e2e; color:#cdd6f4; border-radius:12px; padding:24px; font-size:13px; line-height:1.7; overflow-x:auto; margin:0;">{{ codeExample }}</pre>
        </section>

        <!-- 액션바 -->
        <div style="display:flex; align-items:center; justify-content:space-between; padding:20px 0; border-top:1px solid #f3f4f6; border-bottom:1px solid #f3f4f6; margin-bottom:40px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <button @click="liked = !liked" :style="`display:flex; align-items:center; gap:6px; font-size:14px; padding:8px 14px; border-radius:8px; cursor:pointer; background:none; border:1px solid #d1d5db; color:${liked ? '#ef4444' : '#6b7280'};`">
              <img :src="iconLike" style="width:16px; height:16px;" alt="" /> 좋아요 {{ project.likes + (liked ? 1 : 0) }}
            </button>
            <button @click="bookmarked = !bookmarked" :style="`display:flex; align-items:center; gap:6px; font-size:14px; padding:8px 14px; border-radius:8px; cursor:pointer; background:none; border:1px solid #d1d5db; color:${bookmarked ? '#6366f1' : '#6b7280'};`">
              <img :src="iconBookmark" style="width:16px; height:16px;" alt="" /> 북마크
            </button>
            <button style="display:flex; align-items:center; gap:6px; font-size:14px; padding:8px 14px; border-radius:8px; cursor:pointer; background:none; border:1px solid #d1d5db; color:#6b7280;">
              <img :src="iconComment" style="width:16px; height:16px;" alt="" /> 댓글 {{ comments.length }}
            </button>
          </div>
          <div style="display:flex; align-items:center; gap:12px;">
            <a :href="project.githubUrl" target="_blank" style="display:flex; align-items:center; gap:6px; font-size:14px; color:#6b7280; text-decoration:none; padding:8px 14px; border:1px solid #e5e7eb; border-radius:8px;">
              🐙 GitHub
            </a>
            <button style="display:flex; align-items:center; gap:6px; font-size:14px; color:#6b7280; background:none; border:1px solid #e5e7eb; border-radius:8px; padding:8px 14px; cursor:pointer;">
              🚀 데모
            </button>
          </div>
        </div>

        <!-- 팀원 모집 -->
        <section v-if="project.isRecruiting" style="background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:24px; margin-bottom:40px;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
            <h2 style="font-size:18px; font-weight:700; color:#111827; margin:0; display:flex; align-items:center; gap:8px;">
              <img :src="iconTeam" style="width:20px; height:20px;" alt="" /> 팀원 모집
            </h2>
            <span style="font-size:12px; color:#9ca3af;">마감일 2024.06.30</span>
          </div>
          <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:16px;">
            <div v-for="role in roles" :key="role.name" style="background:#FAFBFF; border:1px solid #e5e7eb; border-radius:12px; padding:16px;">
              <div style="font-size:14px; font-weight:600; color:#111827; margin-bottom:4px;">{{ role.name }}</div>
              <div style="font-size:12px; color:#9ca3af; margin-bottom:8px;">{{ role.current }}/{{ role.max }}</div>
              <div style="font-size:12px; color:#6b7280;">{{ role.desc }}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <span style="font-size:13px; color:#9ca3af;">전체 {{ totalApplicants }}명이 지원했습니다</span>
            <RouterLink :to="`/project/${project.id}/apply`" style="background:#6366f1; color:#fff; font-size:14px; font-weight:600; padding:10px 24px; border-radius:10px; text-decoration:none; display:flex; align-items:center; gap:6px; border:1px solid #d1d5db;">
              <img :src="iconTeam" style="width:16px; height:16px; filter:brightness(0) invert(1);" alt="" /> 팀원 지원하기
            </RouterLink>
          </div>
        </section>

        <!-- 댓글 -->
        <section>
          <h2 style="font-size:20px; font-weight:700; color:#111827; margin:0 0 20px; display:flex; align-items:center; gap:8px;">
            <img :src="iconComment" style="width:20px; height:20px;" alt="" /> 댓글 {{ comments.length }}
          </h2>
          <!-- 입력 -->
          <div style="margin-bottom:24px;">
            <textarea
              v-model="newComment"
              placeholder="댓글을 입력하세요..."
              style="width:100%; padding:14px 16px; border:1px solid #e5e7eb; border-radius:12px; font-size:14px; color:#374151; resize:none; outline:none; box-sizing:border-box; height:80px; background:#fff;"
            ></textarea>
            <div style="display:flex; justify-content:flex-end; margin-top:8px;">
              <button @click="addComment" style="background:#6366f1; color:#fff; font-size:14px; font-weight:600; padding:10px 24px; border-radius:10px; border:1px solid #d1d5db; cursor:pointer;">
                댓글 작성
              </button>
            </div>
          </div>
          <!-- 댓글 목록 -->
          <div style="display:flex; flex-direction:column; gap:20px;">
            <div v-for="(c, i) in comments" :key="i" style="padding:16px 0; border-bottom:1px solid #f3f4f6;">
              <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
                <div style="width:32px; height:32px; border-radius:50%; background:#e0e7ff; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; color:#4338CA;">
                  {{ c.author.charAt(0) }}
                </div>
                <div>
                  <span style="font-size:14px; font-weight:600; color:#111827;">{{ c.author }}</span>
                  <span style="font-size:12px; color:#9ca3af; margin-left:8px;">{{ c.time }}</span>
                </div>
              </div>
              <p style="font-size:14px; color:#374151; line-height:1.6; margin:0 0 8px 42px;">{{ c.text }}</p>
              <button style="margin-left:42px; font-size:12px; color:#9ca3af; background:none; border:none; cursor:pointer; display:flex; align-items:center; gap:4px;">
                <img :src="iconLike" style="width:13px; height:13px;" alt="" /> 좋아요 {{ c.likes }}
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>

    <!-- 프로젝트 없을 때 -->
    <div v-else style="text-align:center; padding:120px 40px; color:#9ca3af; font-size:16px;">
      프로젝트를 찾을 수 없어요.
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '../data/dummy.js'

import iconLogo   from '../assets/Icon.svg'
import iconLogout from '../assets/Icon (4).svg'
import iconTeam    from '../assets/Icon (3).svg'
import iconComment  from '../assets/Icon (7).svg'
import iconLike     from '../assets/Icon (9).svg'
import iconBookmark from '../assets/Icon (10).svg'

const route = useRoute()
const project = computed(() => projects.find(p => p.id === Number(route.params.id)))

const liked = ref(false)
const bookmarked = ref(false)
const newComment = ref('')

const comments = ref([
  { author: '이개발', time: '12시간 전', text: '프로젝트 정말 멋지네요! WebSocket 부분이 특히 인상적입니다. Redis Pub/Sub에 대해 좀 더 자세히 설명해줄 수 있나요?', likes: 3 },
  { author: '김개발', time: '학생대 · 14시간 전', text: '감사합니다! Redis Pub/Sub은 각 서버 인스턴스가 채널을 구독하고, 메시지가 발행되면 모든 구독자에게 전달되는 방식이에요. 자세한 내용은 GitHub 문서에 첨부해뒀습니다!', likes: 2 },
  { author: '박수빈', time: '5시간 전', text: 'Spring Boot 채팅 프로젝트를 하려고 찾는데 많은 도움이 될 것 같아요. 팀원 모집하신다면 꼭 지원하고 싶습니다!', likes: 1 },
])

const demoFeatures = [
  '실시간 1:1 채팅 및 그룹 채팅',
  '읽음 표시 및 타이핑 인디케이터',
  '이미지 및 파일 전송 기능',
  '채팅방 검색 및 필터링',
  '알림 시스템 (앱 푸시)',
]

const codeExample = `// WebSocket 연결 설정
const connectWebSocket = () => {
  const socket = new SockJS('/ws');
  const stompClient = Stomp.over(socket);

  stompClient.connect({}, (frame) => {
    console.log('Connected: ' + frame);

    stompClient.subscribe('/topic/messages', (message) => {
      const msg = JSON.parse(message.body);
      displayMessage(msg);
    });
  });
};`

const roles = [
  { name: 'Frontend', current: 1, max: 2, desc: '1명 모집' },
  { name: 'Backend', current: 0, max: 1, desc: '1명 모집' },
  { name: 'AI Engineer', current: 0, max: 1, desc: '1명 모집' },
]

const totalApplicants = computed(() => roles.reduce((sum, r) => sum + r.current, 0))

function addComment() {
  if (!newComment.value.trim()) return
  comments.value.unshift({
    author: '나',
    time: '방금',
    text: newComment.value.trim(),
    likes: 0,
  })
  newComment.value = ''
}
</script>
