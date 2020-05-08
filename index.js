const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')

const width = 600
const height = 400

const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')

context.fillStyle = 'black'
context.fillRect(0, 0, width, height)

context.font = 'bold 40pt Courier New'
context.textAlign = 'center'
context.textBaseline = 'top'


const text = 'El Gran Mago!'

context.fillStyle = '#fff'
context.fillText(text,  (width/4)*3,  height/4)

context.fillStyle = '#fff'
context.font = 'bold 30pt Courier New'
context.fillText('rodcordeiro.com.br',(width/4)*3,  (height/4)+30)

loadImage('./mago.png').then(image => {
    context.drawImage(image,  (width/4)/2, (height/4)/2, width/4 , (height/4)*3)
    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync('./test.png', buffer)
  })