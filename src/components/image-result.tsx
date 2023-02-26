import { CldImage } from 'next-cloudinary'
import React from 'react'

type ImageResultProps = {
  setDimensions: (e: React.SyntheticEvent<HTMLImageElement>) => void
}

export const ImageResult = React.memo(function ImageResult({ setDimensions }: ImageResultProps) {
  return (
    <CldImage
      width={1960}
      height={1580}
      src='01_ntrcum'
      alt='Description of my image'
      onLoad={setDimensions}
    />
  )
})
