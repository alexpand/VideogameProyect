class DeadAnimation {
    constructor(ctx, w, h, tankPosX, tankPosY) {
        this.ctx = ctx


        this.image = new Image()
        this.image.src = "ground_shaker_asset/explosion.png"

        this.image.framesIndex = 0
        this.image.frames = 6


        this.gameWidth = w
        this.gameHeight = h

        this.posX = tankPosX
        this.posY = tankPosY

        this.width = 200
        this.height = 250

        this.explosion = document.getElementById("explosion")
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.posX - 80,
            this.posY - 90,
            this.width,
            this.height)

        this.animate(framesCounter)

    }

    animate(framesCounter) {

        if (framesCounter % 10 == 0) {
            this.explosion.play()
            this.image.framesIndex++
            if (this.image.framesIndex > 5) {
                Game.gameOver()
                this.image.framesIndex = 0
            }
        }

    }
}