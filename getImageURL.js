const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");

const bg = process.argv[2];
const sizes = {
  mobile: {
    width: 600,
    height: 400,
  },
  desktop: {
    width: 1200,
    height: 800,
  },
  devto: {
    width: 1000,
    height: 420,
  },
};

function createImage() {
  const { width } = sizes.desktop;
  const { height } = sizes.desktop;

  //Cria o canvas e o context que serão utilizados como área
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  //preenche a área com um quadro preto
  context.fillStyle = "white";
  context.fillRect(0, 0, width, height);

  //Carrega o background
  loadImage(bg).then((image) => {
    context.drawImage(image, 0, 0, width, height);
    //Salva o arquivo
    const dataUrl = canvas.toDataURL("image/png");
    console.log(dataUrl.trimEnd());
  });
}

createImage();
