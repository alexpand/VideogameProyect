class Bluebullets {
    constructor(ctx, x, y, y0, playerH, direction) {

        this.ctx = ctx
        this.posX = x
        this.posY = y
        this.posY0 = y0
        this.playerHeight = playerH
        this.radius = 5
        this.velX = 3
        this.velY = 1

        this.tankVision = direction

        this.gravity = 0.25
    }

    draw() {

        if (this.tankVision == "N") {
            this.ctx.beginPath()
            this.ctx.fillStyle = "yellow";
            this.ctx.arc(this.posX + 25, this.posY, this.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.closePath();
        }
        else if (this.tankVision == "W") {
            this.ctx.beginPath()
            this.ctx.fillStyle = "yellow";
            this.ctx.arc(this.posX, this.posY + 30, this.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.closePath();
        }

        else if (this.tankVision == "E") {
            this.ctx.beginPath()
            this.ctx.fillStyle = "yellow";
            this.ctx.arc(this.posX + 50, this.posY + 30, this.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.closePath();
        }
        else {
            this.ctx.beginPath()
            this.ctx.fillStyle = "yellow";
            this.ctx.arc(this.posX + 25, this.posY + 60, this.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    move() {

        if (this.tankVision == "N") { this.posY -= this.velX }
        else if (this.tankVision == "W") { this.posX -= this.velX }
        else if (this.tankVision == "E") { this.posX += this.velX }
        else { this.posY += this.velX }


    }
}