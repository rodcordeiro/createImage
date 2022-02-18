const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
// const title = "Trello API"
// const description = "How to work with trello API"
const title = "Creating Images"
const description = "Creating images using node-Canvas"
const bg = "https://rodcordeiro.github.io/shares/img/paisagem.jpg"
// "https://rodcordeiro.github.io/shares/img/vmask_troopers.jpg"
//"https://rodcordeiro.github.io/shares/img/vader.png"
//"https://rodcordeiro.github.io/shares/img/vmask_troopers.jpg"
//"https://rodcordeiro.github.io/shares/img/codigo3.jpeg"
const logo = "https://rodcordeiro.github.io/shares/img/RC-W.png"//'assets/RC-W.png'
//"https://rodcordeiro.github.io/shares/img/RC.png"


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

function createFiles(){
  for(size in sizes){
    createImage(size,sizes[size])
  }
}

createFiles()

function createImage(name,size){
  const width = size.width
  const height = size.height

  const fontSize = height * 0.05
  const line = height * 0.1

  const logoWidth = logoSizes(height,width)
  const logoHeight = logoSizes(height,width)
  const logoMargin = logoSizes(height,width)

  //Cria o canvas e o context que serão utilizados como área 
  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')
  
  //preenche a área com um quadro preto
  context.fillStyle = 'white'
  context.fillRect(0, 0, width, height)
  
  //Carrega o background
  loadImage(bg).then(image => {
    context.drawImage(image,  0, 0, width , height)
    
    //Carrega o logo
    loadImage(logo).then(image => {
      //Insere o logo
      context.drawImage(image, width - logoMargin *1.5, safeMargin(height),logoWidth,logoHeight)

      // Escreve o título e subtitulo
      writeTitle(title,context,safeMargin(width),line*7,width,line,fontSize)
      writeSubTitle(description,context,safeMargin(width),line*8,width,line,fontSize)
  
      //Salva o arquivo
      // const dataUrl = canvas.toDataURL('image/png')
      // console.log(dataUrl)
      const buffer = canvas.toBuffer('image/png')
      fs.writeFileSync(`./results/${name}.png`, buffer)
    });
  });
}

function logoSizes(y,x){
  if(x == sizes.desktop.width){
    return ((y*x) *0.01)/100
  }
  else {
    return ((y*x) *0.025)/100      
 }
}
function safeMargin(size) {return size * 0.05}

function writeTitle(text,context,x,y,width,line,fontSize){
  // const larg = safeMargin(width) *2 + ((width/line) * text.length)
    const larg = safeMargin(width) * 2 + textSize(text);
    context.fillStyle = '#181818'
    context.fillRect(0, y - 5, larg,line)
    
    
    context.font = `bold ${fontSize}pt Courier New`
    context.textAlign = 'left'
    context.textBaseline = 'top'
    context.fillStyle = '#fff'
    context.fillText(text, x, y)
  }

  function writeSubTitle(text,context,x,y,width,line,fontSize){
    const larg =safeMargin(width) * 2 + textSize(text); //textSize(text) + (safeMargin(width) * (fontSize / 2)) //
    
    context.fillStyle = '#181818'
    context.fillRect(0, y - 5, larg,line)
    
    
    context.font = `${fontSize - fontSize*0.05}pt Courier New`
    context.textAlign = 'left'
    context.textBaseline = 'top'
    context.fillStyle = '#fff'
    context.fillText(text, x, y)
  }

function textSize(text){
  let letters = text.split('');
  let response = 0;
  letters.map(letter=>{
    response += 15;
  });
  console.log(response,text)
  return response;
}

