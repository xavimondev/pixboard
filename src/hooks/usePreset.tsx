import useStore from '@/state/store'
import { DEFAULT_VALUE_CROP, PRESETS } from '@/utils/constants'
import { centerAspectCrop } from '@/utils/centerAspectCrop'

export function usePreset() {
  const setPresetSelected = useStore((state) => state.setPresetSelected)
  const mainImage = useStore((state) => state.mainImage)
  const setCropValue = useStore((state) => state.setCropValue)
  const presetSelected = useStore((state) => state.presetSelected)

  const handlePreset = (presetId: string) => {
    const { renderedWidth, renderedHeight } = mainImage!
    const presetSelected = PRESETS.find((preset) => preset.id === presetId)
    if (!presetSelected) return

    const { id, value } = presetSelected
    const crop =
      id === 'original'
        ? DEFAULT_VALUE_CROP
        : centerAspectCrop(renderedWidth!, renderedHeight!, value)

    setPresetSelected(id)
    setCropValue(crop)
  }

  return {
    handlePreset,
    presetSelected
  }
}
