import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: params => {
    const sp = new URLSearchParams()
    for (const [k, v] of Object.entries(params)) {
      if (Array.isArray(v)) v.forEach(item => sp.append(k, item))
      else if (v !== undefined && v !== null && v !== '') sp.append(k, String(v))
    }
    return sp.toString()
  },
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
