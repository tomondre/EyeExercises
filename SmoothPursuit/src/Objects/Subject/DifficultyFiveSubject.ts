import * as p5 from "p5";
import * as config from '../config'
import ISubject from "./ISubject";

export default class DifficultyFiveSubject implements ISubject {
    private image: p5.Image;
    private sketch: p5;
    private goingUp: boolean;
    private angle: number;
    private speed: number;
    private speedInterval: number;
    private isPaused: boolean;

    constructor(sketch: p5, image: p5.Image) {
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
        this.sketch.imageMode(this.sketch.CENTER);
        this.sketch.rotate(this.angle);
        this.sketch.image(this.image, 100, 0);
        this.sketch.pop();
        this.move();
    }

    private move(): void {
        this.angle++;
    }

    public setImage(image: p5.Image): void {
    }

    public reset(): void {
        this.angle = 0;
        this.speed = config.config.game.defaultSpeed;
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