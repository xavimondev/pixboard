export const scaleToWidth = (imageWidth: number, imageHeight: number, width: number) => {
  const aspectRatio = imageHeight / imageWidth
  const height = width * aspectRatio
  return { width, height }
}

export const scaleToHeight = (imageWidth: number, imageHeight: number, height: number) => {
  const aspectRatio = imageWidth / imageHeight
  const width = height * aspectRatio
  return { width, height }
}

export const getImageScale = (imageWidth: number, imageHeight: number) => {
  const containerWidth = 800 // change this
  const containerHeight = 600 // change this
  const maxImageWidth = containerWidth
  let scaledDims = scaleToWidth(imageWidth, imageHeight, maxImageWidth)

  // If the height of the scaled image exceeds the container height,
  // scale the image again based on the container height
  if (scaledDims.height > containerHeight) {
    const maxImageHeight = containerHeight
    scaledDims = scaleToHeight(imageWidth, imageHeight, maxImageHeight)
  }

  return {
    scaleWidth: scaledDims.width,
    scaleHight: scaledDims.height
  }
}
