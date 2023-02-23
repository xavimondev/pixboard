import { create } from 'zustand'
import { createClient } from '@liveblocks/client'
import { liveblocks } from '@liveblocks/zustand'
import type { WithLiveblocks } from '@liveblocks/zustand'

type Cursor = { x: number; y: number }

type State = {
  cursor: Cursor
  setCursor: (cursor: Cursor) => void
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
      cursor: { x: 0, y: 0 },
      setCursor: (cursor) => set({ cursor })
    }),
    {
      client,
      presenceMapping: {
        cursor: true
      }
    }
  )
)

export default useStore
