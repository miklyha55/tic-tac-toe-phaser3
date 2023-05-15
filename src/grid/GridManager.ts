import { IROGridCfg, IROGridFactoryCfg } from "./interfaces";
import GridCell from "./GridCell";
import { GameObjects } from "phaser";
import { ISizeCfg } from "../interfaces";
import BaseScene from "../scenes/BaseScene";
import GameScene from "../scenes/GameScene";
import { GAME_OBJECT_STATE, GAME_STATE } from "../constants";

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

    getScreenArray() {
        const array: Array<Array<GridCell>> = this.gridFactoryCfg.array;
        const screenArray: Array<Array<GridCell>> = [];
        const depth: number = (this.depth - this.counter);

        for (let row: number = depth + 1; row < array.length - depth + 1; row++) {
            const rowArray: Array<GridCell> = [];

            for (let col: number = depth + 1; col < array[row].length - depth + 1; col++) {
                if(array[col][row].type !== GAME_OBJECT_STATE.None) {
                    rowArray.push(array[col][row]);
                } else {
                    rowArray.push(undefined);
                }
            }
            screenArray.push(rowArray);
        }

        return screenArray;
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