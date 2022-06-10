import {config} from "../Config/config";
import MessageManager from "./messageManager";
import {fail} from "assert";

let data
let maxPuzzleLevel = 10
let circleLevel = 0
let pictures

let message

let click = false

export default class LevelManager {
    constructor(dataManager, picturesManager, messageManager) {
        data = dataManager
        pictures = picturesManager
        message = messageManager
        this.setup()
    }

    levelUp() {
        if (this.getPuzzleIndex() < maxPuzzleLevel) {
            this.puzzleUp()
            this.setup()
        } else {
            if (data.getLevelIndex() < config.levels.length - 1 && click === false) {
                click = true
                message.displayMessage(data.getLevelIndex(), () => {
                    data.savePuzzleIndex(0)
                    data.saveLevelIndex(data.getLevelIndex() + 1)
                    click = false
                    this.setup()
                })
            } else if (click === false){
                console.log("congrats of exercise end")
            }
        }
    }


    levelDown() {
        if (data.getLevelIndex() > 0 || this.getPuzzleIndex() > 0) {
                if (this.getPuzzleIndex() > 0) {
                    this.puzzleLevelDown()
                } else if (data.getLevelIndex() > 0 ) {
                    data.saveLevelIndex(data.getLevelIndex() - 1)
                    data.savePuzzleIndex(maxPuzzleLevel)
                }
                this.setup()
        }
    }

    puzzleUp() {
        if(this.getLevelName() === "circle") {
            circleLevel = maxPuzzleLevel
            circleLevel = Math.random() * circleLevel
        }
        data.savePuzzleIndex(this.getPuzzleIndex() + 1)
    }

    puzzleLevelDown() {
        let puzzleLevelToSave = this.getPuzzleIndex() - 1
        if(this.getLevelName() === "circle") {
            circleLevel = Math.max(puzzleLevelToSave, 0)
        }
        data.savePuzzleIndex(puzzleLevelToSave)
    }


    getLevelName() {
        return config.levels[data.getLevelIndex()].levelName
    }

    getLevelIndex() {
        return data.getLevelIndex()
    }

    getPuzzleIndex() {
        return data.getPuzzleIndex()
    }



    setup() {
        if(this.getLevelName() !== "circle") {
            pictures.setupPictures(this.getLevelName(), this.getPuzzleIndex())
        }
        else {
            pictures.setupPictures(this.getLevelName(), circleLevel)
        }
        pictures.setupInputField(this.getLevelIndex())
    }



}