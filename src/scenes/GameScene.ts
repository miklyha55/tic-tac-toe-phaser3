import BaseScene from './BaseScene';
import { IROBaseJsonElementCfg } from '../interfaces';
import GameObjectManager from '../managers/GameObjectManager';
import JsonObjectManager from '../managers/JsonObjectManager';
import GridFactory from '../grid/factory';
import { IROGridCfg, IROGridFactoryCfg } from '../grid/interfaces';
import GridManager from '../grid/GridManager';
import GameStateManager from '../managers/GameStateManager';

export default class GameScene extends BaseScene
{
    gameObjectManager: GameObjectManager;
    jsonObjectManager: JsonObjectManager;
    gameStateManager: GameStateManager;

    gridManager: GridManager;
    gridCfg: IROGridCfg;
    jsonArrayCfg: Array<IROBaseJsonElementCfg>;
    gridFactoryCfg: IROGridFactoryCfg

    constructor ()
    {
        super('GameScene');
    }

    protected override createSafe ()
    {
        this.jsonArrayCfg = this.cache.json.get("gameScene.json");
        this.gridCfg = this.cache.json.get("grid.json");

        this.gridFactoryCfg = GridFactory.CreateGrid(this);
        this.gameStateManager = new GameStateManager(this);
        this.jsonObjectManager = new JsonObjectManager(this);
        this.gridManager = new GridManager(this);
    }
}