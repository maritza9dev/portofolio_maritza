import prisma from '../utils/prisma'

export default defineEventHandler(async () => {
  const acitivity = await prisma.activity.findMany()
  return acitivity
})