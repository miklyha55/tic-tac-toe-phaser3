import BaseScene from './BaseScene';
import { IROBaseJsonElementCfg } from '../interfaces';
import JsonObjectManager from '../managers/JsonObjectManager';
import GridFactory from '../managers/gridManager/factory';
import { IROGridCfg, IROGridFactoryCfg } from '../managers/gridManager/interfaces';
import GridManager from '../managers/gridManager/GridManager';
import GameStateManager from '../managers/GameStateManager';
import AiManager from '../managers/aiManager/AiManager';

export default class GameScene extends BaseScene
{
    jsonObjectManager: JsonObjectManager;
    gameStateManager: GameStateManager;
    aiManager: AiManager;

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

        this.aiManager = new AiManager(this);
        this.gameStateManager = new GameStateManager(this);
        this.jsonObjectManager = new JsonObjectManager(this);
        this.gridManager = new GridManager(this);
    }
}