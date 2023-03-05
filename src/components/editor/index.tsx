import useStore from '@/state/store'
import { ListCursors } from '@/components/list-cursors'
import { Cropper } from '@/components/cropper'
import { TextOverlay } from '@/components/overlay'
import { Filters } from '@/components/filters'

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
      <section
        className='mt-10 flex flex-col sm:flex-row w-full space-y-3 sm:space-y-0 sm:space-x-4 p-10'
        onPointerMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      >
        {Component}
        <ListCursors />
      </section>
    </>
  )
}
