import { IROResolutionCfg } from "./interfaces";

export const enum RESOURSE_TYPE {
    Image = "Image",
    Json = "Json",
}

export const enum ELEMENT_TYPE {
    Image = "Image",
    Container = "Container",
}

export const RESOLUTION: IROResolutionCfg = {
    width: 800,
    height: 600,
}

export const enum GAME_OBJECTS {
    Logo = 1,
    Libs = 2,
}