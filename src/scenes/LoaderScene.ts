import * as Phaser from 'phaser';
import { RESOURSE_TYPE } from '../constants';
import { Assets } from '../assets';
import BaseScene from './BaseScene';

export default class LoaderScene extends BaseScene
{
    constructor ()
    {
        super('LoaderScene');
    }

    protected override async preloadSafe ()
    {
        await this.loadResoures();
        this.scene.start("MenuScene");
    }

    private async loadResoures(): Promise<void> {
        Assets.forEach((element)=> {
            switch (element.type) {
                case RESOURSE_TYPE.Image:
                    this.load.image(element.name, element.path);
                    break;
                case RESOURSE_TYPE.Json:
                    this.load.json(element.name, element.path);
                    break;
            }
        });

        return new Promise((resolve) => {
            this.load.once(Phaser.Loader.Events.COMPLETE, resolve);
        });
    }
}