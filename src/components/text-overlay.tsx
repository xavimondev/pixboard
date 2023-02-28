import { useEffect, useRef, useState } from 'react'
import { Cloudinary, Transformation } from '@cloudinary/url-gen'
import { fabric } from 'fabric'
import { source } from '@cloudinary/url-gen/actions/overlay'
import { text } from '@cloudinary/url-gen/qualifiers/source'
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle'
import { compass } from '@cloudinary/url-gen/qualifiers/gravity'
import { Position } from '@cloudinary/url-gen/qualifiers/position'
import { fill } from '@cloudinary/url-gen/actions/resize'

const cld = new Cloudinary({
  cloud: {
    cloudName: ''
  }
})

const myImage = cld.image('01_ntrcum')

export function TextOverlay() {
  const canvasEl = useRef<HTMLCanvasElement>(null)
  const [canvasFabric, setCanvasFabric] = useState<fabric.Canvas | undefined>(undefined)
  useEffect(() => {
    if (!canvasEl.current) return

    const fabricCanvas = new fabric.Canvas(canvasEl.current)
    setCanvasFabric(fabricCanvas)
    fabric.Image.fromURL(
      'https://res.cloudinary.com/product-demos/image/upload/c_fill,g_center,h_1580,w_1960/l_mew:Technology:overlays:01.png/c_limit,fl_relative,h_0.1,w_0.1/fl_layer_apply,g_north_west,x_0.05,y_0.05/f_jpg,q_auto/v1/mew/Technology/assets/01',
      (fabricImg) => {
        fabricImg.scaleToHeight(393)
        fabricImg.scaleToWidth(480)
        const canvasStyle = getComputedStyle(canvasEl.current!)
        const canvasWidth = Number(canvasStyle.width.replace('px', ''))
        const imageRatio = 1960 / 1580
        const canvasHeight = canvasWidth / imageRatio
        fabricCanvas.setHeight(canvasHeight)
        fabricCanvas.setWidth(canvasWidth)
        fabricCanvas.setBackgroundImage(fabricImg, (img: any) => {})
        fabricCanvas.selection = false
      }
    )
    return () => {
      fabricCanvas.dispose()
      setCanvasFabric(undefined)
    }
  }, [])

  const addText = () => {
    // TODO: Add store
    const textBox = new fabric.IText('Enter Text', {
      fontSize: 22,
      fontFamily: 'Arial',
      textAlign: 'left',
      width: 110,
      top: 20,
      left: 10,
      editable: true,
      padding: 1,
      editingBorderColor: 'white',
      cornerStyle: 'circle',
      cornerColor: 'white',
      cornerSize: 7,
      cornerStrokeColor: 'white',
      hasBorders: true,
      borderDashArray: [4],
      borderColor: 'red'
      // splitByGrapheme: true // wrap text when exceed text
    })
    // hide rotation control
    textBox.setControlsVisibility({ mt: false, mb: false, mtr: false }) // controls textbox
    if (canvasFabric) {
      canvasFabric.add(textBox)
      canvasFabric._activeObject = textBox
      // canvasFabric.viewportCenterObjectH(textBox)
      canvasFabric.renderAll()
    }
  }

  const handleTransformation = () => {
    const scaleX = 1960 / 480 // Original width / rendered Width
    const scaleY = 1580 / 393 // Original height / rendered Height
    const imageUrl = myImage.resize(fill().width(1960).height(1580))
    // Adding overlay dinamically on canvas
    canvasFabric?.getObjects().forEach((object) => {
      const { text: textEntered, fontFamily, fontSize } = object
      const { x, y } = object.getCoords()[0]
      const xCoordinate = Math.floor(x * scaleX)
      const yCoordinate = Math.floor(y * scaleY)
      imageUrl.overlay(
        source(
          text(textEntered, new TextStyle(fontFamily, 100).fontWeight('bold'))
            .textColor('black')
            .transformation(new Transformation())
        ).position(
          new Position().gravity(compass('north_west')).offsetX(xCoordinate).offsetY(yCoordinate)
        )
      )
    })

    console.log(imageUrl.toURL())
  }
  return (
    <>
      <div className='w-[480px] max-h-[590px] mt-3 border-1'>
        <canvas width={480} height={393} ref={canvasEl} />
      </div>
      <button
        className='mt-2 px-5 py-1.5 rounded-3xl border-1 text-white p-2 bg-neutral-800 flex'
        onClick={addText}
      >
        <svg
          data-test='viewIcon'
          className='h-8 w-8 text-white'
          viewBox='0 0 24 24'
          preserveAspectRatio='xMidYMid'
        >
          <path
            fill='currentColor'
            stroke='currentColor'
            d='M8.0625,3.5625 L8.0625,6.9375 L13.6875,6.9375 L13.6875,20.4375 L17.0625,20.4375 L17.0625,6.9375 L22.6875,6.9375 L22.6875,3.5625 L8.0625,3.5625 Z M1.3125,12.5625 L4.6875,12.5625 L4.6875,20.4375 L8.0625,20.4375 L8.0625,12.5625 L11.4375,12.5625 L11.4375,9.1875 L1.3125,9.1875 L1.3125,12.5625 Z'
          />
        </svg>
      </button>
      <button
        className='mt-2 px-5 py-1.5 rounded-3xl border-1 text-white p-2 bg-neutral-800 flex'
        onClick={handleTransformation}
      >
        Next
      </button>
    </>
  )
}
