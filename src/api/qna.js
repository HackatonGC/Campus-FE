import api from './axios'

export const getQnas = (params = {}) =>
  api.get('/api/v1/qnas', { params })

export const getQna = (id) =>
  api.get(`/api/v1/qnas/${id}`)

export const createQna = (body) =>
  api.post('/api/v1/qnas', body)

export const deleteQna = (id) =>
  api.delete(`/api/v1/qnas/${id}`)

export const getAnswers = (qnaId) =>
  api.get(`/api/v1/qnas/${qnaId}/answers`)

export const createAnswer = (qnaId, body) =>
  api.post(`/api/v1/qnas/${qnaId}/answers`, body)

export const deleteAnswer = (qnaId, answerId) =>
  api.delete(`/api/v1/qnas/${qnaId}/answers/${answerId}`)

export const toggleAnswerLike = (qnaId, answerId) =>
  api.post(`/api/v1/qnas/${qnaId}/answers/${answerId}/likes`)

export const acceptAnswer = (qnaId, answerId) =>
  api.post(`/api/v1/qnas/${qnaId}/answers/${answerId}/accept`)

export const toggleQnaLike = (qnaId) =>
  api.post(`/api/v1/qnas/${qnaId}/likes`)
