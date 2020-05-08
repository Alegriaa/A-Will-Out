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
    scene: [Menu]
}

let game = new Phaser.Game(config);
let centerX = game.config.width/2;
let centerY = game.config.height/2;


