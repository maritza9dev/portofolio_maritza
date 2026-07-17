import prisma from '../utils/prisma'

export default defineEventHandler(async () => {
  const biodata = await prisma.biodata.findMany()
  return biodata
})