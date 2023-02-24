import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useStore from '@/state/store'
import { ListCursors } from '@/components/list-cursors'

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
    <div
      className='relative min-h-screen w-full'
      onPointerMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
    >
      <ListCursors />
    </div>
  )
}
