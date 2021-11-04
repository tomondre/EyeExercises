
export default class ObserverSupport {
    constructor() {
        this.observers = [];

    }

    subscribe(observer) {
        this.observers.push(observer)
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(
            function (item) {
                if (item !== observer) {
                        return item;
                }
            }
        )
    }

    fire(change) {
        this.observers.forEach((item) => {
            item.observerChange(change)
        });
    }
}