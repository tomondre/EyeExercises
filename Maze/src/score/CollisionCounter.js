import {config} from "../config"

let collisionCount = 0;
let maxCollisions = config.game.collisionCountForGameOver


export default class CollisionCounter {
    collision()
    {
        collisionCount++;
    }

    isGameOver()
    {
        if (collisionCount >= (maxCollisions))
        {
            collisionCount = 0;
            return true;
        }
        return false;
    }

    reset()
    {
        collisionCount = 0;
    }
}