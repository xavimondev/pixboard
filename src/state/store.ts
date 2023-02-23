import { create } from 'zustand'
import { createClient } from '@liveblocks/client'
import { liveblocks } from '@liveblocks/zustand'
import type { WithLiveblocks } from '@liveblocks/zustand'

type State = {
  roomName: string
}

const client = createClient({
  authEndpoint: async (room: string) => {
    const payload = {
      room
    }

    // Call auth API route to get Liveblocks access token
    const response = await fetch('/api/liveblocks/auth', {
      method: 'POST',
      headers: {
        Authentication: 'token',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const result = await response.json()

    // If auth not successful, add stringified error object to current URL params
    if (!response.ok) {
      console.log(result.error)
      return
    }

    // Return token
    return result
  }
})

const useStore = create<WithLiveblocks<State>>()(
  liveblocks(
    (set) => ({
      roomName: 'welcome-board'
    }),
    { client }
  )
)

export default useStore
