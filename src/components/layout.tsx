import { PropsWithChildren } from 'react'
import { User } from '@/types/user'
import { HeaderToolbar } from '@/components/header-toolbar'
import { AuthBar } from '@/components/auth-bar'

type LayoutProps = PropsWithChildren<{ user: User }>

export function Layout({ children, user }: LayoutProps) {
  return (
    <main className='min-h-screen h-full w-full bg-[radial-gradient(#ffffff14_-1px,rgba(0,0,0,0.9)_1px)] bg-[length:24px_24px] p-6 sm:p-8'>
      <HeaderToolbar />
      {children}
      <AuthBar user={user} />
    </main>
  )
}
