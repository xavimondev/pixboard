import useStore from '@/state/store'
import { Cursor } from './cursor'

export function ListCursors() {
  const others = useStore((state) => state.liveblocks.others)
  return (
    <>
      {others.map((user) => {
        const { connectionId, presence, info } = user
        if (presence == null || presence.cursor == null) {
          return null
        }
        // TODO: add types
        return (
          <Cursor
            // @ts-ignore
            color={info?.color}
            key={connectionId}
            // @ts-ignore
            name={info?.name}
            // @ts-ignore
            x={presence.cursor.x}
            // @ts-ignore
            y={presence.cursor.y}
          />
        )
      })}
    </>
  )
}
