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
        <RouterLink :to="editId ? `/project/${editId}` : '/project/new'" style="font-size:14px; color:#6b7280; text-decoration:none;">{{ editId ? '← 프로젝트로 돌아가기' : '← 유형 선택으로' }}</RouterLink>
      </div>
    </nav>

    <div style="max-width:760px; margin:0 auto; padding:48px 40px 80px;">

      <!-- 헤더 -->
      <div style="margin-bottom:36px;">
        <div style="display:inline-flex; align-items:center; gap:8px; background:#d1fae5; color:#059669; font-size:13px; font-weight:600; padding:6px 14px; border-radius:999px; margin-bottom:14px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          완료된 프로젝트
        </div>
        <h1 style="font-size:28px; font-weight:800; color:#111827; margin:0 0 8px;">{{ editId ? '완료 프로젝트 수정' : '프로젝트 경험을 공유해요' }}</h1>
        <p style="font-size:15px; color:#9ca3af; margin:0;">{{ editId ? '내용을 수정한 후 저장해주세요' : '당신의 경험이 누군가에게 큰 도움이 될 수 있어요' }}</p>
      </div>

      <!-- 1. 기본 정보 -->
      <div style="background:#fff; border-radius:20px; padding:32px; box-shadow:0 1px 4px rgba(0,0,0,0.06); margin-bottom:20px;">
        <h2 style="font-size:16px; font-weight:700; color:#111827; margin:0 0 24px; display:flex; align-items:center; gap:8px;">
          <span style="width:28px; height:28px; background:#10b981; color:#fff; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700;">1</span>
          기본 정보
        </h2>

        <!-- 대표 이미지 -->
        <div style="margin-bottom:24px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">대표 이미지 <span style="font-size:12px; font-weight:400; color:#9ca3af;">(선택)</span></label>
          <div v-if="thumbnailPreview" style="position:relative; margin-bottom:8px;">
            <img :src="thumbnailPreview" style="width:100%; height:200px; object-fit:cover; border-radius:12px;" />
            <button @click="thumbnailPreview=''; form.thumbnailUrl=''" style="position:absolute; top:10px; right:10px; background:rgba(0,0,0,0.5); color:#fff; border:none; border-radius:8px; padding:4px 10px; font-size:12px; cursor:pointer;">제거</button>
          </div>
          <label v-else style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:140px; border:2px dashed #a7f3d0; border-radius:12px; cursor:pointer; background:#f0fdf4; gap:8px; color:#10b981;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span style="font-size:13px; font-weight:500;">이미지 업로드</span>
            <input type="file" accept="image/*" style="display:none;" @change="onThumbnailChange" />
          </label>
        </div>

        <!-- 제목 -->
        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">프로젝트 제목 <span style="color:#10b981;">*</span></label>
          <input v-model="form.title" type="text" placeholder="프로젝트 이름을 입력하세요" style="width:100%; height:48px; padding:0 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; outline:none; box-sizing:border-box; background:#fafafa;" @focus="e=>e.target.style.borderColor='#10b981'" @blur="e=>e.target.style.borderColor='#e5e7eb'" />
        </div>

        <!-- 한 줄 소개 -->
        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">한 줄 소개 <span style="color:#10b981;">*</span></label>
          <input v-model="form.summary" type="text" placeholder="프로젝트를 한 줄로 소개해주세요" maxlength="80" style="width:100%; height:48px; padding:0 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; outline:none; box-sizing:border-box; background:#fafafa;" @focus="e=>e.target.style.borderColor='#10b981'" @blur="e=>e.target.style.borderColor='#e5e7eb'" />
        </div>

        <!-- 상세 설명 -->
        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">프로젝트 상세 설명 <span style="color:#10b981;">*</span></label>
          <textarea v-model="form.description" rows="5" placeholder="어떤 프로젝트인지 자세히 설명해주세요" style="width:100%; padding:14px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; outline:none; box-sizing:border-box; resize:vertical; line-height:1.7; background:#fafafa;" @focus="e=>e.target.style.borderColor='#10b981'" @blur="e=>e.target.style.borderColor='#e5e7eb'"></textarea>
        </div>

        <!-- 기술 스택 -->
        <div>
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">기술 스택 <span style="color:#10b981;">*</span></label>
          <div style="display:flex; flex-wrap:wrap; gap:8px; padding:14px; border:1.5px solid #e5e7eb; border-radius:12px; background:#fafafa;">
            <button v-for="tech in techOptions" :key="tech" type="button" @click="toggleTech(tech)"
              :style="form.techStacks.includes(tech)
                ? 'padding:5px 14px; border-radius:999px; font-size:13px; border:1.5px solid #10b981; background:#d1fae5; color:#059669; cursor:pointer; font-weight:500;'
                : 'padding:5px 14px; border-radius:999px; font-size:13px; border:1.5px solid #e5e7eb; background:#fff; color:#6b7280; cursor:pointer;'">
              {{ tech }}
            </button>
          </div>
        </div>
      </div>

      <!-- 2. 프로젝트 정보 -->
      <div style="background:#fff; border-radius:20px; padding:32px; box-shadow:0 1px 4px rgba(0,0,0,0.06); margin-bottom:20px;">
        <h2 style="font-size:16px; font-weight:700; color:#111827; margin:0 0 24px; display:flex; align-items:center; gap:8px;">
          <span style="width:28px; height:28px; background:#10b981; color:#fff; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700;">2</span>
          프로젝트 정보
        </h2>

        <!-- 프로젝트 기간 -->
        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">프로젝트 기간 <span style="color:#10b981;">*</span></label>
          <div style="display:flex; align-items:center; gap:12px;">
            <input v-model="form.startDate" type="date" style="flex:1; height:48px; padding:0 14px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; outline:none; box-sizing:border-box; background:#fafafa;" @focus="e=>e.target.style.borderColor='#10b981'" @blur="e=>e.target.style.borderColor='#e5e7eb'" />
            <span style="color:#9ca3af; font-size:14px; flex-shrink:0;">~</span>
            <input v-model="form.endDate" type="date" style="flex:1; height:48px; padding:0 14px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; outline:none; box-sizing:border-box; background:#fafafa;" @focus="e=>e.target.style.borderColor='#10b981'" @blur="e=>e.target.style.borderColor='#e5e7eb'" />
          </div>
        </div>

        <!-- 개인/팀 여부 -->
        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">개인 / 팀 여부 <span style="color:#10b981;">*</span></label>
          <div style="display:flex; gap:10px;">
            <button type="button" @click="form.projectType = 'INDIVIDUAL'"
              :style="form.projectType === 'INDIVIDUAL'
                ? 'flex:1; padding:12px; border-radius:12px; font-size:13px; font-weight:600; border:1.5px solid #10b981; background:#d1fae5; color:#059669; cursor:pointer;'
                : 'flex:1; padding:12px; border-radius:12px; font-size:13px; border:1.5px solid #e5e7eb; background:#fff; color:#6b7280; cursor:pointer;'">
              👤 개인 프로젝트
            </button>
            <button type="button" @click="form.projectType = 'TEAM'"
              :style="form.projectType === 'TEAM'
                ? 'flex:1; padding:12px; border-radius:12px; font-size:13px; font-weight:600; border:1.5px solid #10b981; background:#d1fae5; color:#059669; cursor:pointer;'
                : 'flex:1; padding:12px; border-radius:12px; font-size:13px; border:1.5px solid #e5e7eb; background:#fff; color:#6b7280; cursor:pointer;'">
              👥 팀 프로젝트
            </button>
          </div>
        </div>

        <!-- 내 역할 -->
        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">내 역할 <span style="color:#10b981;">*</span></label>
          <input v-model="form.myRole" type="text" placeholder="예: 프론트엔드 개발, 팀장, 백엔드 API 설계" style="width:100%; height:48px; padding:0 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; outline:none; box-sizing:border-box; background:#fafafa;" @focus="e=>e.target.style.borderColor='#10b981'" @blur="e=>e.target.style.borderColor='#e5e7eb'" />
        </div>

        <!-- 팀 구성 (팀 프로젝트일 때만) -->
        <div v-if="form.projectType === 'TEAM'">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">팀 구성 <span style="color:#10b981;">*</span></label>
          <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:10px;">
            <div v-for="(member, idx) in form.teamMembers" :key="idx" style="display:flex; align-items:center; gap:10px;">
              <input v-model="member.role" type="text" placeholder="역할 (예: 프론트엔드)" style="flex:1; height:44px; padding:0 14px; border:1.5px solid #e5e7eb; border-radius:10px; font-size:13px; color:#111827; outline:none; box-sizing:border-box; background:#fafafa;" @focus="e=>e.target.style.borderColor='#10b981'" @blur="e=>e.target.style.borderColor='#e5e7eb'" />
              <input v-model.number="member.count" type="number" min="1" max="10" style="width:80px; height:44px; padding:0 12px; border:1.5px solid #e5e7eb; border-radius:10px; font-size:13px; color:#111827; outline:none; box-sizing:border-box; text-align:center; background:#fafafa;" @focus="e=>e.target.style.borderColor='#10b981'" @blur="e=>e.target.style.borderColor='#e5e7eb'" />
              <span style="font-size:13px; color:#9ca3af; flex-shrink:0;">명</span>
              <button v-if="form.teamMembers.length > 1" @click="removeTeamMember(idx)" style="color:#9ca3af; background:none; border:none; cursor:pointer; font-size:16px; flex-shrink:0;">✕</button>
            </div>
          </div>
          <button @click="addTeamMember" style="width:100%; padding:10px; border-radius:10px; border:1.5px dashed #a7f3d0; background:#f0fdf4; color:#10b981; font-size:13px; font-weight:600; cursor:pointer;">+ 역할 추가</button>
        </div>
      </div>

      <!-- 3. 결과물 -->
      <div style="background:#fff; border-radius:20px; padding:32px; box-shadow:0 1px 4px rgba(0,0,0,0.06); margin-bottom:20px;">
        <h2 style="font-size:16px; font-weight:700; color:#111827; margin:0 0 24px; display:flex; align-items:center; gap:8px;">
          <span style="width:28px; height:28px; background:#10b981; color:#fff; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700;">3</span>
          결과물
        </h2>

        <!-- 주요 기능 -->
        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">주요 기능 <span style="color:#10b981;">*</span></label>
          <textarea v-model="form.features" rows="4" placeholder="구현한 주요 기능을 소개해주세요&#10;예: - 실시간 채팅 기능&#10;    - OAuth 소셜 로그인&#10;    - 지도 기반 위치 검색" style="width:100%; padding:14px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; outline:none; box-sizing:border-box; resize:vertical; line-height:1.7; background:#fafafa;" @focus="e=>e.target.style.borderColor='#10b981'" @blur="e=>e.target.style.borderColor='#e5e7eb'"></textarea>
        </div>

        <!-- GitHub -->
        <div style="margin-bottom:16px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">GitHub Repository <span style="font-size:12px; font-weight:400; color:#9ca3af;">(선택)</span></label>
          <input v-model="form.githubUrl" type="url" placeholder="https://github.com/..." style="width:100%; height:48px; padding:0 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; outline:none; box-sizing:border-box; background:#fafafa;" @focus="e=>e.target.style.borderColor='#10b981'" @blur="e=>e.target.style.borderColor='#e5e7eb'" />
        </div>

        <!-- 배포 링크 -->
        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">배포 링크 <span style="font-size:12px; font-weight:400; color:#9ca3af;">(선택)</span></label>
          <input v-model="form.deployUrl" type="url" placeholder="https://..." style="width:100%; height:48px; padding:0 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; outline:none; box-sizing:border-box; background:#fafafa;" @focus="e=>e.target.style.borderColor='#10b981'" @blur="e=>e.target.style.borderColor='#e5e7eb'" />
        </div>

        <!-- Figma -->
        <div style="margin-bottom:16px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">Figma 링크 <span style="font-size:12px; font-weight:400; color:#9ca3af;">(선택)</span></label>
          <input v-model="form.figmaUrl" type="url" placeholder="https://figma.com/..." style="width:100%; height:48px; padding:0 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; outline:none; box-sizing:border-box; background:#fafafa;" @focus="e=>e.target.style.borderColor='#10b981'" @blur="e=>e.target.style.borderColor='#e5e7eb'" />
        </div>

        <!-- Notion -->
        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">Notion 링크 <span style="font-size:12px; font-weight:400; color:#9ca3af;">(선택)</span></label>
          <input v-model="form.notionUrl" type="url" placeholder="https://notion.so/..." style="width:100%; height:48px; padding:0 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; outline:none; box-sizing:border-box; background:#fafafa;" @focus="e=>e.target.style.borderColor='#10b981'" @blur="e=>e.target.style.borderColor='#e5e7eb'" />
        </div>

        <!-- 시연 이미지 -->
        <div>
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">시연 이미지 <span style="font-size:12px; font-weight:400; color:#9ca3af;">(선택, 최대 5장)</span></label>
          <div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:10px;">
            <div v-for="(img, idx) in form.demoImages" :key="idx" style="position:relative; width:120px; height:90px;">
              <img :src="img" style="width:100%; height:100%; object-fit:cover; border-radius:10px;" />
              <button @click="removeDemoImage(idx)" style="position:absolute; top:4px; right:4px; background:rgba(0,0,0,0.5); color:#fff; border:none; border-radius:6px; width:20px; height:20px; font-size:11px; cursor:pointer; display:flex; align-items:center; justify-content:center;">✕</button>
            </div>
            <label v-if="form.demoImages.length < 5" style="width:120px; height:90px; border:2px dashed #a7f3d0; border-radius:10px; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; background:#f0fdf4; color:#10b981; gap:4px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span style="font-size:11px; font-weight:500;">추가</span>
              <input type="file" accept="image/*" style="display:none;" @change="onDemoImageChange" />
            </label>
          </div>
        </div>
      </div>

      <!-- 4. 경험 공유 -->
      <div style="background:#fff; border-radius:20px; padding:32px; box-shadow:0 1px 4px rgba(0,0,0,0.06); margin-bottom:32px;">
        <h2 style="font-size:16px; font-weight:700; color:#111827; margin:0 0 8px; display:flex; align-items:center; gap:8px;">
          <span style="width:28px; height:28px; background:#10b981; color:#fff; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700;">4</span>
          경험 공유
        </h2>
        <p style="font-size:13px; color:#9ca3af; margin:0 0 24px;">진솔한 경험 공유가 후배들에게 가장 큰 도움이 돼요</p>

        <!-- 힘들었던 점 -->
        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">힘들었던 점 <span style="color:#10b981;">*</span></label>
          <textarea v-model="form.hardPart" rows="4" placeholder="개발하면서 어려웠던 점, 해결 과정을 공유해주세요" style="width:100%; padding:14px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; outline:none; box-sizing:border-box; resize:vertical; line-height:1.7; background:#fafafa;" @focus="e=>e.target.style.borderColor='#10b981'" @blur="e=>e.target.style.borderColor='#e5e7eb'"></textarea>
        </div>

        <!-- 배운 점 -->
        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">배운 점 <span style="color:#10b981;">*</span></label>
          <textarea v-model="form.learned" rows="4" placeholder="이 프로젝트를 통해 배운 것들을 나눠주세요" style="width:100%; padding:14px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; outline:none; box-sizing:border-box; resize:vertical; line-height:1.7; background:#fafafa;" @focus="e=>e.target.style.borderColor='#10b981'" @blur="e=>e.target.style.borderColor='#e5e7eb'"></textarea>
        </div>

        <!-- 후배에게 한마디 -->
        <div>
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">후배에게 한마디 <span style="font-size:12px; font-weight:400; color:#9ca3af;">(선택)</span></label>
          <textarea v-model="form.messageToJunior" rows="3" placeholder="비슷한 프로젝트를 시작하려는 후배들에게 조언 한마디!" style="width:100%; padding:14px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; outline:none; box-sizing:border-box; resize:vertical; line-height:1.7; background:#fafafa;" @focus="e=>e.target.style.borderColor='#10b981'" @blur="e=>e.target.style.borderColor='#e5e7eb'"></textarea>
        </div>
      </div>

      <!-- 제출 버튼 -->
      <div style="display:flex; gap:12px; justify-content:flex-end;">
        <RouterLink :to="editId ? `/project/${editId}` : '/project/new'" style="padding:14px 28px; border-radius:12px; border:1.5px solid #e5e7eb; background:#fff; color:#374151; font-size:15px; font-weight:600; text-decoration:none; display:flex; align-items:center;">취소</RouterLink>
        <button @click="submit" style="padding:14px 36px; border-radius:12px; border:none; background:#10b981; color:#fff; font-size:15px; font-weight:700; cursor:pointer;">{{ editId ? '수정 완료' : '프로젝트 공유하기' }}</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { uploadImage } from '../utils/cloudinary.js'
