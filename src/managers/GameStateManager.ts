import { GAME_OBJECT_STATE, GAME_STATE } from "../constants";
import GridCell from "../grid/GridCell";
import BaseScene from "../scenes/BaseScene";
import GameScene from "../scenes/GameScene";

export default class GameStateManager
{
    private readonly sceneGame: GameScene;

    private gameState: number;
    private gameObjectState: number;

    constructor(scene: BaseScene) {
        this.gameObjectState = GAME_OBJECT_STATE.Player;
        this.sceneGame = scene as GameScene;
    }

    setGameObjectState(state: number) {
        this.gameObjectState = state;
    }

    getGameObjectState() {
        return this.gameObjectState;
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

    checkVictory() {
        const array: Array<Array<GridCell>> = this.sceneGame.gridManager.getScreenArray();
        const isVictory: boolean = this.checkHorizontal(array) || this.checkVertical(array)
            || this.checkDiagonaleLeft(array) || this.checkDiagonaleRight(array);

        if (isVictory) {
            this.setGameState(GAME_STATE.NextState);
        }
    }

    private checkHorizontal(array: Array<Array<GridCell>>) {
        for (let row: number = 0; row < array.length; row++) {
            let countPlayer: number = 0;
            let countAi: number = 0;
    
            for (let col: number = 0; col < array[row].length; col++) {
                if(!array[row][col]) {
                    continue;
                }

                if(array[row][col].type === GAME_OBJECT_STATE.Player) {
                    countPlayer++;
                }

                if(array[row][col].type === GAME_OBJECT_STATE.AI) {
                    countAi++;
                }
            }

            if(countPlayer === array.length) {
                return true;
            }

            if(countAi === array.length) {
                return true;
            }
        }

        return false;
    }

    private checkVertical(array: Array<Array<GridCell>>) {
        for (let col: number = 0; col < array.length; col++) {
            let countPlayer: number = 0;
            let countAi: number = 0;
    
            for (let row: number = 0; row < array[col].length; row++) {
                if(!array[row][col]) {
                    continue;
                }

                if(array[row][col].type === GAME_OBJECT_STATE.Player) {
                    countPlayer++;
                }

                if(array[row][col].type === GAME_OBJECT_STATE.AI) {
                    countAi++;
                }
            }

            if(countPlayer === array.length) {
                return true;
            }

            if(countAi === array.length) {
                return true;
            }
        }

        return false;
    }

    private checkDiagonaleLeft(array: Array<Array<GridCell>>) {
        let countPlayer: number = 0;
        let countAi: number = 0;

        for (let row: number = 0; row < array.length; row++) {
            if(!array[row][row]) {
                continue;
            }

            if(array[row][row].type === GAME_OBJECT_STATE.Player) {
                countPlayer++;
            }

            if(array[row][row].type === GAME_OBJECT_STATE.AI) {
                countAi++;
            }
        }

        if(countPlayer === array.length) {
            return true;
        }

        if(countAi === array.length) {
            return true;
        }

        return false;
    }

    private checkDiagonaleRight(array: Array<Array<GridCell>>) {
        let countPlayer: number = 0;
        let countAi: number = 0;

        for (let row: number = 0; row < array.length; row++) {
            const col: number = array.length - row - 1;

            if(!array[row][col]) {
                continue;
            }

            if(array[row][col].type === GAME_OBJECT_STATE.Player) {
                countPlayer++;
            }

            if(array[row][col].type === GAME_OBJECT_STATE.AI) {
                countAi++;
            }
        }

        if(countPlayer === array.length) {
            return true;
        }

        if(countAi === array.length) {
            return true;
        }

        return false;
    }
}