type PlaceholderProps = {
  length?: number
}

export function PlaceHolder({ length }: PlaceholderProps) {
  if (!length) return <PlaceHolderItem />

  return (
    <>
      {Array.from({ length }, (_, index) => index + 1).map((item) => (
        <PlaceHolderItem key={item} />
      ))}
    </>
  )
}

function PlaceHolderItem() {
  return <div className='rounded-full bg-slate-700 w-7 h-7 sm:w-9 sm:h-9' />
}
