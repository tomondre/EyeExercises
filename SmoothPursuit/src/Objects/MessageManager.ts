// import * as p5 from "p5";
// import {config} from "./config";
//
// export default class MessageManager {
//
//     private sketch : p5;
//     private messages;
//
//
//
//     constructor(sketch : p5) {
//         this.sketch = sketch;
//         this.messages = config.messages
//     }
//
//     public draw() : void {
//
//     }
//
//     public levelFinishedMessage(callback : void, finishedLevel : number) : void {
//         let time = this.messages.levelFinished.time;
//         this.sketch.text(this.messages.levelFinished.first + finishedLevel + this.messages.levelFinished.second + this.messages.levelFinished.third);
//
//     }
// }