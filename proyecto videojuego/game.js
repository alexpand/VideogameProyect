const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    redTankLife: 5,
    blueTankLife: 5,
    framesCounter: 0,
    obstaclesarr: [],
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
            this.framesCounter++

            if (this.framesCounter > 1000) this.framesCounter = 0

            this.drawAll()
            this.moveAll()
            this.clearBullets()
            this.tankDamage()
            this.drawWinner(this.winner)
        }, 1000 / this.fps)
    },

    reset: function () {
        this.background = new Background(this.ctx, this.width, this.height)
        this.obstacles = new Obstacles(this.ctx, this.width, this.height)
        this.obstaclesarr.push(new Obstaclesarr(this.ctx, 100, 100))
        this.obstaclesarr.push(new Obstaclesarr(this.ctx, 300, 100))
        this.obstaclesarr.push(new Obstaclesarr(this.ctx, 100, 290))
        this.obstaclesarr.push(new Obstaclesarr(this.ctx, 300, 290))
        this.obstaclesarr.push(new Obstaclesarr(this.ctx, 100, 500))
        this.obstaclesarr.push(new Obstaclesarr(this.ctx, 300, 500))
        this.obstaclesarr.push(new Obstaclesarr(this.ctx, 1200, 130))
        this.obstaclesarr.push(new Obstaclesarr(this.ctx, 1050, 290))
        this.obstaclesarr.push(new Obstaclesarr(this.ctx, 1200, 450))
        this.bluetank = new Bluetank(this.ctx, this.width, this.height, this.keysBlue)
        this.redtank = new Redtank(this.ctx, this.width, this.height, this.keysRed)
        this.winner = undefined
    },

    drawAll() {
        this.background.draw()
        this.obstacles.draw()
        this.obstaclesarr.forEach(obs => obs.draw())
        this.bluetank.draw()
        this.bluetank.drawBlueLife()
        this.redtank.draw()
        this.redtank.drawRedTankLife()
        if (this.deadanimation) this.deadanimation.draw(this.framesCounter)


    },

    drawWinner(winner) {
        if (winner == this.bluetank) {
            this.ctx.font = "100px sans-serif"
            this.ctx.fillStyle = "white";
            this.ctx.fillText("Blue Tank Won!!", (this.width / 2) - 350, this.height / 2)
        }
        else if (winner == this.redtank) {
            this.ctx.font = "100px sans-serif"
            this.ctx.fillStyle = "white";
            this.ctx.fillText("Red Tank Won!!", (this.width / 2) - 350, this.height / 2)
        }

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
        if (this.bluetank.posY + nextY <= this.obstacles.posY - 10 + this.obstacles.height + 5 &&
            this.bluetank.posY + nextY + this.bluetank.height >= this.obstacles.posY - 5 &&
            this.bluetank.posX + nextX + this.bluetank.width >= this.obstacles.posX - 5 &&
            this.bluetank.posX + nextX + 10 <= this.obstacles.posX + this.obstacles.width + 10) {
            return true
        } else {
            return false
        }
    },

    collisionBlueObstacleArr: function (nextX, nextY) {
        return this.obstaclesarr.some(obstacles => {
            if (this.bluetank.posY + nextY <= obstacles.posY + obstacles.height &&
                this.bluetank.posY + nextY + this.bluetank.height + 2 >= obstacles.posY &&
                this.bluetank.posX + nextX + this.bluetank.width - 1 >= obstacles.posX &&
                this.bluetank.posX + nextX - 2 <= obstacles.posX + obstacles.width) {
                return true
            } else {
                return false
            }
        })
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
        if (this.bluetank.posY + nextY - 40 <= this.redtank.posY + this.redtank.height &&
            this.bluetank.posY + this.bluetank.height + nextY + 30 >= this.redtank.posY &&
            this.bluetank.posX + this.bluetank.width + nextX + 40 >= this.redtank.posX &&
            this.bluetank.posX + nextX - 40 <= this.redtank.posX + this.redtank.width) {
            return true
        } else {
            return false
        }
    },

    collisionRedObstacleArr: function (nextX, nextY) {
        return this.obstaclesarr.some(obstacles => {
            if (this.redtank.posY + nextY <= obstacles.posY + obstacles.height &&
                this.redtank.posY + nextY + this.redtank.height + 1 >= obstacles.posY &&
                this.redtank.posX + nextX + this.redtank.width - 1 >= obstacles.posX &&
                this.redtank.posX + nextX - 2 <= obstacles.posX + obstacles.width) {
                return true
            } else {
                return false
            }
        })
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
                if (this.redTankLife > 0) this.redTankLife--
                else if (this.redTankLife == 0) {
                    this.deadanimation = new DeadAnimation(this.ctx, this.width, this.height, this.redtank.posX, this.redtank.posY)
                    this.winner = this.bluetank
                }
            }
        })

        this.redtank.redbullets.forEach((bullets, idx) => {
            if (bullets.posY - bullets.radius <= (this.bluetank.posY + this.bluetank.height) + 20 &&
                bullets.posY + bullets.radius >= this.bluetank.posY + 20 &&
                bullets.posX + bullets.radius >= this.bluetank.posX &&
                bullets.posX - bullets.radius <= this.bluetank.posX + this.bluetank.width) {
                this.redtank.redbullets.splice(idx, 1)
                if (this.blueTankLife > 0) this.blueTankLife--
                else if (this.blueTankLife == 0) {
                    this.deadanimation = new DeadAnimation(this.ctx, this.width, this.height, this.bluetank.posX, this.bluetank.posY)
                    this.winner = this.redtank
                }
            }
        })

    },

    clearBullets: function () {

        this.bluetank.blueBullets.some((bullet, idx) => {
            this.obstaclesarr.some(obstacles => {
                if (bullet.posY - bullet.radius <= obstacles.posY + obstacles.height - 15 &&
                    bullet.posY + bullet.radius >= obstacles.posY - 50 &&
                    bullet.posX - bullet.radius >= obstacles.posX - 50 &&
                    bullet.posX + bullet.radius <= obstacles.posX + obstacles.width) {
                    this.bluetank.blueBullets.splice(idx, 1)
                }
            })
        })

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

        this.redtank.redbullets.some((bullet, idx) => {
            this.obstaclesarr.some(obstacles => {
                if (bullet.posY - bullet.radius <= obstacles.posY + obstacles.height + 40 &&
                    bullet.posY + bullet.radius >= obstacles.posY && //b
                    bullet.posX - bullet.radius >= obstacles.posX - 30 && // b
                    bullet.posX + bullet.radius <= obstacles.posX + obstacles.width + 30) { //b
                    this.redtank.redbullets.splice(idx, 1)
                }
            })
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
        let audioTheme = document.getElementById("theme")
        let winTheme = document.getElementById("win")

        audioTheme.pause()
        winTheme.play()
        clearInterval(this.interval)

    }
}