import bcrypt from 'bcrypt'
import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  const admin = await prisma.admin.findUnique({
    where: { username },
  })

  if (!admin) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Username atau password salah',
    })
  }

  const isValid = await bcrypt.compare(password, admin.password)

  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Username atau password salah',
    })
  }

  await setUserSession(event, {
    user: {
      id: admin.id,
      username: admin.username,
    },
  })

  return { success: true }
})