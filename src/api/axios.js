import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// 요청 인터셉터 — 토큰 자동 첨부
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 응답 인터셉터 — data 필드 자동 언랩
api.interceptors.response.use(
  res => res.data.data ?? res.data,
  err => Promise.reject(err)
)

export default api
