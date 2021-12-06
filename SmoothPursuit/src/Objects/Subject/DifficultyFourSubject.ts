import ISubject from "./ISubject";
import * as p5 from "p5";
import * as config from '../config'

export default class DifficultyFourSubject implements ISubject {

    private image: p5.Image;
    private x: number;
    private y: number;
    private xInc: number;
    private yInc: number;
    private sketch: p5;
    private goingRightUp: boolean;
    private speed : number;
    private speedInterval : number;
    private isPaused : boolean;

    constructor(sketch: p5, image: p5.Image) {
        this.image = image;
        this.sketch = sketch;
        this.goingRightUp = true;
        this.reset();
        let subjectSpeedPerFrame = this.sketch.canvas.width / 1000;
        this.xInc = subjectSpeedPerFrame;
        let number = this.sketch.canvas.width / subjectSpeedPerFrame;
        this.yInc = this.sketch.canvas.height / number;

        this.createSpeedInterval();
    }

    private createSpeedInterval() {
        clearInterval(this.speedInterval);
        this.speedInterval = setInterval(() => {
            this.speed += 0.1;
        }, 1000);
    }

    public draw(): void {
        if (this.isPaused) {
            if (this.goingRightUp) {
                this.sketch.push();
                this.sketch.scale(-1, 1);
                this.sketch.image(this.image, -this.x, this.y);
                this.sketch.pop();
            } else {
                this.sketch.image(this.image, this.x, this.y);
            }
            this.move();
            this.checkBoundaries();
        }
    }

    private move(): void {
        if (this.goingRightUp) {
            this.x += this.xInc * this.speed;
            this.y -= this.yInc * this.speed;
        } else {
            this.x -= this.xInc * this.speed;
            this.y += this.yInc * this.speed;
        }
    }

    private checkBoundaries() {
        if (this.goingRightUp) {
            if ((this.x + this.image.width) > this.sketch.canvas.width)
            {
                this.goingRightUp = false;
            }
        } else {
            if ((this.x - this.image.width) < 0)
            {
                this.goingRightUp = true;
            }
        }
    }

    public setImage(image: p5.Image): void {
    }

    public reset(): void {
        this.x = this.sketch.canvas.width / 2;
        this.y = this.sketch.canvas.height / 2;
        this.speed = 0;
        clearInterval(this.speedInterval);
    }

    continue(): void {
        this.createSpeedInterval();
        this.isPaused = false;
    }

    pause(): void {
        clearInterval(this.speedInterval);
        this.isPaused = true;
    }
}