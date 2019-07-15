class Redtank {
    constructor(ctx, w, h, keysRed) {
        this.ctx = ctx
        this.gameWidth = w
        this.gameHeight = h

        this.keysRed = keysRed

        this.imageSouth = new Image()
        this.imageSouth.src = "ground_shaker_asset/tanks/redtanksouth.png"

        this.width = 50
        this.height = 60

        this.posX = (this.gameWidth * 0.98) / 2
        this.posY = 10

        this.redbullets = []

        this.tankVision = "S"

        this.setListeners()

    }

    draw() {
        this.ctx.drawImage(this.imageSouth, this.posX, this.posY, this.width, this.height)
        this.redbullets.forEach(bullet => bullet.draw())
    }

    move() {
        this.redbullets.forEach(bullet => bullet.move())
    }

    setListeners() {
        document.addEventListener("keyup", (e) => {
            switch (e.keyCode) {

                case this.keysRed.on:
                    if (this.tankVision == "S") { this.posY += 10 }
                    else if (this.tankVision == "W") { this.posX += - 10 }
                    else if (this.tankVision == "E") { this.posX += 10 }
                    else { this.posY -= 10 } break;

                case this.keysRed.right:
                    if (this.tankVision == "S") { this.tankVision = "E", this.imageSouth.src = "ground_shaker_asset/tanks/redtankeast.png" }
                    else if (this.tankVision == "E") { this.tankVision = "N", this.imageSouth.src = "ground_shaker_asset/tanks/redtanknorth.png" }
                    else if (this.tankVision == "N") { this.tankVision = "W", this.imageSouth.src = "ground_shaker_asset/tanks/redtankwest.png" }
                    else if (this.tankVision == "W") { this.tankVision = "S", this.imageSouth.src = "ground_shaker_asset/tanks/redtanksouth.png" }
                    break;

                case this.keysRed.left:
                    if (this.tankVision == "S") { this.tankVision = "W", this.imageSouth.src = "ground_shaker_asset/tanks/redtankwest.png" }
                    else if (this.tankVision == "W") { this.tankVision = "N", this.imageSouth.src = "ground_shaker_asset/tanks/redtanknorth.png" }
                    else if (this.tankVision == "N") { this.tankVision = "E", this.imageSouth.src = "ground_shaker_asset/tanks/redtankeast.png" }
                    else if (this.tankVision == "E") { this.tankVision = "S", this.imageSouth.src = "ground_shaker_asset/tanks/redtanksouth.png" }
                    break;

                case this.keysRed.back:
                    if (this.tankVision == "S") { this.posY -= 10 }
                    else if (this.tankVision == "W") { this.posX += 10 }
                    else if (this.tankVision == "E") { this.posX -= 10 }
                    else { this.posY += 10 } break;

                case this.keysRed.shoot:
                    this.shoot();
                    break;
            }
        })
    }

    shoot() {
        this.redbullets.push(new Redbullets(this.ctx, this.posX, this.posY, this.posY0, this.height, this.tankVision))
    }
}

// setListeners() {
//     document.addEventListener("keydown", (e) => {
//         switch (e.keyCode) {

//             case this.keysRed.on:
//                 this.posY += 10;
//                 break;

//             case this.keysRed.back:
//                 this.posY += - 10;
//                 break;

//             case this.keysRed.left:
//                 this.posX += 10;
//                 break;

//             case this.keysRed.right:
//                 this.posX += -10;
//                 break;

//             case this.keysRed.shoot:
//                 this.shoot()
//                 break;

//         }
//     })
// }