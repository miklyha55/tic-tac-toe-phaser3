import { GameObjects } from "phaser";
import Factory from "../../factory";
import { IVec2Cfg } from "../../interfaces";
import BaseScene from "../../scenes/BaseScene";
import { IROGridCfg } from "./interfaces";
import GridCell from "./GridCell";
import GameScene from "../../scenes/GameScene";

export default class GridFactory {
    static CreateGrid(scene: BaseScene) {
        const array: Array<Array<GridCell>> = [];
        const sceneGame: GameScene = scene as GameScene;

        const gridWidth: number = sceneGame.gridCfg.sizeGrid.width;
        const gridHeight: number = sceneGame.gridCfg.sizeGrid.height;
        
        const cellWidth: number = sceneGame.gridCfg.sizeCell.width;
        const cellHeight: number = sceneGame.gridCfg.sizeCell.height;

        const depth: number = sceneGame.gridCfg.depth;

        const sizeWidth: number = gridWidth + depth * 2;
        const sizeHeight: number = gridHeight + depth * 2;
        const container: GameObjects.Container = Factory.CreateContainer(scene, {
            name: "GridContainer",
            size: {
                width: sizeWidth * cellWidth,
                height: sizeHeight * cellHeight,
            },
        })

        for (let row: number = 0; row < sizeWidth; row++) {
            const rowArray: Array<GridCell> = [];
            for (let col: number = 0; col < sizeHeight; col++) {
                const gridContainer: GameObjects.Container = this.CreateCell(scene, col, row);
                    
                rowArray.push(new GridCell(scene, gridContainer));
                container.add(gridContainer);
            }
            array.push(rowArray);
        }
        
        return {array, container};
    }

    static CreateCell(scene: BaseScene, col: number, row: number) {
        const sceneGame: GameScene = scene as GameScene;
        const gridCfg: IROGridCfg = sceneGame.gridCfg;

        const position: IVec2Cfg = {
            x: (row * gridCfg.sizeCell.width) - gridCfg.sizeCell.width / 2,
            y: (col * gridCfg.sizeCell.height) - gridCfg.sizeCell.height / 2,
        };

        const container: GameObjects.Container = Factory.CreateContainer(scene, {
            name: `Cell_${position.x}_${position.y}`,
            size: gridCfg.sizeCell,
            position,
        });

        const thickness: number = gridCfg.border.thickness;
        const rect: GameObjects.Graphics = Factory.CreateRect(scene, {
            name: `Rect_${position.x}_${position.y}`,
            position: {
                x: gridCfg.sizeCell.width / 2 + thickness / 2,
                y: gridCfg.sizeCell.height / 2 + thickness / 2,
            },
            size: {
                width: gridCfg.sizeCell.width - thickness, 
                height: gridCfg.sizeCell.height - thickness,
            },
            fill: {
                color: gridCfg.fill.color,
                alpha: gridCfg.fill.alpha,
            },
            border: {
                thickness: thickness,
                color: gridCfg.border.color,
                alpha: gridCfg.border.alpha,
            }
        });

        container.add(rect);
        return container;
    }
}