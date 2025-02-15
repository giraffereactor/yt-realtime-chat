'use server'

import { prisma } from '@/lib/prisma'

export async function findAllMessages() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'asc' },
  })

  return { data: messages }
}
