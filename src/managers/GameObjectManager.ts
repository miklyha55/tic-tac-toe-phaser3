import { BaseGameObject } from '../interfaces';

export default class GameObjectManager
{
    private readonly gameObjectMap: Map<number, BaseGameObject>;

    constructor(gameObjectMap: Map<number, BaseGameObject>) {
        this.gameObjectMap = gameObjectMap;
    }

    getGameObjectById(id: number) {
        return this.gameObjectMap.get(id);
    }

    setGameObjectById(id: number, gameObject: BaseGameObject) {
        return this.gameObjectMap.set(id, gameObject);
    }
}