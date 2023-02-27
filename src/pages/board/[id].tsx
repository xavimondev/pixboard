import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { authOptions } from '../api/auth/[...nextauth]'
import useStore from '@/state/store'
import { User } from '@/types/user'
import { ListCursors } from '@/components/list-cursors'
import { Cropper } from '@/components/cropper'
import { Layout } from '@/components/layout'

type BoardProps = {
  userInfo: User
}

export default function BoardView({ userInfo }: BoardProps) {
  const {
    liveblocks: { enterRoom, leaveRoom }
  } = useStore()
  const { query } = useRouter()
  const setCursor = useStore((state) => state.setCursor)

  useEffect(() => {
    if (!query.id) return

    enterRoom(query.id as string)

    return () => {
      leaveRoom(query.id as string)
    }
  }, [query.id])

  return (
    <Layout user={userInfo}>
      <div
        className='top-6 min-h-screen h-full w-full'
        onPointerMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      >
        <Cropper />
        <ListCursors />
      </div>
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

  return {
    props: {
      userInfo
    }
  }
}
