import Image from 'next/image'
import useStore from '@/state/store'
import { getImageScale } from '@/utils/getScale'
import { ImageLoader } from '@/components/loaders'
import { ListTools } from './list-tools'

export function Download() {
  const imageTransformedData = useStore((state) => state.imageTransformedData)
  const { url, width, height } = imageTransformedData!
  const { scaleWidth, scaleHight } = getImageScale(width, height)
  const isLoadingImage = useStore((state) => state.isLoadingImage)
  const setIsLoadingImage = useStore((state) => state.setIsLoadingImage)

  return (
    <>
      <div className='flex flex-row justify-between items-center gap-6 w-full h-full'>
        <ListTools />
        <div
          className={`max-h-[600px] max-w-[800px] flex justify-center items-center ${
            !isLoadingImage ? 'border border-neutral-700' : ''
          }`}
        >
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
          <div className={`${isLoadingImage ? 'block w-3/12' : 'hidden'}`}>
            <ImageLoader />
          </div>
        </div>
      </div>
    </>
  )
}
