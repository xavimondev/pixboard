import useStore from '@/state/store'
import {
  cropByAspectRatio,
  cropByCustomMeasures,
  getImage
} from '@/utils/getUrlImageFromTransformations'

export function useTransformation() {
  const cropValue = useStore((state) => state.cropValue)
  const mainImage = useStore((state) => state.mainImage)

  const getUrlImageFromCrop = () => {
    const { x, y, width: widthCrop, height: heightCrop, unit } = cropValue
    const { imageData, renderedWidth, renderedHeight } = mainImage!
    const { height, width } = imageData
    let widthProcessed = 0
    let heightProcessed = 0
    let url = ''
    const image = getImage('01_ntrcum')
    if (unit === '%') {
      widthProcessed = Math.ceil((width * widthCrop) / 100)
      heightProcessed = Math.ceil((height * heightCrop) / 100)
      url = cropByAspectRatio(image, widthProcessed, heightProcessed)
    } else {
      const scaleX = width / renderedWidth!
      const scaleY = height / renderedHeight!
      widthProcessed = Math.floor(scaleX * widthCrop)
      heightProcessed = Math.floor(scaleY * heightCrop)
      const xCrop = Math.floor(x * scaleX)
      const yCrop = Math.floor(y * scaleY)
      url = cropByCustomMeasures(image, widthProcessed, heightProcessed, xCrop, yCrop)
    }
    console.log(url)
  }

  return {
    getUrlImageFromCrop
  }
}
