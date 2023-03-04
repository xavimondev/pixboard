import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import useStore from '@/state/store'
import { OriginalImage } from '@/components/editor/original-image'
import { ListPresets } from './list-presets'

export function Cropper() {
  const cropValue = useStore((state) => state.cropValue)
  const setCropValue = useStore((state) => state.setCropValue)
  // w-[480px] max-h-[590px]
  return (
    <div className='flex flex-col sm:flex-row justify-between items-center w-full h-full sm:space-x-10'>
      <ListPresets />
      <div className='min-h-[400px] min-w-[600px] max-h-[600px] max-w-[800px] flex justify-center items-center bg-default-image'>
        <ReactCrop crop={cropValue} onChange={(c) => setCropValue(c)} keepSelection ruleOfThirds>
          <OriginalImage />
        </ReactCrop>
      </div>
    </div>
  )
}
