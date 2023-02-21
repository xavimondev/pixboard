import React from 'react'

type LayoutProps = {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return <main className='min-h-screen h-full w-full bg-black/90 p-6 sm:p-8'>{children}</main>
}
