import ISubject from "./ISubject";
import * as p5 from "p5";
import * as config from '../config'
import SymbolLevelManager from "../Symbol/SymbolLevelManager";


export default class DifficultyOneSubject implements ISubject {

    private image: p5.Image;
    private x: number;
    private y: number;
    private sketch: p5;
    private goingRight: boolean;
    private speed: number;
    private speedInterval: number;
    private isPaused: boolean;
    private symbolManager : SymbolLevelManager;

    constructor(sketch: p5, image: p5.Image, symbolManager : SymbolLevelManager) {
        this.symbolManager = symbolManager;
        this.image = image;
        this.sketch = sketch;
    }

    public draw(): void {
        this.sketch.push();
        this.sketch.translate(this.x, this.y);
        this.sketch.imageMode(this.sketch.CENTER);
        if (this.goingRight)
        {
            this.sketch.rotate(270);
            this.sketch.scale(-1, 1);
            this.sketch.image(this.image, 0, 0);
        }
        else {
            this.sketch.rotate(90);
            this.sketch.image(this.image, 0, 0);
        }
        this.sketch.pop();
        if (this.isPaused) {
            return;
        }
        this.symbolManager.draw(this.x, this.y );
        this.move();
        this.checkBoundaries();
    }

    private move(): void {
        if (this.goingRight) {
            this.x = this.x + config.config.game.subjectSpeedPerFrame * this.speed;
        } else {
            this.x = this.x -  config.config.game.subjectSpeedPerFrame * this.speed;
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

    public create(): void {
        this.x = this.sketch.canvas.width / 2;
        this.y = this.sketch.canvas.height / 2;
        this.speed = config.config.difficulties[0].defaultSpeed;
        this.symbolManager.create();
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