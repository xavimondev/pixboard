import React from 'react'

type StarterFileProps = {
  children: React.ReactNode
}
export function StarterFile({ children }: StarterFileProps) {
  return (
    <div className='flex flex-col justify-center mx-auto max-w-3xl border bg-neutral-800 border-gray-700 overflow-hidden max-h-[700px] rounded-xl shadow-sm p-2'>
      {children}
    </div>
  )
}
