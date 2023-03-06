import React from 'react'
import useStore from '@/state/store'
import { AddIc, BoldIc, ItalicIc, TrashIc, UnderlineIc } from '@/components/icons'

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
      <div className='flex flex-col gap-6 bg-neutral-800 p-4 rounded-md'>
        <button className='bg-sky-700/[0.5] p-2 rounded-md flex justify-center' onClick={addText}>
          <AddIc className='h-5 w-5 text-sky-500' />
        </button>
        <div className='flex flex-col gap-4'>
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
        <div className='flex flex-col gap-3'>
          <button
            className='flex justify-center rounded-md p-1 bg-neutral-600'
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
            className='flex justify-center rounded-md p-1 bg-neutral-600'
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
            className='flex justify-center rounded-md p-2 bg-neutral-600'
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
          className='bg-red-700/[0.5] p-2 rounded-md flex justify-center'
          onClick={deleteText}
        >
          <TrashIc className='h-5 w-5 text-red-500' />
        </button>
      </div>
    </>
  )
}
