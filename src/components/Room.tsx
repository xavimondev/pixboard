import { useEffect } from 'react'
import useStore from '@/state/store'

export function Room() {
  const {
    liveblocks: { enterRoom, leaveRoom }
  } = useStore()
  const users = useStore((state) => state.liveblocks.others)

  useEffect(() => {
    enterRoom('room-id')
    return () => {
      leaveRoom('room-id')
    }
  }, [enterRoom, leaveRoom])

  console.log(users)
  return (
    <>
      <h2>Room</h2>
    </>
  )
}
