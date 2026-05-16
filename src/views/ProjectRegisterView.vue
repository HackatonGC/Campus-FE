<template>
  <div style="min-height:100vh; background:#f4f4fd;">

    <NavBar />

    <!-- BODY -->
    <div style="max-width:760px; margin:0 auto; padding:48px 40px 120px;">

      <!-- 타이틀 -->
      <div style="margin-bottom:32px;">
        <h1 style="font-size:28px; font-weight:800; color:#111827; margin:0 0 8px;">새 프로젝트 등록</h1>
        <p style="font-size:14px; color:#6b7280; margin:0;">프로젝트를 등록하고 함께할 팀원을 모집해보세요</p>
      </div>

      <!-- ===== 기본 정보 ===== -->
      <section style="background:#fff; border-radius:16px; border:1px solid #e5e7eb; padding:32px; margin-bottom:20px;">
        <h2 style="font-size:17px; font-weight:700; color:#111827; margin:0 0 24px;">기본 정보</h2>

        <!-- 썸네일 이미지 -->
        <div style="margin-bottom:24px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">대표 이미지</label>
          <label style="display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%; height:180px; border-radius:12px; border:2px dashed #c7d2fe; background:#f5f5ff; cursor:pointer; overflow:hidden; position:relative;">
            <img v-if="thumbnailPreview" :src="thumbnailPreview" style="width:100%; height:100%; object-fit:cover; position:absolute; inset:0;" />
            <div v-else style="display:flex; flex-direction:column; align-items:center; gap:8px; color:#818cf8;">
              <svg style="width:32px; height:32px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span style="font-size:14px; color:#6366f1; font-weight:500;">{{ thumbnailUploading ? '업로드 중...' : '클릭하여 이미지 업로드' }}</span>
              <span style="font-size:12px; color:#9ca3af;">PNG, JPG, WebP 지원</span>
            </div>
            <input type="file" accept="image/*" style="display:none;" @change="onThumbnailChange" :disabled="thumbnailUploading" />
          </label>
          <p v-if="thumbnailPreview" style="font-size:12px; color:#6366f1; margin-top:6px; cursor:pointer;" @click="thumbnailPreview=''; form.thumbnailUrl=''">✕ 이미지 제거</p>
        </div>

        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">
            프로젝트 제목 <span style="color:#6366f1;">*</span>
          </label>
          <input
            v-model="form.title"
            type="text"
            placeholder="예: 실시간 채팅 애플리케이션"
            style="width:100%; padding:12px 16px; border-radius:10px; border:1.5px solid #e5e7eb; font-size:14px; color:#111827; outline:none; box-sizing:border-box; transition:border-color 0.15s;"
            @focus="e => e.target.style.borderColor='#6366f1'"
            @blur="e => e.target.style.borderColor='#e5e7eb'"
          />
        </div>

        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">
            한 줄 소개 <span style="color:#6366f1;">*</span>
          </label>
          <input
            v-model="form.summary"
            type="text"
            placeholder="프로젝트를 간단히 소개해주세요"
            style="width:100%; padding:12px 16px; border-radius:10px; border:1.5px solid #e5e7eb; font-size:14px; color:#111827; outline:none; box-sizing:border-box; transition:border-color 0.15s;"
            @focus="e => e.target.style.borderColor='#6366f1'"
            @blur="e => e.target.style.borderColor='#e5e7eb'"
          />
        </div>

        <div>
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">
            프로젝트 상세 설명 <span style="color:#6366f1;">*</span>
          </label>
          <textarea
            v-model="form.description"
            rows="4"
            placeholder="프로젝트의 목적, 주요 기능, 기대 효과 등을 자세히 작성해주세요"
            style="width:100%; padding:12px 16px; border-radius:10px; border:1.5px solid #e5e7eb; font-size:14px; color:#111827; outline:none; box-sizing:border-box; resize:vertical; line-height:1.6; transition:border-color 0.15s;"
            @focus="e => e.target.style.borderColor='#6366f1'"
            @blur="e => e.target.style.borderColor='#e5e7eb'"
          ></textarea>
          <p style="font-size:12px; color:#9ca3af; margin:6px 0 0;">Markdown 문법을 사용할 수 있습니다</p>
        </div>
      </section>

      <!-- ===== 기술 스택 ===== -->
      <section style="background:#fff; border-radius:16px; border:1px solid #e5e7eb; padding:32px; margin-bottom:20px;">
        <h2 style="font-size:17px; font-weight:700; color:#111827; margin:0 0 20px;">
          기술 스택 <span style="color:#6366f1;">*</span>
        </h2>
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
          <button
            v-for="tech in allTechOptions"
            :key="tech"
            @click="toggleTech(tech)"
            :style="form.techStack.includes(tech)
              ? 'padding:6px 16px; border-radius:999px; font-size:13px; font-weight:500; border:1.5px solid #6366f1; background:#6366f1; color:#fff; cursor:pointer; transition:all 0.15s;'
              : 'padding:6px 16px; border-radius:999px; font-size:13px; font-weight:500; border:1.5px solid #e5e7eb; background:#fff; color:#374151; cursor:pointer; transition:all 0.15s;'"
          >
            {{ tech }}
          </button>
        </div>
      </section>

      <!-- ===== 링크 ===== -->
      <section style="background:#fff; border-radius:16px; border:1px solid #e5e7eb; padding:32px; margin-bottom:20px;">
        <h2 style="font-size:17px; font-weight:700; color:#111827; margin:0 0 24px;">링크</h2>

        <div style="margin-bottom:16px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">GitHub Repository</label>
          <div style="position:relative;">
            <svg style="position:absolute; left:14px; top:50%; transform:translateY(-50%); width:16px; height:16px; color:#9ca3af;" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            <input
              v-model="form.githubUrl"
              type="text"
              placeholder="https://github.com/username/repo"
              style="width:100%; padding:12px 16px 12px 40px; border-radius:10px; border:1.5px solid #e5e7eb; font-size:14px; color:#111827; outline:none; box-sizing:border-box; transition:border-color 0.15s;"
              @focus="e => e.target.style.borderColor='#6366f1'"
              @blur="e => e.target.style.borderColor='#e5e7eb'"
            />
          </div>
        </div>

        <div style="margin-bottom:16px;">
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">배포 링크</label>
          <div style="position:relative;">
            <svg style="position:absolute; left:14px; top:50%; transform:translateY(-50%); width:16px; height:16px; color:#9ca3af;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
            <input
              v-model="form.deployUrl"
              type="text"
              placeholder="https://demo.example.com"
              style="width:100%; padding:12px 16px 12px 40px; border-radius:10px; border:1.5px solid #e5e7eb; font-size:14px; color:#111827; outline:none; box-sizing:border-box; transition:border-color 0.15s;"
              @focus="e => e.target.style.borderColor='#6366f1'"
              @blur="e => e.target.style.borderColor='#e5e7eb'"
            />
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
          <div>
            <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">Figma 링크</label>
            <div style="position:relative;">
              <svg style="position:absolute; left:14px; top:50%; transform:translateY(-50%); width:16px; height:16px; color:#9ca3af;" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z" fill="#9ca3af"/>
                <path d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z" fill="#9ca3af"/>
                <path d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0H19Z" fill="#9ca3af"/>
                <path d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5Z" fill="#9ca3af"/>
                <path d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5Z" fill="#9ca3af"/>
              </svg>
              <input
                v-model="form.figmaUrl"
                type="text"
                placeholder="https://figma.com/..."
                style="width:100%; padding:12px 16px 12px 40px; border-radius:10px; border:1.5px solid #e5e7eb; font-size:14px; color:#111827; outline:none; box-sizing:border-box; transition:border-color 0.15s;"
                @focus="e => e.target.style.borderColor='#6366f1'"
                @blur="e => e.target.style.borderColor='#e5e7eb'"
              />
            </div>
          </div>
          <div>
            <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">Notion 링크</label>
            <div style="position:relative;">
              <svg style="position:absolute; left:14px; top:50%; transform:translateY(-50%); width:16px; height:16px; color:#9ca3af;" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.7 6.8c2.4 1.9 3.3 1.8 7.8 1.5l42.4-2.5c.9 0 .1-.9-.3-1.1L50.3.5c-.8-.6-1.9-1.3-4-.1L6.4 3.9C5.5 4.2 5.3 5.4 6.7 6.8z"/>
                <path d="M9.1 17.1V77c0 3.1 1.5 4.3 5 4.1l54.5-3.1c3.5-.2 3.9-2.3 3.9-4.9V14.4c0-2.6-1-4-3.3-3.7l-56.9 3.3C9.9 14.3 9.1 15.3 9.1 17.1zm49.6 3.4c.3 1.4 0 2.8-1.4 2.9l-2.3.4V64c-2 1-3.9 1.6-5.4.7L32 40.5v22.6l5.4 1.2s0 2.8-3.9 3.1l-10.8.6c-.3-.6 0-2.1.9-2.4l2.8-.8V25.9l-3.8-.3c-.3-1.4.4-3.4 2.4-3.5l11.6-.7 18.1 27.6V23.1l-4.5-.5c-.3-1.7.8-2.9 2.2-3l10.3-.1z"/>
                <path d="M93.2 8.6l-16.1 1.2c-1.9.2-2.6 1.3-2.6 2.7v53.7c0 1.3.5 2.1 2.1 2.1.5 0 1.5-.3 2.4-.6l16.7-9.7c1.5-.9 2.3-2.3 2.3-4.7V11.6c0-2.1-.5-3.1-4.8-3z"/>
              </svg>
              <input
                v-model="form.notionUrl"
                type="text"
                placeholder="https://notion.so/..."
                style="width:100%; padding:12px 16px 12px 40px; border-radius:10px; border:1.5px solid #e5e7eb; font-size:14px; color:#111827; outline:none; box-sizing:border-box; transition:border-color 0.15s;"
                @focus="e => e.target.style.borderColor='#6366f1'"
                @blur="e => e.target.style.borderColor='#e5e7eb'"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- ===== 프로젝트 상태 ===== -->
      <section style="background:#fff; border-radius:16px; border:1px solid #e5e7eb; padding:32px; margin-bottom:20px;">
        <h2 style="font-size:17px; font-weight:700; color:#111827; margin:0 0 20px;">
          프로젝트 상태 <span style="color:#6366f1;">*</span>
        </h2>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px;">
          <button
            v-for="s in statusOptions"
            :key="s.value"
            @click="form.status = s.value"
            :style="form.status === s.value
              ? `padding:14px; border-radius:12px; font-size:14px; font-weight:600; border:2px solid ${s.color}; background:#fff; color:${s.color}; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;`
              : 'padding:14px; border-radius:12px; font-size:14px; font-weight:500; border:1.5px solid #e5e7eb; background:#fff; color:#6b7280; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;'"
          >
            <span :style="`width:8px; height:8px; border-radius:50%; background:${s.color}; display:inline-block;`"></span>
            {{ s.label }}
          </button>
        </div>
      </section>

      <!-- ===== 팀원 모집 ===== -->
      <section style="background:#fff; border-radius:16px; border:1px solid #e5e7eb; padding:32px; margin-bottom:20px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
          <h2 style="font-size:17px; font-weight:700; color:#111827; margin:0;">팀원 모집</h2>
          <button
            @click="addRole"
            style="display:flex; align-items:center; gap:6px; font-size:13px; font-weight:600; color:#6366f1; background:none; border:none; cursor:pointer;"
          >
            <span style="font-size:16px; line-height:1;">+</span> 역할 추가
          </button>
        </div>

        <div v-for="(role, idx) in form.roles" :key="idx" style="border:1px solid #f3f4f6; border-radius:12px; padding:20px; margin-bottom:12px; position:relative;">
          <button
            v-if="form.roles.length > 1"
            @click="removeRole(idx)"
            style="position:absolute; top:14px; right:14px; background:none; border:none; cursor:pointer; color:#9ca3af; font-size:18px; line-height:1;"
          >×</button>

          <div style="display:grid; grid-template-columns:1fr auto; gap:16px; margin-bottom:12px;">
            <div>
              <label style="display:block; font-size:13px; font-weight:600; color:#6b7280; margin-bottom:6px;">역할</label>
              <input
                v-model="role.name"
                type="text"
                placeholder="Frontend"
                style="width:100%; padding:10px 14px; border-radius:8px; border:1.5px solid #e5e7eb; font-size:14px; color:#111827; outline:none; box-sizing:border-box;"
                @focus="e => e.target.style.borderColor='#6366f1'"
                @blur="e => e.target.style.borderColor='#e5e7eb'"
              />
            </div>
            <div>
              <label style="display:block; font-size:13px; font-weight:600; color:#6b7280; margin-bottom:6px;">모집 인원</label>
              <input
                v-model.number="role.count"
                type="number"
                min="1"
                placeholder="2"
                style="width:80px; padding:10px 14px; border-radius:8px; border:1.5px solid #e5e7eb; font-size:14px; color:#111827; outline:none; box-sizing:border-box;"
                @focus="e => e.target.style.borderColor='#6366f1'"
                @blur="e => e.target.style.borderColor='#e5e7eb'"
              />
            </div>
          </div>
          <div>
            <label style="display:block; font-size:13px; font-weight:600; color:#6b7280; margin-bottom:6px;">역할 설명 (선택)</label>
            <textarea
              v-model="role.description"
              rows="2"
              placeholder="필요한 기술이나 역할에 대한 설명을 작성해주세요"
              style="width:100%; padding:10px 14px; border-radius:8px; border:1.5px solid #e5e7eb; font-size:14px; color:#111827; outline:none; box-sizing:border-box; resize:none; line-height:1.5;"
              @focus="e => e.target.style.borderColor='#6366f1'"
              @blur="e => e.target.style.borderColor='#e5e7eb'"
            ></textarea>
          </div>
        </div>
      </section>

      <!-- ===== 프로젝트 상세 내용 ===== -->
      <section style="background:#fff; border-radius:16px; border:1px solid #e5e7eb; padding:32px; margin-bottom:20px;">
        <h2 style="font-size:17px; font-weight:700; color:#111827; margin:0 0 20px;">프로젝트 상세 내용</h2>

        <div>
          <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">
            본문 작성 <span style="color:#6366f1;">*</span>
          </label>
          <textarea
            v-model="form.body"
            rows="16"
            style="width:100%; padding:16px; border-radius:10px; border:1.5px solid #e5e7eb; font-size:13px; color:#374151; outline:none; box-sizing:border-box; resize:vertical; line-height:1.7; font-family:monospace; transition:border-color 0.15s;"
            @focus="e => e.target.style.borderColor='#6366f1'"
            @blur="e => e.target.style.borderColor='#e5e7eb'"
          ></textarea>
          <p style="font-size:12px; color:#9ca3af; margin:6px 0 0;">Markdown 문법을 사용하여 작성할 수 있습니다</p>
        </div>
      </section>

    </div>

    <!-- ===== 하단 고정 버튼 ===== -->
    <div style="position:fixed; bottom:0; left:0; right:0; background:#fff; border-top:1px solid #e5e7eb; z-index:40;">
      <div style="max-width:760px; margin:0 auto; padding:16px 40px; display:flex; align-items:center; justify-content:space-between;">
        <p style="font-size:12px; color:#9ca3af; margin:0;">* 표시된 항목은 필수 입력 사항입니다</p>
        <div style="display:flex; gap:12px;">
          <button
            @click="saveDraft"
            style="display:flex; align-items:center; gap:6px; padding:10px 20px; border-radius:10px; border:1.5px solid #e5e7eb; background:#fff; font-size:14px; font-weight:600; color:#374151; cursor:pointer;"
          >
            <svg style="width:16px; height:16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            임시 저장
          </button>
          <button
            @click="preview"
            style="display:flex; align-items:center; gap:6px; padding:10px 20px; border-radius:10px; border:1.5px solid #e5e7eb; background:#fff; font-size:14px; font-weight:600; color:#374151; cursor:pointer;"
          >
            <svg style="width:16px; height:16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            미리보기
          </button>
          <button
            @click="submit"
            style="display:flex; align-items:center; gap:6px; padding:10px 24px; border-radius:10px; border:none; background:#6366f1; font-size:14px; font-weight:700; color:#fff; cursor:pointer;"
          >
            <svg style="width:16px; height:16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
            프로젝트 등록
          </button>
        </div>
      </div>
    </div>

    <!-- 토스트 -->
    <transition name="toast">
      <div
        v-if="toast.show"
        style="position:fixed; top:80px; left:50%; transform:translateX(-50%); background:#1f2937; color:#fff; font-size:13px; font-weight:500; padding:12px 24px; border-radius:10px; z-index:100; white-space:nowrap;"
      >
        {{ toast.message }}
      </div>
    </transition>

    <!-- 임시저장 복원 모달 -->
    <transition name="modal">
      <div
        v-if="showDraftModal"
        style="position:fixed; inset:0; background:rgba(0,0,0,0.45); z-index:200; display:flex; align-items:center; justify-content:center;"
        @click.self="discardDraft"
      >
        <div style="background:#fff; border-radius:20px; padding:36px 32px; width:420px; max-width:90vw; box-shadow:0 20px 60px rgba(0,0,0,0.15);">
          <div style="width:48px; height:48px; background:#eef2ff; border-radius:14px; display:flex; align-items:center; justify-content:center; margin-bottom:20px;">
            <svg style="width:24px; height:24px; color:#6366f1;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
          </div>
          <h3 style="font-size:18px; font-weight:800; color:#111827; margin:0 0 8px;">임시 저장된 내용이 있어요</h3>
          <p style="font-size:14px; color:#6b7280; line-height:1.6; margin:0 0 8px;">
            {{ draftSavedAt }}에 저장된 내용이 있습니다.<br />이어서 작성하시겠어요?
          </p>
          <div style="display:flex; gap:10px; margin-top:28px;">
            <button
              @click="discardDraft"
              style="flex:1; padding:12px; border-radius:10px; border:1.5px solid #e5e7eb; background:#fff; font-size:14px; font-weight:600; color:#6b7280; cursor:pointer;"
            >
              새로 작성
            </button>
            <button
              @click="loadDraft"
              style="flex:1; padding:12px; border-radius:10px; border:none; background:#6366f1; font-size:14px; font-weight:700; color:#fff; cursor:pointer;"
            >
              불러오기
            </button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import { uploadImage } from '../utils/cloudinary.js'
