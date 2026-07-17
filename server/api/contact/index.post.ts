import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const body = await readBody(event)

  return await prisma.contact.create({
    data: body,
  })
})