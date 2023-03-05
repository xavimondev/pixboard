import useStore from '@/state/store'

import { ListAvatars } from './list-avatars'
import { PlaceHolder } from './placeholder'
import { ShareOption } from './share'
import { ResetOption, UploadImageOption } from './undo'

export function RightHeaderBar() {
  const currentUser = useStore((state) => state.liveblocks.room?.getSelf())
  const mainImage = useStore((state) => state.mainImage)

  return (
    <div className='bg-neutral-800 py-2.5 px-4 rounded-full flex space-x-2 shadow-sm'>
      {!currentUser || !mainImage ? (
        <PlaceHolder length={4} />
      ) : (
        <>
          <ListAvatars />
          <ShareOption />
          <ResetOption />
          <UploadImageOption />
        </>
      )}
    </div>
  )
}
