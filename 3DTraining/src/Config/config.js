export const config = {
    levels:
        [
            {
                levelName: "flower",
                button1:"52,26,75,49",
                button2:"84,43,107,66",
                button3:"75,76,98,99",
                button4:"48,82,71,105",
                button5:"32,55,55,78",
                button6:"61,55,84,78",
                expHeight:"130",
                expWidth:"134",
            },
            {
                levelName: "star",
                button1:"52,26,75,49",
                button2:"84,43,107,66",
                button3:"75,76,98,99",
                button4:"48,82,71,105",
                button5:"32,55,55,78",
                button6:"61,55,84,78",
                expHeight:"130",
                expWidth:"134",
            },
            {
                levelName: "square",
                button1:"33,28,93,88",
                button2:"126,28,186,88",
                button3:"224,28,284,88",
                button4:"306,28,366,88",
                button5:"",
                button6:"",
                expHeight:"130",
                expWidth:"406",
            },
            {
                levelName: "circle",
                button1:"52,26,75,49",
                button2:"84,43,107,66",
                button3:"75,76,98,99",
                button4:"48,82,71,105",
                button5:"32,55,55,78",
                button6:"61,55,84,78",
                expHeight:"130",
                expWidth:"129",
            },
        ]
    ,
    message:
        {
            levelPassed: {
                textFirstPart: "Great Job! Level ",
                textSecondPart: " has been passed,\n Next level starts in: ",
                textThirdPart: " seconds",
                timeLength: 3
            },
            exercisesFinished: {
                textFirstPart: "Great Job! Level ",
                textSecondPart: " has been passed,\n Exercises completed and starts again in: ",
                textThirdPart: " seconds",
                timeLength: 5
            },
            confirmLevelDown: {
                text: "Do you wish to go down one level?",
            },
            timeOver: {
                text: "Daily training finished"
            },
            gameFinished: {
                text: "Congratulation, you have successfully finished the game!",
            },
        },
}