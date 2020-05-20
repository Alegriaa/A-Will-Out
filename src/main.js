'use strict'

let config = {
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    pixelArt: true,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, World, CaveScene, CaveBattleScene]
}

let game = new Phaser.Game(config);
let cursors;
let playerSpeed;
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let keyW, keyA, keyS, keyD, keyR;
let walkingInFlowers = null;
let playerMovement;

game.settings = {
    startingSpoons: 5,
    currentSpoons: 5   
}
