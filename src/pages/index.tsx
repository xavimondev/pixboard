import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { getServerSession } from 'next-auth'
import { User } from '@/types/user'
import { getRandomAvatar } from '@/utils/getRandomData'
import { authOptions } from './api/auth/[...nextauth]'
import { Layout } from '@/components/layout'
import { HeaderToolbar } from '@/components/header-toolbar'
import { AuthBar } from '@/components/auth-bar'

type BoardProps = {
  userInfo: {
    user: User
    status: number
  }
}

export default function Home({ userInfo }: BoardProps) {
  return (
    <>
      <Head>
        <title>Pixboard.io - A realtime collaboration tool for editing images</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='A realtime collaboration tool for editing images' />
        <meta name='theme-color' content='#0d1117' />
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:url' content='https://pixboard.vercel.app' />
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content='Pixboard.io - A realtime collaboration tool for editing images'
        />
        <meta
          property='og:description'
          content='A realtime collaboration tool for editing images'
        />
        {/* <meta property='og:image' content='https://https://pixboard.vercel.app/ogimage.jpeg' /> */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@xavimonp' />
        <meta name='twitter:creator' content='@xavimonp' />
        <meta
          name='twitter:title'
          content='pixboard.io - A realtime collaboration tool for editing images'
        />
        <meta
          name='twitter:description'
          content='A realtime collaboration tool for editing images'
        />
      </Head>
      <Layout user={userInfo.user}>
        <HeaderToolbar />
        <AuthBar user={userInfo.user} />
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
        avatar: user.avatar ?? getRandomAvatar()
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
