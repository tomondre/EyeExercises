
import FetchDataManager from "./fetchData";
import LevelManager from "./levelManager";
import Timer from "./timer"
import MessageManager from "./messageManager";
import Pictures from "./pictures";

let level,
    data,
    timer,
    message,
    pictures

let images,
    maxTime = 15000,
    imgDir ,
    interval = null,
    mistakes = 0,
    score = 0

export default class Game{
    constructor() {
        data = new FetchDataManager()
        timer = new Timer(() => this.timePassed())
        pictures = new Pictures()
        message = new MessageManager(timer)
        level = new LevelManager(data, pictures, message)

        score = 0
    }

    create(){
        //document.getElementById("levelDown").onclick = () => message.displayConfirmLevelDownMassage( () => level.setup(), () => this.levelDown() )
        document.getElementById("levelDown").onclick = this.levelDown
        timer.create()
        document.getElementById("puzzleDown").onclick = this.levelUp
        this.buttonsSetup()
    }

    buttonsSetup(){
        document.getElementById("button1").addEventListener("click", c => this.DisplayImage(1))
        document.getElementById("button2").addEventListener("click", c => this.DisplayImage(2))
        document.getElementById("button3").addEventListener("click", c => this.DisplayImage(3))
        document.getElementById("button4").addEventListener("click", c => this.DisplayImage(4))
        document.getElementById("button5").addEventListener("click", c => this.DisplayImage(5))
        document.getElementById("button6").addEventListener("click", c => this.DisplayImage(6))
    }

    updateScore() {
        document.getElementById("scoreField").innerHTML = "Score: " + score;
    }

    DisplayImage(str) {
        var img = document.getElementById("img3D");

        if (img.src.indexOf("-" + str) !== -1) {
            score += 5;
            this.levelUp()
            mistakes = 0
        } else {
            score = (score <= 2 ? 0 : score - 5);
            this.levelDown()
        }

        this.updateScore(score);
    }

    levelDown(){
        level.levelDown()
    }
    levelUp(){
        level.levelUp()
    }

    timePassed(){
        message.displayTimePassed()
    }

}