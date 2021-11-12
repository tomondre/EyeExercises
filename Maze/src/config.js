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
        lineWidth: 5
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
    difficulties: [{
        difficulty: 1,
        numberOfMazes: 1,
        numberOfColumns: 6,
        numberOfNumbersWhenLevelTwo: 18
    }, {
        difficulty: 2,
        numberOfMazes: 1,
        numberOfColumns: 7,
        numberOfNumbersWhenLevelTwo: 21
    }, {
        difficulty: 3,
        numberOfMazes: 1,
        numberOfColumns: 8,
        numberOfNumbersWhenLevelTwo: 24
    },{
        difficulty: 3,
        numberOfMazes: 1,
        numberOfColumns: 9,
        numberOfNumbersWhenLevelTwo: 27
    }]
}