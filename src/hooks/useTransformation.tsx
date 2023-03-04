import type { fabric } from 'fabric'
import useStore from '@/state/store'
import {
  cropByAspectRatio,
  cropByCustomMeasures,
  getImage,
  overlayImage
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

  const getUrlImageFromOverlay = (
    listTextoverlay: fabric.Object[],
    renderedWidth: number,
    renderedHeight: number
  ) => {
    const { image, width, height } = getUrlImageFromCrop()
    const scaleX = width / renderedWidth // Original width / rendered Width
    const scaleY = height / renderedHeight // Original height / rendered Height

    // Adding overlay dinamically on canvas
    listTextoverlay.forEach((objectOverlay) => {
      // console.log(objectOverlay)
      const { text, fontFamily, top, left } = objectOverlay
      const xCoordinate = Math.floor(left! * scaleX)
      const yCoordinate = Math.floor(top! * scaleY)
      overlayImage(image, text, fontFamily, xCoordinate, yCoordinate)
    })
    console.log(image.toURL())
  }

  return {
    getUrlImageFromCrop,
    getUrlImageFromOverlay
  }
}
