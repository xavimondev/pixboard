import useStore from '@/state/store'
import { BlurIc, CropIc, EffectsIc, TextIc } from './icons'
import { PlaceHolder } from './placeholder'

type Tool = 'crop' | 'overlay' | 'blur' | 'effects'

type ToolbarItemProps = {
  id: Tool
  children: any
}

function ToolbarItem({ id, children }: ToolbarItemProps) {
  const toolSelected = useStore((state) => state.toolSelected)
  const setToolSelected = useStore((state) => state.setToolSelected)
  const bgColor =
    toolSelected === id ? 'bg-sky-700/[0.5] text-sky-500 rounded-md' : 'hover:bg-neutral-600'
  const textColor = toolSelected === id ? 'text-sky-500' : 'text-white'
  return (
    <>
      <button className={`hover:rounded-md p-1.5 ${bgColor}`} onClick={() => setToolSelected(id)}>
        {children(textColor)}
      </button>
    </>
  )
}

export function Toolbar() {
  const currentUser = useStore((state) => state.liveblocks.room?.getSelf())
  return (
    <div className='bg-neutral-800 shadow-md py-1.5 px-6 rounded-full'>
      <div className='flex space-x-6'>
        {!currentUser ? (
          <PlaceHolder length={4} />
        ) : (
          <>
            <ToolbarItem id='crop'>
              {(colorText: string) => <CropIc className={`h-5 w-5 ${colorText}`} />}
            </ToolbarItem>
            <ToolbarItem id='overlay'>
              {(colorText: string) => <TextIc className={`h-5 w-5 ${colorText}`} />}
            </ToolbarItem>
            <ToolbarItem id='blur'>
              {(colorText: string) => <BlurIc className={`h-5 w-5 ${colorText}`} />}
            </ToolbarItem>
            <ToolbarItem id='effects'>
              {(colorText: string) => <EffectsIc className={`h-5 w-5 ${colorText}`} />}
            </ToolbarItem>
          </>
        )}
      </div>
    </div>
  )
}
