import React from 'react'
import { usePreset } from '@/hooks/usePreset'
import { PRESETS } from '@/utils/constants'

type PresetButtonProps = {
  onClick: () => void
  bgClass: string
  children: React.ReactNode
}

function PresetButton({ onClick, bgClass, children }: PresetButtonProps) {
  return (
    <button
      className={`${bgClass} shadow-md px-5 py-1.5 rounded-md font-semibold`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export function ListPresets() {
  const { handlePreset, presetSelected } = usePreset()
  return (
    <div className='flex flex-col gap-4'>
      {PRESETS.map((preset) => (
        <PresetButton
          key={preset.id}
          onClick={() => handlePreset(preset.id)}
          bgClass={
            presetSelected === preset.id
              ? 'bg-sky-700/[0.5] text-sky-500'
              : 'bg-neutral-800 text-white hover:bg-neutral-700'
          }
        >
          {preset.name}
        </PresetButton>
      ))}
    </div>
  )
}
