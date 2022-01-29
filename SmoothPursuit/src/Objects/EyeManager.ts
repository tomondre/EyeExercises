import {Eyes} from "./Eyes";
import * as p5 from "p5";
import {config} from "./config";

export default class EyeManager {
    private eye : Eyes;
    private sketch : p5;
    private color : string = config.colors.textColor;

    constructor(sketch : p5) {
        this.sketch = sketch;
        this.eye = Eyes.RIGHT;
    }

    public draw() : void {
        this.sketch.push();
        this.sketch.textSize(40);
        this.sketch.fill(this.color);
        this.sketch.text("Eye: " + this.getEyeValue(), window.innerWidth * 0.1, window.innerHeight * 0.18);
        this.sketch.pop();
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