import { IROResourceCfg } from "./interfaces";

export const Assets: ReadonlyArray<IROResourceCfg> = [
    {
        name: "logo",
        path: "assets/images/logo.png",
        type: "Image",
    },
    {
        name: "libs",
        path: "assets/images/libs.png",
        type: "Image",
    },
    {
        name: "gameScene.json",
        path: "assets/json/gameScene.json",
        type: "Json",
    },
];