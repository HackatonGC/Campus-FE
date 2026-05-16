import api from './axios'

export const getProjects = (params = {}) =>
  api.get('/api/v1/projects', { params })

export const getPopularTags = (limit) =>
  api.get('/api/v1/projects/popular-tags', { params: limit ? { limit } : {} })

export const getProject = (id) =>
  api.get(`/api/v1/projects/${id}`)

export const createProject = (form) =>
  api.post('/api/v1/projects', form)

export const deleteProject = (id, userId) =>
  api.delete(`/api/v1/projects/${id}`, { params: { userId } })

export const getComments = (projectId) =>
  api.get(`/api/v1/projects/${projectId}/comments`)

export const createComment = (projectId, body) =>
  api.post(`/api/v1/projects/${projectId}/comments`, body)

export const deleteComment = (projectId, commentId) =>
  api.delete(`/api/v1/projects/${projectId}/comments/${commentId}`)

export const toggleCommentLike = (projectId, commentId) =>
  api.post(`/api/v1/projects/${projectId}/comments/${commentId}/likes`)

// 북마크
export const addBookmark = (projectId) =>
  api.post(`/api/v1/projects/${projectId}/bookmarks`)

export const removeBookmark = (projectId) =>
  api.delete(`/api/v1/projects/${projectId}/bookmarks`)

export const getMyBookmarks = () =>
  api.get('/api/v1/users/me/bookmarks')

// 좋아요
export const addLike = (projectId) =>
  api.post(`/api/v1/projects/${projectId}/likes`)

export const removeLike = (projectId) =>
  api.delete(`/api/v1/projects/${projectId}/likes`)

export const getMyLikes = () =>
  api.get('/api/v1/users/me/likes')

// 팀원 신청
export const applyToProject = (projectId, body) =>
  api.post(`/api/v1/projects/${projectId}/applications`, body)

export const updateApplicationStatus = (projectId, applicationId, status) =>
  api.patch(`/api/v1/projects/${projectId}/applications/${applicationId}/status`, { status })

export const cancelApplication = (projectId, applicationId) =>
  api.delete(`/api/v1/projects/${projectId}/applications/${applicationId}`)

export const getProjectApplications = (projectId) =>
  api.get(`/api/v1/projects/${projectId}/applications`)

export const getMyApplications = () =>
  api.get('/api/v1/applications/my')

// 코드 리뷰
export const createReview = (projectId, body) =>
  api.post(`/api/v1/projects/${projectId}/reviews`, body)

export const getProjectReviews = (projectId) =>
  api.get(`/api/v1/projects/${projectId}/reviews`)

export const getMyReviews = () =>
  api.get('/api/v1/reviews/my')