import { techOptions } from '../data/dummy.js'
import { createProject, updateProject, getProject } from '../api/project.js'
import { userId } from '../store/auth.js'

const DRAFT_KEY = 'stackmate_project_draft'
const router = useRouter()
const route = useRoute()
const isEditMode = computed(() => !!route.params.id)

const allTechOptions = techOptions

const statusOptions = [
  { value: 'recruiting', label: '모집중', color: '#10b981' },
  { value: 'developing', label: '개발중', color: '#6366f1' },
  { value: 'done', label: '완료', color: '#9ca3af' },
]

const defaultBody = `## 프로젝트 소개\n프로젝트에 대해 소개해주세요.\n\n## 주요 기능\n- 기능 1\n- 기능 2\n\n## 트러블 슈팅\n어려웠던 점과 해결 과정을 공유해주세요.\n\n코드 블록 예시:\n\`\`\`javascript\nconst example = 'Hello World';\n\`\`\``

const form = reactive({
  title: '',
  summary: '',
  description: '',
  techStack: [],
  githubUrl: '',
  deployUrl: '',
  figmaUrl: '',
  notionUrl: '',
  status: 'recruiting',
  roles: [{ name: '', count: 1, description: '' }],
  body: defaultBody,
  thumbnailUrl: '',
})

