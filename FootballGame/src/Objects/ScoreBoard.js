import {CONFIG} from "../../config/config.js";
import TextStyleManager from "./TextStyleManager";

var scoreBoardText;
var score;
var streak;

export default class ScoreBoard {
    constructor(gameScene) {
        this.scene = gameScene;
        scoreBoardText = null;
        score = 0;
        streak = 0;
    }

    create() {
        this.reset();
        scoreBoardText = this.scene.add.text(this.scene.game.canvas.width * 0.5, this.scene.game.canvas.height * 0.07, "");
        scoreBoardText.setOrigin(0.5, 0);
        let scoreBoardStyle = TextStyleManager.getTextStyle();
        scoreBoardText.setStyle(scoreBoardStyle);
        this.update();
    }

    increaseScore() {
        score += CONFIG.score.increase;
        streak++;
        if (streak === 3) {
            score += CONFIG.score.increase;
            streak = 0;
        }
        this.update();
    }

    decreaseScore() {
        score -= CONFIG.score.decrease
        streak = 0;
        this.update();
    }

    getScore() {
        return score
    }

    update() {
        scoreBoardText.setText("Score: " + score)
    }

    reset() {
        streak = 0;
        score = 0;
    }
}