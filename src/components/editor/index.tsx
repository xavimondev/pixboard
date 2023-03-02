import useStore from '@/state/store'
import { ListCursors } from '@/components/list-cursors'
import { Cropper } from '@/components/cropper'
import { OriginalImage } from './original-image'
import { FinalImage } from './final-image'

export function Editor() {
  const setCursor = useStore((state) => state.setCursor)
  const setMainImage = useStore((state) => state.setMainImage)
  const toolSelected = useStore((state) => state.toolSelected)

  return (
    <>
      <h1 onClick={() => setMainImage(null)}>There is an image</h1>
      <section
        className='mt-14 flex flex-col sm:flex-row w-full space-y-3 sm:space-y-0 sm:space-x-4'
        onPointerMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      >
        {/* {toolSelected === 'crop' ? <Cropper /> : null} */}
        <OriginalImage />
        <FinalImage />
        <ListCursors />
      </section>
    </>
  )
}
