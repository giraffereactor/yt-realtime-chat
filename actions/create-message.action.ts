'use server'

import { prisma } from '@/lib/prisma'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

export async function createMessage(formData: FormData) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) redirect('/api/auth/login')

  const message = `${formData.get('message')}`
  if (message.length === 0) return

  const displayName = user.email?.split('@')[0].toLowerCase() ?? 'anonymous'

  await prisma.message.create({
    data: {
      content: message,
      displayName,
      kindeId: user.id,
    },
  })
}
