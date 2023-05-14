import * as Phaser from 'phaser';
import { ResourceType } from '../constants';
import { Assets } from '../assets';
import BaseScene from './BaseScene';

export default class LoaderScene extends BaseScene
{
    constructor ()
    {
        super('LoaderScene');
    }

    protected override preloadSafe ()
    {
        this.loadResoures(() => {
            this.scene.start("GameScene");
        });
    }

    private loadResoures(callback) {
        Assets.forEach((element, index)=> {
            switch (element.type) {
                case ResourceType.Image:
                    this.load.image(element.name, element.path);
                    break;
            }
            
            this.load.once(Phaser.Loader.Events.COMPLETE, () => {
                if (index === Assets.length - 1) {
                    callback instanceof Function && callback();
                }
            });
        });
    }
}