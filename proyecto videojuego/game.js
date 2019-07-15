const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
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
            this.isCollision()
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

    isCollision() {

        if (this.bluetank.posX + this.bluetank.width >= this.obstacles.posX
            && this.bluetank.posY + this.bluetank.height >= this.obstacles.posY
            && this.bluetank.posX <= this.obstacles.posX + this.obstacles.width) {

        }

    },

    clearBullets: function () {

        this.bluetank.blueBullets.forEach((bullets, idx) => {
            if (bullets.posX < 0 || bullets.posX > this.width || bullets.posY < 0 || bullets.posY > this.height) {
                this.bluetank.blueBullets.splice(idx, 1)
            }
        })

        this.redtank.redbullets.forEach((bullets, idx) => {
            if (bullets.posX < 0 || bullets.posX > this.width || bullets.posY < 0 || bullets.posY > this.height) {
                this.redtank.redbullets.splice(idx, 1)
            }
        })
    },
}


// if (this.bluetank.posX + this.bluetank.width >= this.obstacles.posX
//     && this.bluetank.posY + this.bluetank.height >= this.obstacles.posY
//     && this.bluetank.posX <= this.obstacles.posX + this.obstacles.width) {
//     
// }
//      console.log("choque")
// this.bluetank.posX < 234,7744 || máximo ancho lado izquierdo del obstáculo
// this.bluetank.posX > 734.7744 || máximo ancho lado derecho del obstáculo
// this.bluetank.posY > 339.6264 || altura del lado bajo del obstáculo
// this.bluetank.posY < 379.6264 || altura del lado alto del obstáculo

// (this.bluetank.posX > 234, 7744 && this.bluetank.posX < 734.7744 && this.bluetank.posY > 339.6264 && this.bluetank.posY < 379.6264)