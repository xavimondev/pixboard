import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen'
import { scale, fill, crop } from '@cloudinary/url-gen/actions/resize'
import { center } from '@cloudinary/url-gen/qualifiers/textAlignment'

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }
})

export const getImage = (publicId: string) => cld.image(publicId)
export const cropByAspectRatio = (image: CloudinaryImage, width: number, height: number) => {
  return image.resize(fill().gravity(center()).width(width).height(height)).toURL()
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
    .toURL()
}
