/* 

A WILL OUT

MARIA FEUDO:

One of the Main Programmers,
Level Designer,
Debugger,


CLEM BRIAT

Artist for gameplay backgrounds,
Artist for all gameplay items
Artist for Monster Animations
Artist for Credits Scene
Level Designer

NICOLE FIGG:

Artist for Menus
Artist for Player & Player Animations
Animations Programmer

BRIAN ALEGRIA

One of the Main Programmers
Level Designer
Sound Engineer
Debugger

*** All Assets Were Created By Our Team ***
*** All Sounds & Music Created by Brian ***


Note for Graders:

You can skip through all of our scenes using the numbers 1 - 6 within our Menu, we
hope this helps with grader, but some things may behave strange if some scenes are skipped. For example, 
at the end of a scene the current music would stop but this may not happen if a scene was skipped. But, the 
player would not be able to do this and would have to follow the functional pattern of the scenes.

Thank you for playing our game.



*/



'use strict'

let config = {
    type: Phaser.CANVAS,


    render: {
    pixelArt: true,
    },
    height: 640,
    width: 960,
  
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
           // debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, World, LevelOneCave, LevelTwoCave, Forest, Meditation, EndingScene, CreditScene]
}

let player;

let game = new Phaser.Game(config);
let cursors;
let playerSpeed;
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let keyW, keyA, keyS, keyD, keyR, key1, key2, key3, key4, key5, key6;
let walkingInFlowers = null;
let circleMoving = false;
let circlePosition;
let lampOn = false;


// music variables
let worldMusic = null;
let caveMusic = null;
let forestMeditationMusic = null;
let monsterHitSound = null;
let lambSound = null;
let sheildSound = null;

 
game.settings = {
    startingSpoons: 5,
    currentSpoons: 5,   
    shield: false,
    gameOver: false,
    canTakeDamage: true,
}
