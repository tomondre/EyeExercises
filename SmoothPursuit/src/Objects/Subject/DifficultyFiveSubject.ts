import * as p5 from "p5";
import * as config from '../config'
import ISubject from "./ISubject";
import SymbolLevelManager from "../Symbol/SymbolLevelManager";

export default class DifficultyFiveSubject implements ISubject {
    private image: p5.Image;
    private sketch: p5;
    private goingUp: boolean;
    private angle: number;
    private speed: number;
    private speedInterval: number;
    private isPaused: boolean;
    private symbolManager : SymbolLevelManager;

    constructor(sketch: p5, image: p5.Image, symbolManager : SymbolLevelManager) {
        this.symbolManager = symbolManager;
        this.image = image;
        this.sketch = sketch;
        this.angle = 0;
        this.reset();
    }

    public draw(): void {
        this.sketch.push();
        this.sketch.translate(this.sketch.width / 2, this.sketch.height / 2);
        this.sketch.imageMode(this.sketch.CENTER);
        this.sketch.rotate(this.angle);
        let semicircle = this.sketch.canvas.height * 0.9 / 2;
        this.sketch.image(this.image, semicircle, 0);
        this.sketch.pop();
        if (this.isPaused)
            return;
        this.symbolManager.draw(this.x, this.y);
        this.move();
    }

    private move(): void {
        this.angle += config.config.game.angleIncrease;
    }

    public setImage(image: p5.Image): void {
    }

    public reset(): void {
        this.angle = 0;
        this.speed = config.config.difficulties[5].defaultSpeed;
        this.createSpeedInterval()
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