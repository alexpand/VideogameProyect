class Bluetank {
    constructor(ctx, w, h, keysBlue) {
        this.ctx = ctx
        this.gameWidth = w
        this.gameHeight = h

        this.keysBlue = keysBlue

        this.image = new Image()
        this.image.src = "ground_shaker_asset/tanks/bluetank.png"


        this.width = 50
        this.height = 60

        this.posX = (this.gameWidth * 0.98) / 2
        this.posY = this.gameHeight * 0.98 - this.height


    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }


}