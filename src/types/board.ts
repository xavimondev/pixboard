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
