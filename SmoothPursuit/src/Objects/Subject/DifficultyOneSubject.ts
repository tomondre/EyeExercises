import ISubject from "./ISubject";
import * as p5 from "p5";
import * as config from '../config'
import SymbolLevelManager from "../Symbol/SymbolLevelManager";
import Helper from "../Helper";


export default class DifficultyOneSubject implements ISubject {

    private image: p5.Image;
    private x: number;
    private y: number;
    private sketch: p5;
    private goingRight: boolean;
    private speed: number;
    private speedInterval: NodeJS.Timer;
    private isPaused: boolean;
    private symbolManager: SymbolLevelManager;
    private shouldBePictureDrawn: boolean = true;
    private slowDownListener : () => void = this.slowDownHandler.bind(this);

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
            if (this.goingRight) {
                this.sketch.rotate(270);
                this.sketch.scale(-1, 1);
                this.sketch.image(this.image, 0, 0);
            } else {
                this.sketch.rotate(90);
                this.sketch.image(this.image, 0, 0);
            }
            this.sketch.pop();
        }
        if (this.isPaused) {
            return;
        }
        this.symbolManager.draw(this.x, this.y);
        this.move();
        this.checkBoundaries();
    }

    private move(): void {
        if (this.goingRight) {
            this.x = this.x + config.config.game.subjectSpeedPerFrame * this.speed;
        } else {
            this.x = this.x - config.config.game.subjectSpeedPerFrame * this.speed;
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
        this.shouldBePictureDrawn = true;
        this.symbolManager.create(1);
        this.continue();
    }

    public continueSymbolLevel(difficultyEntries: number): void {
        this.symbolManager.create(difficultyEntries);
        this.createSlowDownListener();
        this.createSpeedInterval();
        this.isPaused = false;
    }

    public continue(): void {
        this.createSlowDownListener();;
        this.symbolManager.continue();
        this.createSpeedInterval();
        this.isPaused = false;
    }

    public pause(): void {
        this.symbolManager.pause();
        this.removeSlowdownListener();
        clearInterval(this.speedInterval);
        this.isPaused = true;
    }

    private createSpeedInterval(): void {
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