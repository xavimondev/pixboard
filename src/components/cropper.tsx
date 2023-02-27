import React, { useCallback, useState } from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import { scale, fill, crop } from '@cloudinary/url-gen/actions/resize'
import { center } from '@cloudinary/url-gen/qualifiers/textAlignment'
import ReactCrop, { Crop, makeAspectCrop, centerCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { PRESETS } from '@/utils/constants'
import { ListPresets } from './cropper/list-presets'
import { ImageResult } from './image-result'

const cld = new Cloudinary({
  cloud: {
    cloudName: ''
  }
})

const myImage = cld.image('01_ntrcum')

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 100
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

const initialCrop: Crop = {
  unit: '%',
  x: 0,
  y: 0,
  width: 100,
  height: 100
}

type Dimensions = {
  renderedWidth: number
  renderedHeight: number
  originalWidth: number
  originalHeight: number
}

const initialDimensions = {
  renderedWidth: 0,
  renderedHeight: 0,
  originalWidth: 1960,
  originalHeight: 1580
}

export function Cropper() {
  const [dimensions, setDimensions] = useState<Dimensions>(initialDimensions)
  const [presetSelected, setPresetSelected] = useState<string>('original')
  const [cropValues, setCropValues] = useState<Crop>(initialCrop)

  const handleDimensions = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    setDimensions((prevDimesions) => ({
      ...prevDimesions,
      renderedWidth: width,
      renderedHeight: height
    }))
  }, [])

  const handleTransformation = () => {
    const { x, y, width: widthCrop, height: heightCrop, unit } = cropValues
    const { originalHeight, originalWidth, renderedWidth, renderedHeight } = dimensions

    let newImage = null
    let widthProcessed = 0
    let heightProcessed = 0
    let url = ''
    if (unit === '%') {
      widthProcessed = Math.ceil((originalWidth * widthCrop) / 100)
      heightProcessed = Math.ceil((originalHeight * heightCrop) / 100)
      newImage = myImage.resize(
        fill().gravity(center()).width(widthProcessed).height(heightProcessed)
      )
    } else {
      const scaleX = originalWidth / renderedWidth
      const scaleY = originalHeight / renderedHeight
      widthProcessed = Math.floor(scaleX * widthCrop)
      heightProcessed = Math.floor(scaleY * heightCrop)
      const xCrop = Math.floor(x * scaleX)
      const yCrop = Math.floor(y * scaleY)
      newImage = myImage
        .resize(crop().width(widthProcessed).height(heightProcessed).x(xCrop).y(yCrop))
        .resize(scale().width(widthProcessed).height(heightProcessed))
    }
    // TODO: Fix url gerating bad
    url = newImage?.toURL()
    console.log(url)
    url = ''
  }

  const handlePreset = (presetId: string) => {
    const { renderedWidth, renderedHeight } = dimensions
    const presetSelected = PRESETS.find((preset) => preset.id === presetId)
    if (!presetSelected) return

    const { id, value } = presetSelected
    const crop =
      id === 'original' ? initialCrop : centerAspectCrop(renderedWidth, renderedHeight, value)

    setPresetSelected(id)
    setCropValues(crop)
  }

  return (
    <>
      <ListPresets handlePreset={handlePreset} presetSelected={presetSelected} />
      <div className='w-[480px] max-h-[590px] mt-3 border-1 '>
        <ReactCrop crop={cropValues} onChange={(c) => setCropValues(c)} keepSelection ruleOfThirds>
          <ImageResult setDimensions={handleDimensions} />
        </ReactCrop>
      </div>
      <button
        className='mt-2 px-5 py-1.5 rounded-3xl border-1 text-white p-2 bg-neutral-800 flex'
        onClick={handleTransformation}
      >
        <span className='mr-1'>Next</span>
        <svg className='w-6 h-6' viewBox='0 0 21 21' xmlns='http://www.w3.org/2000/svg'>
          <g
            fill='none'
            fillRule='evenodd'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            transform='translate(4 6)'
          >
            <path d='m9.5.497 4 4.002-4 4.001' />
            <path d='m.5 4.5h13' />
          </g>
        </svg>
      </button>
    </>
  )
}

/*
  Optimize image
  Text overlays
  Optional: blur
*/
