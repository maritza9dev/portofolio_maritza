import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const formData = await readMultipartFormData(event)

  if (!formData) {
    throw createError({ statusCode: 400, statusMessage: 'Tidak ada file yang diupload' })
  }

  const fileEntry = formData.find((item) => item.name === 'file')
  const folderEntry = formData.find((item) => item.name === 'folder')
  const folder = folderEntry?.data.toString() || 'others'

  if (!fileEntry) {
    throw createError({ statusCode: 400, statusMessage: 'File tidak ditemukan' })
  }

  const uploadDir = path.join(process.cwd(), 'public', folder)
  await mkdir(uploadDir, { recursive: true })

  const filename = `${Date.now()}-${fileEntry.filename}`
  await writeFile(path.join(uploadDir, filename), fileEntry.data)

  return { path: `/${folder}/${filename}` }
})