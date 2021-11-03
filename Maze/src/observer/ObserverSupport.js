let observers = [];

export default class ObserverSupport {

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

    fire(change)
    {
        observers.forEach((item) => item.observerChange(change));
    }
}