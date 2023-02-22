import React from 'react'

type LayoutProps = {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <main className='min-h-screen h-full w-full bg-[radial-gradient(#ffffff14_-1px,rgba(0,0,0,0.9)_1px)] bg-[length:24px_24px] p-6 sm:p-8'>
      {children}
    </main>
  )
}
