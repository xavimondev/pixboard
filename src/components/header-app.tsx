import { AvatarsBar } from './avatars-bar'

export function HeaderApp() {
  return (
    <header className='flex flex-row justify-between items-center mb-6'>
      <div className='bg-neutral-800 p-2.5 px-7 rounded-full flex text-white shadow-sm'>
        <span className='font-semibold text-lg'>Pixboard.io</span>
      </div>
      <AvatarsBar />
    </header>
  )
}
