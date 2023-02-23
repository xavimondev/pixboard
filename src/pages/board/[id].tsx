import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useStore from '@/state/store'

export default function BoardView() {
  const {
    liveblocks: { enterRoom, leaveRoom }
  } = useStore()
  const others = useStore((state) => state.liveblocks.others)
  const othersCursors = others.map((user) => user.presence.cursor)
  const setCursor = useStore((state) => state.setCursor)

  const { query } = useRouter()

  useEffect(() => {
    if (!query.id) return

    enterRoom(query.id as string)

    return () => {
      leaveRoom(query.id as string)
    }
  }, [query.id])

  return (
    <div>
      <h1>Lookin at {query.id}</h1>
      <div
        style={{ width: '100vw', height: '100vh' }}
        onPointerMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      />
    </div>
  )
}
