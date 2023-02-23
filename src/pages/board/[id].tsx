import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import useStore from '@/state/store'

export default function BoardView() {
  const {
    liveblocks: { enterRoom, leaveRoom, connection }
  } = useStore()
  const others = useStore((state) => state.liveblocks.others)
  const currentUser = useStore((state) => state.liveblocks.room?.getSelf())
  const users = useMemo(
    () => (currentUser ? [currentUser, ...others] : others),
    [currentUser, others]
  )
  console.log(users)
  const { query } = useRouter()

  console.log(connection)

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
    </div>
  )
}
