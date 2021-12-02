import p5 = require("p5");

export default class ScoreBoard {
    private score : number;
    private sketch : p5;

    constructor(sketch : p5) {
        this.sketch = sketch;
    }

    public draw(){

    }

    public resetScore(){
        this.score = 0;
    }

}