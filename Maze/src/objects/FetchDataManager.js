
//TODO change game code accordingly to the levels code
let gameCode = "909";

export default class FetchDataManager {

    static getLevelIndex()
    {
        var index =  window.localStorage.getItem(gameCode + "/Level");
        if (index === null)
            return 0
        else
            return parseInt(index);
    }

    static getDifficulty() {
        let item = window.localStorage.getItem(gameCode + "/Difficulty");
        if (item === null)
            return 0
        else
            return parseInt(item);
    }

    static saveDifficulty(index) {
        window.localStorage.setItem(gameCode + "/Difficulty", index);
    }

    static saveLevelIndex(index) {
        window.localStorage.setItem(gameCode + "/Level", index);
    }

    static getTime()
    {
        let time = window.localStorage.getItem(gameCode + "/Time");
        if (time === null)
        {
            return -1;
        }
        return time;
    }

    static saveTime(time) {
        window.localStorage.setItem(gameCode + "/Time", time);
    }
}