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
    },
    keysRed: {
        on: 73,
        back: 75,
        right: 74,
        left: 76,
    },



    init: function () {
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.width = window.innerWidth * .98
        this.height = window.innerHeight * .98
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.background = new Background(this.ctx, this.width, this.height)
        this.obstacles = new Obstacles(this.ctx, this.width, this.height)
        this.bluetank = new Bluetank(this.ctx, this.width, this.height, this.keysBlue)
        this.redtank = new Redtank(this.ctx, this.width, this.height, this.keysRed)
        this.start()
    },

    start: function () {
        this.setListeners()
        this.interval = setInterval(() => {

            this.drawAll()

        }, 1000 / this.fps)
    },


    drawAll() {
        this.background.draw()
        this.obstacles.draw()
        this.bluetank.draw()
        this.redtank.draw()
    },

    setListeners() {
        document.onkeyup = (e) => {
            switch (e.keyCode) {
                case this.keysBlue.on:
                    this.bluetank.posY += - 8;
                    break;

                case this.keysRed.on:
                    this.redtank.posY += 8;
                    break;

                case this.keysBlue.back:
                    this.bluetank.posY += 8;
                    break;

                case this.keysRed.back:
                    this.redtank.posY += - 8;
                    break;

                case this.keysBlue.left:
                    this.bluetank.posX += - 8;
                    break;

                case this.keysRed.left:
                    this.redtank.posX += 8;
                    break;

                case this.keysBlue.right:
                    this.bluetank.posX += 8;
                    break;

                case this.keysRed.right:
                    this.redtank.posX += -8;
                    break;

            }
        }
    }
}