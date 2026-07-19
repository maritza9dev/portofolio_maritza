import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {

  await requireUserSession(event)

  const body = await readBody(event)

  const existing = await prisma.biodata.findFirst()

  if (!existing) {
    return await prisma.biodata.create({ data: body })
  }

  return await prisma.biodata.update({
    where: { id: existing.id },
    data: body,
  })
})