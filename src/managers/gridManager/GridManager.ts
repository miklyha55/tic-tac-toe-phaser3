import { IROGridCfg, IROGridFactoryCfg } from "./interfaces";
import GridCell from "./GridCell";
import { GameObjects } from "phaser";
import { ISizeCfg } from "../../interfaces";
import BaseScene from "../../scenes/BaseScene";
import GameScene from "../../scenes/GameScene";
import { GAME_OBJECT_STATE, GAME_STATE } from "../../constants";
import { GridFactory } from "matter";
import { IMoveCfg } from "../aiManager/interfaces";

export default class GridManager
{
    private readonly gridFactoryCfg: IROGridFactoryCfg;
    private readonly gridCfg: IROGridCfg;
    private readonly depth: number;
    private readonly container: GameObjects.Container;
    private readonly sizeCell: ISizeCfg;
    private readonly sizeGrid: ISizeCfg;
    private readonly sceneGame: GameScene;
    private readonly duration: number;
    private readonly ease: string;

    private counter: number;
    private gameOverCounter: number;

    constructor(scene: BaseScene) {
        this.sceneGame = scene as GameScene;
        this.gridFactoryCfg = this.sceneGame.gridFactoryCfg;
        this.gridCfg = this.sceneGame.gridCfg;
        this.depth = this.sceneGame.gridCfg.depth;
        this.container = this.gridFactoryCfg.container;
        this.sizeCell = this.gridCfg.sizeCell;
        this.sizeGrid = this.gridCfg.sizeGrid;
        this.duration = 1000;
        this.ease = "Power2";

        this.counter = 0;
        this.gameOverCounter = 0;

        this.updateGrid();
    }

    incrementCounter() {
        this.counter++;

        if(this.counter < this.gridCfg.depth){
            this.updateGrid();
        } else {
            this.sceneGame.gameStateManager.setGameState(GAME_STATE.GameOver);
        }
    }

    incrementGameOverCounter() {
        this.gameOverCounter++;
    
        const depth: number = this.counter * 2;
        const count: number = (depth + this.sizeGrid.width) * (depth + this.sizeGrid.height);

        if(this.gameOverCounter === count) {
            this.sceneGame.gameStateManager.setGameState(GAME_STATE.GameOver);
        }
    }

    convertBoardToScreenArray(boardArray: Array<number | string>) {
        const gridArray: Array<Array<GridCell>> = this.gridFactoryCfg.array;
        const lenght: number = this.sizeGrid.width + this.counter * this.depth / 2
        const depth: number = (this.depth - this.counter) + 1;
        const screenArray: Array<Array<GridCell>> = [];

        let index: number = 0;

        for (let row: number = 0; row < lenght; row++) {
            const rowArray: Array<GridCell> = [];

            for (let col: number = 0; col < lenght; col++) {
                if(typeof boardArray[index] === "string") {
                    rowArray.push(gridArray[row + depth][col + depth]);
                } else {
                    rowArray.push(undefined);
                }
                index++;
            }
            screenArray.push(rowArray);
        }
        return screenArray;
    }

    getScreenArray() {
        const gridArray: Array<Array<GridCell>> = this.gridFactoryCfg.array;
        const screenArray: Array<Array<GridCell>> = [];
        const sart: number = this.depth - this.counter + 1;
        const lenght: number = gridArray.length - (this.depth - this.counter) + 1;

        for (let row: number = sart; row < lenght; row++) {
            const rowArray: Array<GridCell> = [];
            
            for (let col: number = sart; col < lenght; col++) {
                if(gridArray[col][row].type !== GAME_OBJECT_STATE.None) {
                    rowArray.push(gridArray[col][row]);
                } else {
                    rowArray.push(undefined);
                }
            }
            screenArray.push(rowArray);
        }

        return screenArray;
    }

    getEmptyIndices(array: Array<number | string>) {
        const emptyIndicesArray: Array<number> = [];

        for (let i: number = 0; i < array.length; i++) {
            if(typeof array[i] !== "string") {
                emptyIndicesArray.push(i);
            }
        }

        return emptyIndicesArray;
    }

    getCellFromIndex(bestMove: IMoveCfg) {
        const gridArray: Array<Array<GridCell>> = this.gridFactoryCfg.array;
        const screenArray: Array<Array<GridCell>> = this.getScreenArray();
        const depth: number = (this.depth - this.counter) + 1;

        let gridCell: GridCell = null;
        let index: number = 0;

        for (let row: number = 0; row < screenArray.length; row++) {
            for (let col: number = 0; col < screenArray[row].length; col++) {
                if(index === bestMove.index) {
                    gridCell = gridArray[row + depth][col + depth];
                    break;
                }
                index++;
            }

            if(gridCell) {
                break;
            }
        }

        return gridCell;
    }

    getOrigBoard() {
        const screenArray: Array<Array<GridCell>> = this.getScreenArray();
        const origBoardArray: Array<number | string> = [];
    
        let index: number = 0;

        for (let col: number = 0; col < screenArray.length; col++) {
            for (let row: number = 0; row < screenArray[col].length; row++) {
                if(screenArray[row][col] === undefined) {
                    origBoardArray.push(index);
                } else {
                    const type: string = String(screenArray[row][col].type);
                    origBoardArray.push(type);
                }
                index++;
            }
        }

        return origBoardArray;
    }

    private updateGrid() {
        const countX: number = this.sizeGrid.width + this.counter * 2;
        const countY: number = this.sizeGrid.height + this.counter * 2;

        const deltaScaleX: number =  this.sizeGrid.width / countX;
        const deltaScaleY: number =  this.sizeGrid.height / countY;

        if(!this.counter) {
            this.container.x = -(this.depth - this.counter) * this.sizeCell.width * deltaScaleX;
            this.container.y = -(this.depth - this.counter) * this.sizeCell.height * deltaScaleY;

            this.container.scaleX = deltaScaleX;
            this.container.scaleY = deltaScaleY;
        } else {
            const x: number = -(this.depth - this.counter) * this.sizeCell.width * deltaScaleX;
            const y: number = -(this.depth - this.counter) * this.sizeCell.height * deltaScaleY;

            this.sceneGame.tweens.add({
                targets: this.container,
                x,
                y,
                scaleX: deltaScaleX,
                scaleY: deltaScaleY,
                duration: this.duration,
                ease: this.ease,
            });
        }
    }
}