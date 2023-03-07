import { PropsWithChildren } from 'react'
import { User } from '@/types/user'
import { HeaderApp } from '@/components/header-app'
import { AuthBar } from '@/components/auth-bar'

type LayoutProps = PropsWithChildren<{ user: User; isToolbarEnable: boolean }>

export function Layout({ children, user, isToolbarEnable }: LayoutProps) {
  return (
    <main className='min-h-screen h-full w-full bg-[radial-gradient(#ffffff14_-1px,rgba(0,0,0,0.9)_1px)] bg-[length:24px_24px] p-6 sm:p-8'>
      <HeaderApp isToolbarEnable={isToolbarEnable} />
      {children}
      <AuthBar user={user} />
    </main>
  )
}
