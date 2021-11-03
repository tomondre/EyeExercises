import {config} from "./config";

let score = 0;
let sketch;
let scoreBoard;

let coolDown = false;

export default class ScoreBoard {
    constructor(Sketch) {
        sketch = Sketch;
    }

    draw() {
        sketch.fill("white");
        sketch.textSize(30);
        scoreBoard = sketch.text("Score: " + score, window.innerWidth * 0.1, window.innerHeight * 0.1);
    }
    increaseScore()
    {
        score += config.score.scoreIncrease;
    }

    decreaseScore() {
        if (!coolDown)
        {
            score -= config.score.scoreDecrease;

            coolDown = true;
            setTimeout(() => coolDown = false, 1000);
        }
    }

    reset()
    {
        score = 0;
    }
}