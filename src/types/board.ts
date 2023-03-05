import type { ITextOptions } from 'fabric/fabric-impl'

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

export interface ITextOptionsOverlay extends ITextOptions {
  id?: string
  isNew: boolean
  text: string
  owner?: string
}

export type FilterSelected = {
  filterName: string
  isSepia: boolean
  isGrayScale: boolean
  others: any // TODO: Fix any
}
