import { ListUsers } from './list-users'

export function HeaderToolbar() {
  return (
    <header className='flex flex-row justify-between items-center'>
      <div className='bg-neutral-800 p-2.5 px-7 rounded-full flex text-white shadow-sm'>
        <span className='font-semibold text-lg'>Pixboard.io</span>
      </div>
      <ListUsers />
    </header>
  )
}
