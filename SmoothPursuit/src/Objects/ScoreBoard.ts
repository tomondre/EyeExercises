import p5 = require("p5");

export default class ScoreBoard {
    private score : number;
    private sketch : p5;

    constructor(sketch : p5) {
        this.score = 0;
        this.sketch = sketch;
    }

    public draw() : void {
        this.sketch.push();
        this.sketch.textSize(30);
        this.sketch.text("Score: " + this.score, this.sketch.canvas.width * 0.1, this.sketch.canvas.height * 0.07)
        this.sketch.pop();
    }

    public resetScore() : void {
        this.score = 0;
    }

    public increaseScore() : void {
        this.score += 10;
    }

    public decreaseScore() : void {
        this.score -= 5;
    }
}