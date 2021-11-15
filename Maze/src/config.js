export const config = {
    tile: {
        firstTile: {
            R: 0,
            G: 0,
            B: 255,
        },
        lastTile: {
            R: 0,
            G: 0,
            B: 255,
        },
    },
    maze: {
        lineWidth: 5,
    },
    game: {
        frameRate: 30,
        collisionCountForGameOver: 3
    },
    score: {
        scoreIncrease: 1,
        scoreDecrease: 1,
        scoreDecreaseEvery: 500,
        scoreDecreaseWhenWallHit: 10,
        scoreIncreaseLevelTwo: 10,
        scoreDecreaseLevelTwo: 10,
        defaultScore: 100
    },
    canvas: {
        width: 600
    },
    car: {
        size: {
            x: 26,
            y: 52
        }
    },
    cooldown: {
        scoreBoardCooldownAfterCollision: 100,
        afterCollisionCooldown: 100
    },
    levelTwoNumbers: {
        selectedGap: 20,
        gapBetweenGridAndNumberButton: 50,
        gapBetweenButtonsAnsSelectedNumbers: 40
    },
    difficulties: [{
        difficulty: 1,
        numberOfMazes: 2,
        numberOfColumns: 6,
        numberOfNumbersWhenLevelTwo: 12
    }, {
        difficulty: 2,
        numberOfMazes: 1,
        numberOfColumns: 7,
        numberOfNumbersWhenLevelTwo: 14
    }, {
        difficulty: 3,
        numberOfMazes: 1,
        numberOfColumns: 8,
        numberOfNumbersWhenLevelTwo: 16
    },{
        difficulty: 3,
        numberOfMazes: 1,
        numberOfColumns: 9,
        numberOfNumbersWhenLevelTwo: 18
    }]
}