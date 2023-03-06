import useStore from '@/state/store'
import {
  applyFilters,
  cropByAspectRatio,
  cropByCustomMeasures,
  getImage,
  makeFileDownloadable,
  overlayImage,
  applyBlur,
  applyQuality,
  applyOpacity
} from '@/utils/getUrlImageFromTransformations'
import { getImageScale } from '@/utils/getScale'

export function useTransformation() {
  const cropValue = useStore((state) => state.cropValue)
  const mainImage = useStore((state) => state.mainImage)
  const imageTransformedData = useStore((state) => state.imageTransformedData)
  const textBoxObjects = useStore((state) => state.textBoxObjects)
  const filterName = useStore((state) => state.filterSelected.filterName)
  const blurLevel = useStore((state) => state.blurLevel)
  const opacityLevel = useStore((state) => state.opacityLevel)
  const qualitySelected = useStore((state) => state.qualitySelected)

  const getUrlImageFromCrop = () => {
    const { x, y, width: widthCrop, height: heightCrop, unit } = cropValue
    const { imageData, renderedWidth, renderedHeight } = mainImage!
    const { height, width } = imageData
    const image = getImage(mainImage!.imageData.publicId)
    if (x === 0 && y === 0) {
      return {
        image,
        width,
        height
      }
    }

    let widthProcessed = 0
    let heightProcessed = 0

    if (unit === '%') {
      widthProcessed = Math.ceil((width * widthCrop) / 100)
      heightProcessed = Math.ceil((height * heightCrop) / 100)
      cropByAspectRatio(image, widthProcessed, heightProcessed)
    } else {
      const scaleX = width / renderedWidth!
      const scaleY = height / renderedHeight!
      widthProcessed = Math.floor(scaleX * widthCrop)
      heightProcessed = Math.floor(scaleY * heightCrop)
      const xCrop = Math.floor(x * scaleX)
      const yCrop = Math.floor(y * scaleY)
      cropByCustomMeasures(image, widthProcessed, heightProcessed, xCrop, yCrop)
    }
    return {
      image,
      width: widthProcessed,
      height: heightProcessed
    }
  }

  const getUrlImageFromOverlay = (toolAux?: string, valueAux?: string) => {
    const { image, width, height } = getUrlImageFromCrop()
    // I validate toolAux because I don't want to display overlays generated on the image
    if (textBoxObjects.length === 0 || !imageTransformedData || toolAux === 'overlay') {
      return {
        image,
        width,
        height
      }
    }
    // console.log(toolAux)
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
      const { text, fontFamily, top, left, fontSize, fill, fontWeight, underline } = textOverlay
      if (left <= renderedWidth && top <= renderedHeight) {
        const xCoordinate = Math.floor(left! * scaleX)
        const yCoordinate = Math.floor(top! * scaleY)
        overlayImage(
          image,
          text,
          fontFamily,
          xCoordinate,
          yCoordinate,
          fontSize,
          fill,
          fontWeight,
          underline
        )
      }
    })
    console.log(`Overlay: ${image.toURL()}`)
    return {
      image,
      width,
      height
    }
  }

  const getUrlImageFromFilters = (toolAux?: string, valueAux?: string) => {
    const filterToApply = toolAux === 'filter' ? valueAux : filterName
    const { image, height, width } = getUrlImageFromOverlay(toolAux, filterToApply)
    if (filterToApply === 'original') {
      return {
        image,
        url: image.toURL(),
        height,
        width
      }
    }
    const imageResult = applyFilters(image, filterToApply!)
    console.log(`Filters: ${imageResult.toURL()}`)
    return {
      image,
      url: imageResult.toURL(),
      height,
      width
    }
  }

  const getUrlImageFromBlur = (toolAux?: string, valueAux?: string) => {
    const { image, width, height, url } = getUrlImageFromFilters(toolAux, valueAux)
    if (blurLevel === 0) return { image, url, height, width }
    const newImageTransformed = applyBlur(image, blurLevel)

    return {
      image: newImageTransformed,
      url: newImageTransformed.toURL(),
      height,
      width
    }
  }

  const getUrlImageFromOpacity = (toolAux?: string, valueAux?: string) => {
    const { image, width, height, url } = getUrlImageFromBlur(toolAux, valueAux)
    if (opacityLevel === -1) return { image, url, height, width }
    const newImageTransformed = applyOpacity(image, opacityLevel)

    return {
      image: newImageTransformed,
      url: newImageTransformed.toURL(),
      height,
      width
    }
  }

  const getUrlImageFromQuality = (toolAux?: string, valueAux?: string) => {
    const { image, height, width } = getUrlImageFromOpacity(toolAux, valueAux)
    // if (qualitySelected === 'auto') return { image, url, height, width }
    const newImageTransformed = applyQuality(image, qualitySelected)

    return {
      image: newImageTransformed,
      url: newImageTransformed.toURL(),
      height,
      width
    }
  }

  const getGeneralTransformation = (toolAux?: string, valueAux?: string) => {
    const { image, url, height, width } = getUrlImageFromQuality(toolAux, valueAux)
    const fileDownload = makeFileDownloadable(image)
    return {
      image,
      url,
      height,
      width,
      urlDownloadable: fileDownload.toURL()
    }
  }

  const getUrlDownloadable = () => {
    const { image } = getUrlImageFromQuality()
    const fileDownload = makeFileDownloadable(image)
    return fileDownload.toURL()
  }

  return {
    getUrlImageFromCrop,
    getUrlImageFromOverlay,
    getUrlImageFromFilters,
    getUrlDownloadable,
    getGeneralTransformation
  }
}
