import React, { useState } from 'react'
import { CldImage } from 'next-cloudinary'
import useStore from '@/state/store'

export const OriginalImage = React.memo(function OriginalImage() {
  const [isLoading, setLoading] = useState(true)
  const mainImage = useStore((state) => state.mainImage)
  const setMainImage = useStore((state) => state.setMainImage)

  const { url, width, height } = mainImage!.imageData

  return (
    <CldImage
      alt='Garden weird'
      src={url}
      width={width}
      height={height}
      className={`object-cover duration-700 ease-in-out scale-100 ${
        isLoading ? 'grayscale blur-2xl' : 'grayscale-0 blur-0'
      }`}
      onLoadingComplete={() => setLoading(false)}
      onLoad={(evt: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = evt.currentTarget
        if (mainImage) {
          setMainImage({
            ...mainImage,
            renderedHeight: height,
            renderedWidth: width
          })
        }
      }}
    />
  )
})
