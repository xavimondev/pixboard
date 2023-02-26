import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useStore from '@/state/store'
import { ListCursors } from '@/components/list-cursors'
import { Cropper } from '@/components/cropper'

export default function BoardView() {
  const {
    liveblocks: { enterRoom, leaveRoom }
  } = useStore()
  const { query } = useRouter()
  const setCursor = useStore((state) => state.setCursor)

  useEffect(() => {
    if (!query.id) return

    enterRoom(query.id as string)

    return () => {
      leaveRoom(query.id as string)
    }
  }, [query.id])

  return (
    <>
      <div
        className='min-h-screen h-full w-full bg-[radial-gradient(#ffffff14_-1px,rgba(0,0,0,0.9)_1px)] bg-[length:24px_24px] p-6 sm:p-8'
        // onPointerMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      >
        <Cropper />
        {/* <ListCursors /> */}
      </div>
    </>
  )
}
