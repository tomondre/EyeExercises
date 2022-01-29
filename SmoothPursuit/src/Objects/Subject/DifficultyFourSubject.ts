import ISubject from "./ISubject";
import * as p5 from "p5";
import * as config from '../config'
import SymbolLevelManager from "../Symbol/SymbolLevelManager";
import Helper from "../Helper";

export default class DifficultyFourSubject implements ISubject {

    private image: p5.Image;
    private x: number;
    private y: number;
    private xInc: number;
    private yInc: number;
    private sketch: p5;
    private goingRightUp: boolean;
    private speed: number;
    private speedInterval: NodeJS.Timer;
    private isPaused: boolean;
    private symbolManager: SymbolLevelManager;
    private shouldBePictureDrawn: boolean = true;
    private slowDownListener: () => void = this.slowDownHandler;

    constructor(sketch: p5, image: p5.Image, symbolManager: SymbolLevelManager) {
        this.symbolManager = symbolManager;
        this.image = image;
        this.sketch = sketch;
    }

    public draw(): void {
        if (this.shouldBePictureDrawn) {
            this.sketch.push();
            this.sketch.translate(this.x, this.y);
            this.sketch.imageMode(this.sketch.CENTER);

            if (this.goingRightUp) {
                this.sketch.rotate(240);
                this.sketch.scale(-1, 1);
                this.sketch.image(this.image, 0, 0);
            } else {
                this.sketch.rotate(60);
                this.sketch.image(this.image, 0, 0);
            }
            this.sketch.pop();
        }
        if (this.isPaused)
            return;
        this.symbolManager.draw(this.x, this.y);
        this.move();
        this.checkBoundaries();
    }

    private move(): void {
        if (this.goingRightUp) {
            this.x = this.x + this.xInc * this.speed;
            this.y = this.y - this.yInc * this.speed;
        } else {
            this.x = this.x - this.xInc * this.speed;
            this.y = this.y + this.yInc * this.speed;
        }
    }

    private checkBoundaries() {
        if (this.goingRightUp) {
            if ((this.x + this.image.width) > window.innerWidth) {
                this.goingRightUp = false;
            }
        } else {
            if ((this.x - this.image.width) < 0) {
                this.goingRightUp = true;
            }
        }
    }

    public setImage(image: p5.Image): void {
    }

    public create(): void {
        this.pause();
        this.goingRightUp = true;
        let subjectSpeedPerFrame = config.config.game.subjectSpeedPerFrame;
        this.xInc = subjectSpeedPerFrame;
        let number = window.innerWidth / subjectSpeedPerFrame;
        this.yInc = window.innerHeight / number;
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.speed = config.config.difficulties[3].defaultSpeed;
        this.symbolManager.create(1);
        this.continue();
    }

    public continueSymbolLevel(difficultyEntries: number): void {
        this.symbolManager.create(difficultyEntries);
        this.createSpeedInterval();
        this.createSlowDownListener();
        this.isPaused = false;
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