import useStore from '@/state/store'
import { UndoAllIc, UploadIc } from './icons'

export function ResetOption() {
  const setInitialConfiguration = useStore((state) => state.setInitialConfiguration)

  return (
    <button
      className='flex gap-1 items-center text-sky-500 font-semibold text-sm bg-sky-700/[0.5] py-1.5 px-2 rounded-md'
      onClick={setInitialConfiguration}
    >
      Reset All
      <UndoAllIc className='w-5 h-5 text-sky-500' />
    </button>
  )
}

export function UploadImageOption() {
  const undoMainImage = useStore((state) => state.undoMainImage)

  return (
    <button
      className='flex gap-1 items-center text-sky-500 font-semibold text-sm bg-sky-700/[0.5] py-1.5 px-2 rounded-md'
      onClick={undoMainImage}
    >
      Update Image
      <UploadIc className='w-5 h-5 text-sky-500' />
    </button>
  )
}
