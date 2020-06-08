class CreditScene extends Phaser.Scene {
    constructor() {
        super('creditScene');

    }
    preload(){
        this.load.image('credits', './assets/Credits.png');
    }

    create(){
        this.credits = this.add.tileSprite(0, 0, 960, 640, 'credits').setOrigin(0,0);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.add.text(centerX+50, centerY+280, ' Press W to return to Menu ');
    }

        
    

    update(){
       
        if (Phaser.Input.Keyboard.JustDown(keyW)) {

            this.scene.start('menuScene');

        }

        
        }
    }
        
    
