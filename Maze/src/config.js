export const config = {
    messages: {
        timeOverMessage:{
            text: "Daily time Over. If you wish to continue press here: ",
            button: "Yes",
            buttonTwo: "No"
        },
        levelNotPassed: {
            text: "Difficulty Not Passed. Restarting in ",
            textTwo: " seconds.",
            timeLength: 3
        },
        levelPassedMessage : {
            text: "Congratulation, you have passed level ",
            textTwo: ". \nNext level starts in : ",
            textThree: " seconds.",
            timeLength: 3
        }, gameFinished : {
            text: "Congratulation, you have finished the game!"
        }
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
    colors: {
        background: 255,
        lines: '#66ffff',
        timer: '#ff6666',
        scoreBoard: '#ff6666',
        scoreBoardWhenHit: '#66ffff',
        numbers: '#ff6666',
        tiles: '#66ffff',
        selectedColors: '#ff6666',
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
        numberOfMazes: 3,
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