import { findAllMessages } from '@/actions/find-all-messages.action'
import { MessageList } from '@/components/message-list'

export const MessageListServer = async () => {
  const { data: messages } = await findAllMessages()

  return <MessageList initialMessages={messages} />
}
