import React, { useState } from 'react'
import { CldImage } from 'next-cloudinary'
import useStore from '@/state/store'

export const OriginalImage = React.memo(function OriginalImage() {
  const [isLoading, setLoading] = useState(true)
  const mainImage = useStore((state) => state.mainImage)

  if (!mainImage) return null

  const { url, width, height } = mainImage.imageData

  return (
    <div className='w-1/2 h-full'>
      <h2 className='text-3xl font-bold text-white mb-4'>Your image</h2>
      <div className='bg-default-image flex justify-center'>
        <CldImage
          alt='Garden weird'
          src={url}
          width={width}
          height={height}
          className={`object-cover duration-700 ease-in-out scale-100 ${
            isLoading ? 'grayscale blur-2xl' : 'grayscale-0 blur-0'
          }`}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
    </div>
  )
})
