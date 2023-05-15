import { GameObjects, Input } from 'phaser';
import { CONST_INTERACTIVE_ELEMENT, GAME_OBJECTS } from '../constants';
import Factory from '../factory';
import { IROBaseJsonElementCfg } from '../interfaces';
import GameObjectManager from '../managers/GameObjectManager';
import BaseScene from './BaseScene';

export default class MenuScene extends BaseScene
{
    gameObjectManager: GameObjectManager;

    constructor ()
    {
        super('MenuScene');
    }

    protected override createSafe ()
    {
        const jsonArrayCfg: Array<IROBaseJsonElementCfg> = this.cache.json.get("menuScene.json");

        this.gameObjectManager = new GameObjectManager(Factory.CreateFromJson(this, jsonArrayCfg));
        const button: GameObjects.Sprite =
            this.gameObjectManager .getGameObjectById(GAME_OBJECTS.Button) as GameObjects.Sprite;

        button.setInteractive(CONST_INTERACTIVE_ELEMENT)
        button.on(Input.Events.POINTER_DOWN, () => {
            this.scene.start("GameScene");
        })

    }
}