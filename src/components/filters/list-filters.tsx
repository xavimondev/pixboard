import React from 'react'
import { CldImage } from 'next-cloudinary'
import useStore from '@/state/store'
import { useTransformation } from '@/hooks/useTransformation'
import { useFilter } from './hooks/useFilter'

const FILTERS = [
  'original',
  'sepia',
  'athena',
  'grayscale',
  'aurora',
  'eucalyptus',
  'hairspray',
  'incognito',
  'quartz',
  'sizzle',
  'red_rock'
]

const generateFilter = (effect: string) => {
  if (effect === 'sepia' || effect === 'grayscale' || effect === 'original') return
  return [
    {
      art: effect
    }
  ]
}

type FilterOptionProps = {
  filter: string
}

const FilterOption = React.memo(function FilterOption({ filter }: FilterOptionProps) {
  const { filterName } = useStore((state) => state.filterSelected)
  const mainImage = useStore((state) => state.mainImage)
  const { handleFilters } = useFilter()
  const { getUrlImageFromFilters } = useTransformation()
  const othersFilters = generateFilter(filter)
  const urlMainImage = mainImage?.imageData.url
  const imageTransformedData = useStore((state) => state.imageTransformedData)
  const setImagetransformedData = useStore((state) => state.setImagetransformedData)

  const bgColor =
    filter === filterName
      ? 'bg-sky-700/[0.5] text-sky-500 font-semibold'
      : 'bg-neutral-800 hover:bg-neutral-700 text-gray-200'

  const applyFilter = () => {
    handleFilters(filter)
    const { url } = getUrlImageFromFilters(filter)
    setImagetransformedData({
      ...imageTransformedData!,
      url
    })
  }
  // TODO: Change ts ignore
  return (
    <button
      onClick={applyFilter}
      className={`${bgColor} px-3 py-4 justify-between flex flex-col items-center rounded-lg`}
    >
      <CldImage
        width={100}
        height={100}
        alt={`Effect ${filter}`}
        // @ts-ignore
        sepia={filter === 'sepia'}
        grayscale={filter === 'grayscale'}
        effects={othersFilters}
        src={urlMainImage!}
      />
      <span className='text-sm first-letter:capitalize mt-9'>{filter}</span>
    </button>
  )
})

export function ListFilters() {
  return (
    <>
      <div className='flex flex-row justify-between'>
        <div className='grid grid-cols-4 gap-4'>
          {FILTERS.map((filter: string) => (
            <FilterOption key={filter} filter={filter} />
          ))}
        </div>
      </div>
    </>
  )
}
