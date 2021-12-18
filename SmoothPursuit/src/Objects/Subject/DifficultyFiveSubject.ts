import * as p5 from "p5";
import * as config from '../config'
import ISubject from "./ISubject";
import SymbolLevelManager from "../Symbol/SymbolLevelManager";

export default class DifficultyFiveSubject implements ISubject {
    private image: p5.Image;
    private sketch: p5;
    private angle: number;
    private speed: number;
    private speedInterval: number;
    private isPaused: boolean;
    private symbolManager : SymbolLevelManager;

    constructor(sketch: p5, image: p5.Image, symbolManager : SymbolLevelManager) {
        this.symbolManager = symbolManager;
        this.image = image;
        this.sketch = sketch;
    }

    public continueSymbolLevel(difficultyEntries: number): void {
        this.symbolManager.create(difficultyEntries);
        this.createSpeedInterval();
        this.isPaused = false;
    }

    public draw(): void {
        this.sketch.push();
        this.sketch.translate(this.sketch.width / 2, this.sketch.height / 2);
        this.sketch.imageMode(this.sketch.CENTER);
        this.sketch.rotate(this.angle);
        let radius = this.sketch.canvas.height * 0.9 / 2;
        this.sketch.image(this.image, radius, 0);
        this.sketch.pop();
        if (this.isPaused)
            return;

        let x = this.sketch.canvas.width / 2 + (radius * Math.cos(Math.PI * 2 * (this.angle  % 360) / 360));
        let y = this.sketch.canvas.height / 2 + (radius * Math.sin(Math.PI * 2 * (this.angle  % 360) / 360));
        this.symbolManager.draw(x, y);

        this.move();
    }

    private move(): void {
        this.angle += config.config.game.angleIncrease + (this.angle * config.config.game.increaseAngleSpeedEverySecondBy);
    }

    public setImage(image: p5.Image): void {
    }

    public create(): void {
        this.pause();
        this.angle = 0;
        this.speed = config.config.difficulties[5].defaultSpeed;
        this.symbolManager.create(1);
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