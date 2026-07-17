import prisma from '../utils/prisma'

export default defineEventHandler(async () => {
  const project = await prisma.project.findMany()
  return project
})