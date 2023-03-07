import { CloudinaryIc, LoadingIc } from '@/components/icons'

export function UploadFileLoader() {
  return (
    <div className='flex flex-col space-y-5 items-center'>
      <LoadingIc className='h-24 w-24 text-white' />
      <div className='flex space-x-4 items-center'>
        <p className='text-center text-xl font-medium text-gray-300'>Uploading your file to </p>
        <CloudinaryIc />
      </div>
    </div>
  )
}

export function BoardLoader() {
  return (
    <div className='flex flex-col space-y-5 justify-center items-center mt-20'>
      <LoadingIc className='h-20 w-22 text-white' />
      <p className='text-center text-xl font-medium text-gray-300'>Getting your configuration...</p>
    </div>
  )
}

export function ImageLoader() {
  return (
    <div className='flex flex-row gap-4 justify-center items-center w-full h-full'>
      <LoadingIc className='h-5 w-5 text-white' />
      <p className='text-center text-base font-medium text-gray-300'>Generating new image...</p>
    </div>
  )
}
