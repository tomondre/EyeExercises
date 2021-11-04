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
        scoreDecreaseBySecond: 1,
        scoreDecreaseWhenWallHit: 5,
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
    difficulties: [{
        difficulty: 1,
        numberOfMazes: 2,
        numberOfColumns: 6
    }, {
        difficulty: 2,
        numberOfMazes: 3,
        numberOfColumns: 7
    }, {
        difficulty: 3,
        numberOfMazes: 2,
        numberOfColumns: 8
    },{
        difficulty: 3,
        numberOfMazes: 7,
        numberOfColumns: 9
    }]
}