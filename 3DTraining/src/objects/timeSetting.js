import FetchDataManager from "./fetchData"

let data,
    call

let time = 300

export default class TimeSetting {

    constructor( callBack) {
        call = callBack
        this.hide()
        this.setup()
    }

    setup(){
        document.getElementById("plus").onclick = () => this.plus()
        document.getElementById("minus").onclick = () => this.minus()
        document.getElementById("confirm").onclick = () => this.confirm()
    }

    hide(){
        document.getElementById("plus").style.visibility = "hidden"
        document.getElementById("minus").style.visibility = "hidden"
        document.getElementById("confirm").style.visibility = "hidden"
        document.getElementById("setTime").innerText = ""
    }

    show(){
        document.getElementById("plus").style.visibility = "visible"
        document.getElementById("minus").style.visibility = "visible"
        document.getElementById("confirm").style.visibility = "visible"
        this.update()
    }


    plus(){
        if(time < 600){
            time += 10
            this.update()
        }
    }
    minus(){
        if(time > 60){
            time -= 10
            this.update()
        }
    }

    update(){
        document.getElementById("setTime").innerText = "Time for daily training: " + time
    }

    confirm(){
        FetchDataManager.saveCurrentTrainingTime(time)
        this.hide()
        call()
    }

}