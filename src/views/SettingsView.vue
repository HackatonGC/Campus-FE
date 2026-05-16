<template>
  <div style="min-height:100vh; background:#f4f4fd;">

    <NavBar />

    <div style="max-width:760px; margin:0 auto; padding:32px 40px;">

      <!-- 헤더 -->
      <div style="margin-bottom:28px;">
        <h1 style="font-size:24px; font-weight:700; color:#111827; margin:0 0 6px;">{{ mode === 'security' ? '계정 설정' : '프로필 수정' }}</h1>
        <p style="font-size:14px; color:#9ca3af; margin:0;">{{ mode === 'security' ? '보안 및 계정 설정을 관리하세요' : '개인정보와 포트폴리오를 관리하세요' }}</p>
      </div>

      <div style="display:flex; flex-direction:column; gap:20px;">

        <!-- ====== 프로필 수정 모드 ====== -->
        <template v-if="mode === 'profile'">

          <!-- 개인정보 -->
          <div style="background:#fff; border-radius:16px; padding:32px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:24px;">
              <div>
                <h2 style="font-size:18px; font-weight:700; color:#111827; margin:0 0 4px;">개인정보</h2>
                <p style="font-size:13px; color:#9ca3af; margin:0;">기본 프로필 정보를 확인하세요</p>
              </div>
              <button v-if="!profileEditing" @click="startProfileEdit"
                style="background:#6366f1; color:#fff; border:none; cursor:pointer; padding:8px 20px; border-radius:10px; font-size:14px; font-weight:600;">
                수정하기
              </button>
            </div>

            <!-- 아바타 + 이름 -->
            <div style="display:flex; align-items:center; gap:20px; margin-bottom:24px; padding-bottom:24px; border-bottom:1px solid #f3f4f6;">
              <div style="width:72px; height:72px; border-radius:50%; background:#f3f4f6; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="14" r="7" fill="#d1d5db"/><path d="M4 32c0-7.7 6.3-14 14-14s14 6.3 14 14" fill="#d1d5db"/></svg>
              </div>
              <div>
                <div style="font-size:18px; font-weight:700; color:#111827; margin-bottom:2px;">{{ user.name }}</div>
                <div style="font-size:13px; color:#9ca3af;">{{ user.school }} · {{ user.department }}</div>
              </div>
            </div>

            <!-- 이름 -->
            <div style="margin-bottom:16px;">
              <div style="font-size:13px; color:#9ca3af; margin-bottom:6px;">이름</div>
              <input v-if="profileEditing" v-model="editName"
                style="width:100%; height:44px; padding:0 14px; background:#fff; border:1.5px solid #6366f1; border-radius:10px; font-size:14px; color:#111827; outline:none; box-sizing:border-box;" />
              <div v-else style="height:44px; padding:0 14px; background:#f9fafb; border-radius:10px; display:flex; align-items:center; font-size:14px; color:#111827;">{{ user.name }}</div>
            </div>

            <!-- 학교 / 학과 -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
              <div>
                <div style="font-size:13px; color:#9ca3af; margin-bottom:6px;">학교</div>
                <input v-if="profileEditing" v-model="editSchool"
                  style="width:100%; height:44px; padding:0 14px; background:#fff; border:1.5px solid #6366f1; border-radius:10px; font-size:14px; color:#111827; outline:none; box-sizing:border-box;" />
                <div v-else style="height:44px; padding:0 14px; background:#f9fafb; border-radius:10px; display:flex; align-items:center; font-size:14px; color:#111827;">{{ user.school }}</div>
              </div>
              <div>
                <div style="font-size:13px; color:#9ca3af; margin-bottom:6px;">학과</div>
                <input v-if="profileEditing" v-model="editDepartment"
                  style="width:100%; height:44px; padding:0 14px; background:#fff; border:1.5px solid #6366f1; border-radius:10px; font-size:14px; color:#111827; outline:none; box-sizing:border-box;" />
                <div v-else style="height:44px; padding:0 14px; background:#f9fafb; border-radius:10px; display:flex; align-items:center; font-size:14px; color:#111827;">{{ user.department }}</div>
              </div>
            </div>

            <!-- 이메일 -->
            <div style="margin-bottom:16px;">
              <div style="font-size:13px; color:#9ca3af; margin-bottom:6px;">이메일</div>
              <div style="height:44px; padding:0 14px; background:#f9fafb; border-radius:10px; display:flex; align-items:center; justify-content:space-between;">
                <span style="font-size:14px; color:#111827;">{{ user.email }}</span>
                <span style="font-size:12px; background:#10b981; color:#fff; padding:4px 12px; border-radius:999px; font-weight:600; display:flex; align-items:center; gap:4px; flex-shrink:0;">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5 2 6" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  인증됨
                </span>
              </div>
            </div>

            <!-- 가입일 -->
            <div style="margin-bottom:24px;">
              <div style="font-size:13px; color:#9ca3af; margin-bottom:6px;">가입일</div>
              <div style="height:44px; padding:0 14px; background:#f9fafb; border-radius:10px; display:flex; align-items:center; font-size:14px; color:#111827;">{{ formatDate(user.createdAt) }}</div>
            </div>

            <!-- 저장/취소 버튼 -->
            <div v-if="profileEditing" style="display:flex; align-items:center; gap:12px; justify-content:flex-end;">
              <span v-if="profileEditMsg" :style="`font-size:13px; color:${profileEditMsg.includes('실패') ? '#ef4444' : '#10b981'};`">{{ profileEditMsg }}</span>
              <button @click="profileEditing = false" style="padding:10px 24px; border-radius:10px; border:1.5px solid #e5e7eb; background:#fff; color:#374151; font-size:14px; font-weight:600; cursor:pointer;">취소</button>
              <button @click="saveBasicProfile" style="padding:10px 24px; border-radius:10px; border:none; background:#6366f1; color:#fff; font-size:14px; font-weight:600; cursor:pointer;">저장</button>
            </div>
          </div>

          <!-- 포트폴리오 -->
          <div style="background:#fff; border-radius:16px; padding:32px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
            <div style="margin-bottom:28px;">
              <h2 style="font-size:18px; font-weight:700; color:#111827; margin:0 0 4px;">포트폴리오</h2>
              <p style="font-size:13px; color:#9ca3af; margin:0;">자기소개와 포트폴리오 정보를 관리하세요</p>
            </div>

            <!-- 자기소개 -->
            <div style="margin-bottom:22px;">
              <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">자기소개</label>
              <textarea v-model="editBio" placeholder="간단한 자기소개를 작성해보세요 (최대 200자)" maxlength="200" rows="4"
                style="width:100%; padding:12px 14px; border:1.5px solid #e5e7eb; border-radius:12px; font-size:14px; color:#111827; background:#f9fafb; resize:none; outline:none; box-sizing:border-box; line-height:1.6;"></textarea>
              <div style="text-align:right; font-size:12px; color:#9ca3af; margin-top:4px;">{{ editBio.length }}/200</div>
            </div>

            <!-- 관심 기술 스택 -->
            <div style="margin-bottom:22px;">
              <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">관심 기술 스택 <span style="color:#9ca3af; font-weight:400;">(최대 5개)</span></label>
              <div style="display:flex; flex-wrap:wrap; gap:8px; padding:12px; border:1.5px solid #e5e7eb; border-radius:12px; background:#f9fafb;">
                <button v-for="tag in techOptions" :key="tag" type="button" @click="toggleEditTech(tag)"
                  :style="editSelectedTech.includes(tag)
                    ? 'padding:4px 12px; border-radius:999px; font-size:13px; border:1.5px solid #6366f1; background:#ede9fe; color:#6366f1; cursor:pointer;'
                    : 'padding:4px 12px; border-radius:999px; font-size:13px; border:1.5px solid #e5e7eb; background:#fff; color:#6b7280; cursor:pointer;'"
                >{{ tag }}</button>
              </div>
            </div>

            <!-- GitHub -->
            <div style="margin-bottom:16px;">
              <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">GitHub</label>
              <div style="display:flex; align-items:center; border:1.5px solid #e5e7eb; border-radius:12px; background:#f9fafb; overflow:hidden;">
                <span style="padding:0 14px; font-size:13px; color:#9ca3af; border-right:1px solid #e5e7eb; height:44px; display:flex; align-items:center; background:#f3f4f6; white-space:nowrap;">github.com/</span>
                <input v-model="editGithub" type="text" placeholder="username" style="flex:1; height:44px; padding:0 14px; border:none; background:transparent; font-size:14px; color:#111827; outline:none;" />
              </div>
            </div>

            <!-- 블로그 -->
            <div style="margin-bottom:16px;">
              <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">블로그</label>
              <input v-model="editBlog" type="url" placeholder="https://blog.example.com"
                style="width:100%; height:44px; padding:0 14px; border:1.5px solid #e5e7eb; border-radius:12px; background:#f9fafb; font-size:14px; color:#111827; outline:none; box-sizing:border-box;" />
            </div>

            <!-- 포트폴리오 URL -->
            <div style="margin-bottom:32px;">
              <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">포트폴리오</label>
              <input v-model="editPortfolio" type="url" placeholder="https://portfolio.example.com"
                style="width:100%; height:44px; padding:0 14px; border:1.5px solid #e5e7eb; border-radius:12px; background:#f9fafb; font-size:14px; color:#111827; outline:none; box-sizing:border-box;" />
            </div>

            <!-- 저장 버튼 -->
            <div style="display:flex; align-items:center; gap:12px; justify-content:flex-end;">
              <span v-if="editMsg" :style="`font-size:13px; color:${editMsg.includes('실패') ? '#ef4444' : '#10b981'};`">{{ editMsg }}</span>
              <button @click="saveProfile" style="padding:10px 24px; border-radius:10px; border:none; background:#6366f1; color:#fff; font-size:14px; font-weight:600; cursor:pointer;">저장</button>
            </div>
          </div>

        </template>

        <!-- ====== 계정 설정 모드 ====== -->
        <template v-else>

          <!-- 비밀번호 변경 -->
          <div style="background:#fff; border-radius:16px; padding:32px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
            <div style="margin-bottom:24px;">
              <h2 style="font-size:18px; font-weight:700; color:#111827; margin:0 0 4px;">비밀번호 변경</h2>
              <p style="font-size:13px; color:#9ca3af; margin:0;">계정 보안을 위해 주기적으로 비밀번호를 변경해주세요</p>
            </div>
            <div style="display:flex; flex-direction:column; gap:16px;">
              <div>
                <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">현재 비밀번호</label>
                <input v-model="currentPw" type="password" placeholder="현재 비밀번호를 입력하세요"
                  style="width:100%; height:44px; padding:0 14px; border:1.5px solid #e5e7eb; border-radius:12px; background:#f9fafb; font-size:14px; color:#111827; outline:none; box-sizing:border-box;" />
              </div>
              <div>
                <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">새 비밀번호</label>
                <input v-model="newPw" type="password" placeholder="8자 이상 입력하세요"
                  style="width:100%; height:44px; padding:0 14px; border:1.5px solid #e5e7eb; border-radius:12px; background:#f9fafb; font-size:14px; color:#111827; outline:none; box-sizing:border-box;" />
              </div>
              <div>
                <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">새 비밀번호 확인</label>
                <input v-model="confirmPw" type="password" placeholder="새 비밀번호를 다시 입력하세요"
                  style="width:100%; height:44px; padding:0 14px; border:1.5px solid #e5e7eb; border-radius:12px; background:#f9fafb; font-size:14px; color:#111827; outline:none; box-sizing:border-box;" />
              </div>
            </div>
            <div style="margin-top:24px; display:flex; align-items:center; gap:12px; justify-content:flex-end;">
              <span v-if="pwMsg" :style="`font-size:13px; color:${pwMsg.includes('변경되었') ? '#10b981' : '#ef4444'};`">{{ pwMsg }}</span>
              <button @click="handleChangePassword" style="padding:10px 24px; border-radius:10px; border:none; background:#6366f1; color:#fff; font-size:14px; font-weight:600; cursor:pointer;">비밀번호 변경</button>
            </div>
          </div>

          <!-- 이메일 인증 -->
          <div style="background:#fff; border-radius:16px; padding:32px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
            <div style="margin-bottom:20px;">
              <h2 style="font-size:18px; font-weight:700; color:#111827; margin:0 0 4px;">이메일 인증</h2>
              <p style="font-size:13px; color:#9ca3af; margin:0;">이메일 인증 상태를 확인하세요</p>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:16px; background:#f9fafb; border-radius:12px; border:1.5px solid #f3f4f6;">
              <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:40px; height:40px; border-radius:10px; background:#d1fae5; display:flex; align-items:center; justify-content:center;">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M17.5 13.333c0 .442-.176.866-.488 1.179-.313.312-.737.488-1.179.488H4.167l-2.5 2.5V5.833c0-.441.176-.865.488-1.178.313-.313.737-.489 1.179-.489h11.666c.442 0 .866.176 1.179.489.312.313.488.737.488 1.178v7.5z" stroke="#059669" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <div>
                  <div style="font-size:14px; font-weight:600; color:#111827;">{{ user.email }}</div>
                  <div style="font-size:12px; color:#10b981; margin-top:2px;">인증된 이메일</div>
                </div>
              </div>
              <span style="font-size:12px; background:#d1fae5; color:#10b981; padding:4px 12px; border-radius:999px; font-weight:600;">인증됨</span>
            </div>
          </div>

          <!-- 공개 범위 -->
          <div style="background:#fff; border-radius:16px; padding:32px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
            <div style="margin-bottom:28px;">
              <h2 style="font-size:18px; font-weight:700; color:#111827; margin:0 0 4px;">공개 범위</h2>
              <p style="font-size:13px; color:#9ca3af; margin:0;">내 정보의 공개 여부를 설정하세요</p>
            </div>
            <div style="display:flex; flex-direction:column; gap:0;">
              <div v-for="(item, i) in privacyItems" :key="i"
                :style="i < privacyItems.length - 1
                  ? 'display:flex; align-items:center; justify-content:space-between; padding:20px 0; border-bottom:1px solid #f3f4f6;'
                  : 'display:flex; align-items:center; justify-content:space-between; padding:20px 0;'"
              >
                <div>
                  <div style="font-size:15px; font-weight:600; color:#111827; margin-bottom:4px;">{{ item.title }}</div>
                  <div style="font-size:13px; color:#9ca3af;">{{ item.desc }}</div>
                </div>
                <button @click="togglePrivacy(item)"
                  :style="item.enabled
                    ? 'width:48px; height:28px; border-radius:999px; background:#6366f1; border:none; cursor:pointer; position:relative; transition:background 0.2s; flex-shrink:0;'
                    : 'width:48px; height:28px; border-radius:999px; background:#e5e7eb; border:none; cursor:pointer; position:relative; transition:background 0.2s; flex-shrink:0;'"
                >
                  <span :style="item.enabled
                    ? 'position:absolute; top:4px; right:4px; width:20px; height:20px; border-radius:50%; background:#fff; box-shadow:0 1px 3px rgba(0,0,0,0.2);'
                    : 'position:absolute; top:4px; left:4px; width:20px; height:20px; border-radius:50%; background:#fff; box-shadow:0 1px 3px rgba(0,0,0,0.2);'"
                  ></span>
                </button>
              </div>
            </div>
          </div>

          <!-- 회원 탈퇴 -->
          <div style="background:#fff; border-radius:16px; padding:32px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
            <div style="margin-bottom:24px;">
              <h2 style="font-size:18px; font-weight:700; color:#111827; margin:0 0 4px;">회원 탈퇴</h2>
              <p style="font-size:13px; color:#9ca3af; margin:0;">계정을 영구적으로 삭제합니다</p>
            </div>
            <div style="background:#fef2f2; border:1.5px solid #fecaca; border-radius:14px; padding:20px; margin-bottom:28px;">
              <div style="display:flex; align-items:center; gap:10px; margin-bottom:14px;">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8.575 3.258L1.517 15.25c-.18.31-.175.695.01 1 .187.307.52.495.88.5h14.12c.36-.005.695-.193.88-.5.184-.305.188-.69.007-1L10.358 3.258a1.038 1.038 0 0 0-1.783 0zM10 7.5v3.333M10 13.333h.008" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span style="font-size:14px; font-weight:700; color:#dc2626;">탈퇴 전 꼭 확인하세요</span>
              </div>
              <ul style="margin:0; padding:0 0 0 4px; list-style:none; display:flex; flex-direction:column; gap:8px;">
                <li style="display:flex; align-items:flex-start; gap:8px; font-size:13px; color:#dc2626;"><span style="margin-top:2px; flex-shrink:0;">•</span>모든 프로젝트와 데이터가 영구적으로 삭제됩니다</li>
                <li style="display:flex; align-items:flex-start; gap:8px; font-size:13px; color:#dc2626;"><span style="margin-top:2px; flex-shrink:0;">•</span>작성한 댓글과 활동 기록이 삭제됩니다</li>
                <li style="display:flex; align-items:flex-start; gap:8px; font-size:13px; color:#dc2626;"><span style="margin-top:2px; flex-shrink:0;">•</span>팀원 모집 정보가 사라집니다</li>
                <li style="display:flex; align-items:flex-start; gap:8px; font-size:13px; color:#dc2626;"><span style="margin-top:2px; flex-shrink:0;">•</span>복구가 불가능합니다</li>
              </ul>
            </div>
            <div style="margin-bottom:28px;">
              <label style="display:block; font-size:14px; font-weight:600; color:#374151; margin-bottom:8px;">
                확인을 위해 <span style="color:#6366f1;">"모든 내용을 확인하였습니다"</span> 를 입력하세요
              </label>
              <input v-model="deleteConfirm" type="text" placeholder="모든 내용을 확인하였습니다"
                style="width:100%; height:44px; padding:0 14px; border:1.5px solid #e5e7eb; border-radius:12px; background:#f9fafb; font-size:14px; color:#111827; outline:none; box-sizing:border-box;" />
            </div>
            <button @click="handleDeleteAccount"
              :disabled="deleteConfirm !== '모든 내용을 확인하였습니다'"
              :style="deleteConfirm === '모든 내용을 확인하였습니다'
                ? 'width:100%; padding:13px; border-radius:12px; border:none; background:#ef4444; color:#fff; font-size:15px; font-weight:700; cursor:pointer;'
                : 'width:100%; padding:13px; border-radius:12px; border:none; background:#fca5a5; color:#fff; font-size:15px; font-weight:700; cursor:not-allowed; opacity:0.7;'"
            >계정 영구 삭제</button>
          </div>

        </template>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import { techOptions } from '../data/dummy.js'
