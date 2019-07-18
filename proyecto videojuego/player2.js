class Redtank {
    constructor(ctx, w, h, keysRed) {
        this.ctx = ctx
        this.gameWidth = w
        this.gameHeight = h

        this.keysRed = keysRed

        this.imageSouth = new Image()
        this.imageSouth.src = "ground_shaker_asset/tanks/redtanksouth.png"

        this.tankVel = 20
        this.tankVelBack = 10

        this.width = 50
        this.height = 60

        this.posX = (this.gameWidth * 0.98) / 2
        this.posY = 10

        this.redbullets = []

        this.tankVision = "S"

        this.setListeners()

        this.shootSound = document.getElementById("shoot")
    }

    draw() {
        this.ctx.drawImage(this.imageSouth, this.posX, this.posY, this.width, this.height)
        this.redbullets.forEach(bullet => bullet.draw())
    }

    drawRedTankLife() {
        this.ctx.font = "20px sans-serif"

        this.ctx.fillStyle = "yellow";
        this.ctx.fillText("Red Tank Life: " + Game.redTankLife, 1210, 20);

    }

    move() {
        this.redbullets.forEach(bullet => bullet.move())
    }

    setListeners() {
        document.addEventListener("keyup", (e) => {
            switch (e.keyCode) {

                case this.keysRed.on:
                    if (this.tankVision == "N") {
                        if (Game.collissionRedMap(0, -20) ||
                            Game.collisionRedObstacle(0, -20) ||
                            Game.collisionBetweenTanksRed(0, -20) ||
                            Game.collisionRedObstacleArr(0, -20)) {
                        } else { this.posY -= this.tankVel }
                    }
                    else if (this.tankVision == "W") {
                        if (Game.collissionRedMap(-20, 0) ||
                            Game.collisionRedObstacle(-20, 0) ||
                            Game.collisionBetweenTanksRed(-20, 0) ||
                            Game.collisionRedObstacleArr(-20, 0)) {

                        } else { this.posX -= this.tankVel }
                    } else if (this.tankVision == "E") {
                        if (Game.collissionRedMap(20, 0) ||
                            Game.collisionRedObstacle(20, 0) ||
                            Game.collisionBetweenTanksRed(20, 0) ||
                            Game.collisionRedObstacleArr(20, 0)) {

                        } else { this.posX += this.tankVel }

                    } else if (this.tankVision == "S") {
                        if (Game.collissionRedMap(0, 20) ||
                            Game.collisionRedObstacle(0, 20) ||
                            Game.collisionBetweenTanksRed(0, 20) ||
                            Game.collisionRedObstacleArr(0, 20)) {

                        } else { this.posY += this.tankVel }
                    } break;

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
                    if (this.tankVision == "N") {
                        if (Game.collissionRedMap(0, 10) ||
                            Game.collisionRedObstacle(0, 10) ||
                            Game.collisionBetweenTanksRed(0, 10) ||
                            Game.collisionRedObstacleArr(0, 10)) {
                        } else { this.posY += this.tankVelBack }
                    }
                    else if (this.tankVision == "W") {
                        if (Game.collissionRedMap(10, 0) ||
                            Game.collisionRedObstacle(10, 0) ||
                            Game.collisionBetweenTanksRed(10, 0) ||
                            Game.collisionRedObstacleArr(10, 0)) {

                        } else { this.posX += this.tankVelBack }

                    } else if (this.tankVision == "E") {
                        if (Game.collissionRedMap(-10, 0) ||
                            Game.collisionRedObstacle(-10, 0) ||
                            Game.collisionBetweenTanksRed(-10, 0) ||
                            Game.collisionRedObstacleArr(-10, 0)) {

                        } else { this.posX -= this.tankVelBack }

                    } else if (this.tankVision == "S") {
                        if (Game.collissionRedMap(0, -10) ||
                            Game.collisionRedObstacle(0, -10) ||
                            Game.collisionBetweenTanksRed(0, -10) ||
                            Game.collisionRedObstacleArr(0, -10)) {

                        } else { this.posY -= this.tankVelBack }
                    } break;

                case this.keysRed.shoot:
                    this.shoot();
                    this.shootSound.play()
                    break;
            }
        })
    }

    shoot() {
        this.redbullets.push(new Redbullets(this.ctx, this.posX, this.posY, this.posY0, this.height, this.tankVision))
    }
}