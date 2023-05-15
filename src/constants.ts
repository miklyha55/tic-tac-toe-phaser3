import { IInteractiveElement, IROResolutionCfg } from "./interfaces";

export const enum RESOURSE_TYPE {
    Image = "Image",
    Json = "Json",
}

export const enum GAME_STATE {
    NextState = 3,
    GameOver = 4,
}

export const enum GAME_OBJECT_STATE {
    None = 0,
    Player = 1,
    AI = 2,
}

export const enum ELEMENT_TYPE {
    Image = "Image",
    Container = "Container",
}

export const RESOLUTION: IROResolutionCfg = {
    width: 600,
    height: 600,
}

export const enum GAME_OBJECTS {
    Cross = 1,
    Zero = 2,
    Button = 3,
    Logo = 4,
}

export const CONST_INTERACTIVE_ELEMENT: IInteractiveElement = {
    cursor: "pointer",
};