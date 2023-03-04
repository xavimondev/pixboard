import useStore from '@/state/store'
import { ListFilters } from './list-filters'
import Image from 'next/image'

export function Filters() {
  const imageTransformedData = useStore((state) => state.imageTransformedData)
  const { url, width, height } = imageTransformedData!
  console.log(imageTransformedData?.url)

  return (
    <>
      <div className='flex flex-row justify-between w-full space-x-4'>
        <ListFilters />
        <div className='min-h-[400px] min-w-[600px] max-h-[600px] max-w-[800px] flex justify-center items-center bg-default-image'>
          <Image
            alt='Imagen choosen by user'
            src
            src={url}
            width={width}
            height={height}
            className='max-h-full max-w-full object-cover'
          />
        </div>
      </div>
    </>
  )
}
