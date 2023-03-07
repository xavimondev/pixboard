import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { User } from '@/types/user'
import { authOptions } from './api/auth/[...nextauth]'
import { Layout } from '@/components/layout'

type BoardProps = {
  userInfo: {
    user: User
    status: number
  }
}

export default function Home({ userInfo }: BoardProps) {
  return (
    <>
      <Layout user={userInfo.user} />
    </>
  )
}
interface ServerSideProps {
  userInfo:
    | User
    | {
        status: number
      }
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions)
  const user = session?.user as User
  let userInfo = null
  if (user) {
    userInfo = {
      user: {
        ...user,
        avatar: user.avatar
      },
      status: 1
    }
  } else {
    userInfo = {
      status: 0
    }
  }
  return {
    props: {
      userInfo
    }
  }
}
