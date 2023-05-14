import { GameObjects } from "phaser";
import Factory from "../factory";
import { IVec2Cfg } from "../interfaces";
import BaseScene from "../scenes/BaseScene";
import { IROGridCfg } from "./interfaces";

export default class GridFactory {
    static CreateGrid(scene: BaseScene, gridCfg: IROGridCfg) {
        for (let row: number = 0; row < gridCfg.sizeGrid.width; row++) {
            for (let col: number = 0; col < gridCfg.sizeGrid.height; col++) {
                this.CreateCell(scene, gridCfg, col, row);
            }
        }
    }

    static CreateCell(scene: BaseScene, gridCfg: IROGridCfg, col: number, row: number) {
        const position: IVec2Cfg = {
            x: row * gridCfg.sizeCell.width,
            y: col * gridCfg.sizeCell.height
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
                x: thickness / 2,
                y: thickness / 2,
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
    }
}