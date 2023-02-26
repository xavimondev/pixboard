import { useMemo } from 'react'
import useStore from '@/state/store'
import { Avatar, AvatarEllipsis } from './ui/avatar'

const MAX_USERS = 4
const USERS = [
  {
    id: 1,
    name: 'Xavier Alfaro',
    githubId: 'midudev'
  },
  {
    id: 2,
    name: 'User One',
    githubId: 'd3vcloud'
  },
  {
    id: 3,
    name: 'User two',
    githubId: 'goncy'
  },
  {
    id: 4,
    name: 'User two',
    githubId: 'goncy'
  },
  {
    id: 5,
    name: 'User two',
    githubId: 'goncy'
  },
  {
    id: 6,
    name: 'User two',
    githubId: 'goncy'
  }
]
export function ListAvatars() {
  const others = useStore((state) => state.liveblocks.others)
  const currentUser = useStore((state) => state.liveblocks.room?.getSelf())
  const users = useMemo(
    () => (currentUser ? [currentUser, ...others] : others),
    [currentUser, others]
  )
  console.log(users)
  return (
    <>
      {USERS.slice(0, MAX_USERS).map((user) => (
        <Avatar key={user.id} name={user.name} githubId={user.githubId} />
      ))}
      {USERS.length > MAX_USERS ? <AvatarEllipsis size={USERS.length - MAX_USERS} /> : null}
    </>
  )
}
