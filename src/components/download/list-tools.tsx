export function BlurTweak() {
  return (
    <div className='flex flex-col w-full'>
      <label htmlFor='blur' className='block mb-3 font-medium text-white'>
        Blur level
      </label>
      <span className='text-sm text-gray-400 w-full mb-2'>(Min: 0 and Max: 2000)</span>
      <input
        id='blur'
        type='range'
        min={0}
        max={2000}
        defaultValue={0}
        className='w-full h-2 rounded-lg appearance-none cursor-pointer bg-neutral-700'
      />
    </div>
  )
}
export function OpacityTweak() {
  return (
    <div className='flex flex-col w-full'>
      <label htmlFor='opacity' className='block mb-2 font-medium text-white'>
        Opacity level
      </label>
      <span className='text-sm text-gray-400 w-full mb-2'>
        (100 means completely opaque and 0 is completely transparent)
      </span>
      <input
        id='opacity'
        type='range'
        min={0}
        max={100}
        defaultValue={0}
        className='w-full h-2 rounded-lg appearance-none cursor-pointer bg-neutral-700'
      />
    </div>
  )
}
export function QualityTweak() {
  return (
    <div className='flex flex-col w-full'>
      <label htmlFor='blur' className='block mb-3 font-medium text-white'>
        Quality
      </label>
      <div className='flex items-center mb-4'>
        <input
          id='radioAuto'
          type='radio'
          checked
          name='quality'
          className='w-4 h-4 text-neutral-600 bg-gray-700 border-gray-600'
        />
        <label htmlFor='radioAuto' className='ml-2 text-sm font-medium text-gray-300'>
          Auto
        </label>
      </div>
      <div className='flex items-center mb-4'>
        <input
          id='radioBest'
          type='radio'
          name='quality'
          className='w-4 h-4 text-neutral-600 bg-gray-700 border-gray-600'
        />
        <label htmlFor='radioBest' className='ml-2 text-sm font-medium text-gray-300'>
          Best
        </label>
      </div>
      <div className='flex items-center mb-4'>
        <input
          id='radioGood'
          type='radio'
          name='quality'
          className='w-4 h-4 text-neutral-600 bg-gray-700 border-gray-600'
        />
        <label htmlFor='radioGood' className='ml-2 text-sm font-medium text-gray-300'>
          Good
        </label>
      </div>
      <div className='flex items-center mb-4'>
        <input
          id='radioLow'
          type='radio'
          name='quality'
          className='w-4 h-4 text-neutral-600 bg-gray-700 border-gray-600'
        />
        <label htmlFor='radioLow' className='ml-2 text-sm font-medium text-gray-300'>
          Low
        </label>
      </div>
    </div>
  )
}
export function ListTools() {
  return (
    <div className='flex flex-col gap-10 h-full w-full'>
      <BlurTweak />
      <OpacityTweak />
      <QualityTweak />
      <div className='flex flex-col gap-1'>
        <span className='block mb-3 font-medium text-white'>Download</span>
        <div className='flex flex-row items-center gap-4'>
          <div className='border border-neutral-900 rounded-md max-h-36 overflow-hidden p-2 bg-neutral-800'>
            <p className='font-medium text-sm text-gray-400 truncate h-full'>
              https://res.cloudinary.com/product-demos/image/upload/c_fill,g_center,h_1580,w_1960/l_mew:Fashion:overlays:01.png/c_limit,fl_relative,h_0.1
            </p>
          </div>
          <div className='flex flex-row justify-between'>
            <a
              href='https://res.cloudinary.com/product-demos/image/upload/c_fill,g_center,h_1580,w_1960/l_mew:Fashion:overlays:01.png/c_limit,fl_relative,h_0.1,w_0.1/fl_layer_apply,g_north_west,x_0.05,y_0.05/f_jpg,q_auto:low/v1/mew/Fashion/assets/01'
              className='text-sky-500 font-semibold text-base bg-sky-700/[0.5] p-1.5 rounded-md flex items-center'
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
