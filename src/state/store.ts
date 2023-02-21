import { create } from 'zustand'
import { createClient } from '@liveblocks/client'
import { liveblocks } from '@liveblocks/zustand'
import type { WithLiveblocks } from '@liveblocks/zustand'

type State = {
  roomName: string
}

const client = createClient({
  publicApiKey: 'pk_dev_oO0br1uBR2i18cfNh1l-D6GHvWGORfr7pe2m8cRt7jnNCCi7go5U4tRHJjMtPEmd'
})

const useStore = create<WithLiveblocks<State>>()(
  liveblocks(
    (set) => ({
      roomName: 'welcome'
    }),
    { client }
  )
)

export default useStore
