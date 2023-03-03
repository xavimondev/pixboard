import type { PresetImage } from '@/types/board'
import { CldImage } from 'next-cloudinary'
import useStore from '@/state/store'

function PresetImageItem({ id, url, width, height, publicId }: PresetImage) {
  const setMainImage = useStore((state) => state.setMainImage)
  return (
    <button
      className='rounded-md border border-neutral-700 cursor-pointer transition ease-in-out hover:-translate-y-1'
      onClick={() =>
        setMainImage({
          imageData: {
            id,
            url,
            width,
            height,
            publicId
          }
        })
      }
    >
      <figure>
        <CldImage
          alt='Preset Image'
          width={80}
          height={80}
          src={url}
          crop='thumb'
          gravity='auto'
          className='rounded-md'
        />
      </figure>
    </button>
  )
}

type PresetsImagesProps = {
  presetsImages: PresetImage[]
}

export function PresetsImages({ presetsImages }: PresetsImagesProps) {
  return (
    <div className='flex space-x-2 items-center'>
      {presetsImages.map((preset) => (
        <PresetImageItem key={preset.id} {...preset} />
      ))}
    </div>
  )
}
