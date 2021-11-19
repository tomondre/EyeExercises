let observers;

export default class ObserverSupport {
    constructor() {
        observers = [];

    }

    subscribe(observer) {
        observers.push(observer)
    }

    unsubscribe(observer) {
        observers = observers.filter(
            function (item) {
                if (item !== observer) {
                        return item;
                }
            }
        )
    }

    fire(change, data) {
        observers.forEach((item) => {
            item.observerChange(change, data)
        });
    }
}