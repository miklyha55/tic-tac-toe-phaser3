export interface IROResourceCfg {
    readonly name: string;
    readonly path: string;
    readonly type: string;
}

export interface IROResolutionCfg {
    readonly width: number;
    readonly height: number;
}

export interface IVec2Cfg {
    x: number;
    y: number;
}

export interface ISizeCfg {
    width: number;
    height: number;
}

export interface IROBaseElementCfg {
    readonly name: string;
    readonly size: ISizeCfg;
    readonly position: IVec2Cfg
}

export interface IROSpriteCfg extends IROBaseElementCfg {}
export interface IROImageCfg extends IROBaseElementCfg {}