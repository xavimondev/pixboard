import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { User } from '@/types/user'
import { getBoardId } from '@/utils/getRandomData'
import { Layout } from '@/components/layout'
import { ArrowRightIc } from '@/components/icons'

type BoardProps = {
  userInfo: {
    user: User
    status: number
  }
}

export default function Home({ userInfo }: BoardProps) {
  return (
    <>
      <Layout user={userInfo.user} isToolbarEnable>
        {userInfo.user ? (
          <div className='flex items-center justify-center'>
            <a
              className='text-sky-500 font-semibold text-base bg-sky-700/[0.5] py-1.5 px-4 rounded-md flex items-center gap-2'
              href={`/board/${getBoardId()}`}
            >
              Go to Room
              <ArrowRightIc className='w-5 h-5 text-sky-500' />
            </a>
          </div>
        ) : null}
      </Layout>
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
