import * as p5 from "p5";

export default interface ISubject {
    draw() : void;
    setImage(image : p5.Image) : void;
    reset() : void;
    pause() : void;
    continue() : void;
}