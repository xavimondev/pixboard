import { CloudinaryIc, LoadingIc } from '@/components/icons'

export function UploadFileLoader() {
  return (
    <div className='flex flex-col space-y-5 items-center'>
      <LoadingIc className='h-24 w-24' />
      <div className='flex space-x-4 items-center'>
        <p className='text-center text-xl font-medium text-gray-300'>Uploading your file to </p>
        <CloudinaryIc />
      </div>
    </div>
  )
}
