import React, { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import type { IText } from 'fabric/fabric-impl'
import { nanoid } from 'nanoid'
import { Cloudinary, Transformation } from '@cloudinary/url-gen'
import { source } from '@cloudinary/url-gen/actions/overlay'
import { text } from '@cloudinary/url-gen/qualifiers/source'
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle'
import { compass } from '@cloudinary/url-gen/qualifiers/gravity'
import { Position } from '@cloudinary/url-gen/qualifiers/position'
import { fill } from '@cloudinary/url-gen/actions/resize'
import useStore from '@/state/store'
import { ToolsOverlay } from './tools'

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
  borderColor: 'red',
  text: 'Enter Text'
}
export const TextOverlay = React.memo(function TextOverlay() {
  const canvasEl = useRef<HTMLCanvasElement>(null)
  const [canvasFabric, setCanvasFabric] = useState<fabric.Canvas | undefined>(undefined)
  const textBoxObjects = useStore((state) => state.textBoxObjects)
  const addTextBoxObject = useStore((state) => state.addTextBoxObject)
  const onPointerOverlayDown = useStore((state) => state.onPointerOverlayDown)
  const onPointerOverlayUp = useStore((state) => state.onPointerOverlayUp)
  const onOverlayDragging = useStore((state) => state.onOverlayDragging)
  const selectedOverlay = useStore((state) => state.selectedOverlay)
  const isFirstRender = useStore((state) => state.isFirstRender)
  const setIsFirstRender = useStore((state) => state.setIsFirstRender)
  const isDragging = useStore((state) => state.isDragging)
  const onOverlayTyping = useStore((state) => state.onOverlayTyping)
  const isTyping = useStore((state) => state.isTyping)
  const currentUser = useStore((state) => state.liveblocks.room?.getSelf())

  useEffect(() => {
    if (!canvasEl.current) return

    const fabricCanvas = new fabric.Canvas(canvasEl.current)
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
        // setIsFirstRender(true)
        fabricCanvas
          .on('mouse:up', (event) => {
            if (event.target) {
              // console.log('up')
              onPointerOverlayUp()
            }
          })
          .on('mouse:down', (event) => {
            if (event.target) {
              const id = event.target.id
              onPointerOverlayDown(id)
            }
          })
          .on('object:moving', (event) => {
            const elemenTarget = event.target
            const { id, top, left } = elemenTarget
            if (elemenTarget) {
              onOverlayDragging({
                x: left,
                y: top
              })
            }
          })
          .on('text:changed', (event) => {
            const elmTarget = event.target
            if (elmTarget) {
              // console.log(elmTarget.text, elmTarget.getScaledWidth(), elmTarget.getScaledHeight())
              onOverlayTyping({
                text: elmTarget.text,
                width: elmTarget.getScaledWidth(),
                height: elmTarget.getScaledHeight()
              })
            }
          })
        setCanvasFabric(fabricCanvas)
      }
    )
    return () => {
      fabricCanvas.dispose()
      setCanvasFabric(undefined)
    }
  }, [])

  useEffect(() => {
    if (textBoxObjects.length === 0 || !canvasFabric) return
    if (isFirstRender) {
      console.log('usEffect general objects')
      // console.log(textBoxObjects)
      textBoxObjects.forEach((obj: any) => {
        const textBox = new fabric.IText('Enter Text', obj)
        textBox.setControlsVisibility({ mt: false, mb: false, mtr: false }) // controls textbox
        canvasFabric.add(textBox)
        canvasFabric.renderAll()
        setIsFirstRender(false)
      })
    }
  }, [textBoxObjects])

  useEffect(() => {
    if (!canvasFabric || textBoxObjects.length === 0) return

    const { owner, id } = textBoxObjects.at(-1) // Getting last overlay saved

    if (!isFirstRender && owner !== currentUser?.id) {
      valuesTextBox.id = id
      valuesTextBox.owner = owner
      const textBox = new fabric.IText('Enter Text', valuesTextBox)
      textBox.set('editable', true)
      textBox.setControlsVisibility({ mt: false, mb: false, mtr: false }) // controls textbox
      canvasFabric.add(textBox)
      canvasFabric.renderAll()
    }
  }, [textBoxObjects.length])

  useEffect(() => {
    if (!canvasFabric) return
    if (!selectedOverlay) return

    if (isDragging) {
      const overlayObject = canvasFabric
        .getObjects()
        .find((obj) => obj.id === selectedOverlay) as IText
      if (overlayObject) {
        const overlaySelectedData = textBoxObjects.find(
          (txtObject: any) => txtObject.id === selectedOverlay
        )
        if (overlaySelectedData) {
          const { top, left } = overlaySelectedData

          overlayObject.set('top', top)
          overlayObject.set('left', left)
          overlayObject.set('editable', true)
          canvasFabric._activeObject = overlayObject
          canvasFabric.renderAll()
        }
      }
    }

    if (isTyping) {
      const overlayObject = canvasFabric
        .getObjects()
        .find((obj) => obj.id === selectedOverlay) as IText
      if (overlayObject) {
        const overlaySelectedData = textBoxObjects.find(
          (txtObject: any) => txtObject.id === selectedOverlay
        )
        if (overlaySelectedData) {
          const { width, height, text } = overlaySelectedData
          overlayObject.set('width', width)
          overlayObject.set('height', height)
          overlayObject.set('text', text)
          // canvasFabric._activeObject = overlayObject
          canvasFabric.renderAll()
        }
      }
    }
  }, [textBoxObjects])

  const addText = () => {
    const idTextBox = nanoid(4)
    valuesTextBox.id = idTextBox
    valuesTextBox.owner = currentUser.id
    const textBox = new fabric.IText('Enter Text', valuesTextBox)
    // hide rotation control
    textBox.setControlsVisibility({ mt: false, mb: false, mtr: false }) // controls textbox
    if (canvasFabric) {
      canvasFabric.add(textBox)
      canvasFabric._activeObject = textBox
      canvasFabric.renderAll()
    }
    addTextBoxObject(valuesTextBox)
    if (isFirstRender) setIsFirstRender(false)
  }

  const handleTransformation = () => {
    const scaleX = 1960 / 480 // Original width / rendered Width
    const scaleY = 1580 / 393 // Original height / rendered Height
    const imageUrl = myImage.resize(fill().width(1960).height(1580))
    // Adding overlay dinamically on canvas
    canvasFabric?.getObjects().forEach((objectOverlay) => {
      const { text: textEntered, fontFamily, fontSize } = objectOverlay
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
    <div className='flex flex-col'>
      <ToolsOverlay addText={addText} />
      <div className='w-[480px] max-h-[590px] mt-3 border-1'>
        <canvas width={480} height={393} ref={canvasEl} />
      </div>
    </div>
  )
})
