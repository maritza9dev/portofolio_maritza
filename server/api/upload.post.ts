import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Konfigurasi Supabase URL atau Key belum diset di server.',
    })
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false }
  })

  const formData = await readMultipartFormData(event)

  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Tidak ada file yang diupload' })
  }

  const fileEntry = formData.find((item) => item.name === 'file')
  const folderEntry = formData.find((item) => item.name === 'folder')
  const folder = folderEntry?.data ? folderEntry.data.toString().trim() : 'others'

  if (!fileEntry || !fileEntry.data) {
    throw createError({ statusCode: 400, statusMessage: 'File tidak ditemukan' })
  }

  function sanitizeFilename(filename: string) {
    return filename
      .replace(/[^a-zA-Z0-9.\-_]/g, '-')
      .replace(/-+/g, '-')
  }

  const originalName = fileEntry.filename || 'file'
  const filename = `${Date.now()}-${sanitizeFilename(originalName)}`

  const { error } = await supabase.storage
    .from(folder)
    .upload(filename, fileEntry.data, {
      contentType: fileEntry.type,
      upsert: true,
    })

  if (error) {
    console.error('Supabase Storage Upload Error:', error)
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  // 6. Ambil Public URL
  const { data: publicUrlData } = supabase.storage
    .from(folder)
    .getPublicUrl(filename)

  return { path: publicUrlData.publicUrl }
})