import BaseScene from './BaseScene';
import { IROBaseJsonElementCfg } from '../interfaces';
import GameObjectManager from '../managers/GameObjectManager';
import JsonObjectManager from '../managers/JsonObjectManager';
import GridFactory from '../grid/factory';
import { IROGridCfg } from '../grid/interfaces';

export default class GameScene extends BaseScene
{
    gameObjectManager: GameObjectManager;
    jsonObjectManager: JsonObjectManager;

    constructor ()
    {
        super('GameScene');
    }

    protected override createSafe ()
    {
        const jsonArrayCfg: Array<IROBaseJsonElementCfg> = this.cache.json.get("gameScene.json");
        const gridCfg: IROGridCfg = this.cache.json.get("grid.json");

        this.jsonObjectManager = new JsonObjectManager(jsonArrayCfg);
        GridFactory.CreateGrid(this, gridCfg);
    }
}