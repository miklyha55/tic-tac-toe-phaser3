import { GameObjects } from "phaser";
import { BaseGameObject, IROBaseJsonElementCfg, IROContainerCfg, IROSpriteCfg } from "./interfaces";
import BaseScene from "./scenes/BaseScene";
import { ELEMENT_TYPE } from "./constants";

export default class Factory {
    static CreateFromJson(scene: BaseScene, jsonArrayCfg: Array<IROBaseJsonElementCfg>) {
        const map: Map<number, BaseGameObject> = new Map<number, BaseGameObject>();

        jsonArrayCfg.forEach(jsonCfg => {
            switch (jsonCfg.type) {
                case ELEMENT_TYPE.Image:
                    map.set(jsonCfg.id, this.CreateImage(scene, jsonCfg));
                    break;
                case ELEMENT_TYPE.Container:
                    map.set(jsonCfg.id, this.CreateContainer(scene, jsonCfg));
                    break;
            }
        });

        return map;
    }

    static CreateSprite(scene: BaseScene, spriteCfg: IROSpriteCfg) {
        return this.CreateSpriteFromCfg(scene, spriteCfg);
    }

    static CreateImage(scene: BaseScene, spriteCfg: IROSpriteCfg) {
        return this.CreateSpriteFromCfg(scene, spriteCfg);
    }

    static CreateSpriteFromCfg(scene: BaseScene, spriteCfg: IROSpriteCfg) {
        const sprite: GameObjects.Sprite = scene.add.sprite(
            spriteCfg.size.width,
            spriteCfg.size.height,
            spriteCfg.name
        );
        sprite.setPosition(spriteCfg.position.x, spriteCfg.position.y);

        return sprite;
    }

    static CreateContainer(scene: BaseScene, containerCfg: IROContainerCfg) {
        const container: GameObjects.Container = scene.add.container(
            containerCfg.position.x,
            containerCfg.position.y
        );
        container.setSize(containerCfg.size.width, containerCfg.size.height);
        container.name = containerCfg.name;

        return container;
    }
}