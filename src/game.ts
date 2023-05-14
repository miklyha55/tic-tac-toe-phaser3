import * as Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import LoaderScene from './scenes/LoaderScene';
import { Resolution } from './constants';


const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: Resolution.width,
    height: Resolution.height,
    scene: [
        LoaderScene,
        GameScene,
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        parent: "game",
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
};

const game = new Phaser.Game(config);
