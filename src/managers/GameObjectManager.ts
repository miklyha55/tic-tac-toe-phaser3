import { BaseGameObject } from '../interfaces';

export default class GameObjectManager
{
    private readonly gameObjectMap: Map<number, BaseGameObject>;

    constructor(map: Map<number, BaseGameObject>) {
        this.gameObjectMap = map;
    }

    getGameObjectById(id: number) {
        return this.gameObjectMap.get(id);
    }

    setGameObjectById(id: number, gameObject: BaseGameObject) {
        return this.gameObjectMap.set(id, gameObject);
    }
}