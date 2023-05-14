import { IRORectBorderCfg, IRORectFillCfg, ISizeCfg, IVec2Cfg } from "../interfaces";

export interface IROGridCfg {
    readonly position: IVec2Cfg;
    readonly sizeGrid: ISizeCfg;
    readonly sizeCell: ISizeCfg;
    readonly border: IRORectBorderCfg;
    readonly fill: IRORectFillCfg;
}