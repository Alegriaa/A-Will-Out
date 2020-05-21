class EndingScene extends Phaser.Scene {
    constructor() {
        super("endingScene");
    }

    preload() {

        // getting these ready for the world scene
        


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
        
        this.add.text(centerX, centerY - 300, 'Final Game Ending Scene', menuConfig).setOrigin(0.5);
      
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        cursors = this.input.keyboard.createCursorKeys(); //arrow keys are now assigned and can be used
       


        // reserving these keys for future interactions we implement
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


    
       
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyR) && (this.endMenuFlag)) {

            this.scene.start('worldScene');

        }

        if (Phaser.Input.Keyboard.JustDown(keyD)) {
           }

        if (cursors.left.isDown) // if the left arrow key is cave scene
        {
            this.scene.start('caveScene');
        }
        


    }

}