const thumbnailUploading = ref(false)
const thumbnailPreview = ref('')

async function onThumbnailChange(e) {
  const file = e.target.files[0]
  if (!file) return
  thumbnailUploading.value = true
  try {
    const url = await uploadImage(file)
    form.thumbnailUrl = url
    thumbnailPreview.value = url
    showToast('이미지가 업로드됐습니다!')
  } catch {
    showToast('이미지 업로드에 실패했습니다')
  } finally {
    thumbnailUploading.value = false
  }
}

const toast = reactive({ show: false, message: '' })
const showDraftModal = ref(false)
const draftSavedAt = ref('')

const statusReverseMap = { RECRUITING: 'recruiting', DEVELOPING: 'developing', COMPLETED: 'done' }

onMounted(async () => {
  // 수정 모드 → 기존 데이터 로드
  if (isEditMode.value) {
    try {
      const data = await getProject(route.params.id)
      form.title = data.title ?? ''
      form.summary = data.summary ?? ''
      form.body = data.description ?? ''
      form.techStack = [...(data.techStacks ?? [])]
      form.githubUrl = data.githubUrl ?? ''
      form.deployUrl = data.deployUrl ?? ''
      form.figmaUrl = data.figmaUrl ?? ''
      form.notionUrl = data.notionUrl ?? ''
      form.status = statusReverseMap[data.status] ?? 'recruiting'
      form.thumbnailUrl = data.thumbnailUrl ?? ''
      thumbnailPreview.value = data.thumbnailUrl ?? ''
      form.roles = (data.recruitments ?? []).map(r => ({ name: r.role, count: r.count, description: r.description ?? '' }))
      if (form.roles.length === 0) form.roles = [{ name: '', count: 1, description: '' }]
    } catch {
      showToast('프로젝트 정보를 불러오지 못했습니다.')
    }
    return
  }

  // 미리보기에서 돌아온 경우 → 모달 없이 바로 복원
  if (history.state?.fromPreview) {
    history.replaceState({}, '')
    const raw = localStorage.getItem('stackmate_project_preview')
    if (raw) {
      try {
        const d = JSON.parse(raw)
        applyFormData(d)
      } catch {}
    }
    return
  }

  // 일반 진입 → 임시저장본 있으면 모달 표시
  const raw = localStorage.getItem(DRAFT_KEY)
  if (!raw) return
  try {
    const saved = JSON.parse(raw)
    if (saved?.data && saved?.savedAt) {
      draftSavedAt.value = saved.savedAt
      showDraftModal.value = true
    }
  } catch {}
})

