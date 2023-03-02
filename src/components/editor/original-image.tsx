import React, { useState } from 'react'
import { CldImage } from 'next-cloudinary'
import useStore from '@/state/store'

export const OriginalImage = React.memo(function OriginalImage() {
  const urlImage = useStore((state) => state.urlImage)
  const [isLoading, setLoading] = useState(true)

  return (
    <div className='w-1/2 h-full'>
      <h2 className='text-3xl font-bold text-white mb-4'>Your image</h2>
      <div className='bg-default-image flex justify-center'>
        <CldImage
          alt='Garden weird'
          src={urlImage}
          width={500}
          height={500}
          className={`object-cover duration-700 ease-in-out scale-100 ${
            isLoading ? 'grayscale blur-2xl' : 'grayscale-0 blur-0'
          }`}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
    </div>
  )
})
