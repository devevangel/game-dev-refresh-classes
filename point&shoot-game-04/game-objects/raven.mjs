class Raven {
    constructor() {
        this.width = 100;
        this.height = 50
        this.x = canvas.width
        this.y = Math.random() * (canvas.height - this.height)
        this.directionX = Math.random() * 5 + 3
        this.directionY = Math.random() * 5 - 2.5
    }

    update() {
        this.x = this.x - this.directionX;
    }

    draw() {
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

export default Raven
