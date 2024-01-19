const canvas = document.querySelector('#gamearea');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 700;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
let gameSpeed = 5;

const backgroundLayer1 = new Image();
const backgroundLayer2 = new Image();
const backgroundLayer3 = new Image();
const backgroundLayer4 = new Image();
const backgroundLayer5 = new Image();

backgroundLayer1.src = 'assets/layer-1.png';
backgroundLayer2.src = 'assets/layer-2.png';
backgroundLayer3.src = 'assets/layer-3.png';
backgroundLayer4.src = 'assets/layer-4.png';
backgroundLayer5.src = 'assets/layer-5.png';

let x = 0;

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(backgroundLayer5, --x, 0);
  requestAnimationFrame(animate);
}

animate();
