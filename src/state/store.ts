import { create } from 'zustand'
import { createClient } from '@liveblocks/client'
import { liveblocks } from '@liveblocks/zustand'
import type { WithLiveblocks } from '@liveblocks/zustand'
import type { Crop } from 'react-image-crop'
import { DEFAULT_VALUE_CROP } from '@/utils/constants'

type Cursor = { x: number; y: number }

type State = {
  cursor: Cursor
  setCursor: (cursor: Cursor) => void
  cropValue: Crop
  setCropValue: (cropValue: Crop) => void
  presetSelected: string
  setPresetSelected: (preset: string) => void
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
      cropValue: DEFAULT_VALUE_CROP,
      presetSelected: 'original',
      setCursor: (cursor) => set({ cursor }),
      setCropValue: (cropValue: Crop) => set({ cropValue }),
      setPresetSelected: (presetSelected: string) => set({ presetSelected })
    }),
    {
      client,
      presenceMapping: {
        cursor: true
      },
      storageMapping: {
        cropValue: true,
        presetSelected: true
      }
    }
  )
)

export default useStore
