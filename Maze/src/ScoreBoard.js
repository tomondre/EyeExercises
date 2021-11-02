let score = 0;
let sketch;

export default class ScoreBoard {
    constructor(Sketch) {
        sketch = Sketch;
    }

    draw() {
        sketch.fill("white");
        sketch.text("Score: " + score, window.innerWidth * 0.1, window.innerHeight * 0.1);
    }
    increaseScore()
    {
        score += config.score.scoreIncrease;
    }

    decreaseScore() {
        score -= config.score.scoreDecrease;
    }
}