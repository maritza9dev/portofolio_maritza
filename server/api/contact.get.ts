import prisma from '../utils/prisma'

export default defineEventHandler(async () => {
  const contact = await prisma.contact.findMany()
  return contact
})