import { createProject, getProject, updateProject } from '../api/project.js'

const router = useRouter()
const route = useRoute()
const editId = route.params.id

const techOptions = [
  'React', 'Next.js', 'Vue', 'Angular',
  'Spring', 'Spring Boot', 'Node.js', 'Express', 'Django', 'FastAPI',
  'Android', 'iOS', 'Flutter', 'React Native',
  'Unity', 'Unreal', 'AI/ML', 'TensorFlow', 'PyTorch',
  'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
  'Docker', 'Kubernetes', 'AWS', 'Firebase',
]

const thumbnailPreview = ref('')

const form = reactive({
  title: '',
  summary: '',
  description: '',
  techStacks: [],
  startDate: '',
  endDate: '',
  projectType: '',
  myRole: '',
  features: '',
  githubUrl: '',
  deployUrl: '',
  figmaUrl: '',
  notionUrl: '',
  thumbnailUrl: '',
  demoImages: [],
  hardPart: '',
  learned: '',
  messageToJunior: '',
  teamMembers: [{ role: '', count: 1 }],
})

onMounted(async () => {
  if (!editId) return
  try {
    const data = await getProject(editId)
    form.title = data.title ?? ''
    form.summary = data.summary ?? ''
    form.description = data.description ?? ''
    form.techStacks = [...(data.techStacks ?? [])]
    form.startDate = data.startDate ?? ''
    form.endDate = data.endDate ?? ''
    form.projectType = data.projectType ?? ''
    form.myRole = data.myRole ?? ''
    form.features = data.features ?? ''
    form.githubUrl = data.githubUrl ?? ''
    form.deployUrl = data.deployUrl ?? ''
    form.figmaUrl = data.figmaUrl ?? ''
    form.notionUrl = data.notionUrl ?? ''
    form.thumbnailUrl = data.thumbnailUrl ?? ''
    thumbnailPreview.value = data.thumbnailUrl ?? ''
    form.demoImages = [...(data.demoImages ?? [])]
    form.hardPart = data.hardPart ?? ''
    form.learned = data.learned ?? ''
    form.messageToJunior = data.messageToJunior ?? ''
    const loaded = (data.teamMembers ?? []).map(m => ({ role: m.role, count: m.count }))
    form.teamMembers = loaded.length ? loaded : [{ role: '', count: 1 }]
  } catch (e) {
    console.error('[프로젝트 불러오기 실패]', e)
  }
})

