import * as p5 from "p5";
import * as config from '../config'
import ISubject from "./ISubject";

export default class DifficultyTwoSubject implements ISubject{

    private image: p5.Image;
    private x: number;
    private y: number;
    private sketch: p5;
    private goingUp: boolean;

    constructor(sketch: p5, image: p5.Image) {
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
            this.sketch.rotate(270);
        }
        else {
            this.sketch.rotate(90);
        }
        this.sketch.image(this.image, 0, 0);
        this.sketch.pop();
        this.move();
        this.checkBoundaries();
    }

    private move(): void {
        if (this.goingUp) {
            this.y += config.config.difficulties[0].subjectSpeedPerFrame;

        } else {
            this.y -= config.config.difficulties[0].subjectSpeedPerFrame;
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
    }
}