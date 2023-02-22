import Image from 'next/image'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIc, LogoutIc } from './icons'

export function LoginBar() {
  const [selected, setSelected] = useState<string>('')
  return (
    <div className='fixed flex items-center left-0 right-0 bottom-9 rounded-3xl bg-neutral-800 z-20 w-4/5 m-auto sm:w-80 px-7 py-2.5'>
      <Listbox value={selected} onChange={setSelected}>
        <Listbox.Label className='font-semibold text-white w-64 text-base sm:text-sm'>
          Login using:
        </Listbox.Label>
        <div className='relative w-80'>
          <Listbox.Button className='w-full cursor-default rounded-lg bg-neutral-700 py-1.5 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 text-base sm:text-sm'>
            <span className='block truncate font-medium text-white'>
              {selected || 'Choose auth'}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIc className='h-5 w-5 text-gray-400' />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute bottom-10 max-h-60 w-full overflow-auto rounded-md bg-neutral-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm font-medium text-white'>
              <Listbox.Option
                value='Github'
                className={({ active }) =>
                  `relative cursor-default select-none py-1.5 pl-3 pr-2 ${
                    active ? 'bg-neutral-600' : ''
                  }`
                }
              >
                GitHub
              </Listbox.Option>
              <Listbox.Option
                value='Random User'
                className={({ active }) =>
                  `relative cursor-default select-none py-1.5 pl-3 pr-2 ${
                    active ? 'bg-neutral-600' : ''
                  }`
                }
              >
                Random User
              </Listbox.Option>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {/* <div className='flex flex-row items-center justify-between w-full'>
        <div className='flex flex-row space-x-6 items-center'>
          <div className='relative w-7 h-7'>
            <Image
              src='https://unavatar.io/d3vcloud'
              width='100'
              height='100'
              className='rounded-full'
              alt='d3vcloud'
            />
          </div>
          <span className='text-base font-semibold text-white'>d3vcloud</span>
        </div>
        <button className='hover:bg-neutral-600'>
          <LogoutIc className='w-7 h-7 text-white' />
        </button>
      </div> */}
    </div>
  )
}
