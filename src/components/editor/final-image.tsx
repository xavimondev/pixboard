import React, { useState } from 'react'
import { CldImage } from 'next-cloudinary'
import useStore from '@/state/store'

export const FinalImage = React.memo(function FinalImage() {
  const [isLoading, setLoading] = useState(true)
  const urlImage = useStore((state) => state.urlImage)

  return (
    <>
      <div className='w-1/2 h-full'>
        <h2 className='text-3xl font-bold text-white mb-4'>The result</h2>
        <div className='bg-default-image flex justify-center'>
          <CldImage
            alt='Garden weird'
            src={urlImage}
            width={500}
            height={500}
            className={`max-h-full max-w-full overflow-hidden object-cover duration-700 ease-in-out scale-100 relative z-10 ${
              isLoading ? 'grayscale blur-2xl' : 'grayscale-0 blur-0'
            }`}
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
      </div>
    </>
  )
})
