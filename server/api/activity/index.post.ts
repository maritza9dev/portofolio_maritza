import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const body = await readBody(event)

  return await prisma.activity.create({
    data: body,
  })
})