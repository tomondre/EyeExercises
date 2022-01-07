export const config = {
    game: {
        number: 909,
        frameRate: 50,
        increaseSpeedEverySecondBy: 0.001,
        subjectSpeedPerFrame: 5,
        angleIncrease: 0.8,
        increaseAngleSpeedEverySecondBy: 0.00005,
    },
    scoreBoard: {
        increase: 11,
        decrease: 5
    },
    levels: {
        levels: 4,
        difficulties: 6,
        subDifficulties: 4,
        levelTwoSymbols: "☺☽♘♡♫⚅⚐✂☃✈✔✏✰❆➔☏☘☞",
        levelThreeSymbols: "0123456789",
        levelFour: [{
            firstDigit: [1, 2, 3, 4, 5],
            secondDigit: [1, 2, 3, 4, 5],
            answerRange: [2, 10]
        }, {
            firstDigit: [5, 6, 7, 8, 9],
            secondDigit: [5, 6, 7, 8, 9],
            answerRange: [10, 18]
        }, {
            firstDigit: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            secondDigit: [10, 11, 12, 13, 14, 15],
            answerRange: [11, 24]
        }, {
            firstDigit: [10, 11, 12, 13, 14, 15],
            secondDigit: [10, 11, 12, 13, 14, 15],
            answerRange: [20, 30]
        }],
        levelFourMath: {
            answerGapX: 50,
            answerGapY: 40,
            middleAnswerGapY: 50,
            arrowSize: 65
        }
    },
    messages: {
        levelFinished: {
            text: [{
                text: "Congratlations, you have passed level ",
            }, {
                text: ".\n Next level starts in ",
            }, {
                text: " seconds.",
            }],
            time: 3
        },
        changeEye: {
            text: ["Time for right eye is over. Would you like to change eyes?"],
            okButtonText: "Yes",
            rejectButtonText: "No"
        },
        buttons: {
            heightPositionRatio: 0.70,
            chooseOneButtonsXOffsetInPixels: 50
        }
    },
    difficulties:
        [{
            difficultyNo: 1,
            defaultSpeed: 1
        }, {
            difficultyNo: 2,
            defaultSpeed: 1
        }, {
            difficultyNo: 3,
            defaultSpeed: 1
        }, {
            difficultyNo: 4,
            defaultSpeed: 1
        }, {
            difficultyNo: 5,
            defaultSpeed: 1
        }, {
            difficultyNo: 6,
        }],
}