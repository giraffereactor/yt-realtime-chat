'use client'

import { findAllMessages } from '@/actions/find-all-messages.action'
import type { Message } from '@prisma/client'
import { useEffect, useRef, useState } from 'react'

type MessageListProps = { initialMessages: Array<Message> }

export const MessageList = ({ initialMessages }: MessageListProps) => {
  const [messages, setMessages] = useState<Array<Message>>(initialMessages)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const run = async () => {
      try {
        const { data: newMessages } = await findAllMessages()
        if (JSON.stringify(messages) !== JSON.stringify(newMessages)) {
          setMessages(newMessages)
        }
      } catch (err) {
        console.error('[error]:', err)
      }

      timeoutId = setTimeout(run, 3000)
    }
    run()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [messages])

  return (
    <ul className='flex flex-col gap-4'>
      {messages.map((message) => (
        <li key={message.messageId}>
          <div className='rounded border p-4'>
            <div className='flex items-center justify-between gap-2'>
              <span className='text-sm font-medium'>{message.displayName}</span>

              <time className='text-sm text-black'>
                {new Date(message.createdAt).toLocaleDateString()}
              </time>
            </div>

            <div className='mt-2'>
              <p className='text-sm'>{message.content}</p>
            </div>
          </div>
        </li>
      ))}
      <div ref={ref} />
    </ul>
  )
}
