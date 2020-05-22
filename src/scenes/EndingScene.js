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
        var monsterText = this.add.text(100, 150, 'Inner Self:', { fontFamily: 'Arial', fontSize: 32, color: '#00ff00' });
        this.monsterDialogue = this.add.text(200, 200, 'You\'ve come a long way', { fontFamily: 'Arial', fontSize: 32, color: '#00ff00' });
        var continueText = this.add.text(550, 500, 'Press D to continue', { fontFamily: 'Arial', fontSize: 32, color: '#00ff00' });
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        cursors = this.input.keyboard.createCursorKeys(); //arrow keys are now assigned and can be used
       



        // reserving these keys for future interactions we implement
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.monsterArray = ([]);//array for monster
      

        
        this.monsterNumber = 0;
    
       
    }

    update() {
        this.monsterDialogue.text = this.monsterArray[this.monsterNumber];

        if (Phaser.Input.Keyboard.JustDown(keyW)) {

            this.scene.start('worldScene');

        }

        if (Phaser.Input.Keyboard.JustDown(keyA)) {
            if(this.monsterNumber<this.monsterArray.length){
                this.monsterNumber++;

            }
            this.groundClock = this.time.delayedCall(2500, () => { //delay call to spawn extra ground
            }, null, this);
        
        }

       
        
        
        
    }

}


