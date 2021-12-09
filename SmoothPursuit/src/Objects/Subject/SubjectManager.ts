import * as p5 from "p5";
import ISubject from "./ISubject";
import DifficultyOneSubject from "./DifficultyOneSubject";
import DifficultyTwoSubject from "./DifficultyTwoSubject";
import DifficultyFiveSubject from "./DifficultyFiveSubject";
import DifficultyThreeSubject from "./DifficultyThreeSubject";
import DifficultyFourSubject from "./DifficultyFourSubject";
import DifficultySixSubject from "./DifficultySixSubject";
import SymbolManager from "../SymbolManager";

export default class SubjectManager {
    private currentDifficulty : number;
    private subjects : ISubject[];

    constructor(sketch : p5, symbolManager : SymbolManager) {
        this.currentDifficulty = 4;

        let image = sketch.loadImage('assets/Bee.png');
        this.subjects = [];
        this.subjects.push(new DifficultyOneSubject(sketch, image, symbolManager));
        this.subjects.push(new DifficultyTwoSubject(sketch, image, symbolManager));
        this.subjects.push(new DifficultyThreeSubject(sketch, image, symbolManager));
        this.subjects.push(new DifficultyFourSubject(sketch, image, symbolManager));
        this.subjects.push(new DifficultyFiveSubject(sketch, image, symbolManager));
        this.subjects.push(new DifficultySixSubject(sketch, image, symbolManager));
    }

    draw() : void {
        this.subjects[this.currentDifficulty].draw();
    }

    public setCurrentDifficulty(difficulty : number) {
        this.currentDifficulty = difficulty;
        this.subjects[this.currentDifficulty].reset();
    }
}