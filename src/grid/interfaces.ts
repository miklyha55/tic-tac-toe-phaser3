import { GameObjects } from "phaser";
import { IRORectBorderCfg, IRORectFillCfg, ISizeCfg, IVec2Cfg } from "../interfaces";
import GridCell from "./GridCell";

export interface IROGridCfg {
    readonly position: IVec2Cfg;
    readonly sizeGrid: ISizeCfg;
    readonly sizeCell: ISizeCfg;
    readonly border: IRORectBorderCfg;
    readonly fill: IRORectFillCfg;
    readonly depth: number;
}

export interface IROGridFactoryCfg {
    array: Array<Array<GridCell>>;
    container: GameObjects.Container;
}