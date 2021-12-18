export interface SymbolLevel {
    draw(x : number, y : number) : void;
    continue() : void;
    pause() : void;
    create(difficultyEntries : number) : void;
    redDotEntry(): void;
    continueSymbolLevel(difficultyEntries : number): void;
    reset() : void;
}