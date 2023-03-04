export const scaleToWidth = (image: any, width: number) => {
  const aspectRatio = image.height / image.width
  const height = width * aspectRatio
  return { width, height }
}

export const scaleToHeight = (image: any, height: number) => {
  const aspectRatio = image.width / image.height
  const width = height * aspectRatio
  return { width, height }
}
