import ISubject from "./ISubject";
import * as p5 from "p5";
import * as config from '../config'
import SymbolLevelManager from "../Symbol/SymbolLevelManager";


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
    private symbolManager : SymbolLevelManager;

    constructor(sketch: p5, image: p5.Image, symbolManager : SymbolLevelManager) {
        this.symbolManager = symbolManager;
        this.image = image;
        this.sketch = sketch;
        let subjectSpeedPerFrame = config.config.game.subjectSpeedPerFrame;
        this.xInc = subjectSpeedPerFrame;
        let number = this.sketch.canvas.width / subjectSpeedPerFrame;
        this.yInc = this.sketch.canvas.height / number;
    }

    public draw(): void {
        this.sketch.push();
        this.sketch.imageMode(this.sketch.CENTER);
        this.sketch.translate(this.x, this.y);
        if (this.goingRightBottom) {
            this.sketch.rotate(300);
            this.sketch.scale(-1, 1);
            this.sketch.image(this.image, 0, 0);
        } else {
            this.sketch.rotate(120);
            this.sketch.image(this.image, 0, 0);
        }
        this.sketch.pop();
        if (this.isPaused)
            return;
        this.symbolManager.draw(this.x, this.y);
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
            if ((this.x - this.image.width) < 0) {
                this.goingRightBottom = true;
            }
        }
    }

    public setImage(image: p5.Image): void {
    }

    public create(): void {
        this.x = this.sketch.canvas.width / 2;
        this.y = this.sketch.canvas.height / 2;
        this.speed = config.config.difficulties[2].defaultSpeed;
        this.continue();
    }

    public continue(): void {
        this.symbolManager.continue();
        this.createSpeedInterval();
        this.isPaused = false;
    }

    public pause(): void {
        this.symbolManager.pause();
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