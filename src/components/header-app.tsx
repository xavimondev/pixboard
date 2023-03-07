import Link from 'next/link'
import { RightHeaderBar } from './right-bar'
import { Toolbar } from './toolbar'

export function HeaderApp({ isToolbarEnable }: { isToolbarEnable: boolean }) {
  return (
    <header className='flex flex-row justify-between items-center mb-6'>
      <Link className='font-semibold text-base' href='/'>
        <div className='bg-neutral-800 py-2.5 px-6 rounded-full flex text-white shadow-sm'>
          Pixboard.io
        </div>
      </Link>
      {isToolbarEnable && (
        <>
          <Toolbar />
          <RightHeaderBar />
        </>
      )}
    </header>
  )
}
