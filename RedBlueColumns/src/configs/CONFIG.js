export const CONFIG = {
    grid: {
        arrowSizeToWindowWidthRatio: 0.03,
        arrowScale: 0.8,
        arrowsNo: 4,
        arrowSizeToTotalSpaceRatio: 1
    },
    arrowImageAngle: 90,
    scoreBoard: {
        increase: 10,
        decrease: 10,
    },
    responsiveness: {
        normalTextSize: 40,
        normalButtonTextSize: 23,
        switchSizesWhenResolutionLowerThan: 1000,
        smallerTextSize: 25,
        smallerButtonTextSize: 20
    },
    buttons: {
        pointeroutColor: 0xffA500,
        pointeroverColor: 0xff0000
    },
    Board:{
        timerHeight:0.01,
        scoreHeight:0.05,
        timerWidth:0.02,
        scoreWidth:0.02,
    },
    messages: {
        levelPassed: {
            textFirstPart: "Great Job! Level ",
            textSecondPart: " has been passed,\n Next level starts in: ",
            textThirdPart: " seconds",
            timeLength: 3
        },
        puzzleNotPassed: {
            text: "Puzzle failed. Try again on next one.",
        },
        gameFinished: {
            text: "Congratulation, you have successfully finished the game!",
        },
        confirmLevelDown: {
            text: "Do you wish to go down one level?",
            buttonOne: "Confirm",
            buttonTwo: "Reject"
        },
        rotateScreen: {
            text: "Please, rotate your screen."
        },
        exitMessage: {
            text: "Thank you"
        },
        exitGameButton: {
            text: "Press here to exit the game"
        },
        confirmButton: {
            text: "Confirm"
        },
        timeOver: {
            text: "Daily training finished"
        },
        height: 0.045,
        buttonHeight: 0.88
    },
    levels:
        [{
            levelNo: 1,
            rows: 3,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 1,
            correctPuzzlesToPassLevel: 2
        }, {
            levelNo: 2,
            rows: 7,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 1,
            correctPuzzlesToPassLevel: 2
        },{
            levelNo: 3,
            rows: 8,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 1,
            correctPuzzlesToPassLevel: 2
        }, {
            levelNo: 4,
            rows: 9,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 1,
            correctPuzzlesToPassLevel: 2
        },{
            levelNo: 5,
            rows: 10,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 1,
            correctPuzzlesToPassLevel: 2
        }, {
            levelNo: 6,
            rows: 11,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 1,
            correctPuzzlesToPassLevel: 2
        }, {
            levelNo: 7,
            rows: 12,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 1,
            correctPuzzlesToPassLevel: 2
        }, {
            levelNo: 8,
            rows: 6,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 2,
            correctPuzzlesToPassLevel: 2
        }, {
            levelNo: 9,
            rows: 7,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 2,
            correctPuzzlesToPassLevel: 2
        }, {
            levelNo: 10,
            rows: 8,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 2,
            correctPuzzlesToPassLevel: 2
        }, {
            levelNo: 11,
            rows: 9,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 2,
            correctPuzzlesToPassLevel: 2
        }, {
            levelNo: 12,
            rows: 10,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 2,
            correctPuzzlesToPassLevel: 2
        }, {
            levelNo: 13,
            rows: 11,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 2,
            correctPuzzlesToPassLevel: 2
        }
            , {
            levelNo: 14,
            rows: 12,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 2,
            correctPuzzlesToPassLevel: 2
        }
            , {
            levelNo: 15,
            rows: 6,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 3,
            correctPuzzlesToPassLevel: 2
        }
            , {
            levelNo: 16,
            rows: 7,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 3,
            correctPuzzlesToPassLevel: 2
        }
            , {
            levelNo: 17,
            rows: 8,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 3,
            correctPuzzlesToPassLevel: 2
        }
            , {
            levelNo: 18,
            rows: 9,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 3,
            correctPuzzlesToPassLevel: 2
        }
            , {
            levelNo: 19,
            rows: 10,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 3,
            correctPuzzlesToPassLevel: 2
        }
            , {
            levelNo: 20,
            rows: 11,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 3,
            correctPuzzlesToPassLevel: 2
        }
            , {
            levelNo: 21,
            rows: 12,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 3,
            correctPuzzlesToPassLevel: 2
        }],
    symbolAmount: {
        amount: 6
    },
    symbols:
        [{
            value: "8"
        }, {
            value: "3"
        }, {
            value: "B"
        }, {
            value: "R"
        }, {
            value: "D"
        }, {
            value: "E"
        }],
    percentOfSuccessToPassLevel: 0.89,
    colors:
        [
            {value: "#66ffff"},
            {value: "#000000"},
            {value: "#ff6666"},
        ],
    blinking:{
        wrong:"#8b0000",
        correct:"#FFFFFF"
    },
    timerSettings:{
        buttonSymbols:["-", "Confirm", "+"],
        text: "Time for daily training"
    },
}