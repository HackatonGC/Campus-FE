const CLOUD_NAME = 'dabb1hj1x'
const UPLOAD_PRESET = 'xodz7icy'

export async function uploadImage(file) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) throw new Error('이미지 업로드 실패')

  const data = await res.json()
  return data.secure_url
}
