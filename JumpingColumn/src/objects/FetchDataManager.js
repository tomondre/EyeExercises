export default class FetchDataManager {
    static saveEyeLevelIndex(eye, level){
            window.localStorage.setItem("904/Level/" + eye.toString(), level);
    }

    static getEyeLevelIndex(eye)
    {
        var index =  window.localStorage.getItem("904/Level/" + eye.toString());
        if (index === null)
            return 0
        else
            return  index;
    }

    static getEyeTime(eye)
    {
        return window.localStorage.getItem("904/Time/" + eye.toString());
    }

    static saveEyeTime(eye, time) {
        window.localStorage.setItem("904/Time/" + eye.toString(), time);
    }
}