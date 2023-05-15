import { IROBaseJsonElementCfg } from '../interfaces';
import BaseScene from '../scenes/BaseScene';
import GameScene from '../scenes/GameScene';

export default class JsonObjectManager
{
    private readonly sceneGame: GameScene;
    private readonly jsonArrayCfg: Array<IROBaseJsonElementCfg>;

    constructor(scene: BaseScene) {
        this.sceneGame = scene as GameScene;
        this.jsonArrayCfg = this.sceneGame.jsonArrayCfg;
    }

    getJsonObjectById(id: number) {
        return this.jsonArrayCfg.find((element) => element.id === id);
    }
}