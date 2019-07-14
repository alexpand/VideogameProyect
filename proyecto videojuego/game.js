const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,


    init: function () {
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.width = window.innerWidth * .98
        this.height = window.innerHeight * .98
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.background = new Background(this.ctx, this.width, this.height)
        this.bluetank = new Bluetank(this.ctx, this.width, this.height)
        this.redtank = new Redtank(this.ctx, this.width, this.height)
        this.start()
    },

    start: function () {

        this.interval = setInterval(() => {

            this.drawAll()

        }, 1000 / this.fps)
    },


    drawAll() {
        this.background.draw()
        this.bluetank.draw()
        this.redtank.draw()
    },


}