import * as p5 from "p5";
import * as config from '../config'
import ISubject from "./ISubject";
import SymbolLevelManager from "../Symbol/SymbolLevelManager";

export default class DifficultyTwoSubject implements ISubject{

    private image: p5.Image;
    private x: number;
    private y: number;
    private sketch: p5;
    private goingUp: boolean;
    private speed: number;
    private speedInterval: number;
    private isPaused: boolean;
    private symbolManager : SymbolLevelManager;

    constructor(sketch: p5, image: p5.Image, symbolManager : SymbolLevelManager) {
        this.symbolManager = symbolManager;
        this.image = image;
        this.sketch = sketch;
        this.reset();
    }

    public draw(): void {
        this.sketch.push();
        this.sketch.translate(this.x, this.y);
        this.sketch.imageMode(this.sketch.CENTER);
        if (this.goingUp)
        {
            this.sketch.rotate(0);
        }
        else {
            this.sketch.rotate(180);
        }
        this.sketch.image(this.image, 0, 0);
        this.sketch.pop();
        if (this.isPaused) {
            return;
        }
        this.symbolManager.draw(this.x, this.y);
        this.move();
        this.checkBoundaries();
    }

    private move(): void {
        if (this.goingUp) {
            this.y = this.y + config.config.game.subjectSpeedPerFrame * this.speed;

        } else {
            this.y = this.y - config.config.game.subjectSpeedPerFrame * this.speed;
        }
    }

    private checkBoundaries() {
        if (this.goingUp && (this.y + (this.image.height / 2)) > this.sketch.canvas.height) {
            this.goingUp = false;
        } else if (!this.goingUp && this.y  - (this.image.height / 2) < 0) {
            this.goingUp = true;
        }
    }

    public setImage(image: p5.Image): void {

    }

    public reset(): void {
        this.x = this.sketch.canvas.width / 2;
        this.y = this.sketch.canvas.height / 2;
        this.speed = config.config.difficulties[1].defaultSpeed;
        this.createSpeedInterval();
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