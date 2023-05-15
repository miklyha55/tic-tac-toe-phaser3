import { GameObjects } from "phaser";
import { 
    BaseGameObject,
    IROBaseJsonElementCfg,
    IROContainerCfg,
    IRORectCfg,
    IROSpriteCfg
} from "./interfaces";
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
        sprite.setPosition(spriteCfg.position?.x || 0, spriteCfg.position?.y || 0);
        sprite.setScale(spriteCfg.scale?.x, spriteCfg.scale?.y);

        return sprite;
    }

    static CreateContainer(scene: BaseScene, containerCfg: IROContainerCfg) {
        const container: GameObjects.Container = scene.add.container(
            containerCfg.position?.x || 0,
            containerCfg.position?.y || 0
        );
        container.name = containerCfg.name;
        container.setSize(containerCfg.size.width, containerCfg.size.height);
        container.setScale(containerCfg.scale?.x, containerCfg.scale?.y);

        return container;
    }

    static CreateRect(scene: BaseScene, rectCfg: IRORectCfg) {
        const graphics: GameObjects.Graphics = scene.add.graphics();

        graphics.fillRect(
            rectCfg.position.x,
            rectCfg.position.y,
            rectCfg.size.width,
            rectCfg.size.height,
        );
    
        graphics.fillStyle(
            rectCfg.fill.color,
            rectCfg.fill.alpha,
        );

        graphics.lineStyle(
            rectCfg.border.thickness,
            rectCfg.border.color,
            rectCfg.border.alpha,
        )

        return graphics;
    }
}