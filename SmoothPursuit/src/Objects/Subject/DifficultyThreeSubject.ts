import ISubject from "./ISubject";
import * as p5 from "p5";
import * as config from '../config'
import SymbolManager from "../SymbolManager";


export default class DifficultyThreeSubject implements ISubject {

    private image: p5.Image;
    private x: number;
    private y: number;
    private xInc: number;
    private yInc: number;
    private sketch: p5;
    private goingRightBottom: boolean;
    private speed: number;
    private speedInterval: number;
    private isPaused: boolean;
    private symbolManager : SymbolManager;

    constructor(sketch: p5, image: p5.Image, symbolManager : SymbolManager) {
        this.symbolManager = symbolManager;
        this.image = image;
        this.sketch = sketch;
        let subjectSpeedPerFrame = config.config.game.subjectSpeedPerFrame;
        this.xInc = subjectSpeedPerFrame;
        let number = this.sketch.canvas.width / subjectSpeedPerFrame;
        this.yInc = this.sketch.canvas.height / number;
        this.reset();
    }

    public draw(): void {
        if (this.isPaused)
            return;

        if (this.goingRightBottom) {
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

    private move(): void {
        if (this.goingRightBottom) {
            this.x = this.x + this.xInc * this.speed;
            this.y = this.y + this.yInc * this.speed;
        } else {
            this.x = this.x - this.xInc * this.speed;
            this.y = this.y -  this.yInc * this.speed;
        }
    }

    private checkBoundaries() {
        if (this.goingRightBottom) {
            if ((this.x + this.image.width) > this.sketch.canvas.width) {
                this.goingRightBottom = false;
            }
        } else {
            if ((this.x) < 0) {
                this.goingRightBottom = true;
            }
        }
    }

    public setImage(image: p5.Image): void {
    }

    public reset(): void {
        this.x = this.sketch.canvas.width / 2;
        this.y = this.sketch.canvas.height / 2;
        this.speed = config.config.difficulties[2].defaultSpeed;
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
        }, 1000);
    }
}