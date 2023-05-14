import * as Phaser from 'phaser';
import Factory from '../factory';
import BaseScene from './BaseScene';
import { BaseGameObject, IROBaseJsonElementCfg } from '../interfaces';
import GameObjectManager from '../managers/GameObjectManager';
import { GAME_OBJECTS } from '../constants';
import JsonObjectManager from '../managers/JsonObjectManager';

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

        this.jsonObjectManager = new JsonObjectManager(jsonArrayCfg);
        console.log(this.jsonObjectManager.getJsonObjectById(GAME_OBJECTS.Cross));
    }
}