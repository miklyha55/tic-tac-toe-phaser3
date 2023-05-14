import * as Phaser from 'phaser';

export default class BaseScene extends Phaser.Scene
{
    protected preloadSafe() {}
    protected createSafe() {}

    preload ()
    {
        this.preloadSafe();
    }

    create ()
    {
        this.createSafe();
    }
}