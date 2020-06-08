
class LevelTwoCave extends Phaser.Scene {
    constructor() {
        super('levelTwoCave');

    }
    preload() {
        var url;
        // importing the plugin used for the monster behavior. 
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpathfollowerplugin.min.js';
        // loading it into this scene
        1.45
        this.load.plugin('rexpathfollowerplugin', url, true);

        this.load.image('forestBackground', './assets/Level2Sketch.png');
        this.load.image('caveTwoBackground', './assets/CaveLevelTwo.png');
        this.load.image('monsterSketch', './assets/Monster.png');
        this.load.tilemapTiledJSON('caveTwoMap', './assets/TiledCaveTwo.json');
        this.load.image('topLayer', './assets/caveTwoTopLayer.png');
        this.load.image('cave2Background', './assets/level2Graphics.png')
        this.load.spritesheet('characterWalk', './assets/characterWalking.png', { frameWidth: 50, frameHeight: 150, startFrame: 0, endFrame: 31 });
        this.load.image('cave2SpikyOverlay', './assets/psCaveTwoOverlay.png');
        this.load.image('shield', './assets/Shield.png');
        this.load.image('lamp', './assets/Lamp.png');
        this.load.image('spoonItem', './assets/Spoon.png');
        this.load.image('smallCameraCircle', './assets/SmallCameraCircle.png');
        this.load.image('bigCameraCircle', './assets/BigCameraCircle.png');
        this.load.image('exit', './assets/YellowLight.png');

        this.load.audio('hitByMonster', './assets/MonsterHitSound.wav');
        this.load.audio('doorSound', './assets/DoorSound.wav');
        this.load.audio('shieldSound', './assets/ShieldSound.wav');
        this.load.audio('spoonSound', './assets/SpoonSound.wav');
        this.load.audio('lampSound', './assets/LampSound.wav');



        this.load.image('hopeItem', './assets/Hope.png')

        this.load.image('groundMonster', './assets/Monster.png');
        this.load.image('flyingMonster', './assets/FlyingMonster.png');
        this.load.tilemapTiledJSON('caveTwoMap', './assets/TiledCaveTwo.json');

        this.load.spritesheet('monster1Walk', './assets/enemy1WalkFull.png', { frameWidth: 150, frameHeight: 200, startFrame: 0, endFrame: 7 });
        this.load.spritesheet('monster2Fly', './assets/enemy2WalkFull.png', { frameWidth: 150, frameHeight: 200, startFrame: 0, endFrame: 7 });

    }

