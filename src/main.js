'use strict'

let config = {
    type: Phaser.AUTO,
    height: 640,
    width: 960,
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
    scene: [Menu, World, FirstBattleScene]
}

let game = new Phaser.Game(config);
let cursors;
let playerSpeed;
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let keyW, keyA, keyS, keyD, keyR;

game.settings = {
    startingSpoons: 5,
    currentSpoons: 5   
}
