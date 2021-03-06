import SymbolLevelImpl from "./SymbolLevelImpl";
import ObserverSupport from "../ObserverSupport";
import {config} from "../config";
import * as p5 from "p5";

export default class SymbolLevelTwo extends SymbolLevelImpl{
    constructor(sketch: p5, support: ObserverSupport) {
        super(sketch, support);
        this.symbols = config.levels.levelTwoSymbols;
    }
}