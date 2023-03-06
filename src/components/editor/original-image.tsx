import React from 'react'
import Image from 'next/image'
import useStore from '@/state/store'

export const OriginalImage = React.memo(function OriginalImage() {
  const mainImage = useStore((state) => state.mainImage)
  const setMainImage = useStore((state) => state.setMainImage)
  const isLoading = useStore((state) => state.isLoading)
  const setIsLoading = useStore((state) => state.setIsLoading)

  const { url, width, height } = mainImage!.imageData

  return (
    <Image
      alt='Garden weird'
      src={url}
      width={width}
      height={height}
      className={`max-h-full max-w-full object-cover duration-700 ease-in-out scale-100 ${
        isLoading ? 'grayscale blur-2xl' : 'grayscale-0 blur-0'
      }`}
      onLoadingComplete={() => setIsLoading(false)}
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
