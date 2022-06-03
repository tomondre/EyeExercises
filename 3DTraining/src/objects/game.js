import Flower from "./flower";
import FetchDataManager from "./fetchData";
import LevelManager from "./levelManager";
import Timer from "./timer"

let flower
let level
let data
let timer
let sketch

export default class Game{
    constructor() {
        data = new FetchDataManager()
        level = new LevelManager(data)
        flower = new Flower(level)
        timer = new Timer()
    }

    create(){
        document.getElementById("confirmButtons").style.visibility = "hidden"
        document.getElementById("levelDown").onclick = this.levelDown
        timer.create()
        document.getElementById("puzzleDown").onclick = this.levelUp
    }
    levelDown(){
        level.levelDown()
    }
    levelUp(){
        level.levelUp()
    }

}