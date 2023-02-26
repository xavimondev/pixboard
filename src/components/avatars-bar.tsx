import useStore from '@/state/store'
import { ListAvatars } from './list-avatars'

import { PlaceHolder } from './placeholder'

export function AvatarsBar() {
  const currentUser = useStore((state) => state.liveblocks.room?.getSelf())
  return (
    <div className='bg-neutral-800 p-2.5 rounded-full flex -space-x-3.5 shadow-sm'>
      {!currentUser ? <PlaceHolder length={4} /> : <ListAvatars />}
    </div>
  )
}
