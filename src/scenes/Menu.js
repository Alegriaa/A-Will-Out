class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {

        // getting these ready for the world scene
        this.load.image('player', './assets/PlayerSprite.png');
        this.load.image('TempCaveCirlce', './assets/TempCaveCircle.png');
        this.load.image('monsterSketch', './assets/Monster.png');
        
        this.load.image('worldBackground', './assets/OverWorld.png');
        this.load.image('TempSpoon', './assets/TempSpoon.png');
        this.load.image('blackout', './assets/BlackBackground.png');
        this.load.audio('WalkingInFlowers', './assets/WalkingInFlowers.wav');
        this.load.audio('Crying', './assets/CryingNearCave.wav');


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





        this.add.text(centerX, centerY - 300, 'Final Game Menu Scene', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 150, 'UCSC Caps https://caps.ucsc.edu', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY -100, 'USA Suicide Prevention Hotline 1-800-273-8255', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Warning: This game deals with concepts surrounding mental health, if you', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 50, 'or someone you know is struggling, please use the links', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 100, 'above or talk to a professional.', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 200, 'Press (D) to Continue', menuConfig).setOrigin(0.5);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        cursors = this.input.keyboard.createCursorKeys(); //arrow keys are now assigned and can be used
       

        this.firstFlag = true;
        this.secondFlag = false;
        this.endMenuFlag = false;

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
            if (this.firstFlag){

                this.intro1();
                this.firstFlag = false;
                this.secondFlag = true;
            } else if ((this.secondFlag)) {

                this.intro2();
        
        }}

        if (cursors.left.isDown) // if the left arrow key is cave scene
        {
            this.scene.start('caveScene');
        }
        


    }

    intro1(){
        this.tempBackground = this.add.tileSprite(centerX, centerY, game.config.width, game.config.height, 'blackout').setScale(1);
        this.add.text(centerX, centerY - 300, 'Spoon Theory').setOrigin(0.5);
        this.add.text(centerX, centerY - 200, 'The spoon theory or spoon metaphor is a disability metaphor (for a combination of ego').setOrigin(0.5);
        this.add.text(centerX, centerY - 150, 'depletion, fatigue, and other factors), a neologism used to explain the reduced amount of mental').setOrigin(0.5);
        this.add.text(centerX, centerY - 100, 'and physical energy available for activities of living and productive tasks that may result from').setOrigin(0.5);
        this.add.text(centerX, centerY - 50, ' disability or chronic illness. Spoons are a visual representation used as a unit of measure').setOrigin(0.5);
        this.add.text(centerX, centerY, ' to quantify how much energy a person has throughout a given day. Each activity requires a ').setOrigin(0.5);
        this.add.text(centerX, centerY + 50, 'given number of spoons, which will only be replaced as the person "recharges" through rest.').setOrigin(0.5);
        this.add.text(centerX, centerY + 100, 'A person who runs out of spoons has no choice but to rest until their spoons are replenished.').setOrigin(0.5);
        this.add.text(centerX, centerY + 200, 'Press (D) to continue').setOrigin(0.5);
        this.secondFlag = true;
        
    
    }

    intro2(){
        this.tempBackground2 = this.add.tileSprite(centerX, centerY, game.config.width, game.config.height, 'blackout').setScale(1);
        this.add.text(centerX, centerY - 100, 'Use Up, Down, Left, Right Arrows to move').setOrigin(0.5);
        this.add.text(centerX, centerY + 100, 'Press (R) to Start').setOrigin(0.5);
        this.endMenuFlag = true;

    }
}


