let score = 0;

export default class ScoreBoard {
    draw() {
        fill("white");
        text("Score: " + score, window.innerWidth * 0.1, window.innerHeight * 0.1);
    }
    increaseScore()
    {
        score += config.score.scoreIncrease;
    }

    decreaseScore() {
        score -= config.score.scoreDecrease;
    }
}