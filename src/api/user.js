import api from './axios'

export const login = (email, password) =>
  api.post('/api/v1/users/login', { email, password })

export const signup = (form) =>
  api.post('/api/v1/users/signup', form)

export const logout = () =>
  api.post('/api/v1/users/logout')

export const deleteUser = (id, requesterId) =>
  api.delete(`/api/v1/users/${id}`, { params: { requesterId } })
