import {CONFIG} from "../configs/CONFIG";
import OuterArrowsManager from "./OuterArrowsManager";


export default class WindowSize {

    static isMobile()
    {
        return window.innerWidth < 960 && window.innerHeight > window.innerWidth;
    }

    static width(){
        if(this.isMobile()){
            return window.innerWidth + 700
        }
        else{
            return window.innerWidth
        }
    }
    static height(){
        return window.innerHeight
    }

}