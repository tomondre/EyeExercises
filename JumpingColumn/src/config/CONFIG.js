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
        normalTextSize: 35,
        normalButtonTextSize: "23px",
        switchSizesWhenResolutionLowerThan: 1000,
        smallerTextSize: 15,
        smallerButtonTextSize: "10px"
    },
    buttons:{
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
    percentOfSuccessToPassLevel: 0.89,
    levels:
        [{
            levelNo: 1,
            rows: 4,
            verticalOuterArrows: 1,
            horizontalOuterArrows: 0,
            correctPuzzlesToPassLevel: 2
        }, {
            levelNo: 2,
            rows: 5,
            verticalOuterArrows: 1,
            horizontalOuterArrows: 0,
            correctPuzzlesToPassLevel: 2
        }, {
            levelNo: 3,
            rows: 5,
            verticalOuterArrows: 2,
            horizontalOuterArrows: 0,
            correctPuzzlesToPassLevel: 4
        }, {
            levelNo: 4,
            rows: 6,
            verticalOuterArrows: 2,
            horizontalOuterArrows: 0,
            correctPuzzlesToPassLevel: 4
        }, {
            levelNo: 5,
            rows: 6,
            verticalOuterArrows: 3,
            horizontalOuterArrows: 0,
            correctPuzzlesToPassLevel: 8
        }, {
            levelNo: 6,
            rows: 6,
            verticalOuterArrows: 1,
            horizontalOuterArrows: 2,
            correctPuzzlesToPassLevel: 20
        }, {
            levelNo: 7,
            rows: 6,
            verticalOuterArrows: 4,
            horizontalOuterArrows: 0,
            correctPuzzlesToPassLevel: 8
        }, {
            levelNo: 8,
            rows: 6,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 4,
            correctPuzzlesToPassLevel: 8
        }, {
            levelNo: 9,
            rows: 6,
            verticalOuterArrows: 2,
            horizontalOuterArrows: 2,
            correctPuzzlesToPassLevel: 20
        }, {
            levelNo: 10,
            rows: 7,
            verticalOuterArrows: 4,
            horizontalOuterArrows: 0,
            correctPuzzlesToPassLevel: 20

        }, {
            levelNo: 11,
            rows: 7,
            verticalOuterArrows: 2,
            horizontalOuterArrows: 2,
            correctPuzzlesToPassLevel: 20
        }, {
            levelNo: 12,
            rows: 8,
            verticalOuterArrows: 4,
            horizontalOuterArrows: 0,
            correctPuzzlesToPassLevel: 8
        }, {
            levelNo: 13,
            rows: 8,
            verticalOuterArrows: 2,
            horizontalOuterArrows: 2,
            correctPuzzlesToPassLevel: 20
        }, {
            levelNo: 14,
            rows: 9,
            verticalOuterArrows: 5,
            horizontalOuterArrows: 0,
            correctPuzzlesToPassLevel: 8
        }, {
            levelNo: 15,
            rows: 9,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 5,
            correctPuzzlesToPassLevel: 8
        }, {
            levelNo: 16,
            rows: 9,
            verticalOuterArrows: 2,
            horizontalOuterArrows: 3,
            correctPuzzlesToPassLevel: 20
        }, {
            levelNo: 17,
            rows: 10,
            verticalOuterArrows: 5,
            horizontalOuterArrows: 0,
            correctPuzzlesToPassLevel: 8
        }, {
            levelNo: 18,
            rows: 10,
            verticalOuterArrows: 3,
            horizontalOuterArrows: 2,
            correctPuzzlesToPassLevel: 20
        }, {
            levelNo: 19,
            rows: 11,
            verticalOuterArrows: 5,
            horizontalOuterArrows: 0,
            correctPuzzlesToPassLevel: 8
        }, {
            levelNo: 20,
            rows: 11,
            verticalOuterArrows: 2,
            horizontalOuterArrows: 3,
            correctPuzzlesToPassLevel: 20
        }, {
            levelNo: 21,
            rows: 11,
            verticalOuterArrows: 6,
            horizontalOuterArrows: 0,
            correctPuzzlesToPassLevel: 8
        }, {
            levelNo: 22,
            rows: 11,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 6,
            correctPuzzlesToPassLevel: 8
        }, {
            levelNo: 23,
            rows: 11,
            verticalOuterArrows: 3,
            horizontalOuterArrows: 3,
            correctPuzzlesToPassLevel: 20
        }, {
            levelNo: 24,
            rows: 12,
            verticalOuterArrows: 7,
            horizontalOuterArrows: 0,
            correctPuzzlesToPassLevel: 8
        }, {
            levelNo: 25,
            rows: 12,
            verticalOuterArrows: 0,
            horizontalOuterArrows: 7,
            correctPuzzlesToPassLevel: 8
        }, {
            levelNo: 26,
            rows: 12,
            verticalOuterArrows: 3,
            horizontalOuterArrows: 3,
            correctPuzzlesToPassLevel: 20
        }],
    eyeDisplay: {
        text: "Eye: "
    }
}