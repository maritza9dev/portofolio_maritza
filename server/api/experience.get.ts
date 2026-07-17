import prisma from '../utils/prisma'

export default defineEventHandler(async () => {
  const experience = await prisma.experience.findMany()
  return experience
})