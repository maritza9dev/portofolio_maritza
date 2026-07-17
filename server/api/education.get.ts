import prisma from '../utils/prisma'

export default defineEventHandler(async () => {
  const education = await prisma.education.findMany()
  return education
})