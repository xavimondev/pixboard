import { BoldIc, ItalicIc, TrashIc, UnderlineIc } from '../icons'

type ToolsOverlayProps = {
  addText: () => void
  deleteText: () => void
}

export function ToolsOverlay({ addText, deleteText }: ToolsOverlayProps) {
  return (
    <>
      <div className='flex flex-row items-center gap-6 bg-neutral-800 py-3.5 px-7 rounded-md'>
        <button
          className='text-sky-500 font-semibold text-base bg-sky-700/[0.5] py-1 px-4 rounded-md flex items-center'
          onClick={addText}
        >
          Add Text
        </button>
        <div className='flex flex-row items-center gap-4'>
          <div className='h-full'>
            <input
              type='number'
              className='border border-gray-50 rounded-sm'
              value={22}
              max={100}
              min={1}
            />
          </div>
          <div className=''>
            <input type='color' className='rounded-sm border-transparent' />
          </div>
        </div>
        <div className='flex flex-row items-center gap-3'>
          <button className='rounded-md bg-neutral-600 p-1'>
            <BoldIc className='h-5 w-5 text-white font-bold' />
          </button>
          <button className='rounded-md bg-neutral-600 p-1'>
            <ItalicIc className='h-5 w-5 text-white font-bold' />
          </button>
          <button className='rounded-md bg-neutral-600 p-1'>
            <UnderlineIc className='h-5 w-5 text-white font-bold' />
          </button>
        </div>
        <span className='' />
        <button
          className='bg-red-700/[0.5] py-1 px-1.5 rounded-md flex items-center'
          onClick={deleteText}
        >
          <TrashIc className='h-5 w-5 text-red-500 font-bold' />
        </button>
      </div>
    </>
  )
}