    create() {
        // we need to make a unique key for this scene to access
        const caveTwoMap = this.make.tilemap({ key: "caveTwoMap" });

        // first name is the name of the tilesheet used is the first parameter,
        // the name we gave the asset within our project is the second parameter
        const tileset = caveTwoMap.addTilesetImage("CaveBackground", "cave2Background");
        // this is a layer within the tiled project
        const backgroundLayer1 = caveTwoMap.createStaticLayer("SecondCaveBackground", tileset, 0, 0);

        const holeLayer = caveTwoMap.createStaticLayer("Holes", tileset, 0, 0);
        //this.holeLayer = caveTwoMap.createDynamicLayer('Holes', tileset, 0, 0);
        //the set up for collision in tiled
        backgroundLayer1.setCollisionByProperty({ collision: true });
        holeLayer.setCollisionByProperty({ hole: true });

        //debug for testing purposese
        const debugGraphics = this.add.graphics().setAlpha(0.75);


        // backgroundLayer1.renderDebug(debugGraphics, {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });




        // instance of player in battle scene
        // player located at the end

       //this.player = new Player(this, centerX - 150, centerY + 600, 'characterWalk', 0).setScale(0.4);

        //this.player = new Player(this, 3000, 300, 'characterWalk', 0).setScale(0.4);
        // player close to exit
        this.player = new Player(this, 2600, 50, 'characterWalk', 0).setScale(0.4);


        //create the shield in the cave
        this.shield = new Shield(this, centerX - 200, centerY + 100, 'shield').setScale(.5);
        //create spoon in cave
        this.spoonItem = new Spoon(this, centerX - 150, centerY + 200, 'spoonItem').setScale(.5);
        //create Message Item 

        this.messageItem = new MessageItem(this, centerX - 150, centerY + 400, 'hopeItem').setScale(.25);

        this.lampOne = new Lamp(this, centerX - 100, centerY + 500, 'lamp').setScale(0.35);
        //non movable shield and spoon

        this.shield.setImmovable();
        this.spoonItem.setImmovable();
        this.messageItem.setImmovable();
       


        this.topLayer = this.add.tileSprite(0, 0, 3760, 1280, 'topLayer').setOrigin(0, 0);
        this.blueDoor = this.physics.add.sprite(1575, 975, 'blueDoor');
        this.caveExit = this.physics.add.sprite(2600, 5, 'exit').setScale(8, .5);
        //this.caveExit.alpha = .8;

        this.spikes = this.add.tileSprite(0, 0, 3750, 1280, 'cave2SpikyOverlay').setOrigin(0, 0);
        this.physics.add.collider(this.player, this.caveExit, (a, b) => {
            this.scene.start('forestScene');
            caveMusic.stop();


        }, null, this);

        // bounds of the background asset 
        this.cameras.main.setBounds(0, 0, 3760, 1280);
        // bounds of the canvas 
        this.cameras.main.setViewport(0, 0, 960, 640);
        // this follows the player & zoomed in 
        this.cameras.main.startFollow(this.player).setZoom(1.45);


        // this allows us to quickly use up, left, down, right arroy keys
        cursors = this.input.keyboard.createCursorKeys();
        //collision for player and tiled background

        this.physics.add.collider(this.player, backgroundLayer1);


        this.physics.add.collider(this.player, holeLayer, (a, b) => {
            this.scene.start('worldScene');


        }, null, this);
        //collision between shield and the player
        //this.physics.add.collider(this.player, this.shield);
        //this.physics.add.collider(this.player, this.spoonItem);
        //this.physics.add.collider(this.player, this.mess);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.monsterGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });


        //ANIMATION FOR MONSTER 1
        this.anims.create({
            key: 'monsterWalkRight',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('monster1Walk', { start: 5, end: 7, first: 4 }),
            frameRate: 2.5,
        });

        this.anims.create({
            key: 'monsterWalkLeft',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('monster1Walk', { start: 0, end: 3, first: 0 }),
            frameRate: 2.5,

        })

        //ANIMATIONS FOR MONSTER 2
        this.anims.create({
            key: 'monsterFlyRight',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('monster2Fly', { start: 4, end: 7, first: 4 }),
            frameRate: 6,
        })

        this.anims.create({
            key: 'monsterFlyLeft',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('monster2Fly', { start: 0, end: 3, first: 0 }),
            frameRate: 6,
        })

        this.monsterOne = new CaveMonster(this, 927, 345, 'monster2Fly').setScale(0.7);

        this.tempM1x = this.monsterOne.x;

        this.monsterGroup.add(this.monsterOne);

        var path = this.add.path(927, 345)
            .lineTo(645, 345)
            .lineTo(367, 469)
            .lineTo(100, 469)

        // we access the plugin here & attach the object we want to have follow the above path
        this.monsterOne.pathFollower = this.plugins.get('rexpathfollowerplugin').add(this.monsterOne, {
            path: path,
            t: 0,
            rotateToPath: false
        });
        this.tweens.add({
            targets: this.monsterOne.pathFollower,
            t: 1,
            ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 10000,
            repeat: -1,
            yoyo: true
        });

        this.monsterTwo = new CaveMonster(this, 100, 74, 'monster2Fly').setScale(0.7);

        this.tempM2x = this.monsterTwo.x;

        this.monsterGroup.add(this.monsterTwo);
        var pathTwo = this.add.path(100, 74)
            .lineTo(279, 269)
            .lineTo(649, 80)

        // we access the plugin here & attach the object we want to have follow the above path
        this.monsterTwo.pathFollower = this.plugins.get('rexpathfollowerplugin').add(this.monsterTwo, {
            path: pathTwo,
            t: 0,
            rotateToPath: false
        });
        this.tweens.add({
            targets: this.monsterTwo.pathFollower,
            t: 1,
            ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 10000,
            repeat: -1,
            yoyo: true
        });


        this.monsterThree = new CaveMonster(this, 2042, 439, 'monster2Fly').setScale(0.7);

        this.tempM3x = this.monsterThree.x;

        this.monsterGroup.add(this.monsterThree);
        var pathThree = this.add.path(2042, 439)
            .lineTo(1555, 439)
            .lineTo(1947, 66)
            .lineTo(904, 66)

        // we access the plugin here & attach the object we want to have follow the above path
        this.monsterThree.pathFollower = this.plugins.get('rexpathfollowerplugin').add(this.monsterThree, {
            path: pathThree,
            t: 0,
            rotateToPath: false
        });
        this.tweens.add({
            targets: this.monsterThree.pathFollower,
            t: 1,
            ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 15000,
            repeat: -1,
            yoyo: true
        });

        this.monsterFour = new CaveMonster(this, 2464, 745, 'monster2Fly').setScale(0.6);

        this.tempM4x = this.monsterThree.x;

        this.monsterGroup.add(this.monsterFour);
        var pathFour = this.add.path(2464, 745)
            .lineTo(2232, 850)
            .lineTo(2032, 742)
            .lineTo(1796, 843)
            .lineTo(1682, 732)

        // we access the plugin here & attach the object we want to have follow the above path
        this.monsterFour.pathFollower = this.plugins.get('rexpathfollowerplugin').add(this.monsterFour, {
            path: pathFour,
            t: 0,
            rotateToPath: false
        });
        this.tweens.add({
            targets: this.monsterFour.pathFollower,
            t: 1,
            ease: 'Linear',
            duration: 15000,
            repeat: -1,
            yoyo: true
        });

        this.monsterFive = new CaveMonster(this, 2462, 1108, 'monster2Fly').setScale(0.6);

        this.tempM5x = this.monsterFive.x;

        this.monsterGroup.add(this.monsterFive);
        var pathFive = this.add.path(2462, 1108)
            .lineTo(2231, 1191)
            .lineTo(2048, 1108)
            .lineTo(1876, 1191)
            .lineTo(1697, 1126)

        // we access the plugin here & attach the object we want to have follow the above path
        this.monsterFive.pathFollower = this.plugins.get('rexpathfollowerplugin').add(this.monsterFive, {
            path: pathFive,
            t: 0,
            rotateToPath: false
        });
        this.tweens.add({
            targets: this.monsterFive.pathFollower,
            t: 1,
            ease: 'Linear',
            duration: 15000,
            repeat: -1,
            yoyo: true
        });

        this.monsterSix = new CaveMonster(this, 3696, 991, 'monster1Walk').setScale(0.6);

        this.tempM6x = this.monsterSix.x;

        this.monsterGroup.add(this.monsterSix);
        var pathSix = this.add.path(3696, 991)
            .lineTo(2697, 991)

        // we access the plugin here & attach the object we want to have follow the above path
        this.monsterSix.pathFollower = this.plugins.get('rexpathfollowerplugin').add(this.monsterSix, {
            path: pathSix,
            t: 0,
            rotateToPath: false
        });
        this.tweens.add({
            targets: this.monsterSix.pathFollower,
            t: 1,
            ease: 'Linear',
            duration: 30000,
            repeat: -1,
            yoyo: true
        });

        this.monsterSeven = new CaveMonster(this, 2681, 737, 'monster2Fly').setScale(0.6);

        this.tempM7x = this.monsterSeven.x;

        this.monsterGroup.add(this.monsterSeven);
        var pathSeven = this.add.path(2681, 737)
            .lineTo(2681, 991)
            .lineTo(2911, 1180)


        // we access the plugin here & attach the object we want to have follow the above path
        this.monsterSeven.pathFollower = this.plugins.get('rexpathfollowerplugin').add(this.monsterSeven, {
            path: pathSeven,
            t: 0,
            rotateToPath: false
        });
        this.tweens.add({
            targets: this.monsterSeven.pathFollower,
            t: 1,
            ease: 'Linear',
            duration: 15000,
            repeat: -1,
            yoyo: true
        });

        this.monsterEight = new CaveMonster(this, 3192, 58, 'monster2Fly').setScale(0.6);

        this.tempM8x = this.monsterEight.x;

        this.monsterGroup.add(this.monsterEight);
        var pathEight = this.add.path(3192, 58)
            .lineTo(3672, 58)

        // we access the plugin here & attach the object we want to have follow the above path
        this.monsterEight.pathFollower = this.plugins.get('rexpathfollowerplugin').add(this.monsterEight, {
            path: pathEight,
            t: 0,
            rotateToPath: false
        });

        this.tweens.add({
            targets: this.monsterEight.pathFollower,
            t: 1,
            ease: 'Linear',
            duration: 10000,
            repeat: -1,
            yoyo: true
        });

        this.monsterNine = new CaveMonster(this, 2664, 462, 'monster2Fly').setScale(0.6);

        this.tempM9x = this.monsterNine.x;

        this.monsterGroup.add(this.monsterNine);
        var pathNine = this.add.path(2664, 462)
            .lineTo(3252, 462)
            .lineTo(3142, 242)
            .lineTo(3329, 42)

        // we access the plugin here & attach the object we want to have follow the above path
        this.monsterNine.pathFollower = this.plugins.get('rexpathfollowerplugin').add(this.monsterNine, {
            path: pathNine,
            t: 0,
            rotateToPath: false
        });

        this.tweens.add({
            targets: this.monsterNine.pathFollower,
            t: 1,
            ease: 'Linear',
            duration: 15000,
            repeat: -1,
            yoyo: true
        });

        this.monsterTen = new CaveMonster(this, 2656, 83, 'monster2Fly').setScale(0.7);

        this.tempM10x = this.monsterTen.x;

        this.monsterGroup.add(this.monsterTen);
        var pathTen = this.add.path(2656, 83)
            .lineTo(2926, 453)
            .lineTo(2646, 453)
            .lineTo(2909, 83)

        // we access the plugin here & attach the object we want to have follow the above path
        this.monsterTen.pathFollower = this.plugins.get('rexpathfollowerplugin').add(this.monsterTen, {
            path: pathTen,
            t: 0,
            rotateToPath: false
        });

        this.tweens.add({
            targets: this.monsterTen.pathFollower,
            t: 1,
            ease: 'Linear',
            duration: 15000,
            repeat: -1,
            yoyo: true
        });

        // collider for lamp, & functionality
        this.physics.add.collider(this.lampOne, this.player, (a, b) => {
            this.smallCaveCircle.alpha = 0.5
            this.bigCaveCircle.alpha = 0.7
            this.lampOne.alpha = 0;
            this.lampSound.play();
            this.lampUI.alpha = 1;
            lampOn = true;
            console.log('you have been hit');
            this.lampClock;
        }, null, this);
        // lamp timer to return to original settings
        if (lampOn = true) {
            this.lampClock = this.time.delayedCall(10000, () => {
                this.smallCaveCircle.alpha = 0.9
                this.bigCaveCircle.alpha = 1
                this.lampSound.stop();
                this.lampUI.alpha = 0;
                lampOn = false;
            }, null, this);
        }


        //add a function call for the player when a shield is collected
        this.physics.add.collider(this.shield, this.player, (a, b) => {

            if (game.settings.shield) {


            } else {

                this.addShield();
                this.shieldSound.play();
                a.destroy();
            }

        }, null, this);

        //function call for the player when a spoon is collected
        this.physics.add.collider(this.spoonItem, this.player, (a, b) => {
            if (game.settings.currentSpoons < 5) {

                this.restoreDamage();
                this.spoonSound.play();
                a.destroy();

            }
        }, null, this);


        this.pinkSwitch = this.physics.add.sprite(centerX + 100, centerY + 500, 'pinkSwitch');
        this.pinkDoor = this.physics.add.sprite(centerX - 100, centerY + 340, 'pinkDoor');

        this.pinkSwitch.setImmovable();



        this.physics.add.collider(this.pinkSwitch, this.player, (a, b) => {
            a.alpha = .5;
            this.triggerPinkDoor();
            this.pinkDoorClock = this.time.delayedCall(1500, () => {
                this.pinkDoor.destroy();
            }, null, this);


        }, null, this);


        this.physics.add.collider(this.player, this.pinkDoor);
        this.pinkDoor.setImmovable();



        this.blueDoor.setImmovable(); //blue door is declared near spiky overlay because of overlap reasons
        this.blueSwitch = this.physics.add.sprite(2060, 470, 'blueSwitch');

        this.blueSwitch.setImmovable();
        this.physics.add.collider(this.player, this.blueDoor);

        this.physics.add.collider(this.blueSwitch, this.player, (a, b) => {
            a.alpha = .5;
            this.triggerBlueDoor();
            this.blueClock = this.time.delayedCall(1500, () => {
                this.blueDoor.destroy();
            }, null, this);


        }, null, this);

        this.greenSwitch = this.physics.add.sprite(100, 100, 'greenSwitch');
        this.greenDoor = this.physics.add.sprite(3660, 660, 'greenDoor');

        this.physics.add.collider(this.player, this.greenDoor);
        this.greenDoor.setImmovable();
        this.greenSwitch.setImmovable();

        this.physics.add.collider(this.greenSwitch, this.player, (a, b) => {
            a.alpha = .5;
            this.triggerGreenDoor();
            this.blueClock = this.time.delayedCall(1500, () => {
                this.greenDoor.destroy();
            }, null, this);


        }, null, this);




        this.physics.add.collider(this.monsterGroup, this.player, (a, b) => {
            if (this.game.settings.canTakeDamage) {
                this.takeDamage();
            }


        }, null, this);




        this.sea = this.add.image(960, 640, 'blackout').setScale(2, 2).setAlpha(0);

        // the first circle overlay
        this.smallCaveCircle = this.add.tileSprite(0, 0, 3760, 1280, 'smallCameraCircle').setOrigin(0, 0);
        this.smallCaveCircle.alpha = 0.9
        // second circle overlay
        this.bigCaveCircle = this.add.tileSprite(0, 0, 3760, 1280, 'bigCameraCircle').setOrigin(0, 0);


        //create spoon UI
        this.spoonCount = this.game.settings.currentSpoons;//counter for array
        this.starter = 1;//counter for array
        this.spoonArray = ([]); // create spoon array
        this.xValue = centerX - 280; //x value for all of the spoon location spawns
        this.yValue = centerY - 190;


        //a while loop to create the necessary amount of spoons according to the current spoons game settings number
        while (this.starter <= this.spoonCount) {
            this.spoon1 = new Spoon(this, this.xValue, this.yValue, 'spoonItem').setScale(.7);
            this.spoon1.setScrollFactor(0, 0);
            this.spoonArray.push(this.spoon1);
            this.xValue += 45;
            this.starter++;
        }
        // message item icon UI
        this.messageItemUI = new MessageItem(this, centerX, centerY - 190, 'hopeItem')
        this.messageItemUI.setScrollFactor(0, 0);
        // shield icon UI
        this.shieldUI = new Shield(this, centerX + 280, centerY - 190, 'shield').setScale(.7);
        this.shieldUI.setScrollFactor(0, 0);
        this.shieldUI.alpha = 0;
        // lamp icon UI
        this.lampUI = new Lamp(this, centerX + 230, centerY - 190, 'lamp').setScale(0.7);
        this.lampUI.setScrollFactor(0, 0);
        this.lampUI.alpha = 0;



        var messageConfig = {
            font: "16px Arial", fill: "#fff",
            align: "center", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
            boundsAlignH: "left",
            boundsAlignV: "top",
            wordWrap: true, wordWrapWidth: 300
        };
        this.title = this.add.text(centerX, 500, '', messageConfig);
        this.title.setScrollFactor(0, 0);



        //create message item collider and grab one of the messages from the prefab

        this.physics.add.collider(this.messageItem, this.player, (a, b) => {

            this.title.setText(a.itemActivated());
            this.changeMessageOpacity();
            a.destroy();


        }, null, this);


        // sounds 
        this.hitByMonster = this.sound.add('hitByMonster', {
            volume: 1,
            loop: false
        });
        this.doorSound = this.sound.add('doorSound', {
            volume: 1,
            loop: false
        });
        this.shieldSound = this.sound.add('shieldSound', {
            volume: 1,
            loop: false
        });
        this.spoonSound = this.sound.add('spoonSound', {
            volume: 0.5,
            loop: false
        });
        this.lampSound = this.sound.add('lampSound', {
            volume: 0.05,
            loop: true
        });

    }







