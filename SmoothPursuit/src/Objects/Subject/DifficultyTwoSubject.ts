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
    private speedInterval: NodeJS.Timer;
    private isPaused: boolean;
    private symbolManager : SymbolLevelManager;
    private shouldBePictureDrawn: boolean = true;

    constructor(sketch: p5, image: p5.Image, symbolManager : SymbolLevelManager) {
        this.symbolManager = symbolManager;
        this.image = image;
        this.sketch = sketch;
    }

    public draw(): void {
        if (this.shouldBePictureDrawn) {
            this.sketch.push();
            this.sketch.translate(this.x, this.y);
            this.sketch.imageMode(this.sketch.CENTER);
            if (this.goingUp) {
                this.sketch.rotate(0);
            } else {
                this.sketch.rotate(180);
            }
            this.sketch.image(this.image, 0, 0);
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
        if (this.goingUp) {
            this.y = this.y + config.config.game.subjectSpeedPerFrame * this.speed;

        } else {
            this.y = this.y - config.config.game.subjectSpeedPerFrame * this.speed;
        }
    }

    private checkBoundaries() {
        if (this.goingUp && (this.y + this.image.height) > this.sketch.canvas.height) {
            this.goingUp = false;
        } else if (!this.goingUp && this.y - this.image.height < 0) {
            this.goingUp = true;
        }
    }

    public setImage(image: p5.Image): void {

    }

    public create(): void {
        this.x = this.sketch.canvas.width / 2;
        this.y = this.sketch.canvas.height / 2;
        this.speed = config.config.difficulties[1].defaultSpeed;
        this.symbolManager.create(1);
        this.continue();
    }

    public continue(): void {
        this.symbolManager.continue();
        this.createSpeedInterval();
        this.isPaused = false;
    }

    public continueSymbolLevel(difficultyEntries: number): void {
        this.symbolManager.create(difficultyEntries);
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

    public removePicture(): void {
        this.shouldBePictureDrawn = false;
    }
}