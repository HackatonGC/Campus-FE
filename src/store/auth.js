import { ref, computed } from 'vue'

const token = ref(localStorage.getItem('token') ?? '')
const userId = ref(localStorage.getItem('userId') ?? '')

export const isLoggedIn = computed(() => !!token.value)

export function setAuth(t, id) {
  token.value = t
  userId.value = String(id ?? '')
  localStorage.setItem('token', t)
  if (id) localStorage.setItem('userId', String(id))
}

export function clearAuth() {
  token.value = ''
  userId.value = ''
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
}

export { token, userId }
