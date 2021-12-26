import SymbolLevelImpl from "./SymbolLevelImpl";
import ObserverSupport from "../ObserverSupport";
import * as p5 from "p5";
import {config} from "../config";

export default class SymbolLevelThree extends SymbolLevelImpl{
    constructor(sketch: p5, support: ObserverSupport) {
        super(sketch, support);
        this.symbols = config.levels.levelThreeSymbols;
    }
}