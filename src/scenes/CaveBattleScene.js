class CaveBattleScene extends Phaser.Scene {
    constructor() {
        super('caveBattleScene');

    }

    create(){
       
        let menuConfig = {
            fontFamily: 'Impact',
            fontSize: '20px',

            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
            
        }

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //BASE SETUP FOR SCENE
        this.caveBackground = this.add.tileSprite(0, 0, 940, 640, 'blackout').setOrigin(0,0);
        this.player = new Player(this, centerX - 300, centerY + 68, 'player').setScale(1.4);
        this.monster = new CaveMonster(this, centerX + 300, centerY + 20, 'monsterSketch').setScale(1.5);


        //SPOONS
        this.spoonCount = this.game.settings.currentSpoons;//counter for array
        this.starter = 1;//counter for array
        this.spoonArray = ([]); // create spoon array
        this.xValue = 50; //x value for all of the spoon location spawns
        this.yValue = 50;

        while (this.starter <= this.spoonCount) {
            this.spoon1 = new Spoon(this, this.xValue, this.yValue, 'TempSpoon').setScale(.2);
            this.spoon1.setScrollFactor(0, 0);
            this.spoonArray.push(this.spoon1);
            this.xValue += 40;
            this.starter++;
        }
        this.boolVar = true;
        this.boolVar2 = true;


        this.sea = this.add.image(960, 640, 'blackout').setScale(2, 2).setAlpha(0); //WHEN DAMAGE TAKEN, CAN CHANGE TO RED CAMERA FLASH
        

        //Blue Boxes at the bottom
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0xffffff);
        this.graphics.fillStyle(0x031f4c, 1);        
        this.graphics.strokeRect(20, 485, 470, 150);
        this.graphics.fillRect(20, 485, 470, 150);
        this.graphics.strokeRect(500, 485, 470, 150);
        this.graphics.fillRect(500, 485, 470, 150);


        
        //Battle Text
        this.add.text(50,520,'Press W for Option 1',menuConfig);
        this.add.text(50,585,'Press A for Option 2',menuConfig);
        this.add.text(280,520,'Press S for Option 3',menuConfig);
        this.add.text(280,585,'Press D to Run',menuConfig);
    }

    update(){
        this.player.update();
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            console.log('W has been pressed');
        }
        if(Phaser.Input.Keyboard.JustDown(keyA)){
            console.log('A has been pressed');
            this.sea.alpha = 1;
        }else{
            //delay:500 This doesn't work but I was trying to set up a small delay before the alpha is changed back to 0 so it's not just a millisecond of a flicker.
            this.sea.alpha = 0;
        }
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            console.log('S has been pressed');
        }
        if(Phaser.Input.Keyboard.JustDown(keyD)){
            console.log('D has been pressed');
            this.scene.start('levelOneCave');
        }

    
    }


    takeDamage() {
        this.temp = this.game.settings.currentSpoons - 1; //minus one bc stupid off by one error ew
        this.spoonArray[this.temp].alpha = 0; //alpha set to 0 is invis
        game.settings.currentSpoons -= 1;

        


        this.tweens.add({ //!!!!!!!! -------> this will eventually need to be changed into a switch statement
            targets: this.sea,
            alphaTopLeft: { value: .5, duration: 500, ease: 'Power1' },
            alphaTopRight: { value: .5, duration: 500, ease: 'Power1' },
            alphaBottomRight: { value: .5, duration: 500, ease: 'Power1' },
            alphaBottomLeft: { value: .5, duration: 500, ease: 'Power1' },//,delay: 5000 },

            yoyo: true,
            //loop: -1   
        });


    }

    restoreDamage() {

        this.temp = this.game.settings.currentSpoons; //no minus one, i dont understand math
        this.spoonArray[this.temp].alpha = 1; //alpha set to 1 is visible
        game.settings.currentSpoons += 1;

    }
}