import { useRouter } from 'next/router'
import { APP_URL } from '@/utils/constants'
import { copyTextToClipboard } from '@/utils/copyToClipboard'
import { ShareIc } from './icons'

export function ShareOption() {
  const router = useRouter()

  return (
    <button
      className='flex gap-1 items-center text-sky-500 font-semibold text-base bg-sky-700/[0.5] py-1.5 px-2 rounded-md'
      onClick={() => copyTextToClipboard(`${APP_URL}/${router.asPath}`)}
    >
      Share
      <ShareIc className='w-5 h-5 text-sky-500' />
    </button>
  )
}
