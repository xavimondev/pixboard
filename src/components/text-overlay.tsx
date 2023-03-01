import React, { useEffect, useRef, useState } from 'react'
import { Cloudinary, Transformation } from '@cloudinary/url-gen'
import { fabric } from 'fabric'
import { nanoid } from 'nanoid'
import { source } from '@cloudinary/url-gen/actions/overlay'
import { text } from '@cloudinary/url-gen/qualifiers/source'
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle'
import { compass } from '@cloudinary/url-gen/qualifiers/gravity'
import { Position } from '@cloudinary/url-gen/qualifiers/position'
import { fill } from '@cloudinary/url-gen/actions/resize'
import useStore from '@/state/store'
import { Coordinates } from '@/types/board'
import type { IText } from 'fabric/fabric-impl'

const cld = new Cloudinary({
  cloud: {
    cloudName: ''
  }
})

const myImage = cld.image('01_ntrcum')
const valuesTextBox: fabric.ITextOptions = {
  isNew: true,
  fontSize: 22,
  fontFamily: 'Arial',
  textAlign: 'left',
  width: 110,
  top: 20,
  left: 10,
  padding: 1,
  editingBorderColor: 'white',
  cornerStyle: 'circle',
  cornerColor: 'white',
  cornerSize: 7,
  cornerStrokeColor: 'white',
  hasBorders: true,
  borderDashArray: [4],
  borderColor: 'red'
}
export const TextOverlay = React.memo(function TextOverlay() {
  const canvasEl = useRef<HTMLCanvasElement>(null)
  const [canvasFabric, setCanvasFabric] = useState<fabric.Canvas | undefined>(undefined)
  const textBoxObjects = useStore((state) => state.textBoxObjects)
  const addTextBoxObject = useStore((state) => state.addTextBoxObject)
  const updateTextObject = useStore((state) => state.updateTextObject)
  const setSelectedObject = useStore((state) => state.setSelectedObject)
  const selectedTextObject = useStore((state) => state.selectedTextObject)
  const isFirstRender = useRef<boolean>(true)
  const currentUser = useStore((state) => state.liveblocks.room?.getSelf())

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
        fabricCanvas
          .on('object:moving', (event) => {
            const elemenTarget = event.target
            const { id, top, left } = elemenTarget
            if (elemenTarget) {
              // console.log(`This object moving: ${id} - ${top} - ${left}`)
              const coordinates: Coordinates = {
                x: left,
                y: top
              }
              // updateTextObject(id, coordinates)
              // setSelectedObject({
              //   id,
              //   coordinates
              // })
            }
          })
          .on('object:scaling', (event) => {
            const elmTarget = event.target
            console.log(elmTarget?.getScaledWidth(), elmTarget?.getScaledHeight())
          })
          .on('text:changed', (event) => {
            const elmTarget = event.target
            console.log(elmTarget?.text, elmTarget?.getScaledWidth(), elmTarget?.getScaledHeight())
          })
      }
    )
    return () => {
      fabricCanvas.dispose()
      setCanvasFabric(undefined)
    }
  }, [])

  // console.log(textBoxObjects)
  useEffect(() => {
    if (!canvasFabric) return
    if (textBoxObjects.length === 0) return

    const objectOwner = textBoxObjects.at(-1).owner

    if (!isFirstRender.current && objectOwner !== currentUser?.id) {
      const textBox = new fabric.IText('Enter Text', valuesTextBox)
      textBox.set('editable', true)
      textBox.setControlsVisibility({ mt: false, mb: false, mtr: false }) // controls textbox
      canvasFabric.add(textBox)
      canvasFabric.renderAll()
    }

    // const objectCreated = canvasFabric.getObjects().find((obj) => obj.id === selectedTextObject.id)
    // if (objectCreated) {
    //   const { x, y } = selectedTextObject.coordinates
    //   // console.log('This object exists! Just move it')
    //   const currentObject = objectCreated as IText
    //   currentObject.set('top', y)
    //   currentObject.set('left', x)
    //   currentObject.set('editable', true)
    //   currentObject.set('isNew', false)
    //   canvasFabric.renderAll()
    // }
  }, [textBoxObjects.length])

  useEffect(() => {
    if (textBoxObjects.length === 0) return
    if (isFirstRender.current) {
      console.log('usEffect general objects')
      textBoxObjects.forEach((obj: any) => {
        const textBox = new fabric.IText('Enter Text', obj)
        textBox.setControlsVisibility({ mt: false, mb: false, mtr: false }) // controls textbox
        if (canvasFabric) {
          canvasFabric.add(textBox)
          canvasFabric.renderAll()
          isFirstRender.current = false
        }
      })
    }
  }, [textBoxObjects])

  const addText = () => {
    // TODO: Extend interface ITextOptions
    const idTextBox = nanoid(4)
    valuesTextBox.id = idTextBox
    valuesTextBox.owner = currentUser.id
    const textBox = new fabric.IText('Enter Text', valuesTextBox)
    // hide rotation control
    textBox.setControlsVisibility({ mt: false, mb: false, mtr: false }) // controls textbox
    if (canvasFabric) {
      canvasFabric.add(textBox)
      canvasFabric._activeObject = textBox
      // canvasFabric.viewportCenterObjectH(textBox)
      canvasFabric.renderAll()
    }
    addTextBoxObject(valuesTextBox)
  }

  const handleTransformation = () => {
    const scaleX = 1960 / 480 // Original width / rendered Width
    const scaleY = 1580 / 393 // Original height / rendered Height
    const imageUrl = myImage.resize(fill().width(1960).height(1580))
    // Adding overlay dinamically on canvas
    canvasFabric?.getObjects().forEach((object) => {
      const { text: textEntered, fontFamily, fontSize } = object
      const { x, y } = object.getCoords()[0] // TODO: Change this for top and left
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
})
