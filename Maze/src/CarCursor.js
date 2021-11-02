let canvas;

export default class CarCursor {
    constructor(Canvas) {
        canvas = Canvas;
    }

    create() {
        document.body.style.cursor = "url('./img/CursorCar.png')8 26, auto";
    }

    remove() {
        document.body.style.cursor = "default";
    }

    lock()
    {
        canvas.requestPointerLock();
    }

    unlock()
    {
        canvas.exitPointerLock();
    }
}