
//TODO change game code accordingly to the levels code
let gameCode = "904";

export default class FetchDataManager {
    static saveEyeLevelIndex(level){
        window.localStorage.setItem(gameCode + "/Level", level);
    }

    static getEyeLevelIndex()
    {
        var index =  window.localStorage.getItem(gameCode + "/Level");
        if (index === null)
            return 0
        else
            return  index;
    }

    static getEyeTime()
    {
        let time = window.localStorage.getItem(gameCode + "/Time");
        if (time === null)
        {
            return 10;
        }
        return time;
    }

    static saveEyeTime(time) {
        window.localStorage.setItem(gameCode + "/Time", time);
    }
}