import { getUser, updateUser, getPortfolio, updatePortfolio, changePassword, updatePrivacy, deleteUser } from '../api/user.js'
import { userId, clearAuth } from '../store/auth.js'

const router = useRouter()
const route = useRoute()
const mode = computed(() => route.query.tab === 'security' ? 'security' : 'profile')
const user = ref({})

onMounted(async () => {
  if (!userId.value) return
  try {
    user.value = await getUser(userId.value)
    console.log('[getUser] techStacks:', user.value.techStacks)
    privacyItems[0].enabled = user.value.isProjectPublic ?? true
    privacyItems[1].enabled = user.value.isProfilePublic ?? true
    privacyItems[2].enabled = user.value.isActivityPublic ?? false
  } catch {}
  try {
    const portfolio = await getPortfolio(userId.value)
    console.log('[getPortfolio] techStacks:', portfolio.techStacks)
    editBio.value = portfolio.bio ?? ''
    const normalize = s => s.toLowerCase().replace(/[^a-z0-9]/g, '')
    const rawTechs = portfolio.techStacks?.length ? portfolio.techStacks : (user.value.techStacks ?? [])
    editSelectedTech.value = rawTechs.map(
      stored => techOptions.find(opt => normalize(opt) === normalize(stored)) ?? stored
    )
    console.log('[editSelectedTech]', editSelectedTech.value)
    editGithub.value = portfolio.githubUrl?.replace('https://github.com/', '') ?? ''
    editBlog.value = portfolio.blogUrl ?? ''
    editPortfolio.value = portfolio.portfolioUrl ?? ''
    user.value = { ...user.value, ...portfolio }
  } catch {}
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
}

// 개인정보 인라인 편집
const profileEditing = ref(false)
const editName = ref('')
const editSchool = ref('')
const editDepartment = ref('')
const profileEditMsg = ref('')

function startProfileEdit() {
  editName.value = user.value.name ?? ''
  editSchool.value = user.value.school ?? ''
  editDepartment.value = user.value.department ?? ''
  profileEditing.value = true
}

async function saveBasicProfile() {
  profileEditMsg.value = ''
  try {
    const updated = await updateUser(userId.value, {
      name: editName.value,
      school: editSchool.value,
      department: editDepartment.value,
    })
    user.value = { ...user.value, ...updated }
    localStorage.setItem('userName', editName.value)
    localStorage.setItem('userSchool', editSchool.value)
    localStorage.setItem('userDepartment', editDepartment.value)
    profileEditing.value = false
  } catch {
    profileEditMsg.value = '저장에 실패했습니다.'
  }
}

// 포트폴리오 수정
const editBio = ref('')
const editSelectedTech = ref([])
const editGithub = ref('')
const editBlog = ref('')
const editPortfolio = ref('')
const editMsg = ref('')

function toggleEditTech(tag) {
  if (editSelectedTech.value.includes(tag)) {
    editSelectedTech.value = editSelectedTech.value.filter(t => t !== tag)
  } else if (editSelectedTech.value.length < 5) {
    editSelectedTech.value.push(tag)
  }
}

async function saveProfile() {
  editMsg.value = ''
  try {
    const updated = await updatePortfolio(userId.value, {
      bio: editBio.value,
      githubUrl: editGithub.value ? `https://github.com/${editGithub.value}` : '',
      blogUrl: editBlog.value,
      portfolioUrl: editPortfolio.value,
      techStacks: editSelectedTech.value,
    })
    user.value = { ...user.value, ...updated }
    editMsg.value = '저장되었습니다.'
    setTimeout(() => { editMsg.value = '' }, 1500)
  } catch (e) {
    console.error('[포트폴리오 저장 실패]', e?.response?.status, e?.response?.data)
    editMsg.value = '저장에 실패했습니다.'
  }
}

// 계정 보안
const currentPw = ref('')
const newPw = ref('')
const confirmPw = ref('')
const pwMsg = ref('')

async function handleChangePassword() {
  pwMsg.value = ''
  if (newPw.value !== confirmPw.value) { pwMsg.value = '새 비밀번호가 일치하지 않아요.'; return }
  try {
    await changePassword(userId.value, {
      currentPassword: currentPw.value,
      newPassword: newPw.value,
      confirmPassword: confirmPw.value,
    })
    currentPw.value = ''; newPw.value = ''; confirmPw.value = ''
    pwMsg.value = '비밀번호가 변경되었습니다.'
    setTimeout(() => { pwMsg.value = '' }, 2000)
  } catch (e) {
    pwMsg.value = e?.response?.status === 400 ? '현재 비밀번호가 올바르지 않아요.' : '변경에 실패했습니다.'
  }
}

// 공개 범위
const privacyItems = reactive([
  { title: '프로젝트 공개', desc: '내가 등록한 프로젝트를 다른 사용자가 볼 수 있어요', enabled: true },
  { title: '프로필 공개', desc: '내 프로필 정보를 다른 사용자가 볼 수 있어요', enabled: true },
  { title: '활동 기록 공개', desc: '댓글, 리뷰, 팀 지원 등 활동 내역을 공개해요', enabled: false },
])

async function togglePrivacy(item) {
  item.enabled = !item.enabled
  try {
    await updatePrivacy(userId.value, {
      isProjectPublic: privacyItems[0].enabled,
      isProfilePublic: privacyItems[1].enabled,
      isActivityPublic: privacyItems[2].enabled,
    })
  } catch {
    item.enabled = !item.enabled
  }
}

// 회원 탈퇴
const deleteConfirm = ref('')

async function handleDeleteAccount() {
  try {
    await deleteUser(userId.value)
    clearAuth()
    router.push('/login')
  } catch {}
}
</script>
