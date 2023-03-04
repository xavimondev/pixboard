import useStore from '@/state/store'

export function useFilter() {
  const setFilterSelected = useStore((state) => state.setFilterSelected)

  const handleFilters = (effect: string) => {
    if (effect === 'original') {
      setFilterSelected({
        isSepia: false,
        isGrayScale: false,
        others: undefined,
        filterName: effect
      })
    } else if (effect === 'sepia') {
      setFilterSelected({
        isSepia: true,
        isGrayScale: false,
        others: undefined,
        filterName: effect
      })
    } else if (effect === 'grayscale') {
      setFilterSelected({
        isSepia: false,
        isGrayScale: true,
        others: undefined,
        filterName: effect
      })
    } else {
      setFilterSelected({
        isSepia: false,
        isGrayScale: false,
        others: [
          {
            art: effect
          }
        ],
        filterName: effect
      })
    }
  }

  return { handleFilters }
}
