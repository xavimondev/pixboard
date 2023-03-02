import { fileToBase64 } from '@/utils/transformToBase64'
export const uploadFile = async (file: File) => {
  const imageBase64: string = (await fileToBase64(file)) as string
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: JSON.stringify({ imageBase64 }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  return data.url
}
