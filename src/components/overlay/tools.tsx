import React from 'react'
import useStore from '@/state/store'
import { BoldIc, ItalicIc, TrashIc, UnderlineIc } from '@/components/icons'

type ToolsOverlayProps = {
  addText: () => void
  deleteText: () => void
  changeColorOverlay: (value: string) => void
  changeStyleOverlay: (styles: any) => void
  changeSizeOverlay: (fontSize: number) => void
}

export function ToolsOverlay({
  addText,
  deleteText,
  changeColorOverlay,
  changeStyleOverlay,
  changeSizeOverlay
}: ToolsOverlayProps) {
  const colorTextSelected = useStore((state) => state.colorTextSelected)
  const setColorTextSelected = useStore((state) => state.setColorTextSelected)
  const setSizeTextSelected = useStore((state) => state.setSizeTextSelected)
  const sizeTextSelected = useStore((state) => state.sizeTextSelected)
  const setFontStyles = useStore((state) => state.setFontStyles)
  const fontStyles = useStore((state) => state.fontStyles)

  return (
    <>
      <div className='flex flex-row items-center gap-6 bg-neutral-800 py-3.5 px-7 rounded-md'>
        <button
          className='text-sky-500 font-semibold text-base bg-sky-700/[0.5] py-1 px-4 rounded-md flex items-center'
          onClick={addText}
        >
          Add Text
        </button>
        <div className='flex flex-row items-center gap-4'>
          <div className='h-full'>
            <input
              type='number'
              className='border border-gray-50 rounded-sm'
              value={sizeTextSelected}
              max={100}
              min={1}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                const fontSize = Number(evt.target.value)
                setSizeTextSelected(fontSize)
                changeSizeOverlay(fontSize)
              }}
            />
          </div>
          <div className=''>
            <input
              type='color'
              className='rounded-sm border-transparent'
              value={colorTextSelected}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                setColorTextSelected(evt.target.value)
                changeColorOverlay(evt.target.value)
              }}
            />
          </div>
        </div>
        <div className='flex flex-row items-center gap-3'>
          <button
            className='rounded-md  p-1 bg-neutral-600'
            onClick={() => {
              const styleBold = {
                ...fontStyles,
                fontWeight: fontStyles.fontWeight === 'normal' ? 'bold' : 'normal'
              }
              setFontStyles(styleBold)
              changeStyleOverlay(styleBold)
            }}
          >
            <BoldIc className='h-5 w-5 text-white font-bold' />
          </button>
          <button
            className='rounded-md  p-1 bg-neutral-600'
            onClick={() => {
              const styleItalic = {
                ...fontStyles,
                fontStyle: fontStyles.fontStyle === 'normal' ? 'italic' : 'normal'
              }
              changeStyleOverlay(styleItalic)
              setFontStyles(styleItalic)
            }}
          >
            <ItalicIc className='h-5 w-5 text-white font-bold' />
          </button>
          <button
            className='rounded-md  p-1 bg-neutral-600'
            onClick={() => {
              const styleItalic = {
                ...fontStyles,
                underline: !fontStyles.underline
              }
              changeStyleOverlay(styleItalic)
              setFontStyles(styleItalic)
            }}
          >
            <UnderlineIc className='h-5 w-5 text-white font-bold' />
          </button>
        </div>
        <span className='' />
        <button
          className='bg-red-700/[0.5] py-1 px-1.5 rounded-md flex items-center'
          onClick={deleteText}
        >
          <TrashIc className='h-5 w-5 text-red-500 font-bold' />
        </button>
      </div>
    </>
  )
}
