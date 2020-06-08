class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {

        // getting these ready for the world scene
        this.load.image('aWillOutTitle', './assets/aWillOutTitle.png');
        this.load.image('yellowTitle', './assets/AWillOutTitleYellow.png');
        this.load.image('player', './assets/PlayerSprite.png');
        this.load.image('TempCaveCirlce', './assets/TempCaveCircle.png');
        this.load.image('monsterSketch', './assets/Monster.png');
        this.load.image('TempSpoon', './assets/TempSpoon.png');
        this.load.image('menuScreen', './assets/menuScreen.png');
        this.load.image('directionsScreen', './assets/directionMenu.png');
        this.load.audio('WalkingInFlowers', './assets/WalkingInFlowers.wav');
        this.load.audio('Crying', './assets/CryingNearCave.wav');
        this.load.audio('WorldMusic', './assets/WorldSceneMusic.wav');
        this.load.image('blueDoor', './assets/BlueDoor.png');
        this.load.image('blueSwitch', './assets/BlueSwitch.png');
        this.load.image('greenDoor', './assets/GreenDoor.png');
        this.load.image('greenSwitch', './assets/GreenSwitch.png');
        this.load.image('pinkDoor', './assets/PinkDoor.png');
        this.load.image('pinkSwitch', './assets/PinkSwitch.png');
        this.load.image('blackout', './assets/BlackBackground.png');
        this.load.image('hopeIcon', './assets/Hope.png');
        this.load.image('lampIcon', './assets/Lamp.png');
        this.load.image('shieldIcon', './assets/Shield.png');
        this.load.image('spoonIcon', './assets/Spoon.png');
        this.load.spritesheet('monster1Walk', './assets/enemy1WalkFull.png', { frameWidth: 150, frameHeight: 200, startFrame: 0, endFrame: 7 });
        this.load.spritesheet('monster2Fly', './assets/enemy2WalkFull.png', { frameWidth: 150, frameHeight: 200, startFrame: 0, endFrame: 7 });
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

        //Monster 1 Animation
        this.anims.create({
            key: 'monsterWalkRight',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('monster1Walk', { start: 5, end: 7, first: 4 }),
            frameRate: 2.5,
        });

        //Monster 2 Animation
        this.anims.create({
            key: 'monsterFlyRight',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('monster2Fly', { start: 4, end: 7, first: 4 }),
            frameRate: 6,
        })


        // -150 -100 ,y , +50, 100, 200
        this.add.image(0, 0, 'menuScreen').setOrigin(0);
        this.add.image(centerX - 280, centerY - 250, 'aWillOutTitle').setOrigin(0.5);
        this.add.text(centerX, centerY - 150, 'Warning: This game deals with concepts surrounding mental health, if you', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 100, 'or someone you know is struggling, please use the links', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 50, 'below or talk to a professional.', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 50, 'UCSC Caps https://caps.ucsc.edu', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 100, 'USA Suicide Prevention Hotline 1-800-273-8255', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 200, 'Press (D) to Continue', menuConfig).setOrigin(0.5);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        cursors = this.input.keyboard.createCursorKeys(); //arrow keys are now assigned and can be used


        this.firstFlag = true;
        this.secondFlag = false;
        this.thirdFlag = false;
        this.endMenuFlag = false;

        // reserving these keys for future interactions we implement
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
        key5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
        key6 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX);


    }

    update() {


        if (Phaser.Input.Keyboard.JustDown(keyR) && (this.endMenuFlag)) {

            this.scene.start('worldScene');

        }

        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            if (this.firstFlag) {

                this.intro1();
                this.firstFlag = false;
                this.secondFlag = true;
            } else if ((this.secondFlag && !this.thirdFlag)) {

                this.intro3();

            } else if (this.thirdFlag) {

                this.intro2();
            }

        }

        // if (cursors.left.isDown) // if the left arrow key is cave scene
        // {
        //     this.scene.start('levelOneCave');
        // }

        // if (cursors.right.isDown) // if the left arrow key is cave scene
        // {
        //     this.scene.start('levelTwoCave');
        // }

        // if (cursors.up.isDown) // up arrow key takes you to meditation scene
        // {
        //     this.scene.start('endingScene');
        // }

        if (Phaser.Input.Keyboard.JustDown(key1)) {
            this.scene.start('levelOneCave');
        }
        if (Phaser.Input.Keyboard.JustDown(key2)) {
            this.scene.start('levelTwoCave');
        }
        if (Phaser.Input.Keyboard.JustDown(key3)) {
            this.scene.start('forestScene');
        }
        if (Phaser.Input.Keyboard.JustDown(key4)) {
            this.scene.start('meditationScene');
        }
        if (Phaser.Input.Keyboard.JustDown(key5)) {
            this.scene.start('endingScene');
        }
        if (Phaser.Input.Keyboard.JustDown(key6)) {
            this.scene.start('creditScene');
        }



    }

    intro1() {

        let directionConfig = {
            fontSize: '18px',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0

        }


        this.add.image(0, 0, 'directionsScreen').setOrigin(0);
        this.add.text(centerX, centerY - 300, 'Spoon Theory', directionConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 200, 'The spoon theory is a disability metaphor used to explain the reduced amount of mental ', directionConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 150, ' and physical energy available for day to day activities and tasks that may result from ', directionConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 100, 'disability or chronic illnesses. Spoons are a visual representation of how much energy ', directionConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 50, 'a person has on any given day.  Each activity requries a given number of spoons which ', directionConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, ' are only replace/recharged through rest. ', directionConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 100, 'Press (D) to continue', directionConfig).setOrigin(0.5);
        this.secondFlag = true;


    }

    intro2() {
        let directionConfig = {
            fontSize: '18px',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0

        }

        let instructionConfig = {
            fontSize: '22px',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0

        }


        this.add.image(0, 0, 'directionsScreen').setOrigin(0);

        //Monster Tutorial
        this.monsterOne = new CaveMonster(this, centerX - 410, centerY - 180, 'monster1Walk').setScale(1);
        this.monsterOne.anims.play('monsterWalkRight');
        this.monsterTwo = new CaveMonster(this, centerX - 280, centerY - 180, 'monster2Fly').setScale(1);
        this.monsterTwo.anims.play('monsterFlyRight');
        this.add.text(centerX + 100, centerY - 200, 'You may feel lost, and you may feel chained,', directionConfig).setOrigin(0.5);
        this.add.text(centerX + 100, centerY - 150, 'do not allow these feelings to hurt you.', directionConfig).setOrigin(0.5);

        this.add.image(centerX - 450, centerY - 10, 'hopeIcon');
        this.add.text(centerX - 210, centerY - 10, 'When you collect this item,').setOrigin(0.5);
        this.add.text(centerX - 210, centerY + 10, 'your shadow self will speak to you.').setOrigin(0.5);

        this.add.image(centerX - 450, centerY + 50, 'lampIcon');
        this.add.text(centerX - 200, centerY + 50, 'Lamps help light up your surroundings.').setOrigin(0.5);

        this.add.image(centerX - 450, centerY + 120, 'shieldIcon');
        this.add.text(centerX - 220, centerY + 120, 'Shields prevent damage being taken.').setOrigin(0.5);

        this.add.image(centerX - 450, centerY + 190, 'spoonIcon');
        this.add.text(centerX - 250, centerY + 190, 'Spoons will heal damage taken.').setOrigin(0.5);

        this.add.image(centerX + 300, centerY - 60, 'blackout').setScale(0.1);
        this.add.text(centerX + 300, centerY - 5, 'Watch out for pits or').setOrigin(0.5);
        this.add.text(centerX + 300, centerY + 15, ' you will have to retrace your steps.').setOrigin(0.5);


        this.add.image(centerX + 250, centerY + 100, 'pinkDoor').setScale(1)
        this.add.image(centerX + 400, centerY + 100, 'pinkSwitch').setScale(1)
        this.add.text(centerX + 325, centerY + 180, 'Switches will open similarly').setOrigin(0.5);
        this.add.text(centerX + 325, centerY + 200, 'colored doors.').setOrigin(0.5);

        this.add.text(centerX, centerY + 250, 'Use ↑   ↓   ←   →  to move.', instructionConfig).setOrigin(0.5);


        this.add.text(centerX, centerY + 290, 'Press (R) to Start', instructionConfig).setOrigin(0.5);



    }

    intro3() {
        this.add.image(0, 0, 'directionsScreen').setOrigin(0);
        let menuConfig = {
            fontFamily: 'Lucida Console',
            fontSize: '28px',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0

        }
        this.add.text(centerX, centerY - 250, 'These are painful times', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 200, 'and it is okay to feel lost from time to time', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 200, 'and it is okay to feel lost from time to time', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 200, 'and it is okay to feel lost from time to time', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 150, 'in pain, we can grow and find the strength', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 100, 'we always had within, sometimes we require', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 50, 'love', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'as the gateway to ourselves', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 50, 'go and find yourself', menuConfig).setOrigin(0.5);

        this.add.text(centerX, centerY + 250, 'Press (D) to continue', menuConfig).setOrigin(0.5);

        this.thirdFlag = true;


        this.endMenuFlag = true;
    }
}


