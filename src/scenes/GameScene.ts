import * as Phaser from 'phaser';
import Factory from '../factory';
import BaseScene from './BaseScene';
import { BaseGameObject, IROBaseJsonElementCfg } from '../interfaces';
import GameObjectManager from '../managers/GameObjectManager';
import { GAME_OBJECTS } from '../constants';

export default class GameScene extends BaseScene
{
    gameObjectManager: GameObjectManager;
    constructor ()
    {
        super('GameScene');
    }

    protected override createSafe ()
    {
        const jsonArrayCfg: Array<IROBaseJsonElementCfg> = this.cache.json.get("gameScene.json");
        this.gameObjectManager = new GameObjectManager(Factory.CreateFromJson(this, jsonArrayCfg));

        const logo: BaseGameObject = this.gameObjectManager.getGameObjectById(GAME_OBJECTS.Logo);
        const libs: BaseGameObject =  this.gameObjectManager.getGameObjectById(GAME_OBJECTS.Libs);

        this.tweens.add({
            targets: logo,
            y: 350,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        })

        this.tweens.add({
            targets: libs,
            y: 0,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        })
    }
}