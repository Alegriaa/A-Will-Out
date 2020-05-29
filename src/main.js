'use strict'

let config = {
    type: Phaser.CANVAS,


    render: {
    pixelArt: true,
    },
  
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
    scene: [Menu, World, LevelOneCave, CaveBattleScene, LevelTwoCave, Forest, Meditation, EndingScene]
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
