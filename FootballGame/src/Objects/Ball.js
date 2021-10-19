import {CONFIG} from "../../config/config.js";

export default class Ball {
    constructor(scene) {
        this.scene = scene;
        this.ball = null;
        this.isBallLeft = false;
    }

    createBall(difficulty) {
        if (this.ball != null) {
            this.ball.destroy()
        }
        let ballX
        let ballY = this.randomNumber(this.scene.game.canvas.height * difficulty.bottomSpanY, this.scene.game.canvas.height * difficulty.topSpanY);

        if (this.isBallLeft) {
            ballX = this.randomNumber(this.scene.game.canvas.width * difficulty.rightSpanXMin, this.scene.game.canvas.width * difficulty.rightSpanXMax);
            this.isBallLeft = false;
        } else {
            ballX = this.randomNumber(this.scene.game.canvas.width * difficulty.leftSpanXMin, this.scene.game.canvas.width * difficulty.leftSpanXMax);
            this.isBallLeft = true;
        }
        this.ball = this.scene.add.image(ballX, ballY, "ball")
        this.ball.setOrigin(0);
        this.ball.setScale(CONFIG.ball.ballSize / this.ball.height)
    }

    randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    getX() {
        return this.ball.x
    }

    getY() {
        return this.ball.y
    }
}