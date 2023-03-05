import Image from 'next/image'
import useStore from '@/state/store'
import { getImageScale } from '@/utils/getScale'
import { ListTools } from './list-tools'

export function Download() {
  const imageTransformedData = useStore((state) => state.imageTransformedData)
  const { url, width, height } = imageTransformedData!
  const { scaleWidth, scaleHight } = getImageScale(width, height)

  return (
    <>
      <div className='flex flex-row justify-between w-full space-x-4'>
        <ListTools />
        <div className='min-h-[400px] min-w-[600px] max-h-[600px] max-w-[800px] flex justify-center items-center bg-default-image border border-neutral-700'>
          <Image
            alt='Imagen choosen by user'
            src={url}
            width={scaleWidth}
            height={scaleHight}
            className='max-h-full max-w-full object-cover'
          />
        </div>
      </div>
    </>
  )
}