function applyFormData(d) {
  form.title = d.title ?? ''
  form.summary = d.summary ?? ''
  form.description = d.description ?? ''
  form.techStack = d.techStack ?? []
  form.githubUrl = d.githubUrl ?? ''
  form.deployUrl = d.deployUrl ?? ''
  form.figmaUrl = d.figmaUrl ?? ''
  form.notionUrl = d.notionUrl ?? ''
  form.status = d.status ?? 'recruiting'
  form.roles = d.roles ?? [{ name: '', count: 1, description: '' }]
  form.body = d.body ?? defaultBody
}

function loadDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT_KEY))
    applyFormData(saved.data)
    showToast('임시 저장된 내용을 불러왔습니다')
  } catch {
    showToast('불러오기 실패. 새로 작성합니다')
  }
  showDraftModal.value = false
}

function discardDraft() {
  localStorage.removeItem(DRAFT_KEY)
  showDraftModal.value = false
}

function showToast(msg) {
  toast.message = msg
  toast.show = true
  setTimeout(() => { toast.show = false }, 2500)
}

function toggleTech(tech) {
  const idx = form.techStack.indexOf(tech)
  if (idx === -1) form.techStack.push(tech)
  else form.techStack.splice(idx, 1)
}

function addRole() {
  form.roles.push({ name: '', count: 1, description: '' })
}

