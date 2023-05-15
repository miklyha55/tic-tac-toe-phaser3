import { GameObjects, Input } from "phaser";
import { CONST_INTERACTIVE_ELEMENT, GAME_OBJECTS, GAME_OBJECT_STATE, GAME_STATE } from "../constants";
import GameScene from "../scenes/GameScene";
import BaseScene from "../scenes/BaseScene";
import { IROBaseElementCfg } from "../interfaces";
import Factory from "../factory";

export default class GridCell
{
    type: number;

    private readonly container: GameObjects.Container;
    private readonly sceneGame: GameScene;

    constructor(scene: BaseScene, container: GameObjects.Container) {
        this.sceneGame = scene as GameScene;
        this.container = container;

        this.type = 0;
        this.setEvents();
    }

    private setEvents() {
        this.container.setInteractive(CONST_INTERACTIVE_ELEMENT);
        this.container.on(Input.Events.POINTER_DOWN, this.onPointerDown.bind(this));
    }

    private onPointerDown() {
        if(this.type !== GAME_OBJECT_STATE.None) {
            return;
        }

        this.sceneGame.gridManager.incrementGameOverCounter();
        let sprite: GameObjects.Sprite;

        switch (this.sceneGame.gameStateManager.getGameObjectState()) {
            case GAME_OBJECT_STATE.Player:
                const crossCfg: IROBaseElementCfg =
                    this.sceneGame.jsonObjectManager.getJsonObjectById(GAME_OBJECTS.Cross);
    
                sprite = Factory.CreateSprite(this.sceneGame, crossCfg);
                this.sceneGame.gameStateManager.setGameObjectState(GAME_OBJECT_STATE.AI);
                this.type = GAME_OBJECT_STATE.Player;
                break;
        
            case GAME_OBJECT_STATE.AI:
                const zeroCfg: IROBaseElementCfg =
                    this.sceneGame.jsonObjectManager.getJsonObjectById(GAME_OBJECTS.Zero);

                sprite = Factory.CreateSprite(this.sceneGame, zeroCfg);
                this.sceneGame.gameStateManager.setGameObjectState(GAME_OBJECT_STATE.Player);
                this.type = GAME_OBJECT_STATE.AI;
            break;
        }
        
        this.sceneGame.gameStateManager.checkVictory();
        this.container.add(sprite);
    }
}