    update() {

        if (!this.game.settings.gameOver) {

            //console.log(this.player.body.x);
            //console.log(this.player.body.y);

            this.player.update();
            // we attach the first overlay to the player's position
            // i had to find the right values according to the spawn
            // of the player on the map
            this.smallCaveCircle.x = this.player.body.x - 1885;
            this.smallCaveCircle.y = this.player.body.y - 610;

            // we attach the second overlay to the player's position
            // i had to find the right values according to the spawn
            // of the player on the map
            this.bigCaveCircle.x = this.player.body.x - 1885;
            this.bigCaveCircle.y = this.player.body.y - 610;



            if (Phaser.Input.Keyboard.JustDown(keyD)) {
                this.scene.start('forestScene');
            }



        } else {
            var messageConfig = {
                font: "16px Arial", fill: "#fff",
                align: "center", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
                boundsAlignH: "left",
                boundsAlignV: "top",
                wordWrap: true, wordWrapWidth: 300
            };
            this.endMessage = this.add.text(centerX, centerY, 'You Died  Press R to start again', messageConfig);



            if (Phaser.Input.Keyboard.JustDown(keyR)) {
                this.game.settings.gameOver = false;
                this.game.settings.currentSpoons = 5;


                this.scene.start('worldScene');


            }
        }




        //Monster 1 Animation Pathing
        if (this.tempM1x < this.monsterOne.x) {
            this.monsterOne.animate('monsterFlyRight');
            this.tempM1x = this.monsterOne.x;
        } else if (this.tempM1x > this.monsterOne.x) {
            this.monsterOne.animate('monsterFlyLeft');
            this.tempM1x = this.monsterOne.x;
        }

        //Monster 2 Animation Pathing
        if (this.tempM2x < this.monsterTwo.x) {
            this.monsterTwo.animate('monsterFlyRight');
            this.tempM2x = this.monsterTwo.x;
        } else if (this.tempM2x > this.monsterTwo.x) {
            this.monsterTwo.animate('monsterFlyLeft');
            this.tempM2x = this.monsterTwo.x;
        }

        //Monster 3 Animation Pathing

        if (this.tempM3x < this.monsterThree.x) {
            this.monsterThree.animate('monsterFlyRight');
            this.tempM3x = this.monsterThree.x;
        } else if (this.tempM3x > this.monsterThree.x) {
            this.monsterThree.animate('monsterFlyLeft');
            this.tempM3x = this.monsterThree.x;
        }

        //Monster 4 Animation Pathing
        if (this.tempM4x < this.monsterFour.x) {
            this.monsterFour.animate('monsterFlyRight');
            this.tempM4x = this.monsterFour.x;
        } else if (this.tempM4x > this.monsterFour.x) {
            this.monsterFour.animate('monsterFlyLeft');
            this.tempM4x = this.monsterFour.x;
        }

        //Monster 5 Animation Pathing
        if (this.tempM5x < this.monsterFive.x) {
            this.monsterFive.animate('monsterFlyRight');
            this.tempM5x = this.monsterFive.x;
        } else if (this.tempM5x > this.monsterFive.x) {
            this.monsterFive.animate('monsterFlyLeft');
            this.tempM5x = this.monsterFive.x;
        }

        //Monster 6 Animation Pathing
        if (this.tempM6x < this.monsterSix.x) {
            this.monsterSix.animate('monsterWalkRight');
            this.tempM6x = this.monsterSix.x;
        } else if (this.tempM6x > this.monsterSix.x) {
            this.monsterSix.animate('monsterWalkLeft');
            this.tempM6x = this.monsterSix.x;
        }

        //Monster 7 Animation Pathing
        if (this.tempM7x < this.monsterSeven.x) {
            this.monsterSeven.animate('monsterFlyRight');
            this.tempM7x = this.monsterSeven.x;
        } else if (this.tempM7x > this.monsterSeven.x) {
            this.monsterSeven.animate('monsterFlyLeft');
            this.tempM7x = this.monsterSeven.x;
        }

        //Monster 8 Animation Pathing
        if (this.tempM8x < this.monsterEight.x) {
            this.monsterEight.animate('monsterFlyRight');
            this.tempM8x = this.monsterEight.x;
        } else if (this.tempM8x > this.monsterEight.x) {
            this.monsterEight.animate('monsterFlyLeft');
            this.tempM8x = this.monsterEight.x;
        }

        // Monster 9 Animation Pathing
        if (this.tempM9x < this.monsterNine.x) {
            this.monsterNine.animate('monsterFlyRight');
            this.tempM9x = this.monsterNine.x;
        } else if (this.tempM9x > this.monsterNine.x) {
            this.monsterNine.animate('monsterFlyLeft');
            this.tempM9x = this.monsterNine.x;
        }


        // Monster 10 Animation Pathing
        if (this.tempM10x < this.monsterTen.x) {
            this.monsterTen.animate('monsterFlyRight');
            this.tempM10x = this.monsterTen.x;
        } else if (this.tempM10x > this.monsterTen.x) {
            this.monsterTen.animate('monsterFlyLeft');
            this.tempM10x = this.monsterTen.x;
        }




    }
    //add the shield to the player options
    addShield() {

        this.game.settings.canTakeDamage = false;
        this.shieldUI.alpha = 1;


        this.shieldClock = this.time.delayedCall(25000, () => {
            this.game.settings.canTakeDamage = true;
            this.shieldUI.alpha = 0;
        }, null, this);



    }

