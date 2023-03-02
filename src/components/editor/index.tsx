import useStore from '@/state/store'
import { ListCursors } from '@/components/list-cursors'
import { OriginalImage } from './original-image'
import { FinalImage } from './final-image'

export function Editor() {
  const setCursor = useStore((state) => state.setCursor)
  const setUrlImage = useStore((state) => state.setUrlImage)

  return (
    <>
      <h1 onClick={() => setUrlImage('')}>There is an image</h1>
      <section
        className='mt-14 flex flex-col sm:flex-row w-full space-y-3 sm:space-y-0 sm:space-x-4'
        onPointerMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      >
        <OriginalImage />
        <FinalImage />
        <ListCursors />
      </section>
    </>
  )
}
