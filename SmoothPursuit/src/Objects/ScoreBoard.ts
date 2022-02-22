import p5 = require("p5");
import {config} from "./config";

export default class ScoreBoard {
    private score: number;
    private sketch: p5;
    private color: string = config.colors.textColor;

    constructor(sketch: p5) {
        this.score = 0;
        this.sketch = sketch;
    }

    public draw(): void {
        this.sketch.push();
        this.sketch.fill(this.color);
        this.sketch.textSize(40);
        this.sketch.text("Score: " + this.score, window.innerWidth * 0.1, window.innerHeight * 0.125);
        this.sketch.pop();
    }

    public resetScore(): void {
        this.score = 0;
    }

    public increaseScore(): void {
        this.score += config.scoreBoard.increase;
    }

    public decreaseScore(): void {
        this.score -= config.scoreBoard.decrease;
    }

    public getScore() {
        return this.score;
    }
}