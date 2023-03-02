import { create } from 'zustand'
import { createClient } from '@liveblocks/client'
import { liveblocks } from '@liveblocks/zustand'
import type { WithLiveblocks } from '@liveblocks/zustand'
import type { Crop } from 'react-image-crop'
import type { Coordinates, Dimensions, MainImage } from '@/types/board'
import { DEFAULT_VALUE_CROP } from '@/utils/constants'

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
  selectedOverlay: string | null
  isDragging: boolean
  onPointerOverlayDown: (overlayId: string) => void
  onOverlayDragging: (coordinates: Coordinates) => void
  isFirstRender: boolean
  setIsFirstRender: (isFirstRender: boolean) => void
  onPointerOverlayUp: () => void
  isTyping: boolean
  onOverlayTyping: (dimensions: Dimensions) => void
  mainImage: MainImage | null
  setMainImage: (mainImage: MainImage | null) => void
  toolSelected: string
  setToolSelected: (toolSelected: string) => void
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
      isDragging: false,
      selectedOverlay: null,
      isFirstRender: true,
      isTyping: false,
      isScaling: false,
      mainImage: null,
      toolSelected: 'crop',
      setCursor: (cursor) => set({ cursor }),
      setCropValue: (cropValue: Crop) => set({ cropValue }),
      setPresetSelected: (presetSelected: string) => set({ presetSelected }),
      addTextBoxObject: (objectText: any) =>
        set((prev) => ({ textBoxObjects: prev.textBoxObjects.concat(objectText) })),
      onPointerOverlayUp: () => set({ isDragging: false }),
      onPointerOverlayDown: (overlayId: string) => {
        set({ selectedOverlay: overlayId })
      },
      onOverlayDragging: (coordinates: Coordinates) => {
        const { textBoxObjects, selectedOverlay } = get()
        const { x, y } = coordinates
        if (selectedOverlay) {
          const textBoxObjectsMapped = textBoxObjects.map((objValue: any) => {
            if (objValue.id === selectedOverlay) {
              return {
                ...objValue,
                top: y,
                left: x
              }
            }
            return objValue
          })
          set({ textBoxObjects: textBoxObjectsMapped, isDragging: true })
        }
      },
      setIsFirstRender: (isFirstRender: boolean) => set({ isFirstRender }),
      onOverlayTyping: (dimensions: Dimensions) => {
        const { textBoxObjects, selectedOverlay } = get()
        const { width, height, text } = dimensions
        if (selectedOverlay) {
          const textBoxObjectsMapped = textBoxObjects.map((objValue: any) => {
            if (objValue.id === selectedOverlay) {
              return {
                ...objValue,
                width,
                height,
                text: text ?? objValue.text
              }
            }
            return objValue
          })
          set({ textBoxObjects: textBoxObjectsMapped, isTyping: true })
        }
      },
      setMainImage: (mainImage: MainImage | null) => set({ mainImage }),
      setToolSelected: (toolSelected: string) => set({ toolSelected })
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
        selectedOverlay: true,
        isDragging: true,
        isTyping: true,
        mainImage: true
      }
    }
  )
)

export default useStore
