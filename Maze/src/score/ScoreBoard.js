import {config} from "../config";
import ObserverSupport from "../observer/ObserverSupport";
import CollisionCounter from "./CollisionCounter";
import {ObserverChange} from "../observer/ObserverChange";
import Helper from "../objects/Helper";

let scoreDecreaseEvery = config.score.scoreDecreaseEvery;
let score = config.score.defaultScore;
let scoreIncrease = config.score.scoreIncrease;
let scoreDecrease = config.score.scoreDecrease;
let scoreDecreaseWallHit = config.score.scoreDecreaseWhenWallHit;
let defaultScore = config.score.defaultScore;
let redScoreBoardTimeAfterWallHitDecrease = config.cooldown.scoreBoardCooldownAfterCollision;
let scoreDecreaseLevelTwo = config.score.scoreDecreaseLevelTwo;
let scoreIncreaseLevelTwo = config.score.scoreIncreaseLevelTwo;

let sketch;
let scoreBoard;
let scoreBoardInterval;

let support;
let collisionCounter;

let coolDown = false;

let startTime;

export default class ScoreBoard {
    constructor(Sketch) {
        sketch = Sketch;
        support = new ObserverSupport();
        collisionCounter = new CollisionCounter();
        startTime = this.getCurrentDateTime();
    }

    draw() {
        if (Helper.isMobile())
        {
            sketch.textSize(config.textSize.mobileScreen);
        }
        else {
            sketch.textSize(config.textSize.normalScreen);
        }
        if (coolDown) {
            sketch.fill(config.colors.scoreBoardWhenHit);
        } else {
            sketch.fill(config.colors.scoreBoard);
        }
        sketch.textAlign(sketch.LEFT, sketch.TOP);
        scoreBoard = sketch.text("Score: " + score, window.innerWidth * 0.1, window.innerHeight * 0.07);
    }

    increaseScore() {
        score += scoreIncrease;
    }

    decreaseScore() {
        score -= scoreDecrease;
    }

    decreaseScoreLevelTwo() {
        score -= scoreDecreaseLevelTwo;
        collisionCounter.collision();
        if (collisionCounter.isGameOver())
        {
            support.fire(ObserverChange.levelNotPassed);
        }
    }

    increaseScoreLevelTwo() {
        score += scoreIncreaseLevelTwo;
    }

    decreaseScoreWallHit() {
        if (!coolDown) {
            score -= scoreDecreaseWallHit;
            coolDown = true;
            collisionCounter.collision();
            if (collisionCounter.isGameOver()) {
                support.fire(ObserverChange.levelNotPassed);
            }
            setTimeout(() => coolDown = false, redScoreBoardTimeAfterWallHitDecrease);
        }
    }

    resetCollisions() {
        collisionCounter.reset();
    }

    reset() {
        collisionCounter.reset();
        clearInterval(scoreBoardInterval);
        startTime = this.getCurrentDateTime();
    }

    setDefaultLevelOneScore() {
        score = defaultScore;
    }

    setDefaultLevelTwoScore() {
        score = 0;
    }

    clearInterval() {
        clearInterval(scoreBoardInterval);
    }

    startInterval() {
        clearInterval(scoreBoardInterval);
        scoreBoardInterval = setInterval(this.decreaseScore, scoreDecreaseEvery);
    }

    saveDataToApi(level, difficulty) {
        let currentLog = {
            score: score,
            startTimeStr: startTime,
            endTimeStr: this.getCurrentDateTime(),
            exerciseName: "JumpingColumn",
            attribValue: "level " + level,
            attribName: "difficulty " + difficulty,        // (left, right or both) depending on current eye (blank if no eye-switching)
        }
        console.log(currentLog);

        // TODO: check work request on TYE website
        window.$.ajax({
            type: "POST",
            url: `/Exercise/PostScore`,
            data: {score: currentLog},
            success: function (data) {
                if (data.success) {
                } else {
                }
            }
        })
    }

    getCurrentDateTime() {
        let date = new Date().toLocaleString("en-GB");
        // from js: 07/10/2021, 19:05:51
        // to   cs: 07-10-2021 19:05:51
        date = date.replace("/", "-");
        date = date.replace("/", "-");
        date = date.replace(",", "");
        return date;
    }
}