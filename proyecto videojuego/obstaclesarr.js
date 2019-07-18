class Obstaclesarr {
    constructor(ctx, posX, posY) {
        this.ctx = ctx

        this.posX = posX
        this.posY = posY

        this.width = 70
        this.height = 70

        this.image = new Image()
        this.image.src = "ground_shaker_asset/sandbags.png"
    }

    draw() {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }
}