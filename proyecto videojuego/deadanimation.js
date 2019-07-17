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

        this.width = 120
        this.height = 120
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.posX - 30,
            this.posY - 30,
            this.width,
            this.height)

        this.animate(framesCounter)

    }

    animate(framesCounter) {

        if (framesCounter % 1 == 0) {
            this.image.framesIndex++
            if (this.image.framesIndex > 5) {
                this.image.framesIndex = 0
            }
        }

    }
}