import prisma from '../utils/prisma'

export default defineEventHandler(async () => {
  const skill = await prisma.skill .findMany()
  return skill
})