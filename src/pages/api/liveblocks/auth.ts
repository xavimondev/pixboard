import { NextApiRequest, NextApiResponse } from 'next'
import { authorize } from '@liveblocks/node'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { User } from '@/types/user'
import { getRandomColor } from '@/utils/getRandomData'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const { room } = req.body
  // Get current session from NextAuth
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({
      error: {
        code: 401,
        message: 'No access',
        suggestion: "You don't have access to this room"
      }
    })
  }

  const { id, name, avatar } = session.user as User
  const result = await authorize({
    room,
    secret: process.env.LIVEBLOCKS_SECRET || '',
    userId: id,
    userInfo: {
      name,
      avatar,
      color: getRandomColor()
    }
  })

  return res.status(result.status).end(result.body)
}
