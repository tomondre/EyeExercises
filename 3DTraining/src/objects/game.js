
import FetchDataManager from "./fetchData";
import LevelManager from "./levelManager";
import Timer from "./timer"
import MessageManager from "./messageManager";

let level,
    data,
    timer,
    message

let images,
    maxTime = 15000,
    imgDir ,
    interval = null,
    mistakes = 0,
    score = 0

export default class Game{
    constructor() {
        data = new FetchDataManager()
        level = new LevelManager(data)
        timer = new Timer()
        message = new MessageManager(timer)

        score = 0
    }

    create(){
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
        window.clearInterval(interval);
        images = level.getImages()
        imgDir = level.getImageDirector()

        var img = document.getElementById("img3D");
        var rand = parseInt((Math.random() * 2));
        if (img.src.indexOf("-" + str) !== -1) {
            img.src = imgDir + images[level.getPuzzleIndex()][rand];
            score += 5;
            this.levelUp()
            mistakes = 0
        } else {
            score = (score <= 2 ? 0 : score - 5);
            img.src = imgDir + images[level.getPuzzleIndex()][rand];
            mistakes++
            if(mistakes === 3){
                this.levelDown()
                mistakes = 0
            }
        }

        this.updateScore(score);
    }

    levelDown(){
        level.levelDown()
    }
    levelUp(){
        level.levelUp()
    }

}