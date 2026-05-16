import api from './axios'

export const sendVerificationCode = (email) =>
  api.post('/api/v1/auth/email/send', { email })

export const verifyCode = (email, code) =>
  api.post('/api/v1/auth/email/verify', { email, code })

export const login = (email, password) =>
  api.post('/api/v1/users/login', { email, password })

export const signup = (form) =>
  api.post('/api/v1/users/signup', form)

export const logout = () =>
  api.post('/api/v1/users/logout')

export const getUser = (id) =>
  api.get(`/api/v1/users/${id}`)

export const updateUser = (id, body) =>
  api.put(`/api/v1/users/${id}`, body)

export const getPortfolio = (id) =>
  api.get(`/api/v1/users/${id}/portfolio`)

export const updatePortfolio = (id, body) =>
  api.put(`/api/v1/users/${id}/portfolio`, body)

export const changePassword = (id, body) =>
  api.patch(`/api/v1/users/${id}/password`, body)

export const updatePrivacy = (id, body) =>
  api.put(`/api/v1/users/${id}/privacy`, body)

export const deleteUser = (id) =>
  api.delete(`/api/v1/users/${id}`)
