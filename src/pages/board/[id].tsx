import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { authOptions } from '../api/auth/[...nextauth]'
import useStore from '@/state/store'
import type { PresetImage } from '@/types/board'
import type { User } from '@/types/user'
import { Layout } from '@/components/layout'
import { StarterFile } from '@/components/starter-file'
import { Dropzone } from '@/components/dropzone'
import { PresetsImages } from '@/components/presets-images'
import { Editor } from '@/components/editor'
import { BoardLoader } from '@/components/loaders'

type BoardProps = {
  userInfo: User
  presetImages: PresetImage[]
}

export default function BoardView({ userInfo, presetImages }: BoardProps) {
  const {
    liveblocks: { enterRoom, leaveRoom }
  } = useStore()
  const { query } = useRouter()
  const isLoading = useStore((state) => state.isLoading)
  const setIsLoading = useStore((state) => state.setIsLoading)
  const mainImage = useStore((state) => state.mainImage)

  useEffect(() => {
    if (!query.id) return

    enterRoom(query.id as string)

    return () => {
      leaveRoom(query.id as string)
    }
  }, [query.id])

  // TODO: Change this weird effect
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => {
      clearTimeout(timeOut)
    }
  }, [])

  return (
    <Layout user={userInfo}>
      {isLoading ? (
        <BoardLoader />
      ) : (
        <>
          {mainImage ? (
            <Editor />
          ) : (
            <StarterFile>
              <Dropzone />
              <p className='text-sm text-gray-400 mb-2 font-medium'>
                Or maybe you want to choose one of these presets to start quickly.
              </p>
              <PresetsImages presetsImages={presetImages} />
            </StarterFile>
          )}
        </>
      )}
    </Layout>
  )
}
type ServerSideProps = {}
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  const user = session?.user as User
  // console.log(user)
  const userInfo = {
    ...user,
    avatar: user.avatar
  }

  const results = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/resources/image/upload?prefix=pixboard/presets`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET
        ).toString('base64')}`
      }
    }
  )
  const images = await results.json()

  const presetImages = images.resources.map(
    ({ asset_id, width, height, secure_url, public_id }: any) => ({
      id: asset_id,
      width,
      height,
      url: secure_url,
      publicId: public_id
    })
  )

  return {
    props: {
      userInfo,
      presetImages
    }
  }
}
