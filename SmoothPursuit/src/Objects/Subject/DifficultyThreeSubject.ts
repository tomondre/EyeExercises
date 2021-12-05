import * as p5 from "p5";
import * as config from '../config'
import ISubject from "./ISubject";

export default class DifficultyThreeSubject implements ISubject {
    private image: p5.Image;
    private sketch: p5;
    private goingUp: boolean;
    private angle: number;

    constructor(sketch: p5, image: p5.Image) {
        this.image = image;
        this.sketch = sketch;
        this.reset();
        this.angle = 0;
    }

    public draw(): void {
        this.sketch.push();
        // this.sketch.rotate(270);
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
    }
}