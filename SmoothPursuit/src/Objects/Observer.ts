import {ObserverAction} from "./ObserverAction";

export interface Observer {
    update(change : ObserverAction, props : object): void
}