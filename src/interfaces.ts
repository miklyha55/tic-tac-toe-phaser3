import { GameObjects } from "phaser";

export type BaseGameObject = GameObjects.Container | GameObjects.Sprite;

export interface IVec2Cfg {
    x: number;
    y: number;
}

export interface ISizeCfg {
    width: number;
    height: number;
}

export interface IROResourceCfg {
    readonly name: string;
    readonly path: string;
    readonly type: string;
}

export interface IROResolutionCfg {
    readonly width: number;
    readonly height: number;
}

export interface IROBaseElementCfg {
    readonly name: string;
    readonly size: ISizeCfg;
    readonly position?: IVec2Cfg
    readonly scale?: IVec2Cfg
}

export interface IROSpriteCfg extends IROBaseElementCfg {
    readonly texture?: string;
}

export interface IROContainerCfg extends IROBaseElementCfg {
    readonly angle?: number;
}

export interface IRORectBorderCfg {
    readonly thickness: number;
    readonly color: number,
    readonly alpha: number,
}

export interface IRORectFillCfg {
    readonly color: number,
    readonly alpha: number,
}

export interface IRORectCfg extends IROBaseElementCfg {
    readonly border?: IRORectBorderCfg;
    readonly fill?: IRORectFillCfg;
}

export interface IROBaseJsonElementCfg {
    readonly id: number;
    readonly type: string;

    readonly name: string;
    readonly size: ISizeCfg;
    readonly position?: IVec2Cfg
    readonly angle?: number;
    readonly texture?: string;
    readonly border?: IRORectBorderCfg;
    readonly fill?: IRORectFillCfg;
}

export interface IInteractiveElement {
    cursor: string;
}