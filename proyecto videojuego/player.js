class Bluetank {
    constructor(ctx, w, h, keysBlue) {
        this.ctx = ctx
        this.gameWidth = w
        this.gameHeight = h

        this.keysBlue = keysBlue

        this.imageNorth = new Image()
        this.imageNorth.src = "ground_shaker_asset/tanks/bluetanknorth.png"


        this.width = 50
        this.height = 60

        this.posX = (this.gameWidth * 0.98) / 2
        this.posY = this.gameHeight * 0.98 - this.height

        this.tankVision = "N"

        this.blueBullets = []

        this.setListeners()



    }

    draw() {
        this.ctx.drawImage(this.imageNorth, this.posX, this.posY, this.width, this.height)
        this.blueBullets.forEach(bullet => bullet.draw())
    }

    move() {
        this.blueBullets.forEach(bullet => bullet.move())
    }

    setListeners() {
        document.addEventListener("keyup", (e) => {
            switch (e.keyCode) {

                case this.keysBlue.on:
                    if (this.tankVision == "N") { this.posY -= 10 }
                    else if (this.tankVision == "W") { this.posX += - 10 }
                    else if (this.tankVision == "E") { this.posX += 10 }
                    else { this.posY += 10 } break;

                case this.keysBlue.left:
                    if (this.tankVision == "N") { this.tankVision = "W", this.imageNorth.src = "ground_shaker_asset/tanks/bluetankwest.png" }
                    else if (this.tankVision == "W") { this.tankVision = "S", this.imageNorth.src = "ground_shaker_asset/tanks/bluetanksouth.png" }
                    else if (this.tankVision == "S") { this.tankVision = "E", this.imageNorth.src = "ground_shaker_asset/tanks/bluetankeast.png" }
                    else if (this.tankVision == "E") { this.tankVision = "N", this.imageNorth.src = "ground_shaker_asset/tanks/bluetanknorth.png" }
                    break;

                case this.keysBlue.right:
                    if (this.tankVision == "N") { this.tankVision = "E", this.imageNorth.src = "ground_shaker_asset/tanks/bluetankeast.png" }
                    else if (this.tankVision == "W") { this.tankVision = "N", this.imageNorth.src = "ground_shaker_asset/tanks/bluetanknorth.png" }
                    else if (this.tankVision == "S") { this.tankVision = "W", this.imageNorth.src = "ground_shaker_asset/tanks/bluetankwest.png" }
                    else if (this.tankVision == "E") { this.tankVision = "S", this.imageNorth.src = "ground_shaker_asset/tanks/bluetanksouth.png" }
                    break;

                case this.keysBlue.back:
                    if (this.tankVision == "N") { this.posY += 10 }
                    else if (this.tankVision == "W") { this.posX += 10 }
                    else if (this.tankVision == "E") { this.posX -= 10 }
                    else { this.posY -= 10 } break;

                case this.keysBlue.shoot:
                    this.shoot();
                    break;
            }
        })
    }

    shoot() {
        this.blueBullets.push(new Bluebullets(this.ctx, this.posX, this.posY, this.posY0, this.height, this.tankVision))
    }

}