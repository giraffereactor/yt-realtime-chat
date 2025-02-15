import { createMessage } from '@/actions/create-message.action'
import { MessageListServer } from '@/components/message-list-server'
import { RegisterLink, LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export default async function Page() {
  const { isAuthenticated } = getKindeServerSession()

  return (
    <>
      <header className='h-16 border-b'>
        <div className='container mx-auto flex h-full max-w-screen-sm items-center justify-between px-4'>
          <h1 className='text-2xl font-bold'>Realtime Chat</h1>

          {(await isAuthenticated()) ? (
            <LogoutLink className='px-2 py-0.5 bg-blue-500 hover:bg-blue-700 text-white font-medium text-sm transition rounded shadow'>
              Logout
            </LogoutLink>
          ) : (
            <div className='flex gap-4'>
              <LoginLink className='px-2 py-0.5 bg-blue-500 hover:bg-blue-700 text-white font-medium text-sm transition rounded shadow'>
                Login
              </LoginLink>
              <RegisterLink className='px-2 py-0.5 bg-blue-500 hover:bg-blue-700 text-white font-medium text-sm transition rounded shadow'>
                Register
              </RegisterLink>
            </div>
          )}
        </div>
      </header>

      <main className='h-[calc(100vh-4rem-4rem)]'>
        <div className='container mx-auto h-full max-w-screen-sm px-4 py-8'>
          <div className='flex h-full flex-col gap-4'>
            {/* MessageList */}
            <div className='h-full flex-grow overflow-hidden rounded border p-4 shadow'>
              <div className='h-full overflow-y-auto pr-2'>
                <MessageListServer />
              </div>
            </div>

            {/* MessageForm */}
            <div>
              <form action={createMessage} className='flex gap-4'>
                <div className='flex-grow'>
                  <label htmlFor='message' className='sr-only'>
                    Message
                  </label>
                  <input
                    type='text'
                    id='message'
                    name='message'
                    className='w-full rounded border-black/20'
                  />
                </div>

                <div>
                  <button
                    type='submit'
                    className='px-2 py-0.5 h-full bg-blue-500 hover:bg-blue-700 text-white font-medium text-sm transition rounded shadow'
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className='h-16 border-t'>
        <div className='container mx-auto flex h-full max-w-screen-sm justify-end items-center px-4'>
          <span className='text-sm text-black/50'>
            &copy; {new Date().getFullYear()} Realtime Chat
          </span>
        </div>
      </footer>
    </>
  )
}
