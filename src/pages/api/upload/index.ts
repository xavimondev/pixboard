import type { NextApiRequest, NextApiResponse } from 'next'
import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  try {
    const image = req.body.imageBase64
    const uploadedImageResponse = await cloudinary.v2.uploader.upload(image, {
      folder: process.env.CLOUDINARY_FOLDER_IMAGES
    })
    const { secure_url, width, height, asset_id, public_id } = uploadedImageResponse
    return res.status(200).json({
      id: asset_id,
      url: secure_url,
      width,
      height,
      publicId: public_id
    })
  } catch (error) {
    return res.status(500).json({
      error: 'An error has ocurred'
    })
  }
}
