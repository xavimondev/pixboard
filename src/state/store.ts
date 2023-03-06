import { create } from 'zustand'
import { createClient } from '@liveblocks/client'
import { liveblocks } from '@liveblocks/zustand'
import type { WithLiveblocks } from '@liveblocks/zustand'
import type { Crop } from 'react-image-crop'
import type {
  Coordinates,
  Dimensions,
  FilterSelected,
  ImageTransformed,
  MainImage,
  FontStyles
} from '@/types/board'
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
  removeTextBoxObject: (idTextObject: string) => void
  setStylesTextBoxObject: (
    idTextObject: string,
    styles: FontStyles,
    colorText: string,
    sizeText: number
  ) => void
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
  imageTransformedData: ImageTransformed | null
  setImagetransformedData: (imageTransformedData: ImageTransformed | null) => void
  filterSelected: FilterSelected
  setFilterSelected: (filterSelected: FilterSelected) => void
  blurLevel: number
  setBlurLevel: (blurLevel: number) => void
  opacityLevel: number
  setOpacityLevel: (opacityLevel: number) => void
  qualitySelected: string
  setQualitySelected: (qualitySelected: string) => void
  setInitialConfiguration: () => void
  undoMainImage: () => void
  colorTextSelected: string
  setColorTextSelected: (colorTextSelected: string) => void
  sizeTextSelected: number
  setSizeTextSelected: (sizeTextSelected: number) => void
  fontStyles: FontStyles
  setFontStyles: (fontStyles: FontStyles) => void
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
      imageTransformedData: null,
      filterSelected: {
        filterName: 'original',
        isSepia: false,
        isGrayScale: false,
        others: undefined
      },
      blurLevel: 0,
      opacityLevel: -1,
      qualitySelected: 'auto',
      colorTextSelected: '#000000',
      sizeTextSelected: 22,
      fontStyles: {
        fontWeight: 'normal',
        underline: false,
        fontStyle: 'normal'
      },
      setCursor: (cursor) => set({ cursor }),
      setCropValue: (cropValue: Crop) => set({ cropValue }),
      setPresetSelected: (presetSelected: string) => set({ presetSelected }),
      addTextBoxObject: (objectText: any) =>
        set((prev) => ({ textBoxObjects: prev.textBoxObjects.concat(objectText) })),
      removeTextBoxObject: (idTextBox: string) => {
        const { textBoxObjects } = get()
        const newTextBoxObjects = textBoxObjects.filter(
          (textObject: any) => textObject.id !== idTextBox
        )
        set({ textBoxObjects: newTextBoxObjects })
      },
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
      setToolSelected: (toolSelected: string) => set({ toolSelected }),
      setImagetransformedData: (imageTransformedData: ImageTransformed | null) =>
        set({ imageTransformedData }),
      setFilterSelected: (filterSelected: FilterSelected) => set({ filterSelected }),
      setBlurLevel: (blurLevel: number) => set({ blurLevel }),
      setOpacityLevel: (opacityLevel: number) => set({ opacityLevel }),
      setQualitySelected: (qualitySelected: string) => set({ qualitySelected }),
      setInitialConfiguration: () => {
        // Undo all configuration
        set({ mainImage: null })
        set({ cropValue: DEFAULT_VALUE_CROP })
        set({ blurLevel: 0 })
        set({ opacityLevel: -1 })
        set({ qualitySelected: 'auto' })
        set({ textBoxObjects: [] })
        set({ toolSelected: 'crop' })
        set({ imageTransformedData: null })
      },
      undoMainImage: () => {
        // Keep crop values, filters, overlay, etc
        set({ mainImage: null })
        set({ toolSelected: 'crop' })
        set({ imageTransformedData: null })
      },
      setColorTextSelected: (colorTextSelected: string) => set({ colorTextSelected }),
      setSizeTextSelected: (sizeTextSelected: number) => set({ sizeTextSelected }),
      setFontStyles: (fontStyles: FontStyles) => set({ fontStyles }),
      setStylesTextBoxObject: (
        idTextObject: string,
        styles: FontStyles,
        colorText: string,
        fontSize: number
      ) => {
        const { textBoxObjects } = get()
        const textBoxObjectsMapped = textBoxObjects.map((objValue: any) => {
          if (objValue.id === idTextObject) {
            return {
              ...objValue,
              ...styles,
              fill: colorText,
              fontSize
            }
          }
          return objValue
        })
        set({ textBoxObjects: textBoxObjectsMapped })
      }
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
        mainImage: true,
        imageTransformedData: true,
        filterSelected: true,
        blurLevel: true,
        opacityLevel: true,
        qualitySelected: true
      }
    }
  )
)

export default useStore
