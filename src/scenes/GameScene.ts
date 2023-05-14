import * as Phaser from 'phaser';
import Factory from '../factory';
import BaseScene from './BaseScene';
import { Resolution } from '../constants';

export default class GameScene extends BaseScene
{
    constructor ()
    {
        super('GameScene');
    }

    protected override createSafe ()
    {
        const libs: Phaser.GameObjects.Image = Factory.CreateImage(this, {
            name: "libs",
            size: {
                width: 400,
                height: 300,
            },
            position: {
                x: Resolution.width / 2,
                y: Resolution.height / 2,
            }
        });

        const logo: Phaser.GameObjects.Image = Factory.CreateImage(this, {
            name: "logo",
            size: {
                width: 400,
                height: 70,
            },
            position: {
                x: Resolution.width / 2,
                y: Resolution.height / 2,
            }
        });

        this.tweens.add({
            targets: logo,
            y: 350,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        })

        this.tweens.add({
            targets: libs,
            y: 0,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        })
    }
}