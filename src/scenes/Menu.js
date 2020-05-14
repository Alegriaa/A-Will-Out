class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {

        // getting these ready for the world scene
        this.load.image('player', './assets/PlayerTester.png');
        this.load.image('background', './assets/TempBackground.png');
        this.load.image('TempSpoon', './assets/TempSpoon.png');


    }

    create() {
        let menuConfig = {
            fontFamily: 'Impact',
            fontSize: '28px',

            color: '#ff9c97',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
            
        }





        this.add.text(centerX, centerY - 100, 'Final Game Menu Scene', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 100, 'Press (R) to Start', menuConfig).setOrigin(0.5);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // reserving these keys for future interactions we implement
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);




    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyR)) {

            this.scene.start('worldScene');

        }


    }
}


