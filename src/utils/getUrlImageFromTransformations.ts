import { Cloudinary, CloudinaryImage, Transformation } from '@cloudinary/url-gen'
import { scale, fill, crop } from '@cloudinary/url-gen/actions/resize'
import { center } from '@cloudinary/url-gen/qualifiers/textAlignment'
import { source } from '@cloudinary/url-gen/actions/overlay'
import { text } from '@cloudinary/url-gen/qualifiers/source'
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle'
import { compass } from '@cloudinary/url-gen/qualifiers/gravity'
import { Position } from '@cloudinary/url-gen/qualifiers/position'
import { artisticFilter, blur, grayscale, sepia } from '@cloudinary/url-gen/actions/effect'
import { auto, autoBest, autoGood, autoLow } from '@cloudinary/url-gen/qualifiers/quality'
import { quality } from '@cloudinary/url-gen/actions/delivery'
import { opacity } from '@cloudinary/url-gen/actions/adjust'

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }
})

export const getImage = (publicId: string) => cld.image(publicId)
export const cropByAspectRatio = (image: CloudinaryImage, width: number, height: number) => {
  return image.resize(fill().gravity(center()).width(width).height(height))
}
export const cropByCustomMeasures = (
  image: CloudinaryImage,
  width: number,
  height: number,
  xCrop: number,
  yCrop: number
) => {
  return image
    .resize(crop().width(width).height(height).x(xCrop).y(yCrop))
    .resize(scale().width(width).height(height))
}

export const getFillImage = (image: CloudinaryImage, width: number, height: number) =>
  image.resize(fill().width(width).height(height))

export const overlayImage = (
  image: CloudinaryImage,
  textEntered: string,
  fontFamily: string,
  xCoordinate: number,
  yCoordinate: number
) => {
  return image.overlay(
    source(
      text(textEntered, new TextStyle(fontFamily, 22).fontWeight('bold'))
        .textColor('black')
        .transformation(new Transformation())
    ).position(
      new Position().gravity(compass('north_west')).offsetX(xCoordinate).offsetY(yCoordinate)
    )
  )
}
export const applyFilters = (image: CloudinaryImage, filter: string) => {
  if (filter === 'original') return image
  else if (filter === 'grayscale') return image.effect(grayscale())
  else if (filter === 'sepia') return image.effect(sepia())
  else return image.effect(artisticFilter(filter))
}

export const applyBlur = (image: CloudinaryImage, blurLevel: number) => {
  return image.effect(blur(blurLevel))
}

export const applyOpacity = (image: CloudinaryImage, opacityLevel: number) => {
  return image.adjust(opacity(opacityLevel))
}

export const applyQuality = (image: CloudinaryImage, qualitySelected: string) => {
  let q = ''
  if (qualitySelected === 'low') q = autoLow()
  else if (qualitySelected === 'best') q = autoBest()
  else if (qualitySelected === 'good') q = autoGood()
  else q = auto()
  return image.delivery(quality(q))
}

export const makeFileDownloadable = (image: CloudinaryImage) => {
  return image.addFlag('attachment')
}
