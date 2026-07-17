import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  // Pastiin cuma admin yang login yang bisa akses ini
  await requireUserSession(event)

  const body = await readBody(event)

  const existing = await prisma.biodata.findFirst()

  if (!existing) {
    // Kalau belum ada data sama sekali, buat baru
    return await prisma.biodata.create({ data: body })
  }

  return await prisma.biodata.update({
    where: { id: existing.id },
    data: body,
  })
})