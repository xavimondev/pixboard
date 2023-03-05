import useStore from '@/state/store'
import {
  applyFilters,
  cropByAspectRatio,
  cropByCustomMeasures,
  getImage,
  overlayImage
} from '@/utils/getUrlImageFromTransformations'
import { getImageScale } from '@/utils/getScale'

export function useTransformation() {
  const cropValue = useStore((state) => state.cropValue)
  const mainImage = useStore((state) => state.mainImage)
  const imageTransformedData = useStore((state) => state.imageTransformedData)
  const textBoxObjects = useStore((state) => state.textBoxObjects)
  // const filterName = useStore((state) => state.filterSelected.filterName)

  const getUrlImageFromCrop = () => {
    const { x, y, width: widthCrop, height: heightCrop, unit } = cropValue
    const { imageData, renderedWidth, renderedHeight } = mainImage!
    const { height, width } = imageData
    let widthProcessed = 0
    let heightProcessed = 0
    let url = ''
    const image = getImage(mainImage!.imageData.publicId)
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
    return {
      image,
      url,
      width: widthProcessed,
      height: heightProcessed
    }
  }

  const getUrlImageFromOverlay = () => {
    const { image, width, height } = getUrlImageFromCrop()
    const { width: widthFromImageTransformed, height: heightFromImageTransformed } =
      imageTransformedData!
    const { scaleWidth: renderedWidth, scaleHight: renderedHeight } = getImageScale(
      widthFromImageTransformed,
      heightFromImageTransformed
    )
    const scaleX = width / renderedWidth // Original width / rendered Width
    const scaleY = height / renderedHeight // Original height / rendered Height
    // Adding overlay dinamically on canvas
    textBoxObjects.forEach((textOverlay: any) => {
      const { text, fontFamily, top, left } = textOverlay
      if (left <= renderedWidth && top <= renderedHeight) {
        const xCoordinate = Math.floor(left! * scaleX)
        const yCoordinate = Math.floor(top! * scaleY)
        overlayImage(image, text, fontFamily, xCoordinate, yCoordinate)
      }
    })
    console.log(`Overlay: ${image.toURL()}`)
    return {
      image
    }
  }

  const getUrlImageFromFilters = (filter: string) => {
    const { image } = getUrlImageFromOverlay()
    const imageResult = applyFilters(image, filter)
    console.log(imageResult.toURL())
    return imageResult.toURL()
  }

  return {
    getUrlImageFromCrop,
    getUrlImageFromOverlay,
    getUrlImageFromFilters
  }
}
