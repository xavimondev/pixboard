import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { authOptions } from '../api/auth/[...nextauth]'
import useStore from '@/state/store'
import { APP_URL } from '@/utils/constants'
import { getBoardId } from '@/utils/getRandomData'
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
  isToolbarEnable: boolean
}

const MAX_USERS = 3

export default function BoardView({ userInfo, presetImages, isToolbarEnable }: BoardProps) {
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
    <Layout user={userInfo} isToolbarEnable={isToolbarEnable}>
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
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  res,
  query,
  resolvedUrl
}) => {
  const session = await getServerSession(req, res, authOptions)
  // console.log(resolvedUrl)
  if (!session) {
    return {
      redirect: {
        destination: `/?callbackUrl=${encodeURIComponent(`${APP_URL}${resolvedUrl}`)}`,
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
  const roomId = query.id
  // I added this flag because I just want to display the toolbar to the first user who joined in
  // This logic can change by adding owner property to the room
  let isToolbarEnable = true

  try {
    // Only 3 users are allowed, so I need to validate this
    const resultLive = await fetch(`https://api.liveblocks.io/v2/rooms/${roomId}/active_users`, {
      headers: {
        Authorization: `Bearer ${process.env.LIVEBLOCKS_SECRET}`
      }
    })
    const activeUsers = await resultLive.json()
    if (!activeUsers.error) {
      // @ts-ignore
      const totalUsersActive = activeUsers.data.length
      // console.log(totalUsersActive)
      if (totalUsersActive > 0) {
        isToolbarEnable = false
      }
      if (totalUsersActive === MAX_USERS) {
        return {
          redirect: {
            destination: `/board/${getBoardId()}`,
            permanent: false
          }
        }
      }
    }
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      userInfo,
      presetImages,
      isToolbarEnable
    }
  }
}
