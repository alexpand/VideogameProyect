class Redtank {
    constructor(ctx, w, h, keysRed) {
        this.ctx = ctx
        this.gameWidth = w
        this.gameHeight = h

        this.keysRed = keysRed

        this.image = new Image()
        this.image.src = "ground_shaker_asset/tanks/redtank.png"

        this.width = 50
        this.height = 60

        this.posX = (this.gameWidth * 0.98) / 2
        this.posY = 10

    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }



}