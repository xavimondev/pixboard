type ToolsOverlayProps = {
  addText: any
}
export function ToolsOverlay({ addText }: ToolsOverlayProps) {
  return (
    <div className='bg-neutral-800 shadow-sm rounded-lg space-x-3 p-4'>
      <button
        className='rounded-md border-1 px-4 py-2 bg-sky-700/[0.5] text-sky-500 hover:bg-sky-700 hover:text-sky-600'
        onClick={addText}
      >
        Add Text
      </button>
      {/* <button
        className='mt-2 px-5 py-1.5 rounded-3xl border-1 text-white p-2 bg-neutral-800 flex'
        onClick={handleTransformation}
      >
        Next
      </button> */}
    </div>
  )
}
