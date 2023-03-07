import React from 'react'
import useStore from '@/state/store'
import { useTransformation } from '@/hooks/useTransformation'
import { copyTextToClipboard } from '@/utils/copyToClipboard'

export function BlurTweak() {
  const setBlurLevel = useStore((state) => state.setBlurLevel)
  const blurLevel = useStore((state) => state.blurLevel)

  return (
    <div className='flex flex-col'>
      <label htmlFor='blur' className='block mb-3 font-medium text-white'>
        Blur level: {blurLevel}
      </label>
      <span className='text-sm text-gray-400 w-full mb-2'>(Min: 0 and Max: 2000)</span>
      <input
        id='blur'
        type='range'
        min={0}
        max={2000}
        step={100}
        defaultValue={blurLevel}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
          setBlurLevel(Number(evt.currentTarget.value))
        }
        className='w-full h-2 rounded-lg appearance-none cursor-pointer bg-neutral-700'
      />
    </div>
  )
}

export function OpacityTweak() {
  const setOpacityLevel = useStore((state) => state.setOpacityLevel)
  const opacityLevel = useStore((state) => state.opacityLevel)

  return (
    <div className='flex flex-col w-full'>
      <label htmlFor='opacity' className='block mb-2 font-medium text-white'>
        Opacity level: {opacityLevel === -1 ? 'Default' : opacityLevel}
      </label>
      <span className='text-sm text-gray-400 w-full mb-2'>
        (100 means completely opaque and 0 is completely transparent)
      </span>
      <input
        id='opacity'
        type='range'
        min={0}
        max={100}
        defaultValue={opacityLevel}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
          setOpacityLevel(Number(evt.currentTarget.value))
        }
        className='w-full h-2 rounded-lg appearance-none cursor-pointer bg-neutral-700'
      />
    </div>
  )
}

const QUALITY_OPTIONS = ['auto', 'best', 'good', 'low']

function QualityOption({ option }: { option: string }) {
  const setQualitySelected = useStore((state) => state.setQualitySelected)
  const qualitySelected = useStore((state) => state.qualitySelected)

  return (
    <>
      <div className='flex items-center mb-4'>
        <input
          id={`radio-${option}`}
          type='radio'
          checked={option === qualitySelected}
          value={option}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setQualitySelected(evt.target.value)
          }}
          className='w-4 h-4 text-neutral-600 bg-gray-700 border-gray-600'
        />
        <label
          htmlFor={`radio-${option}`}
          className='ml-2 text-sm font-medium text-gray-300 first-letter:capitalize'
        >
          {option}
        </label>
      </div>
    </>
  )
}

export function QualityTweak() {
  return (
    <div className='flex flex-col w-full'>
      <label htmlFor='blur' className='block mb-3 font-medium text-white'>
        Quality
      </label>
      {QUALITY_OPTIONS.map((option) => (
        <QualityOption key={option} option={option} />
      ))}
    </div>
  )
}

export function ListTools() {
  const imageTransformedData = useStore((state) => state.imageTransformedData)
  const setImagetransformedData = useStore((state) => state.setImagetransformedData)
  const setIsLoadingImage = useStore((state) => state.setIsLoadingImage)
  const { getGeneralTransformation } = useTransformation()

  return (
    <div className='flex flex-col gap-8 max-w-[500px]'>
      <BlurTweak />
      <OpacityTweak />
      <QualityTweak />
      <div className='flex flex-col gap-1 items-start'>
        <button
          onClick={() => {
            const { url, urlDownloadable } = getGeneralTransformation()
            setImagetransformedData({
              ...imageTransformedData!,
              url,
              urlDownloadable
            })
            setIsLoadingImage(true)
          }}
          className='text-sky-500 font-semibold text-base bg-sky-700/[0.5] p-1.5 rounded-md flex items-center'
        >
          Apply changes
        </button>
      </div>
      <div className='flex flex-col gap-1'>
        <span className='block mb-3 font-medium text-white'>Download</span>
        <div className='flex flex-row items-center gap-4'>
          <div className='border border-neutral-900 rounded-md max-h-36 overflow-hidden p-2 bg-neutral-800 cursor-pointer'>
            <p
              className='font-medium text-sm text-gray-400 truncate h-full'
              onClick={() => copyTextToClipboard(imageTransformedData!.url)}
            >
              {imageTransformedData?.url}
            </p>
          </div>
          <div className='flex flex-row justify-between'>
            <a
              href={imageTransformedData?.urlDownloadable}
              className='text-sky-500 font-semibold text-base bg-sky-700/[0.5] p-1.5 rounded-md flex items-center'
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
