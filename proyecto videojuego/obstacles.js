class Obstacles {
    constructor(ctx, w, h) {
        this.ctx = ctx
        this.width = 450
        this.height = 70

        this.image = new Image()
        this.image.src = "ground_shaker_asset/sandbags.png"

        this.posX = (window.innerWidth * .98) / 2 - 220
        this.posY = (window.innerHeight * .98) / 2 - 35

    }

    draw() {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }


}