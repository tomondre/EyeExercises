import SymbolLevel from "./SymbolLevel";
import {CST} from "../CST";
import Message from "../Messages/Message";
import {CONFIG} from "../../config/config";

export default class Level5 extends SymbolLevel
{
    constructor() {
        super(CST.SCENES.LEVEL_FIVE);
    }

    init()
    {
        window.localStorage.setItem("SavedLevel", "5");
        this.createObjects();
        this.create();
        super.setSymbolType(5);
    }

    gameFinished()
    {
        this.reset();
        Message(this, () => this.closeWindow(), CONFIG.messages.gameFinished)
    }

    closeWindow()
    {
        let new_window =
            open(location, '_self');
        // Close this window
        new_window.close();
    }

}