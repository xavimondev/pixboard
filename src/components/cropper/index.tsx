import React from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import useStore from '@/state/store'
import { ListPresets } from './list-presets'

type CropperProps = {
  children: React.ReactNode
}

export function Cropper({ children }: CropperProps) {
  const cropValue = useStore((state) => state.cropValue)
  const setCropValue = useStore((state) => state.setCropValue)

  return (
    <div className='flex flex-col'>
      <ListPresets />
      <div className='w-[480px] max-h-[590px] mt-3 border-1 '>
        <ReactCrop crop={cropValue} onChange={(c) => setCropValue(c)} keepSelection ruleOfThirds>
          {children}
        </ReactCrop>
      </div>
    </div>
  )
}