    takeDamage() {

        if (this.game.settings.currentSpoons == 0) {

            this.player.setVelocity(0);
            this.game.settings.gameOver = true;
        } else {
            this.temp = this.game.settings.currentSpoons - 1; //minus one bc stupid off by one error ew
            this.spoonArray[this.temp].alpha = 0; //alpha set to 0 is invis
            game.settings.currentSpoons -= 1;
            this.game.settings.canTakeDamage = false;
            this.damageClock = this.time.delayedCall(2000, () => {
                this.game.settings.canTakeDamage = true;
            }, null, this);






            this.cameras.main.flash();
            this.cameras.main.shake(500);
            this.hitByMonster.play();


        }

    }

    restoreDamage() {

        this.temp = this.game.settings.currentSpoons; //no minus one, i dont understand math
        this.spoonArray[this.temp].alpha = 1; //alpha set to 1 is visible
        game.settings.currentSpoons += 1;

    }

    changeMessageOpacity() {
        if (this.title.alpha >= .1) {

            this.title.alpha = this.title.alpha - .1;
            this.lampClock = this.time.delayedCall(1000, () => {
                this.changeMessageOpacity();
            }, null, this);
        }

    }

    triggerPinkDoor() {

        if (this.pinkDoor.alpha >= .1) {
            this.pinkDoor.alpha = this.pinkDoor.alpha - .1;
            this.doorSound.play();
            this.pinkClock = this.time.delayedCall(500, () => {
                this.triggerPinkDoor();
            }, null, this);
        }

    }

    triggerBlueDoor() {

        if (this.blueDoor.alpha >= .1) {
            this.blueDoor.alpha = this.blueDoor.alpha - .1;
            this.doorSound.play();
            this.blueClock = this.time.delayedCall(500, () => {
                this.triggerBlueDoor();
            }, null, this);
        }

    }
    triggerGreenDoor() {

        if (this.greenDoor.alpha >= .1) {
            this.greenDoor.alpha = this.greenDoor.alpha - .1;
            this.doorSound.play();
            this.blueClock = this.time.delayedCall(500, () => {
                this.triggerGreenDoor();
            }, null, this);
        }

    }



}