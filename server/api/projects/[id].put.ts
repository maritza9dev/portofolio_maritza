import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  return await prisma.project.update({
    where: { id },
    data: body,
  })
})