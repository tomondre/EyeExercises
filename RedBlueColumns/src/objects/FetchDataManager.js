
export default class FetchDataManager {
    static saveLevelIndex(level){
        window.localStorage.setItem("904/Level/", level);
    }

    static getLevelIndex()
    {
        var index =  window.localStorage.getItem("904/Level/");
        if (index === null)
            return 0;
        else
            return parseInt(index);
    }

    static saveTrainingTime(time){
        window.localStorage.setItem("905/Time/", time);
    }

    static getTrainingTime()
    {
        var index =  window.localStorage.getItem("905/Time/");
        if (index === null)
            return 150;
        else
            return parseInt(index);
    }
    static saveCurrentTrainingTime(time){
        window.localStorage.setItem("906/CurrentTime/", time);
    }

    static getCurrentTrainingTime()
    {
        var index =  window.localStorage.getItem("906/CurrentTime/");
        if (index === null)
            return 150;
        else
            return parseInt(index);
    }

    static switchTimeSet(){
        if(this.isTimeSet() === false){
            window.localStorage.setItem("907/TimeSet/", true);
        }
        else{
            window.localStorage.setItem("907/TimeSet/", false);
        }
    }

    static isTimeSet()
    {
        var bol =  window.localStorage.getItem("907/TimeSet/");
        if (bol === null)
            return false;
        else
            return parseInt(bol);
    }

}