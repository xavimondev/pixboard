import { useMemo } from 'react'
import { getContrastingColor } from '@/utils/getContrastingColor'
// Source: https://liveblocks.io/blog/how-to-animate-multiplayer-cursors
type CursorProps = {
  color: string
  name: string
  x: number
  y: number
  setCursor: (cursor: any) => void
}

export function Cursor({ color, name, x, y, setCursor }: CursorProps) {
  const textColor = useMemo(() => (color ? getContrastingColor(color) : undefined), [color])

  return (
    <div
      className='absolute top-0 left-0 transform duration-[120ms] ease-linear'
      style={{ transform: `translate(${x}px, ${y}px` }}
      onPointerMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
    >
      <svg fill='none' viewBox='0 0 16 16' className='h-6 w-6'>
        <path
          d='M0.928548 2.18278C0.619075 1.37094 1.42087 0.577818 2.2293 0.896107L14.3863 5.68247C15.2271 6.0135 15.2325 7.20148 14.3947 7.54008L9.85984 9.373C9.61167 9.47331 9.41408 9.66891 9.31127 9.91604L7.43907 14.4165C7.09186 15.2511 5.90335 15.2333 5.58136 14.3886L0.928548 2.18278Z'
          fill={color}
        />
      </svg>
      <div
        className='rounded-full py-1 px-3.5 w-full ml-4'
        style={{
          background: color
        }}
      >
        <span
          className='font-semibold'
          style={{
            color: textColor
          }}
        >
          {name}
        </span>
      </div>
    </div>
  )
}
