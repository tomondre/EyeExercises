
export default class FetchDataManager {
    static saveEyeLevelIndex(eye, level){
            window.localStorage.setItem("904/Level/" + eye.toString(), level);
    }

    static getEyeLevelIndex(eye)
    {
        var index =  window.localStorage.getItem("904/Level/" + eye.toString());
        if (index === null)
            return 0;
        else
            console.log(parseInt(index));
            return parseInt(index);
    }

    static getEyeTime(eye)
    {
        let time =  window.localStorage.getItem("904/Time/" + eye.toString());
        if (time === null)
            return 150;
        else
            return parseInt(time);

    }

    static saveEyeTime(eye, time) {
        window.localStorage.setItem("904/Time/" + eye.toString(), time);
    }
}