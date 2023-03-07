import Image from 'next/image'
import useStore from '@/state/store'
import { getImageScale } from '@/utils/getScale'
import { ListFilters } from './list-filters'
import { ImageLoader } from '@/components/loaders'

export function Filters() {
  const imageTransformedData = useStore((state) => state.imageTransformedData)
  const { url, width, height } = imageTransformedData!
  const { scaleWidth, scaleHight } = getImageScale(width, height)
  const isLoadingImage = useStore((state) => state.isLoadingImage)
  const setIsLoadingImage = useStore((state) => state.setIsLoadingImage)

  return (
    <>
      <div className='flex flex-row items-center w-full space-x-4'>
        <ListFilters />
        <div className='flex flex-col gap-2'>
          {isLoadingImage && <ImageLoader />}
          <div className='max-h-[600px] max-w-[800px] flex justify-center items-center border border-neutral-700'>
            <Image
              alt='Imagen choosen by user'
              src={url}
              width={scaleWidth}
              height={scaleHight}
              className='max-h-full max-w-full object-cover'
              onLoadingComplete={() => {
                setIsLoadingImage(false)
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
