import { GameObjects } from "phaser";
import { IROImageCfg, IROSpriteCfg } from "./interfaces";
import BaseScene from "./scenes/BaseScene";

export default class Factory {
    static CreateSprite(scene: BaseScene, spriteCfg: IROSpriteCfg) {
        return  this.CreateImageFromCfg(scene, spriteCfg);
    }

    static CreateImage(scene: BaseScene, imageCfg: IROImageCfg) {
        return this.CreateImageFromCfg(scene, imageCfg);
    }

    static CreateImageFromCfg(scene: BaseScene, imageCfg: IROImageCfg) {
        const image: GameObjects.Image = scene.add.image(
            imageCfg.size.width,
            imageCfg.size.height,
            imageCfg.name
        );
        image.setPosition(imageCfg.position.x, imageCfg.position.y);

        return image;
    }
}