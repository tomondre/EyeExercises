import {CONFIG} from "../../config/config.js";

var scene;
var toGenerateRedDot;
var dot;
var lastGeneratedTime;
var waitingForSpaceAfterRedDotGenerated;

export default class Dot
{
    constructor(gameScene) {
        scene = gameScene;
        toGenerateRedDot = false;
        dot = null
        lastGeneratedTime = null;
        waitingForSpaceAfterRedDotGenerated = false;
    }

    createRedDot(ballX, ballY, currentLevel) {
            this.deleteRedDotIfExists()

            let dotX = ballX + (CONFIG.ball.ballSize / 2)
            let dotY = ballY + (CONFIG.ball.ballSize / 2)
            dot = scene.add.circle(dotX, dotY, currentLevel.dotSize, 0xff0000)
            lastGeneratedTime = scene.time.now
            waitingForSpaceAfterRedDotGenerated = true;
            toGenerateRedDot = false;
    }

    deleteRedDotIfExists()
    {
        if (dot != null) {
            dot.destroy();
            dot = null;
        }
    }

    isWaitingForSpaceAfterRedDotGenerated()
    {
        return waitingForSpaceAfterRedDotGenerated;
    }

    setWaitingForSpaceAfterRedDotGenerated(bool)
    {
        waitingForSpaceAfterRedDotGenerated = bool;
    }

   getLastGeneratedTime()
    {
        return lastGeneratedTime;
    }

    isToGenerateRedDot()
    {
        return toGenerateRedDot;
    }

    toGenerateRedDot(bool)
    {
        toGenerateRedDot = bool
    }

}