export const config = {
    game: {
        frameRate: 50,
        increaseSpeedEverySecondBy: 0.001,
        subjectSpeedPerFrame : 5,

        angleIncrease: 0.8,
        increaseAngleSpeedEverySecondBy: 0.00005,
    },
    levels: {
        levels: 4,
        difficulties: 6,
        subDifficulties: 4,
        levelTwoSymbols : "☺☽♘♡♫⚅⚐✂☃✈✔✏✰❆➔☏☘☞",
        levelThreeSymbols : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        levelFourSymbols : "abcdefghijklmnopqrstuvwxyz",
        levelFiveSymbols: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    },
    difficulties:
        [{
            difficultyNo : 1,
            defaultSpeed : 1
        },{
            difficultyNo : 2,
            defaultSpeed : 1
        },{
            difficultyNo : 3,
            defaultSpeed : 1
        },{
            difficultyNo : 4,
            defaultSpeed : 1
        },{
            difficultyNo : 5,
            defaultSpeed : 1
        },{
            difficultyNo : 6,
        }],
}