import * as p5 from "p5";
import ISubject from "./ISubject";
import DifficultyOneSubject from "./DifficultyOneSubject";
import DifficultyTwoSubject from "./DifficultyTwoSubject";
import DifficultyFiveSubject from "./DifficultyFiveSubject";
import DifficultyThreeSubject from "./DifficultyThreeSubject";
import DifficultyFourSubject from "./DifficultyFourSubject";
import DifficultySixSubject from "./DifficultySixSubject";
import SymbolLevelManager from "../Symbol/SymbolLevelManager";

export default class SubjectManager {
    private currentDifficulty : number = 0;
    private subjects : ISubject[];

    constructor(savedDifficulty : number, sketch : p5, symbolManager : SymbolLevelManager) {
        let image = sketch.loadImage('assets/Bee.png');
        this.subjects = [];
        this.subjects.push(new DifficultyOneSubject(sketch, image, symbolManager));
        this.subjects.push(new DifficultyTwoSubject(sketch, image, symbolManager));
        this.subjects.push(new DifficultyThreeSubject(sketch, image, symbolManager));
        this.subjects.push(new DifficultyFourSubject(sketch, image, symbolManager));
        this.subjects.push(new DifficultyFiveSubject(sketch, image, symbolManager));
        this.subjects.push(new DifficultySixSubject(sketch, image, symbolManager));
        this.setCurrentDifficulty(savedDifficulty);
    }

    public draw() : void {
        this.subjects[this.currentDifficulty].draw();
    }

    public pause() : void {
        this.subjects[this.currentDifficulty].pause();
    }

    public continue() : void {
        this.subjects[this.currentDifficulty].continue();
    }

    public setCurrentDifficulty(difficulty : number) : void {
        this.subjects[this.currentDifficulty].pause();
        this.currentDifficulty = difficulty;
        this.subjects[this.currentDifficulty].create();
    }

    public continueSymbolLevel(difficultyEntries: number) : void {
        this.subjects[this.currentDifficulty].continueSymbolLevel(difficultyEntries);
    }

    public removePicture() : void {
        this.subjects[this.currentDifficulty].removePicture();
    }
}