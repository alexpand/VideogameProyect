class Background {
    constructor(ctx, w, h) {
        this.ctx = ctx
        this.width = window.innerWidth * .98
        this.height = window.innerHeight * .98

        this.image = new Image()
        this.image.src = "ground_shaker_asset/RockBG.png"

        this.posX = 0
        this.posY = 0

    }

    draw() {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }


}