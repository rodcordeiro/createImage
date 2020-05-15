const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')

const title = "Creating Images"
const description = "Creating images using node-Canvas"
const bg = "assets/vader.png"
const sizes = {
  mobile:{
    width : 600,
    height : 400    
  },
  desktop:{
    width : 1200,
    height : 800    
  },
  devto:{
    width: 1000,
    height: 420
  }
}
const size = sizes.devto

const width = size.width
const height = size.height

const fontSize = height * 0.05
const line = height *0.1

const logoWidth = logoSizes(height,width)
const logoHeight = logoSizes(height,width)
const logoMargin = logoSizes(height,width)

function logoSizes(y,x){
  if(x == sizes.desktop.width){
    return ((y*x) *0.01)/100
  }
  if(x == sizes.mobile.width){
    return ((y*x) *0.025)/100      
  }
}

function safeMargin(size) {return size * 0.05}

const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')

context.fillStyle = 'black'
context.fillRect(0, 0, width, height)

    
function fillImage(context){

  writeTitle(title,context,safeMargin(width),line*7)
  writeSubTitle(description,context,safeMargin(width),line*8)
  
}

function writeTitle(text,context,x,y){
  
  const larg = safeMargin(width) *2 + ((width/line) * text.length)

  context.fillStyle = '#181818'
  context.fillRect(0, y - 5, larg,line)
  
  
  context.font = `bold ${fontSize}pt Courier New`
  context.textAlign = 'left'
  context.textBaseline = 'top'
  context.fillStyle = '#fff'
  context.fillText(text, x, y)
}

function writeSubTitle(text,context,x,y){
  
  const larg = safeMargin(width) *2 + ((width/line) * text.length)

  context.fillStyle = '#181818'
  context.fillRect(0, y - 5, larg,line)
  
  
  context.font = `${fontSize - fontSize*0.05}pt Courier New`
  context.textAlign = 'left'
  context.textBaseline = 'top'
  context.fillStyle = '#fff'
  context.fillText(text, x, y)
}

loadImage(bg).then(image => {
  context.drawImage(image,  0, 0, width , height)
 
  loadImage('assets/RC-W.png').then(image => {
    context.drawImage(image, width - logoMargin *1.5, safeMargin(height),logoWidth,logoHeight)
    
    fillImage(context)
    
    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync('./result.png', buffer)
    
  })
})
