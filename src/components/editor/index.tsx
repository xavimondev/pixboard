import useStore from '@/state/store'
import { ListCursors } from '@/components/list-cursors'
import { Cropper } from '@/components/cropper'
import { TextOverlay } from '@/components/overlay'
import { Filters } from '@/components/filters'
import { Download } from '@/components/download'

const toolsComponents = [
  {
    id: 'crop',
    Component: <Cropper />
  },
  {
    id: 'overlay',
    Component: <TextOverlay />
  },
  {
    id: 'effects',
    Component: <Filters />
  },
  {
    id: 'download',
    Component: <Download />
  }
]

export function Editor() {
  const setCursor = useStore((state) => state.setCursor)
  const toolSelected = useStore((state) => state.toolSelected)
  const mainImage = useStore((state) => state.mainImage)
  if (!mainImage) return null
  const Component = toolsComponents.find((tool) => tool.id === toolSelected)!.Component
  return (
    <>
      <section className='mt-12'>
        <div
          className='flex justify-between items-center mx-auto max-w-md sm:max-w-6xl'
          onPointerMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        >
          {Component}
          <ListCursors />
        </div>
      </section>
    </>
  )
}
