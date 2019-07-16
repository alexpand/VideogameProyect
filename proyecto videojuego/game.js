const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    redTankLife: 5,
    blueTankLife: 5,
    keysBlue: {
        on: 87,
        back: 83,
        right: 68,
        left: 65,
        shoot: 32,
    },
    keysRed: {
        on: 73,
        back: 75,
        right: 74,
        left: 76,
        shoot: 189,
    },



    init: function () {
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.width = window.innerWidth * .98
        this.height = window.innerHeight * .98
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.start()

    },

    start: function () {
        this.reset()


        this.interval = setInterval(() => {
            this.drawAll()
            this.moveAll()
            this.clearBullets()
            this.tankDamage()
        }, 1000 / this.fps)
    },

    reset: function () {
        this.background = new Background(this.ctx, this.width, this.height)
        this.obstacles = new Obstacles(this.ctx, this.width, this.height)
        this.bluetank = new Bluetank(this.ctx, this.width, this.height, this.keysBlue)
        this.redtank = new Redtank(this.ctx, this.width, this.height, this.keysRed)
    },
    drawAll() {
        this.background.draw()
        this.obstacles.draw()
        this.bluetank.draw()
        this.redtank.draw()
    },

    moveAll() {
        this.bluetank.move()
        this.redtank.move()
    },

    collisionBetweenTanksBlue(nextX, nextY) {
        if (this.bluetank.posY + nextY - 5 <= this.redtank.posY + this.redtank.height &&
            this.bluetank.posY + this.bluetank.height + nextY + 5 >= this.redtank.posY &&
            this.bluetank.posX + this.bluetank.width + nextX >= this.redtank.posX &&
            this.bluetank.posX + nextX <= this.redtank.posX + this.redtank.width) {
            return true
        } else {
            return false
        }
    },

    collisionBlueObstacle(nextX, nextY) {
        if (this.bluetank.posY + nextY <= this.obstacles.posY - 10 + this.obstacles.height + 10 &&
            this.bluetank.posY + nextY + this.bluetank.height >= this.obstacles.posY - 10 &&
            this.bluetank.posX + nextX + this.bluetank.width >= this.obstacles.posX - 10 &&
            this.bluetank.posX + nextX + 10 <= this.obstacles.posX + this.obstacles.width + 10) {
            return true
        } else {
            return false
        }
    },

    collissionBlueMap(nextX, nextY) {
        if (this.bluetank.posX + nextX < 0 || this.bluetank.posX + this.bluetank.width + nextX > this.width ||
            this.bluetank.posY + nextY < 0 || this.bluetank.posY + this.bluetank.height + nextY > this.height) {
            return true
        } else {
            return false
        }
    },

    collisionBetweenTanksRed(nextX, nextY) {
        if (this.bluetank.posY + nextY - 20 <= this.redtank.posY + this.redtank.height &&
            this.bluetank.posY + this.bluetank.height + nextY + 30 >= this.redtank.posY &&
            this.bluetank.posX + this.bluetank.width + nextX + 20 >= this.redtank.posX &&
            this.bluetank.posX + nextX - 20 <= this.redtank.posX + this.redtank.width) {
            return true
        } else {
            return false
        }
    },

    collisionRedObstacle(nextX, nextY) {
        if (this.redtank.posY + nextY <= this.obstacles.posY + this.obstacles.height &&
            this.redtank.posY + this.redtank.height + nextY >= this.obstacles.posY - 10 &&
            this.redtank.posX + this.redtank.width + nextX >= this.obstacles.posX - 10 &&
            this.redtank.posX + nextX <= this.obstacles.posX + this.obstacles.width) {
            return true
        } else {
            return false
        }
    },

    collissionRedMap(nextX, nextY) {
        if (this.redtank.posX + nextX < 0 || this.redtank.posX + this.redtank.width + nextX > this.width ||
            this.redtank.posY + nextY < 0 || this.redtank.posY + this.redtank.height + nextY > this.height) {
            return true
        } else {
            return false
        }
    },

    tankDamage: function () {
        this.bluetank.blueBullets.forEach((bullets, idx) => {
            if (bullets.posY - bullets.radius <= (this.redtank.posY + this.redtank.height) - 30 &&
                bullets.posY + bullets.radius >= this.redtank.posY - 30 &&
                bullets.posX + bullets.radius >= this.redtank.posX - 20 &&
                bullets.posX - bullets.radius <= (this.redtank.posX + this.redtank.width) - 20) {
                this.bluetank.blueBullets.splice(idx, 1)
                this.redTankLife--
                if (this.redTankLife <= 0) {
                    console.log("Blue Tank Wins!!")
                    this.gameOver()
                }
            }
        })

        this.redtank.redbullets.forEach((bullets, idx) => {
            if (bullets.posY - bullets.radius <= (this.bluetank.posY + this.bluetank.height) + 20 &&
                bullets.posY + bullets.radius >= this.bluetank.posY + 20 &&
                bullets.posX + bullets.radius >= this.bluetank.posX &&
                bullets.posX - bullets.radius <= this.bluetank.posX + this.bluetank.width) {
                this.redtank.redbullets.splice(idx, 1)
                this.blueTankLife--
                if (this.blueTankLife <= 0) {
                    console.log("Red Tank Wins!!")
                    this.gameOver()
                }
            }
        })

    },

    clearBullets: function () {

        this.bluetank.blueBullets.forEach((bullet, idx) => {
            if (bullet.posX - bullet.radius < 0 - 20 || bullet.posX + bullet.radius > this.width + 20 ||
                bullet.posY - bullet.radius < 0 - 20 || bullet.posY + bullet.radius > this.height + 20) {
                this.bluetank.blueBullets.splice(idx, 1)

            } else if (bullet.posY - bullet.radius <= this.obstacles.posY + this.obstacles.height - 30 &&
                bullet.posY + bullet.radius >= this.obstacles.posY - 30 &&
                bullet.posX - bullet.radius >= this.obstacles.posX - 40 &&
                bullet.posX + bullet.radius <= this.obstacles.posX + this.obstacles.width - 15) {
                this.bluetank.blueBullets.splice(idx, 1)
            }
        })

        this.redtank.redbullets.forEach((bullet, idx) => {
            if (bullet.posX - bullet.radius < 0 - 20 || bullet.posX + bullet.radius > this.width + 20 ||
                bullet.posY - bullet.radius < 0 - 20 || bullet.posY + bullet.radius > this.height + 20) {
                this.redtank.redbullets.splice(idx, 1)

            } else if (bullet.posY - bullet.radius <= this.obstacles.posY + this.obstacles.height + 20 &&
                bullet.posY + bullet.radius >= this.obstacles.posY + 20 &&
                bullet.posX - bullet.radius >= this.obstacles.posX - 20 &&
                bullet.posX + bullet.radius <= this.obstacles.posX + this.obstacles.width + 10) {
                this.redtank.redbullets.splice(idx, 1)
            }
        })
    },

    gameOver: function () {
        clearInterval(this.interval)
    }
}


// colisiones
        //full bala altoY bullet.posY - bullet.radius
        //full bala bajoY bullet.posY + bullet.radius
        //full bala der bullet.posX + bullet.radius
        //full bala izq bullet.posX - bullet.radius

        // eje y de colision bajo tanke \\ bullet.posY - bullet.radius < redtank.posY + redtank.height && 
        //eje y de colision alto tanke \\   bullet.posY + bullet.radius > redtank.posY &&
        // eje x de colision izq tanke \\ bullet.posX - bullet.radius 