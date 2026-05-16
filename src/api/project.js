import api from './axios'

export const getProjects = () =>
  api.get('/api/v1/projects')

export const getProject = (id) =>
  api.get(`/api/v1/projects/${id}`)

export const createProject = (form) =>
  api.post('/api/v1/projects', form)

export const deleteProject = (id, userId) =>
  api.delete(`/api/v1/projects/${id}`, { params: { userId } })
