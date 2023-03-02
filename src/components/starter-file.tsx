import React from 'react'

type StarterFileProps = {
  children: React.ReactNode
}
export function StarterFile({ children }: StarterFileProps) {
  return (
    <div className='mt-16 flex flex-col justify-center mx-auto max-w-3xl bg-neutral-800 overflow-hidden max-h-[700px] rounded-xl shadow-sm p-2'>
      {children}
    </div>
  )
}
