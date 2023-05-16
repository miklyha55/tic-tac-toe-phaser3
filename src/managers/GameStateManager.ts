import { GAME_OBJECTS, GAME_OBJECT_STATE, GAME_STATE } from "../constants";
import GridCell from "./gridManager/GridCell";
import BaseScene from "../scenes/BaseScene";
import GameScene from "../scenes/GameScene";

export default class GameStateManager
{
    private readonly sceneGame: GameScene;
    private gameState: number;

    constructor(scene: BaseScene) {
        this.sceneGame = scene as GameScene;
    }

    setGameObjectState(state: number) {
        if(state === GAME_OBJECT_STATE.AI) {
            this.sceneGame.aiManager.startAi();
        }
    }

    setGameState(state: number) {
        this.gameState = state;

        switch (this.gameState) {
            case GAME_STATE.NextState:
                this.sceneGame.gridManager.incrementCounter();
                break;
            case GAME_STATE.GameOver:
                this.sceneGame.scene.start("MenuScene");
                break;
        }
    }

    checkVictoryPLayer(array: Array<Array<GridCell>>) {
        const isVictoryPlayer: boolean = this.checkHorizontal(array, GAME_OBJECT_STATE.Player)
            || this.checkVertical(array, GAME_OBJECT_STATE.Player)
            || this.checkDiagonaleLeft(array, GAME_OBJECT_STATE.Player)
            || this.checkDiagonaleRight(array, GAME_OBJECT_STATE.Player);

        return isVictoryPlayer
    }

    checkVictoryAi(array: Array<Array<GridCell>>) {
        const isVictoryAi: boolean = this.checkHorizontal(array, GAME_OBJECT_STATE.AI)
            || this.checkVertical(array, GAME_OBJECT_STATE.AI)
            || this.checkDiagonaleLeft(array, GAME_OBJECT_STATE.AI)
            || this.checkDiagonaleRight(array, GAME_OBJECT_STATE.AI);

        return isVictoryAi
    }

    private checkHorizontal(array: Array<Array<GridCell>>, type: number) {
        for (let row: number = 0; row < array.length; row++) {
            let count: number = 0;
    
            for (let col: number = 0; col < array[row].length; col++) {
                if(!array[row][col]) {
                    continue;
                }

                if(array[row][col].type === type) {
                    count++;
                }
            }

            if(count === array.length) {
                return true;
            }
        }

        return false;
    }

    private checkVertical(array: Array<Array<GridCell>>, type: number) {
        for (let col: number = 0; col < array.length; col++) {
            let count: number = 0;
    
            for (let row: number = 0; row < array[col].length; row++) {
                if(!array[row][col]) {
                    continue;
                }

                if(array[row][col].type === type) {
                    count++;
                }
            }

            if(count === array.length) {
                return true;
            }
        }

        return false;
    }

    private checkDiagonaleLeft(array: Array<Array<GridCell>>, type: number) {
        let count: number = 0;

        for (let row: number = 0; row < array.length; row++) {
            if(!array[row][row]) {
                continue;
            }

            if(array[row][row].type === type) {
                count++;
            }
        }

        if(count === array.length) {
            return true;
        }

        return false;
    }

    private checkDiagonaleRight(array: Array<Array<GridCell>>, type: number) {
        let count: number = 0;

        for (let row: number = 0; row < array.length; row++) {
            const col: number = array.length - row - 1;

            if(!array[row][col]) {
                continue;
            }

            if(array[row][col].type === type) {
                count++;
            }
        }

        if(count === array.length) {
            return true;
        }

        return false;
    }
}