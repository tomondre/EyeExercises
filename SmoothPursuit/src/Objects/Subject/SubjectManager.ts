import * as p5 from "p5";
import LevelManager from "../LevelManager";
import ISubject from "./ISubject";
import DifficultyOneSubject from "./DifficultyOneSubject";
import DifficultyTwoSubject from "./DifficultyTwoSubject";
import DifficultyFiveSubject from "./DifficultyFiveSubject";
import DifficultyThreeSubject from "./DifficultyThreeSubject";
import DifficultyFourSubject from "./DifficultyFourSubject";

export default class SubjectManager {
    private currentDifficulty : number;
    private subjects : ISubject[];

    constructor(sketch : p5) {
        this.currentDifficulty = 3;

        let image = sketch.loadImage('assets/Bee.png');
        this.subjects = [];
        this.subjects.push(new DifficultyOneSubject(sketch, image));
        this.subjects.push(new DifficultyTwoSubject(sketch, image));
        this.subjects.push(new DifficultyThreeSubject(sketch, image));
        this.subjects.push(new DifficultyFourSubject(sketch, image));
        this.subjects.push(new DifficultyFiveSubject(sketch, image));
    }

    draw() : void {
        this.subjects[this.currentDifficulty].draw();
    }

    public setCurrentDifficulty(difficulty : number) {
        this.currentDifficulty = difficulty;
        this.subjects[this.currentDifficulty].reset();
    }

    private checkBoundaries() : void {

    }
}