function addTeamMember() {
  form.teamMembers.push({ role: '', count: 1 })
}

function removeTeamMember(idx) {
  form.teamMembers.splice(idx, 1)
}

async function onThumbnailChange(e) {
  const file = e.target.files[0]
  if (!file) return
  try {
    const url = await uploadImage(file)
    form.thumbnailUrl = url
    thumbnailPreview.value = url
  } catch {
    alert('이미지 업로드에 실패했습니다.')
  }
}

async function onDemoImageChange(e) {
  const file = e.target.files[0]
  if (!file || form.demoImages.length >= 5) return
  try {
    const url = await uploadImage(file)
    form.demoImages.push(url)
  } catch {
    alert('이미지 업로드에 실패했습니다.')
  }
}

function removeDemoImage(idx) {
  form.demoImages.splice(idx, 1)
}

function toggleTech(tech) {
  const idx = form.techStacks.indexOf(tech)
  if (idx === -1) form.techStacks.push(tech)
  else form.techStacks.splice(idx, 1)
}

async function submit() {
  if (!form.title.trim()) return alert('프로젝트 제목을 입력해주세요')
  if (!form.summary.trim()) return alert('한 줄 소개를 입력해주세요')
  if (!form.description.trim()) return alert('프로젝트 상세 설명을 입력해주세요')
  if (form.techStacks.length === 0) return alert('기술 스택을 하나 이상 선택해주세요')
  if (!form.startDate || !form.endDate) return alert('프로젝트 기간을 입력해주세요')
  if (!form.projectType) return alert('개인/팀 여부를 선택해주세요')
  if (!form.myRole.trim()) return alert('내 역할을 입력해주세요')
  if (!form.features.trim()) return alert('주요 기능을 입력해주세요')
  if (!form.hardPart.trim()) return alert('힘들었던 점을 입력해주세요')
  if (!form.learned.trim()) return alert('배운 점을 입력해주세요')

  const payload = {
    title: form.title,
    summary: form.summary,
    description: form.description,
    techStacks: [...form.techStacks],
    status: 'COMPLETED',
    projectType: form.projectType,
    thumbnailUrl: form.thumbnailUrl || null,
    startDate: form.startDate,
    endDate: form.endDate,
    myRole: form.myRole,
    features: form.features,
    githubUrl: form.githubUrl || null,
    deployUrl: form.deployUrl || null,
    figmaUrl: form.figmaUrl || null,
    notionUrl: form.notionUrl || null,
    demoImages: [...form.demoImages],
    hardPart: form.hardPart,
    learned: form.learned,
    messageToJunior: form.messageToJunior || null,
    teamMembers: form.projectType === 'TEAM'
      ? form.teamMembers.filter(m => m.role.trim()).map(m => ({ role: m.role, count: m.count }))
      : null,
  }

  try {
    if (editId) {
      await updateProject(editId, payload)
      router.push(`/project/${editId}`)
    } else {
      await createProject(payload)
      router.push({ path: '/', state: { registered: true } })
    }
  } catch (e) {
    console.error('[완료 프로젝트 저장 실패]', e?.response?.status, e?.response?.data)
    alert('저장에 실패했습니다. 다시 시도해주세요.')
  }
}
</script>
