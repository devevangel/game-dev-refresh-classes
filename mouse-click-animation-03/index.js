const canvas = document.querySelector('#gamearea');
const animationsDropdown = document.querySelector('.animation-options');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const explosions = []

class Explosion {
  constructor(mouseX, mouseY) {
    this.image = new Image()
    this.image.src = 'assets/boom.png'
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 0.5;
    this.height = this.spriteHeight * 0.5;
    this.x = mouseX - (this.width * 0.5);
    this.y = mouseY - (this.height * 0.5);
    this.frame = 0;
    this.timer = 0;
    this.staggerFrames = 5;
  }

  update() {
    this.timer++;
    if (this.timer % this.staggerFrames === 0) {
      this.frame++;
    }
    console.log(explosions);
  }

  draw() {
    // ctx.drawImage(sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight);
    ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
  }
}

window.addEventListener('click', function (e) {
  explosions.push(new Explosion(e.x, e.y))
});
window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update();
    explosions[i].draw();

    if (explosions[i].frame > 5) {
      explosions.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animate)
}

animate()
