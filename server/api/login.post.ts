import bcrypt from 'bcrypt'
import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  // Cari admin berdasarkan username
  const admin = await prisma.admin.findUnique({
    where: { username },
  })

  if (!admin) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Username atau password salah',
    })
  }

  // Cocokin password yang diketik sama hash di database
  const isValid = await bcrypt.compare(password, admin.password)

  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Username atau password salah',
    })
  }

  // Kalau valid, simpan session login
  await setUserSession(event, {
    user: {
      id: admin.id,
      username: admin.username,
    },
  })

  return { success: true }
})