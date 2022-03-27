
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

}