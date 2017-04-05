const render = document.getElementById('root');

let images = '';

for (let i = 1; i < 20; i++) {
  images += `
    <div>
      <a href="https://source.unsplash.com/random?sig=${i}">
        <img src="https://source.unsplash.com/random?sig=${i}" />
      </a>
    </div>
  `;
}

render.innerHTML = images;

const pinArr = [...document.querySelectorAll('.pins div')];
const windowWidth = document.querySelector('.container').clientWidth;

const margin = 20;
const columnWidth = 200 + margin;
const columnsFit = Math.floor(windowWidth / columnWidth );

const heightArr = [];
for (let i = 0; i < columnsFit; i++) {
  heightArr[i] = 0;
}

function shortestColumn(arr) {
  if (arr.length === 0) { return -1; }
  let minVal = arr[0];
  let minIdx = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < minVal) {
      minVal = arr[i];
      minIdx = i;
    }
  }
  return minIdx;
}

function layoutPins() {
  let left = 0;
  let top = 0;

  for (let i = 0; i < pinArr.length; i++) {
    let height = pinArr[i].firstElementChild.children[0].height + margin;
    let idx = shortestColumn(heightArr);

    top = heightArr[idx];
    left = (idx * columnWidth);

    pinArr[i].style = `left: ${left}px; top: ${top}px; visibility: visible;`;

    heightArr[idx] += height;
  };
}

window.addEventListener('load', layoutPins);
