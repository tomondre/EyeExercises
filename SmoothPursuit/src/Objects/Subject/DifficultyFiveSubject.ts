import * as p5 from "p5";
import * as config from '../config'
import ISubject from "./ISubject";
import SymbolLevelManager from "../Symbol/SymbolLevelManager";
import Helper from "../Helper";

export default class DifficultyFiveSubject implements ISubject {
    private image: p5.Image;
    private sketch: p5;
    private angle: number;
    private speed: number;
    private speedInterval: NodeJS.Timer;
    private isPaused: boolean;
    private symbolManager: SymbolLevelManager;
    private shouldBePictureDrawn: boolean = true;
    private slowDownListener: () => void = this.slowDownHandler.bind(this);

    constructor(sketch: p5, image: p5.Image, symbolManager: SymbolLevelManager) {
        this.symbolManager = symbolManager;
        this.image = image;
        this.sketch = sketch;
    }

    public continueSymbolLevel(difficultyEntries: number): void {
        this.symbolManager.create(difficultyEntries);
        this.createSpeedInterval();
        this.createSlowDownListener();
        this.isPaused = false;
    }

    public draw(): void {
        let radius = window.innerHeight * config.config.game.heightToRotationRatio / 2;
        if (this.shouldBePictureDrawn) {
            this.sketch.push();
            this.sketch.translate(window.innerWidth / 2, window.innerHeight / 2);
            this.sketch.imageMode(this.sketch.CENTER);
            this.sketch.rotate(this.angle);
            this.sketch.image(this.image, radius, 0);
            this.sketch.pop();
        }
        if (this.isPaused)
            return;

        let num = Math.PI * 2 * (this.angle % 360) / 360;
        let x = window.innerWidth / 2 + (radius * Math.cos(num));
        let y = window.innerHeight / 2 + (radius * Math.sin(num));
        this.symbolManager.draw(x, y);

        this.move();
    }

    private move(): void {
        this.angle += (config.config.game.angleIncrease + (this.angle * config.config.game.increaseAngleSpeedEverySecondBy)) * this.speed;
    }

    public setImage(image: p5.Image): void {
    }

    public create(): void {
        this.pause();
        this.angle = 0;
        this.speed = config.config.difficulties[4].defaultSpeed;
        this.symbolManager.create(1);
        this.continue();
    }

    public continue(): void {
        this.symbolManager.continue();
        this.createSpeedInterval();
        this.createSlowDownListener();
        this.isPaused = false;
    }

    public pause(): void {
        this.symbolManager.pause();
        clearInterval(this.speedInterval);
        this.removeSlowdownListener();
        this.isPaused = true;
    }

    private createSpeedInterval() {
        clearInterval(this.speedInterval);
        this.speedInterval = setInterval(() => {
            this.speed += config.config.game.increaseSpeedEverySecondBy;
        }, 1000);
    }

    public slowDownHandler(): void {
        if (this.speed > 0.5)
            this.speed -= config.config.game.slowDownBy;
    }

    public createSlowDownListener(): void {
        Helper.createSlowdownListener(this.slowDownListener);
    }

    public removeSlowdownListener(): void {
        Helper.removeSlowdownListener(this.slowDownListener);
    }

    public removePicture(): void {
        this.shouldBePictureDrawn = false;
    }
}