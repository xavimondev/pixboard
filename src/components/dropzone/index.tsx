import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { uploadFile } from '@/utils/uploadFile'
import { AddImageIc } from '@/components/icons'

function DropzoneBody() {
  return (
    <div className='flex flex-col space-y-6 items-center'>
      <AddImageIc className='text-gray-300 h-48 w-48' />
      <span className='uppercase text-5xl font-medium text-gray-400'>Drag & Drop</span>
      <p className='text-center text-base text-gray-500'>
        your images here, or click to select files
      </p>
    </div>
  )
}

export function Dropzone() {
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const onDrop = useCallback(async (files: File[]) => {
    const file = files[0]
    setIsUploading(true)
    const url = await uploadFile(file)
    console.log(url)
    setIsUploading(false)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 20971520, // 21MB
    accept: {
      'image/*': []
    },
    onDrop,
    onError: (err) => console.log(err)
  })

  return (
    <div
      {...getRootProps({ className: 'dropzone' })}
      className='flex items-center justify-center mx-auto max-w-3xl border bg-neutral-800 border-gray-700 overflow-hidden h-[500px] z-0 rounded-xl shadow-sm hover:opacity-90 hover:border-dashed hover:border-2 hover:border-gray-400 hover:cursor-pointer'
    >
      <input {...getInputProps()} />
      {isUploading ? <h2>Loading</h2> : <DropzoneBody />}
    </div>
  )
}
