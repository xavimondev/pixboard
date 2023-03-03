export type Coordinates = {
  x: number
  y: number
}

export type SelectedTextObject = {
  id: string | null
  coordinates: Coordinates
}

export type Dimensions = {
  text: string
  width: number
  height: number
}

export type PresetImage = {
  id: string
  width: number
  height: number
  url: string
  publicId: string
}

export type MainImage = {
  imageData: PresetImage
  renderedWidth?: number
  renderedHeight?: number
}

export type ImageTransformed = {
  url: string
  width: number
  height: number
}
