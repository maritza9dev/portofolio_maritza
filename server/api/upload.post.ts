import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL atau SUPABASE_SERVICE_KEY belum di-set di .env')
}

const supabase = createClient(supabaseUrl, supabaseKey)

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

  function sanitizeFilename(filename: string) {
  return filename
    .replace(/[^a-zA-Z0-9.\-_]/g, '-')
    .replace(/-+/g, '-')
  }

  const filename = `${Date.now()}-${sanitizeFilename(fileEntry.filename || 'file')}`

  const { error } = await supabase.storage
    .from(folder)
    .upload(filename, fileEntry.data, {
      contentType: fileEntry.type,
    })

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  const { data: publicUrlData } = supabase.storage
    .from(folder)
    .getPublicUrl(filename)

  return { path: publicUrlData.publicUrl }
})