
import FetchDataManager from "./fetchData";
import LevelManager from "./levelManager";
import Timer from "./timer"
import MessageManager from "./messageManager";
import Pictures from "./pictures";
import TimeSetting from "./timeSetting";

let level,
    data,
    timer,
    message,
    pictures,
    timeSetting

let maxTime = 15000,
    mistakes = 0,
    score = 0

export default class Game{
    constructor() {
        data = new FetchDataManager()
        timer = new Timer(() => this.timePassed(), () => this.scoreDown(3))
        pictures = new Pictures()
        message = new MessageManager(timer)
        level = new LevelManager(data, pictures, message)
        timeSetting = new TimeSetting(() => this.show())
        score = FetchDataManager.getCurrentScore()
        this.updateScore()
    }

    create(){
        this.show()
        document.getElementById("changeTime").onclick = () => this.changeTime()
    }

    hide(){
        document.getElementById("img3D").style.visibility = "hidden"
        document.getElementById("inputImg").style.visibility = "hidden"
        document.getElementById("timeField").style.visibility = "hidden"
        document.getElementById("scoreField").style.visibility = "hidden"
    }
    show(){
        document.getElementById("img3D").style.visibility = "visible"
        document.getElementById("inputImg").style.visibility = "visible"
        document.getElementById("timeField").style.visibility = "visible"
        document.getElementById("scoreField").style.visibility = "visible"

        //document.getElementById("levelDown").onclick = () => message.displayConfirmLevelDownMassage( () => level.setup(), () => this.levelDown() )
        document.getElementById("levelDown").onclick = this.levelDown
        timer.create()
        document.getElementById("puzzleDown").onclick = this.levelUp // remove after finished
        this.buttonsSetup()
    }

    changeTime(){
            this.hide()
            timeSetting.show()
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
        FetchDataManager.saveCurrentScore(score)
        document.getElementById("scoreField").innerHTML = "Score: " + score;
    }

    DisplayImage(str) {
        console.log(str)
        var img = document.getElementById("img3D");

        if (img.src.indexOf("-" + str) !== -1) {
            this.scoreUp()
            this.levelUp()
            timer.resetTicks()
            mistakes = 0
        } else {
            this.scoreDown(5)
            //this.levelDown()
        }

    }

    scoreUp(){
        score += 5;
        this.updateScore(score)
    }
    scoreDown(value){
        score = (score <= 3 ? 0 : score - value)
        this.updateScore(score)
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