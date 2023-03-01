import React from 'react'
import useStore from '@/state/store'
import { BlurIc, CropIc, EffectsIc, TextIc } from './icons'
import { PlaceHolder } from './placeholder'

type ToolbarItemProps = {
  children: React.ReactNode
}

function ToolbarItem({ children }: ToolbarItemProps) {
  return <button className='hover:bg-neutral-600 hover:rounded-md p-1.5'>{children}</button>
}

export function Toolbar() {
  const currentUser = useStore((state) => state.liveblocks.room?.getSelf())
  return (
    <div className='bg-neutral-800 shadow-md py-1.5 px-6 rounded-full'>
      <div className='flex space-x-6'>
        {!currentUser ? (
          <PlaceHolder length={4} />
        ) : (
          <>
            <ToolbarItem>
              <CropIc className='h-5 w-5 text-white' />
            </ToolbarItem>
            <ToolbarItem>
              <TextIc className='h-5 w-5 text-white' />
            </ToolbarItem>
            <ToolbarItem>
              <BlurIc className='h-5 w-5 text-white' />
            </ToolbarItem>
            <ToolbarItem>
              <EffectsIc className='h-5 w-5 text-white' />
            </ToolbarItem>
          </>
        )}
      </div>
    </div>
  )
}
