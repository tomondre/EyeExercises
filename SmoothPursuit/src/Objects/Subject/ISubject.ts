import * as p5 from "p5";

export default interface ISubject {
    draw() : void;
    setImage(image : p5.Image) : void;
    create() : void;
    pause() : void;
    continue() : void;
    continueSymbolLevel(difficultyEntries: number): void;
}