import { create } from 'zustand'
import { createClient } from '@liveblocks/client'
import { liveblocks } from '@liveblocks/zustand'
import type { WithLiveblocks } from '@liveblocks/zustand'
import type { Crop } from 'react-image-crop'
import { DEFAULT_VALUE_CROP } from '@/utils/constants'
import { Coordinates, SelectedTextObject } from '@/types/board'

type Cursor = { x: number; y: number }

type State = {
  cursor: Cursor
  setCursor: (cursor: Cursor) => void
  cropValue: Crop
  setCropValue: (cropValue: Crop) => void
  presetSelected: string
  setPresetSelected: (preset: string) => void
  textBoxObjects: any
  addTextBoxObject: (objectText: any) => void
  updateTextObject: (id: string, coordinates: Coordinates) => void
  selectedTextObject: SelectedTextObject
  setSelectedObject: (selectedTextObject: SelectedTextObject) => void
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
    (set, get) => ({
      cursor: { x: 0, y: 0 },
      cropValue: DEFAULT_VALUE_CROP,
      presetSelected: 'original',
      textBoxObjects: [],
      selectedTextObject: {
        id: null,
        coordinates: {
          x: 0,
          y: 0
        }
      },
      setCursor: (cursor) => set({ cursor }),
      setCropValue: (cropValue: Crop) => set({ cropValue }),
      setPresetSelected: (presetSelected: string) => set({ presetSelected }),
      addTextBoxObject: (objectText: any) =>
        set((prev) => ({ textBoxObjects: prev.textBoxObjects.concat(objectText) })),
      updateTextObject: (id: string, coordinates: Coordinates) => {
        const { textBoxObjects } = get()
        const { x, y } = coordinates
        const textBoxObjectsAux = textBoxObjects.map((objValue: any) => {
          if (objValue.id === id) {
            return {
              ...objValue,
              top: y,
              left: x
            }
          }
          return objValue
        })
        set({ textBoxObjects: textBoxObjectsAux })
      },
      setSelectedObject: (selectedTextObject: SelectedTextObject) => set({ selectedTextObject })
    }),
    {
      client,
      presenceMapping: {
        cursor: true
      },
      storageMapping: {
        cropValue: true,
        presetSelected: true,
        textBoxObjects: true,
        selectedTextObject: true
      }
    }
  )
)

export default useStore
