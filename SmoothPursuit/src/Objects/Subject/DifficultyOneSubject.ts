import ISubject from "./ISubject";
import * as p5 from "p5";
import * as config from '../config'


export default class DifficultyOneSubject implements ISubject {

    private image: p5.Image;
    private x: number;
    private y: number;
    private sketch: p5;
    private goingRight: boolean;
    private speed: number;
    private speedInterval: number;
    private isPaused: boolean;

    constructor(sketch: p5, image: p5.Image) {
        this.image = image;
        this.sketch = sketch;
        this.reset();
    }

    public draw(): void {
        if (this.isPaused)
            return;
        if (this.goingRight)
        {
            this.sketch.push();
            this.sketch.scale(-1, 1);
            this.sketch.image(this.image, -this.x, this.y);
            this.sketch.pop();
        }
        else {
            this.sketch.image(this.image, this.x, this.y);
        }
        this.move();
        this.checkBoundaries();
    }

    private move(): void {
        if (this.goingRight) {
            this.x = this.x + config.config.difficulties[0].subjectSpeedPerFrame  * this.speed;

        } else {
            this.x = this.x -  config.config.difficulties[0].subjectSpeedPerFrame  * this.speed;
        }
    }

    private checkBoundaries() {
        if (this.goingRight && (this.x + this.image.width) > this.sketch.canvas.width) {
            this.goingRight = false;
        } else if (!this.goingRight && this.x - this.image.width < 0) {
            this.goingRight = true;
        }
    }

    public setImage(image: p5.Image): void {
    }

    public reset(): void {
        this.x = this.sketch.canvas.width / 2;
        this.y = this.sketch.canvas.height / 2;
        this.speed = config.config.game.defaultSpeed
        this.createSpeedInterval();
    }

    public continue(): void {
        this.createSpeedInterval();
        this.isPaused = false;
    }

    public pause(): void {
        clearInterval(this.speedInterval);
        this.isPaused = true;
    }

    private createSpeedInterval() {
        clearInterval(this.speedInterval);
        this.speedInterval = setInterval(() => {
            this.speed += config.config.game.increaseSpeedEverySecondBy;
            console.log("increased");
            console.log(this.speed);
            }, 1000);
    }
}