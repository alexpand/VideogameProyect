class Bluetank {
    constructor(ctx, w, h, keysBlue) {
        this.ctx = ctx
        this.gameWidth = w
        this.gameHeight = h

        this.keysBlue = keysBlue

        this.imageNorth = new Image()
        this.imageNorth.src = "ground_shaker_asset/tanks/bluetanknorth.png"

        this.tankVel = 20
        this.tankVelBack = 10

        this.width = 50
        this.height = 60

        this.posX = (this.gameWidth * 0.98) / 2
        this.posY = this.gameHeight * 0.98 - this.height

        this.tankVision = "N"

        this.blueBullets = []

        this.setListeners()

        this.shootSound = document.getElementById("shoot")
    }

    draw() {
        this.ctx.drawImage(this.imageNorth, this.posX, this.posY, this.width, this.height)
        this.blueBullets.forEach(bullet => bullet.draw())
    }

    drawBlueLife() {
        this.ctx.font = "20px sans-serif"

        this.ctx.fillStyle = "yellow";
        this.ctx.fillText("Blue Tank Life: " + Game.blueTankLife, 50, 20);

    }

    move() {
        this.blueBullets.forEach(bullet => bullet.move())
    }

    setListeners() {
        document.addEventListener("keyup", (e) => {
            switch (e.keyCode) {

                case this.keysBlue.on:
                    if (this.tankVision == "N") {
                        if (Game.collissionBlueMap(0, -20) ||
                            Game.collisionBlueObstacle(0, -20) ||
                            Game.collisionBetweenTanksBlue(0, -20) ||
                            Game.collisionBlueObstacleArr(0, -20)) {
                            console.log("colision")
                        }
                        else {

                            this.posY -= this.tankVel
                        }
                    }
                    else if (this.tankVision == "W") {
                        if (Game.collissionBlueMap(-20, 0) ||
                            Game.collisionBlueObstacle(-20, 0) ||
                            Game.collisionBetweenTanksBlue(-20, 0) ||
                            Game.collisionBlueObstacleArr(-20, 0)) {
                        } else { this.posX -= this.tankVel }

                    } else if (this.tankVision == "E") {
                        if (Game.collissionBlueMap(20, 0) ||
                            Game.collisionBlueObstacle(20, 0) ||
                            Game.collisionBetweenTanksBlue(20, 0) ||
                            Game.collisionBlueObstacleArr(20, 0)) {
                        } else { this.posX += this.tankVel }

                    } else if (this.tankVision == "S") {
                        if (Game.collissionBlueMap(0, 20) ||
                            Game.collisionBlueObstacle(0, 20) ||
                            Game.collisionBetweenTanksBlue(0, 20) ||
                            Game.collisionBlueObstacleArr(0, 20)) {

                        } else { this.posY += this.tankVel }
                    } break;

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
                    console.log(Game.collisionBlueObstacle(0, 10))
                    console.log(Game.collisionBlueObstacleArr(0, 10))
                    if (this.tankVision == "N") {
                        if (Game.collissionBlueMap(0, 10) ||
                            Game.collisionBlueObstacle(0, 10) ||
                            Game.collisionBetweenTanksBlue(0, 10) ||
                            Game.collisionBlueObstacleArr(0, 10)) {
                            console.log(Game.collisionBlueObstacleArr(0, 10))

                        } else {
                            this.posY += this.tankVelBack
                        }
                    }
                    else if (this.tankVision == "W") {

                        if (Game.collissionBlueMap(10, 0) ||
                            Game.collisionBlueObstacle(10, 0) ||
                            Game.collisionBetweenTanksBlue(10, 0) ||
                            Game.collisionBlueObstacleArr(10, 0)) {

                        } else {
                            this.posX += this.tankVelBack
                        }

                    } else if (this.tankVision == "E") {
                        if (Game.collissionBlueMap(-10, 0) ||
                            Game.collisionBlueObstacle(-10, 0) ||
                            Game.collisionBetweenTanksBlue(-10, 0) ||
                            Game.collisionBlueObstacleArr(-10, 0)) {

                        } else { this.posX -= this.tankVelBack }

                    } else if (this.tankVision == "S") {
                        if (Game.collissionBlueMap(0, -10) ||
                            Game.collisionBlueObstacle(0, -10) ||
                            Game.collisionBetweenTanksBlue(0, -10) ||
                            Game.collisionBlueObstacleArr(0, -10)) {

                        } else { this.posY -= this.tankVelBack }
                    } break;

                case this.keysBlue.shoot:
                    this.shoot();
                    this.shootSound.play()
                    break;
            }
        })
    }

    shoot() {
        this.blueBullets.push(new Bluebullets(this.ctx, this.posX, this.posY, this.posY0, this.height, this.tankVision))
    }
}