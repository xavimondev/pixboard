import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { AddImageIc } from '../icons'

export function Dropzone() {
  const onDrop = useCallback((files: File[]) => {
    console.log(files)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
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
      <div className='flex flex-col space-y-6 items-center'>
        <AddImageIc className='text-gray-300 h-48 w-48' />
        <span className='uppercase text-5xl font-medium text-gray-400'>Drag & Drop</span>
        <p className='text-center text-base text-gray-500'>
          your images here, or click to select files
        </p>
      </div>
    </div>
  )
}
