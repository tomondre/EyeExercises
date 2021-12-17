import {Observer} from "./Observer";
import {ObserverAction} from "./ObserverAction";

export default class ObserverSupport{

    private observers :Observer[];

    constructor() {
        this.observers = []
    }

    public subscribe(observer : Observer){
        this.observers.push(observer)
    }

    public unsubscribe(observer : Observer) {
        this.observers = this.observers.filter((o) => o !== observer);
    }

    public fire(action : ObserverAction, props? : object) {
        this.observers.forEach((o) => o.update(action, props == null ? {} : props));
    }
}