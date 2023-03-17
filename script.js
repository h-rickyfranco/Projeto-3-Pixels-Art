// ----------Créditos----------
console.log('Projeto desenvolvido por Henrique Franco');
// ----------------------------

// ----------Captura de Elementos----------
const firstColor = document.getElementById('firstColor');
const secondColor = document.getElementById('secondColor');
const thirdColor = document.getElementById('thirdColor');
const fourthColor = document.getElementById('fourthColor');
const colors = [firstColor, secondColor, thirdColor, fourthColor];
const btnRandomColors = document.getElementById('button-random-color');
const pixelBoard = document.getElementById('pixel-board');
const selectColor = document.getElementsByClassName('color');
const selectPixel = document.getElementsByClassName('pixel');
const btnClean = document.getElementById('clear-board');
const inputRow = document.getElementById('board-size');
const btnBoardSize = document.getElementById('generate-board');
const boardSize = localStorage.getItem('boardSize');
// --------------------------------------

// ----------Funções------------
if (localStorage.getItem('firstColor') === null) {
    localStorage.setItem('firstColor', 'black');
}
if (localStorage.getItem('secondColor') === null) {
  localStorage.setItem('secondColor', 'red');
}
if (localStorage.getItem('thirdColor') === null) {
  localStorage.setItem('thirdColor', 'blue');
}
if (localStorage.getItem('fourthColor') === null) {
  localStorage.setItem('fourthColor', 'green');
}

localStorage.setItem('selectedColor', 'black');
firstColor.style.backgroundColor = localStorage.getItem('firstColor');
secondColor.style.backgroundColor = localStorage.getItem('secondColor');
thirdColor.style.backgroundColor = localStorage.getItem('thirdColor');
fourthColor.style.backgroundColor = localStorage.getItem('fourthColor');

function randomColors() {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'teal', 'aqua', 'fuchsia',
  'brow', 'burlywood', 'cadetblue', 'coral', 'crimson', 'deepskyblue', 'seashell'];
  const randomColorNumbers = Math.ceil(Math.random() * 14);
  const newColor = colors[randomColorNumbers];
  return newColor;
}

btnRandomColors.addEventListener('click', () => {
  localStorage.setItem('secondColor', randomColors());
  localStorage.setItem('thirdColor', randomColors());
  localStorage.setItem('fourthColor', randomColors());
  localStorage.setItem('colorPalette', JSON.stringify(colors));
  firstColor.style.backgroundColor = localStorage.getItem('firstColor');
  secondColor.style.backgroundColor = localStorage.getItem('secondColor');
  thirdColor.style.backgroundColor = localStorage.getItem('thirdColor');
  fourthColor.style.backgroundColor = localStorage.getItem('fourthColor');
});

function createPixels(rows) {
  for (let index = 0; index < rows; index += 1) {
    const divs = document.createElement('div');
    divs.id = `line-${index}`;
    divs.className = 'line';
    pixelBoard.appendChild(divs);
    for (let indexPixel = 0; indexPixel < rows; indexPixel += 1) {
      const pixel = document.createElement('div');
      pixel.id = `pixel-${index}-${indexPixel}`;
      pixel.className = 'pixel';
      divs.appendChild(pixel);
    }
  }
}
if (boardSize === null) {
  createPixels(5);
} else {
  createPixels(boardSize);
}
for (let index = 0; index < selectColor.length; index += 1) {
  selectColor[index].addEventListener('click', (event) => {
    const oldColor = document.querySelector('.selected');
    oldColor.classList.remove('selected');
    event.target.classList.add('selected');
    const newColor = event.target.style.backgroundColor;
    localStorage.setItem('selectedColor', newColor);
  });
}

const pixelCor = () => {
  for (let index = 0; index < selectPixel.length; index += 1) {
    selectPixel[index].style.backgroundColor = localStorage.getItem(`pixel${index}`);
  }
};
pixelCor();

btnClean.addEventListener('click', () => {
  for (let index = 0; index < selectPixel.length; index += 1) {
    localStorage.setItem(`pixel${index}`, 'white');
    selectPixel[index].style.backgroundColor = localStorage.getItem(`pixel${index}`);
  }
});

localStorage.setItem('pixelBoard', 'cores');

const novaPixelColor = () => {
  for (let index = 0; index < selectPixel.length; index += 1) {
    selectPixel[index].addEventListener('click', (event) => {
      const newColor = localStorage.getItem('selectedColor');
      localStorage.setItem(`pixel${index}`, newColor);
      event.target.style.backgroundColor = localStorage.getItem(`pixel${index}`);       
    });
  }
};
novaPixelColor();

btnBoardSize.addEventListener('click', () => {
  const chamaFuncao = (r) => {
    createPixels(r);
    pixelCor();
    novaPixelColor();
  }
  if (inputRow.value === '') {
    return alert('Board inválido!')
  }
  while (pixelBoard.lastElementChild) {
    pixelBoard.removeChild(pixelBoard.lastElementChild);
  }
  if (inputRow.value <= 5) {
    localStorage.setItem('boardSize', '5');
    chamaFuncao(5);
  } else if (inputRow.value >= 50) {
    localStorage.setItem('boardSize', '50');
    chamaFuncao(50);
  } else {
    const newRowValue = inputRow.value;
    localStorage.setItem('boardSize', newRowValue)
    chamaFuncao(newRowValue);
  }
});
// ------------------------------------------------