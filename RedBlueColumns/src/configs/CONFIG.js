export const CONFIG = {
    grid: {
        arrowSizeToWindowWidthRatio: 0.03,
        arrowScale: 0.8,
        arrowsNo: 4,
        arrowSizeToTotalSpaceRatio: 0.9
    },
    arrowImageAngle: 90,
    scoreBoard: {
        increase: 10,
        decrease: 5,
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
    messages: {
        levelPassed: {
            textFirstPart: "Great Job! Level ",
            textSecondPart: " has been passed,\n Next level starts in: ",
            textThirdPart: " seconds",
            timeLength: 2
        },
        levelNotPassed: {
            text: "Level failed. Try again",
        },
        changeEye: {
            text: "Change Eye",
            buttonOne: "Change Eye",
            buttonTwo: "Continue Level"
        },
        gameFinished: {
            text: "Congratulation, you have successfully finished the game!",
        },
        confirmLevelDown: {
            text: "Do you wish to go down one level?",
            buttonOne: "Confirm",
            buttonTwo: "Reject"
        }, lastChangeEye: {
            text: "You have finished daily exercise. Would you like to continue or exit the game?",
            buttonOne: "Exit",
            buttonTwo: "Continue"
        },
        rotateScreen: {
            text: "Please, rotate your screen."
        },
        exitMessage: {
            text: "Thank you"
        },
        changeEyeButton: {
            text: "Press here to change eye"
        },
        exitGameButton: {
            text: "Press here to exit the game"
        },
        confirmButton: {
            text: "Confirm"
        },
        height: 0.84,
        buttonHeight: 0.88
    },
    levels:
        [{
            levelNo: 1,
            rows: 6,
            verticalOuterArrows: 1,
            horizontalOuterArrows: 0,
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

}