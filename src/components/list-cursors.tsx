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
            color={info?.color}
            key={connectionId}
            name={info?.name}
            x={presence.cursor.x}
            y={presence.cursor.y}
          />
        )
      })}
    </>
  )
}
