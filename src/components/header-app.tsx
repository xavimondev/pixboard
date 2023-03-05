import { RightHeaderBar } from './right-bar'
import { Toolbar } from './toolbar'

export function HeaderApp() {
  return (
    <header className='flex flex-row justify-between items-center mb-6'>
      <div className='bg-neutral-800 py-2.5 px-6 rounded-full flex text-white shadow-sm'>
        <span className='font-semibold text-base'>Pixboard.io</span>
      </div>
      <Toolbar />
      <RightHeaderBar />
    </header>
  )
}
