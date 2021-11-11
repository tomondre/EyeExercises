import {config} from "../config";
import ObserverSupport from "../observer/ObserverSupport";
import CollisionCounter from "./CollisionCounter";
import {ObserverChange} from "../observer/ObserverChange";

let score;
let sketch;
let scoreBoard;
let scoreBoardInterval;

let support;
let collisionCounter;

let coolDown = false;

export default class ScoreBoard {
    constructor(Sketch) {
        sketch = Sketch;
        score = config.score.defaultScore;
        support = new ObserverSupport();
        collisionCounter = new CollisionCounter();
    }

    draw() {
        if (coolDown)
        {
            sketch.fill("red");
        }
        else
        {
            sketch.fill("white");
        }
        sketch.textSize(30);
        scoreBoard = sketch.text("Score: " + score, window.innerWidth * 0.1, window.innerHeight * 0.1);
        sketch.fill("white");
    }

    increaseScore() {
        score += config.score.scoreIncrease;
    }

    decreaseScore() {
        score -= config.score.scoreDecrease;
    }

    decreaseScoreWallHit()
    {
        if (!coolDown) {
            score -= config.score.scoreDecreaseWhenWallHit;
            coolDown = true;
            collisionCounter.collision();
            if (collisionCounter.isGameOver())
            {
                support.fire(ObserverChange.levelNotPassed);
            }
            setTimeout(() => coolDown = false, 100);
        }
    }

    resetCollisions()
    {
        collisionCounter.reset();
    }

    reset()
    {
        clearInterval(scoreBoardInterval);
        score = config.score.defaultScore;
    }

    clearInterval()
    {
        clearInterval(scoreBoardInterval);
    }

    startInterval() {
        clearInterval(scoreBoardInterval);
        scoreBoardInterval = setInterval(this.decreaseScore, config.score.scoreDecreaseEvery);
    }

    saveDataToApi() {

    }
}