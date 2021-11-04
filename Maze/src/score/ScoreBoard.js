import {config} from "../config";

let score;
let sketch;
let scoreBoard;
let scoreBoardInterval;

let coolDown = false;

export default class ScoreBoard {
    constructor(Sketch) {
        sketch = Sketch;
        score = config.score.defaultScore;

    }

    draw() {
        sketch.fill("white");
        sketch.textSize(30);
        scoreBoard = sketch.text("Score: " + score, window.innerWidth * 0.1, window.innerHeight * 0.1);
    }

    increaseScore() {
        score += config.score.scoreIncrease;
    }

    decreaseScore() {
        score -= config.score.scoreDecreaseBySecond;
    }

    decreaseScoreWallHit()
    {
        if (!coolDown) {
            score -= config.score.scoreDecreaseWhenWallHit;

            coolDown = true;
            setTimeout(() => coolDown = false, 100);
        }
    }

    reset()
    {
        clearInterval(scoreBoardInterval);
        score = config.score.defaultScore;
    }

    startInterval() {
        this.reset();
        scoreBoardInterval = setInterval(this.decreaseScore, 1000);
    }

}