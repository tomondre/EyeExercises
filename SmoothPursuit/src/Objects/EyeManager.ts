import {Eyes} from "./Eyes";
import * as p5 from "p5";


export default class EyeManager {
    private eye : Eyes;
    private sketch : p5;

    constructor(sketch : p5) {
        this.sketch = sketch;
        this.eye = Eyes.RIGHT;
    }

    public draw() : void {
        this.sketch.text("Eye: " + this.getEyeValue(), 0.1 * this.sketch.canvas.width, 0.18 * this.sketch.canvas.height);
    }

    public getCurrentEye() : Eyes {
        return this.eye;
    }

    public getEyeValue() : string {
        let s = Eyes[this.eye];
        return s.charAt(0) + s.substring(1).toLowerCase();
    }

    public setEye(eye: Eyes) : void {
        this.eye = eye;
    }
}