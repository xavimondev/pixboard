import { useMemo } from 'react'
import useStore from '@/state/store'
import { Avatar, AvatarEllipsis } from './ui/avatar'

const MAX_USERS = 4

export function ListAvatars() {
  const others = useStore((state) => state.liveblocks.others)
  const currentUser = useStore((state) => state.liveblocks.room?.getSelf())
  const users = useMemo(
    () => (currentUser ? [currentUser, ...others] : others),
    [currentUser, others]
  )

  return (
    <div className='flex -space-x-3.5'>
      {users.slice(0, MAX_USERS).map(({ id, info }) => {
        const { avatar, color, name } = info as any
        return <Avatar key={id} name={name} color={color} avatar={avatar} />
      })}
      {users.length > MAX_USERS ? <AvatarEllipsis size={users.length - MAX_USERS} /> : null}
    </div>
  )
}
