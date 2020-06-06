class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {

        // getting these ready for the world scene
        this.load.image('aWillOutTitle','./assets/aWillOutTitle.png');
        this.load.image('yellowTitle','./assets/AWillOutTitleYellow.png');
        this.load.image('player', './assets/PlayerSprite.png');
        this.load.image('TempCaveCirlce', './assets/TempCaveCircle.png');
        this.load.image('monsterSketch', './assets/Monster.png');
        this.load.image('TempSpoon', './assets/TempSpoon.png');
        this.load.image('menuScreen', './assets/menuScreen.png');
        this.load.image('directionsScreen','./assets/directionMenu.png');
        this.load.audio('WalkingInFlowers', './assets/WalkingInFlowers.wav');
        this.load.audio('Crying', './assets/CryingNearCave.wav');
        this.load.audio('WorldMusic', './assets/WorldSceneMusic.wav');
        this.load.image('blueDoor', './assets/BlueDoor.png');
        this.load.image('blueSwitch', './assets/BlueSwitch.png');
        this.load.image('greenDoor', './assets/GreenDoor.png');
        this.load.image('greenSwitch', './assets/GreenSwitch.png');
        this.load.image('pinkDoor', './assets/PinkDoor.png');
        this.load.image('pinkSwitch', './assets/PinkSwitch.png');

    }

    create() {
        let menuConfig = {
            fontFamily: 'Lucida Console',
            fontSize: '28px',
            color: '#FFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
            
        }



// -150 -100 ,y , +50, 100, 200
        this.add.image(0,0,'menuScreen').setOrigin(0);
        this.add.image(centerX - 280, centerY - 250, 'aWillOutTitle').setOrigin(0.5);
        this.add.text(centerX, centerY -150, 'Warning: This game deals with concepts surrounding mental health, if you', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 100, 'or someone you know is struggling, please use the links', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY -50, 'below or talk to a professional.', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY +50 , 'UCSC Caps https://caps.ucsc.edu', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 100, 'USA Suicide Prevention Hotline 1-800-273-8255', menuConfig).setOrigin(0.5);
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
            this.scene.start('levelOneCave');
        }

        if (cursors.right.isDown) // if the left arrow key is cave scene
        {
            this.scene.start('levelTwoCave');
        }

        if (cursors.up.isDown) // up arrow key takes you to meditation scene
        {
            this.scene.start('meditationScene');
        }
        


    }

    intro1(){

        let directionConfig = {
            fontSize: '18px',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
            
        }


        this.add.image(0,0,'directionsScreen').setOrigin(0);
        this.add.text(centerX, centerY - 300, 'Spoon Theory',directionConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 200, 'The spoon theory is a disability metaphor used to explain the reduced amount of mental ',directionConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 150, ' and physical energy available for day to day activities and tasks that may result from ',directionConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 100, 'disability or chronic illnesses. Spoons are a visual representation of how much energy ',directionConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 50, 'a person has on any given day.  Each activity requries a given number of spoons which ',directionConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, ' are only replace/recharged through rest. ',directionConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 100,'Press (D) to continue',directionConfig).setOrigin(0.5);
        this.secondFlag = true;
        
    
    }

    intro2(){
        let directionConfig = {
            fontSize: '18px',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
            
        }

        this.add.image(0,0,'directionsScreen').setOrigin(0);
        this.add.text(centerX, centerY - 100, 'Use Up, Down, Left, Right Arrows to move',directionConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 100, 'Press (R) to Start',directionConfig).setOrigin(0.5);
        this.endMenuFlag = true;

    }
}


