import { ListUsers } from './list-users'

export function HeaderToolbar() {
  return (
    <header className='flex flex-row justify-between items-center'>
      <div className='bg-white p-2.5 px-7 rounded-full flex'>
        <span className='font-semibold text-lg'>Pixboard.io</span>
      </div>
      <ListUsers />
    </header>
  )
}
