import {config} from "../config";
import ObserverSupport from "../observer/ObserverSupport";
import CollisionCounter from "./CollisionCounter";
import {ObserverChange} from "../observer/ObserverChange";


let scoreDecreaseEvery = config.score.scoreDecreaseEvery;
let score = config.score.defaultScore;
let scoreIncrease = config.score.scoreIncrease;
let scoreDecrease = config.score.scoreDecrease;
let scoreDecreaseWallHit = config.score.scoreDecreaseWhenWallHit;
let defaultScore = config.score.defaultScore;
let redScoreBoardTimeAfterWallHitDecrease = config.cooldown.scoreBoardCooldownAfterCollision;

let sketch;
let scoreBoard;
let scoreBoardInterval;

let support;
let collisionCounter;

let coolDown = false;

export default class ScoreBoard {
    constructor(Sketch) {
        sketch = Sketch;
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
        score += scoreIncrease;
    }

    decreaseScore() {
        score -= scoreDecrease;
    }

    decreaseScoreWallHit()
    {
        if (!coolDown) {
            score -= scoreDecreaseWallHit;
            coolDown = true;
            collisionCounter.collision();
            if (collisionCounter.isGameOver())
            {
                support.fire(ObserverChange.levelNotPassed);
            }
            setTimeout(() => coolDown = false, redScoreBoardTimeAfterWallHitDecrease);
        }
    }

    resetCollisions()
    {
        collisionCounter.reset();
    }

    reset()
    {
        clearInterval(scoreBoardInterval);
        score = defaultScore;
    }

    clearInterval()
    {
        clearInterval(scoreBoardInterval);
    }

    startInterval() {
        clearInterval(scoreBoardInterval);
        scoreBoardInterval = setInterval(this.decreaseScore, scoreDecreaseEvery);
    }

    saveDataToApi() {

    }
}