function removeRole(idx) {
  form.roles.splice(idx, 1)
}

function saveDraft() {
  const now = new Date()
  const savedAt = `${now.getMonth() + 1}/${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  localStorage.setItem(DRAFT_KEY, JSON.stringify({ savedAt, data: { ...form, techStack: [...form.techStack], roles: form.roles.map(r => ({ ...r })) } }))
  showToast('임시 저장되었습니다')
}

function preview() {
  localStorage.setItem('stackmate_project_preview', JSON.stringify({
    ...form,
    techStack: [...form.techStack],
    roles: form.roles.map(r => ({ ...r })),
  }))
  router.push('/project/preview')
}

async function submit() {
  if (!form.title.trim()) return showToast('프로젝트 제목을 입력해주세요')
  if (!form.summary.trim()) return showToast('한 줄 소개를 입력해주세요')
  if (!isEditMode.value && !form.description.trim()) return showToast('프로젝트 상세 설명을 입력해주세요')
  if (form.techStack.length === 0) return showToast('기술 스택을 하나 이상 선택해주세요')
  if (!form.body.trim()) return showToast('프로젝트 상세 내용을 입력해주세요')

  try {
    const statusMap = { recruiting: 'RECRUITING', developing: 'DEVELOPING', done: 'COMPLETED' }
    const payload = {
      userId: Number(userId.value),
      title: form.title,
      summary: form.summary,
      description: form.body,
      techStacks: [...form.techStack],
      status: statusMap[form.status] ?? 'RECRUITING',
      projectType: form.roles.length > 0 ? 'TEAM' : 'INDIVIDUAL',
      thumbnailUrl: form.thumbnailUrl || null,
      githubUrl: form.githubUrl || null,
      deployUrl: form.deployUrl || null,
      figmaUrl: form.figmaUrl || null,
      notionUrl: form.notionUrl || null,
      recruitments: form.roles
        .filter(r => r.name.trim())
        .map(r => ({ role: r.name, count: r.count, description: r.description || null })),
    }
    if (isEditMode.value) {
      await updateProject(route.params.id, payload)
      router.push(`/project/${route.params.id}`)
    } else {
      await createProject(payload)
      localStorage.removeItem(DRAFT_KEY)
      router.push({ path: '/', state: { registered: true } })
    }
  } catch (e) {
    console.error('[등록 실패]', e.response?.status, e.response?.data)
    showToast('등록에 실패했습니다. 다시 시도해주세요.')
  }
}
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: opacity 0.2s, transform 0.2s; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(-8px); }
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active > div, .modal-leave-active > div { transition: transform 0.2s; }
.modal-enter-from > div, .modal-leave-to > div { transform: scale(0.95) translateY(8px); }
</style>
