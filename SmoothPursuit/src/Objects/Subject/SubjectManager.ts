import * as p5 from "p5";
import LevelManager from "../LevelManager";
import ISubject from "./ISubject";
import DifficultyOneSubject from "./DifficultyOneSubject";
import DifficultyTwoSubject from "./DifficultyTwoSubject";
import DifficultyThreeSubject from "./DifficultyThreeSubject";

export default class SubjectManager {
    private currentDifficulty : number;
    private subjects : ISubject[];

    constructor(sketch : p5) {
        this.currentDifficulty = 2;

        let image = sketch.loadImage('assets/Bee.png');
        this.subjects = [];
        this.subjects.push(new DifficultyOneSubject(sketch, image));
        this.subjects.push(new DifficultyTwoSubject(sketch, image));
        this.subjects.push(new DifficultyThreeSubject(sketch, image));
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