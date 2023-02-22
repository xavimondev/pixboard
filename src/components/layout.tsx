import { User } from '@/types/user'
import { PropsWithChildren } from 'react'

type LayoutProps = PropsWithChildren<{ user: User }>

export function Layout({ children, user }: LayoutProps) {
  console.log(user)
  return (
    <main className='min-h-screen h-full w-full bg-[radial-gradient(#ffffff14_-1px,rgba(0,0,0,0.9)_1px)] bg-[length:24px_24px] p-6 sm:p-8'>
      {children}
    </main>
  )
}
