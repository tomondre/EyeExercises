import {CONFIG} from "../../config/config";

var ballInterval;
var ballIntervalTime;

var symbolInterval;

var playerResponseTimeout;
var playerResponseTime;

var ballCB;
var symbolCB;
var playerResponseCB;

export default class IntervalManager {
    constructor(ballC, symbolC, playerResponseC) {
        ballIntervalTime = CONFIG.ball.defaultSpeed;
        playerResponseTime = CONFIG.space.playerResponseTime;
        ballCB = ballC;
        symbolCB = symbolC;
        playerResponseCB = playerResponseC;
    }

    createBallInterval() {
        clearInterval(ballInterval);
        ballInterval = setInterval(() => ballCB(), ballIntervalTime);
    }

    createSymbolInterval() {
        let time = this.randomNumber(3000, 6000)
        clearInterval(symbolInterval);
        symbolInterval = setInterval(() => symbolCB(), time)
    }

    createPlayerResponseTimeout()
    {
        playerResponseTimeout = setTimeout(() => playerResponseCB(), playerResponseTime)
    }

    reset() {
        clearInterval(ballInterval);
        clearInterval(symbolInterval);
        clearTimeout(playerResponseTimeout);
        ballIntervalTime = CONFIG.ball.defaultSpeed;
        playerResponseTime = CONFIG.space.playerResponseTime;
    }

    clearPlayerResponseTimeout()
    {
        clearTimeout(playerResponseTimeout);
    }

    slowDownButtonPressed() {
        ballIntervalTime += CONFIG.slowDownButton.slowDownBy
        this.createBallInterval()
    }

    randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    setBallIntervalTime(time) {
        ballIntervalTime = time;
    }

    getBallIntervalTime() {
        return ballIntervalTime;
    }

    resetBallIntervalSpeed() {
        ballIntervalTime = CONFIG.ball.defaultSpeed;
    }

    increaseBallIntervalSpeed() {
        if (ballIntervalTime > 250)
            ballIntervalTime -= CONFIG.ball.speedDecreaseInMilliseconds;
        this.createBallInterval();
    }

    decreaseBallIntervalSpeed() {
        if (ballIntervalTime < 1600)
            ballIntervalTime += CONFIG.ball.speedIncreaseInMilliseconds
        this.createBallInterval();
    }

    pauseIntervals()
    {
        clearInterval(ballInterval);
        clearInterval(symbolInterval);
    }

    continueIntervals()
    {
       this.createBallInterval();
       this.createSymbolInterval();
    }
}