import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const id = Number(getRouterParam(event, 'id'))

  return await prisma.contact.delete({
    where: { id },
  })
})