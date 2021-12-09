import * as p5 from "p5";
import * as config from '../config'
import ISubject from "./ISubject";
import SymbolManager from "../SymbolManager";

export default class DifficultySixSubject implements ISubject {
    private image: p5.Image;
    private sketch: p5;
    private goingUp: boolean;
    private angle: number;
    private speed: number;
    private speedInterval: number;
    private isPaused: boolean;
    private symbolManager : SymbolManager;

    constructor(sketch: p5, image: p5.Image, symbolManager : SymbolManager) {
        this.symbolManager = symbolManager;
        this.image = image;
        this.sketch = sketch;
        this.angle = 0;
        this.reset();
    }

    public draw(): void {
        if (this.isPaused)
            return;

        this.sketch.push();
        this.sketch.translate(this.sketch.width / 2, this.sketch.height / 2);
        this.sketch.scale(-1, 1);
        this.sketch.imageMode(this.sketch.CENTER);
        this.sketch.rotate(this.angle);
        let semicircle = this.sketch.canvas.height * 0.9 / 2;
        this.sketch.image(this.image, semicircle, 0);
        this.sketch.pop()
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