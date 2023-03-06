import { Crop } from 'react-image-crop'

export const PRESETS = [
  {
    id: 'original',
    name: 'Original',
    value: 1
  },
  {
    id: 'pres11',
    name: 'Square 1:1',
    value: 1 / 1
  },
  {
    id: 'landscape169',
    name: 'Landscape 16:9',
    value: 16 / 9
  },
  {
    id: 'landscape43',
    name: 'Landscape 4:3',
    value: 4 / 3
  },
  {
    id: 'port34',
    name: 'Portrait 3:4',
    value: 3 / 4
  },
  {
    id: 'port916',
    name: 'Portrait 9:16',
    value: 9 / 16
  }
]

export const DEFAULT_VALUE_CROP: Crop = {
  unit: '%',
  x: 0,
  y: 0,
  width: 100,
  height: 100
}

const isDevelopment = process.env.NODE_ENV === 'development'
export const APP_URL = isDevelopment ? 'http://localhost:3000' : 'https://pixboard.netlify.app'
