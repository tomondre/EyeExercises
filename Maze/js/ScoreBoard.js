function ScoreBoard() {
    this.score = 0;
    this.draw = function () {
        fill("white");
        text("Score: " + this.score, window.innerWidth * 0.1, window.innerHeight * 0.1);
    }
    this.increaseScore = function ()
    {
        this.score += config.score.scoreIncrease;
    }

    this.decreaseScore = function () {
        this.score -= config.score.scoreDecrease;
    }
}