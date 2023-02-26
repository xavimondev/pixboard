import Image from 'next/image'

type AvatarProps = {
  name: string
  avatar: string
  color: string
}

export function Avatar({ name, avatar, color }: AvatarProps) {
  return (
    <Image
      className='w-7 h-7 sm:w-9 sm:h-9 border-2 border-white rounded-full dark:border-gray-800'
      style={{
        backgroundColor: color
      }}
      src={avatar}
      width='100'
      height='100'
      alt={name}
    />
  )
}

type AvatarEllipsisProps = {
  size: number
}

export function AvatarEllipsis({ size }: AvatarEllipsisProps) {
  return (
    <div className='flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800'>
      <span>+{size}</span>
    </div>
  )
}
