// import img from "./40-4.gif"

import {log} from "util";

let images,
    maxTime = 15000,
    imgDir ,
    interval = null,
    mistakes = 0,
    score = 0

let levelManger

export default class Flower {
    constructor(level) {
        levelManger = level
        score = levelManger.getPuzzleIndex()
        imgDir = levelManger.getImageDirector()
        this.buttonsSetup()
    }

    create() {

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
        images = levelManger.getImages()
        imgDir = levelManger.getImageDirector()

        var img = document.getElementById("img3D");
        var rand = parseInt((Math.random() * 2));
        if (img.src.indexOf("-" + str) !== -1) {
            img.src = imgDir + images[levelManger.getPuzzleIndex()][rand];
            score += 5;
            levelManger.levelUp()
            mistakes = 0
        } else {
            score = (score <= 2 ? 0 : score - 5);
            img.src = imgDir + images[levelManger.getPuzzleIndex()][rand];
            mistakes++
            if(mistakes === 3){
                levelManger.levelDown()
                mistakes = 0
            }
        }

        this.updateScore(score);
    }

    // LevelBack() {
    //     if (counter === 1) {
    //         level -= 1;
    //         counter = 0;
    //     } else {
    //         counter = 1;
    //     }
    //     score -= 3;
    //     if (level <= 0) {
    //         level = 0;
    //     }
    //
    //     var img = document.getElementById("img3D");
    //     var rand = parseInt((Math.random()*2));
    //     if (img.src.indexOf(images[level][rand]) !== -1) {
    //         img.src = imgDir + images[level][rand];
    //     } else {
    //         img.src = imgDir + images[level][0];
    //     }
    //
    //     if (score <= 0) {
    //         score = 0;
    //     }
    //
    //     updateScore(score);
    //
    //     window.clearInterval(interval);
    //     interval = window.setInterval(function () { LevelBack(); }, maxTime);
    // }


}

