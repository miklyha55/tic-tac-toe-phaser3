import * as Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import LoaderScene from './scenes/LoaderScene';
import { RESOLUTION } from './constants';


const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: RESOLUTION.width,
    height: RESOLUTION.height,
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
