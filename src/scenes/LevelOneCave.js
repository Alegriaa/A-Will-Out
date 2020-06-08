class LevelOneCave extends Phaser.Scene {

    constructor() {
        super('levelOneCave');

    }


    preload() {
        var url;
        // importing the plugin used for the monster behavior. 
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpathfollowerplugin.min.js';
        // loading it into this scene
        // plugin used is from:
        // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/board-pathfinder/#find-moveable-area
        this.load.plugin('rexpathfollowerplugin', url, true);

        this.load.image('caveBackground', './assets/LevelOne.png');
        this.load.image('monsterSketch', './assets/Monster.png');
        this.load.image('smallCameraCircle', './assets/SmallCameraCircle.png');
        this.load.image('bigCameraCircle', './assets/BigCameraCircle.png');
        this.load.image('lamp', './assets/Lamp.png');
        this.load.image('exit', './assets/YellowLight.png');
        this.load.image('exitDown', './assets/YellowLightReversed.png');
        this.load.audio('CaveMusic', './assets/CaveMusic.wav');
        this.load.audio('LampSound', './assets/LampSound.wav');
        // name of the tiled project
        this.load.tilemapTiledJSON('caveMap', './assets/TiledCaveMap.json');
        //this.load.plugin('rexmovetoplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmovetoplugin.min.js', true);
        this.load.spritesheet('characterWalk', './assets/characterWalking.png', { frameWidth: 50, frameHeight: 150, startFrame: 0, endFrame: 31 });
        this.load.spritesheet('monster1Walk', './assets/enemy1WalkFull.png', { frameWidth: 150, frameHeight: 200, startFrame: 0, endFrame: 7 });
        this.load.spritesheet('monster2Fly', './assets/enemy2WalkFull.png', { frameWidth: 150, frameHeight: 200, startFrame: 0, endFrame: 7 });
        this.load.image('shield', './assets/Shield.png');
        this.load.image('spoonItem', './assets/Spoon.png');
        this.load.image('exit', './assets/YellowLight.png');
        this.load.audio('hitByMonster', './assets/MonsterHitSound.wav');
        this.load.audio('doorSound', './assets/DoorSound.wav');
        this.load.audio('shieldSound', './assets/ShieldSound.wav');
        this.load.audio('spoonSound', './assets/SpoonSound.wav');
        this.load.image('hopeItem', './assets/Hope.png')
        this.load.image('spikyOverlayOne', './assets/LevelOneSpikes.png')
    }

    create() {



        // we need to make a unique key for this scene to access
        const caveMap = this.make.tilemap({ key: "caveMap" });
        // first name is the name of the tilesheet used is the first parameter,
        // the name we gave the asset within our project is the second parameter
        const tileset = caveMap.addTilesetImage("LevelOne", "caveBackground");
        // this is a layer within the tiled project
        const backgroundLayer = caveMap.createStaticLayer("Background", tileset, 0, 0);
        // this is required, to have the player collide with pixel tiles
        // that have the collides property attached to them
        backgroundLayer.setCollisionByProperty({ collides: true });
        //treeLayer.setCollisionBetween(0, 244);


        //     const debugGraphics = this.add.graphics().setAlpha(0.75);
        //    backgroundLayer.renderDebug(debugGraphics, {
        //      tileColor: null, // Color of non-colliding tiles
        //      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        //    });

        // this.caveBackground = this.add.tileSprite(0, 0, 3760, 1280, 'caveBackground').setOrigin(0,0);


        // instance of player in cave scene 1
        // this.player = new Player(this, centerX - 250, centerY + 50, 'characterWalk',0).setScale(0.4);


        // this is the instance we will use for the game
        // feel free to make more for testing
        // but these coordinates must remain the same for gameplay
        this.player = new Player(this, centerX - 150, centerY + 600, 'characterWalk', 0).setScale(0.4);
        // player spawning close to exit for debugging

        // this.player = new Player(this, 3603, 300, 'characterWalk',0).setScale(0.4);

        this.add.image(0, 0, 'spikyOverlayOne').setOrigin(0);
        this.lampTwo = new Lamp(this, 1190, 1000, 'lamp').setScale(0.4);
        this.lampThree = new Lamp(this, 2530, 290, 'lamp').setScale(0.4);
        this.lampFour = new Lamp(this, 1350, 230, 'lamp').setScale(0.4);
        this.monsterGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });


        // this.lampClock = this.time.delayedCall(10000, () => { 
        //     this.smallCaveCircle.alpha = 0.9
        //     this.bigCaveCircle.alpha = 1
        //  }, null, this);

        // detects the collision between the player and a lamp object
        this.physics.add.collider(this.lampTwo, this.player, (a, b) => {
            this.smallCaveCircle.alpha = 0.5
            this.bigCaveCircle.alpha = 0.7
            this.lampTwo.alpha = 0;
            this.lampSound.play();
            this.lampUI.alpha = 1;
            lampOn = true;
            console.log('you have been hit');
            this.lampClock1 = this.time.delayedCall(10000, () => {
                this.smallCaveCircle.alpha = 0.9
                this.bigCaveCircle.alpha = 1
                this.lampSound.stop();
                this.lampUI.alpha = 0;
                lampOn = false;
            }, null, this);
        }, null, this);

        this.physics.add.collider(this.lampThree, this.player, (a, b) => {
            this.smallCaveCircle.alpha = 0.5
            this.bigCaveCircle.alpha = 0.7
            this.lampThree.alpha = 0;
            this.lampSound.play();
            this.lampUI.alpha = 1;
            lampOn = true;
            console.log('you have been hit');
            this.lampClock2 = this.time.delayedCall(10000, () => {
                this.smallCaveCircle.alpha = 0.9
                this.bigCaveCircle.alpha = 1
                this.lampSound.stop();
                this.lampUI.alpha = 0;
                lampOn = false;
            }, null, this);
        }, null, this);

        this.physics.add.collider(this.lampFour, this.player, (a, b) => {
            this.smallCaveCircle.alpha = 0.5
            this.bigCaveCircle.alpha = 0.7
            this.lampFour.alpha = 0;
            this.lampSound.play();
            this.lampUI.alpha = 1;
            lampOn = true;
            console.log('you have been hit');
            this.lampClock = this.time.delayedCall(10000, () => {
                this.smallCaveCircle.alpha = 0.9
                this.bigCaveCircle.alpha = 1
                this.lampSound.stop();
                this.lampUI.alpha = 0;
                lampOn = false;
            }, null, this);
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

        // this.player = new Player(this, centerX - 250, centerY + 50, 'player').setScale(0.4);
        // this.player = new Player(this, 3672, 1039, 'player').setScale(0.4);

        this.levelTwoDetection = this.physics.add.sprite(3613, 1275, 'exitDown').setDisplaySize(230, 30);
        this.secondLevelTwoDetection = this.physics.add.sprite(3370, 5, 'exit').setDisplaySize(720, 30);


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

        //FASTER WALKING ANIMATION FOR MONSTER 1
        this.anims.create({
            key: 'fastMonsterWalkRight',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('monster1Walk', { start: 4, end: 7, first: 4 }),
            frameRate: 6,
        })

        this.anims.create({
            key: 'fastMonsterWalkLeft',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('monster1Walk', { start: 0, end: 3, first: 0 }),
            frameRate: 6,
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


        // each monster needs a path to follow that is saved in a variable
        var path = this.add.path(800, 480)
            // here its moving left
            .lineTo(100, 480)
            .lineTo(800, 480)


        // this is the first monster the player will most likely see, 
        // simple movement from left to right 
        this.monsterOne = new CaveMonster(this, 800, 452, 'monster1Walk').setScale(0.6);
        this.monsterGroup.add(this.monsterOne);
        this.tempM1x = this.monsterOne.x;

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
            duration: 50000,
            repeat: -1,
            yoyo: true
        });


        // this monster is the second to the right side of the first one
        // following a larger path towards the middle

        this.monsterTwo = new CaveMonster(this, 1724, 236, 'monster1Walk').setScale(0.6);
        this.monsterGroup.add(this.monsterTwo);
        this.tempM2x = this.monsterTwo.x;

        // each monster needs a path to follow that is saved in a variable
        var pathTwo = this.add.path(1357, 247)
            .lineTo(1077, 478)
            .lineTo(1864, 478)

        // we access the plugin here & attach the object we want to have follow the above path
        this.monsterTwo.pathFollower = this.plugins.get('rexpathfollowerplugin').add(this.monsterTwo, {
            path: pathTwo,
            t: 0,
            rotateToPath: false
        });
        this.tweens.add({
            targets: this.monsterTwo.pathFollower,
            t: 1,
            ease: 'Linear',
            duration: 45000,
            repeat: -1,
            yoyo: true
        });


        // this monster next one on the right
        // i will probably increase the speed for this after a play test
        this.monsterThree = new CaveMonster(this, 1724, 236, 'monster1Walk').setScale(0.6);
        this.monsterGroup.add(this.monsterThree);
        this.tempM3x = this.monsterThree.x;

        // each monster needs a path to follow that is saved in a variable
        var pathThree = this.add.path(2170, 304)
            .lineTo(2050, 479)
            .lineTo(2175, 479)
            .lineTo(2033, 360)
            .lineTo(2195, 309)
            .lineTo(1848, 308)

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
            duration: 40000,
            repeat: -1,
            yoyo: true
        });


        // this monster is at the top left of the map
        // with our new feel of the game, i feel like most 
        // areas should have a monster wandering around
        // this one patrols this area up & down as it move left to right
        this.monsterFour = new CaveMonster(this, 48, 48, 'monster1Walk').setScale(0.5);
        this.monsterGroup.add(this.monsterFour);
        this.tempM4x = this.monsterFour.x;

        // each monster needs a path to follow that is saved in a variable
        var pathFour = this.add.path(48, 48)
            .lineTo(236, 132)
            .lineTo(356, 60)
            .lineTo(480, 132)
            .lineTo(608, 60)
            .lineTo(756, 125)
            .lineTo(854, 60)

        // we access the plugin here & attach the object we want to have follow the above path
        this.monsterFour.pathFollower = this.plugins.get('rexpathfollowerplugin').add(this.monsterFour, {
            path: pathFour,
            t: 0,
            rotateToPath: false
        });
        this.tweens.add({
            targets: this.monsterFour.pathFollower,
            t: 1,
            ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 25000,
            repeat: -1,
            yoyo: true
        });
        // this monster is at the higher area of the middle section of the map
        // it patrols the area with a carefully designed path
        this.monsterFive = new CaveMonster(this, 1848, 50, 'monster1Walk').setScale(0.5);
        this.monsterGroup.add(this.monsterFive);
        this.tempM5x = this.monsterFive.x;

        // each monster needs a path to follow that is saved in a variable
        var pathFive = this.add.path(1848, 50)
            .lineTo(1580, 111)
            .lineTo(1863, 111)
            .lineTo(1562, 247)
            .lineTo(1058, 247)


        // we access the plugin here & attach the object we want to have follow the above path
        this.monsterFive.pathFollower = this.plugins.get('rexpathfollowerplugin').add(this.monsterFive, {
            path: pathFive,
            t: 0,
            rotateToPath: false
        });
        this.tweens.add({
            targets: this.monsterFive.pathFollower,
            t: 1,
            ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 20000,
            repeat: -1,
            yoyo: true
        });
        // this monster is the next highest monster on the right of the monster five
        // patrols the only direction that the player can travel
        // moving up & down as it travels left to right
        this.monsterSix = new CaveMonster(this, 2081, 50, 'monster1Walk').setScale(0.6);
        this.monsterGroup.add(this.monsterSix);
        this.tempM6x = this.monsterSix.x;

        // each monster needs a path to follow that is saved in a variable
        var pathSix = this.add.path(2081, 50)
            .lineTo(2326, 147)
            .lineTo(2518, 50)
            .lineTo(2666, 147)
            .lineTo(2849, 52)


        // we access the plugin here & attach the object we want to have follow the above path
        this.monsterSix.pathFollower = this.plugins.get('rexpathfollowerplugin').add(this.monsterSix, {
            path: pathSix,
            t: 0,
            rotateToPath: false
        });
        this.tweens.add({
            targets: this.monsterSix.pathFollower,
            t: 1,
            ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 20000,
            repeat: -1,
            yoyo: true
        });

        // this monster just awaits the player at the end of a path 
        // that is the wrong way
        this.monsterSeven = new CaveMonster(this, 1803, 976, 'monsterSketch').setScale(0.6);
        this.monsterGroup.add(this.monsterSeven);
        // this is a fast monster, that aims to
        // scare the player but push the player to be extra careful
        // as they cross it's path.
        this.monsterEightFast = new CaveMonster(this, 2875, 740, 'monster1Walk').setScale(0.6);
        this.monsterGroup.add(this.monsterEightFast);
        this.tempM8x = this.monsterEightFast.x;

        // each monster needs a path to follow that is saved in a variable
        var pathEight = this.add.path(2875, 740)
            .lineTo(2597, 740)
            .lineTo(2875, 740)
            .lineTo(2571, 896)
            .lineTo(2889, 953)
            .lineTo(2579, 1016)
            .lineTo(2857, 1016)

        // we access the plugin here & attach the object we want to have follow the above path
        this.monsterEightFast.pathFollower = this.plugins.get('rexpathfollowerplugin').add(this.monsterEightFast, {
            path: pathEight,
            t: 0,
            rotateToPath: false
        });
        this.tweens.add({
            targets: this.monsterEightFast.pathFollower,
            t: 1,
            ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 12000,
            repeat: -1,
            yoyo: true
        });

        // this monster is at the very end, bottom right
        // patrol an area that the player might think is the only way out
        this.monsterNine = new CaveMonster(this, 3472, 1023, 'monster1Walk', 0).setScale(0.6);
        this.monsterGroup.add(this.monsterNine);
        this.tempM9x = this.monsterNine.x;

        // each monster needs a path to follow that is saved in a variable
        var pathNine = this.add.path(3472, 1023)
            .lineTo(3322, 946)
            .lineTo(3465, 946)
            .lineTo(3314, 1023)
            .lineTo(3472, 1023)


        // we access the plugin here & attach the object we want to have follow the above path
        this.monsterNine.pathFollower = this.plugins.get('rexpathfollowerplugin').add(this.monsterNine, {
            path: pathNine,
            t: 0,
            rotateToPath: false
        });
        this.tweens.add({
            targets: this.monsterNine.pathFollower,
            t: 1,
            ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 8000,
            repeat: -1,
            yoyo: true
        });




        // here we have collisions detection between the player & the later from tiled
        this.physics.add.collider(this.player, backgroundLayer);



        cursors = this.input.keyboard.createCursorKeys();






        this.sea = this.add.image(960, 640, 'blackout').setScale(2, 2).setAlpha(0);



        this.physics.add.collider(this.levelTwoDetection, this.player, (a, b) => {
            this.scene.start('levelTwoCave');
        }, null, this);

        this.physics.add.collider(this.secondLevelTwoDetection, this.player, (a, b) => {
            this.scene.start('levelTwoCave');
        }, null, this);

        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // bounds of the background asset 
        this.cameras.main.setBounds(0, 0, 3760, 1280);
        // bounds of the canvas 
        this.cameras.main.setViewport(0, 0, 960, 640);
        // this follows the player & zoomed in 
        this.cameras.main.startFollow(this.player).setZoom(1.45);




        // music 
        caveMusic = this.sound.add('CaveMusic', { volume: 1, loop: true });
        caveMusic.play();

        // sounds
        this.lampSound = this.sound.add('LampSound', {
            volume: 0.05,
            loop: true
        });
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
            volume: 0.05,
            loop: false
        });


        //create the shield in the cave

        this.shield1 = new Shield(this, 2630, 1000, 'shield').setScale(.5);
        this.shield2 = new Shield(this, 1960, 320, 'shield').setScale(.5);
        //create spoon in cave

        //create Message Item 

        this.messageItem = new MessageItem(this, centerX - 180, centerY + 400, 'hopeItem').setScale(.5);
        this.messageItem1 = new MessageItem(this, 3670, 663, 'hopeItem').setScale(.5);
        this.messageItem2 = new MessageItem(this, 2970, 1150, 'hopeItem').setScale(.5);
        this.messageItem3 = new MessageItem(this, 2075, 180, 'hopeItem').setScale(.5);
        //non movable shield and spoon


        //this.shield1.setImmovable();

        this.messageItem.setImmovable();
        this.messageItem1.setImmovable();
        //  this.lampOne.setImmovable();

        //add a function call for the player when a shield is collected


        this.physics.add.collider(this.shield1, this.player, (a, b) => {

            if (game.settings.shield) {


            } else {

                this.addShield();
                this.shieldSound.play();
                this.shield1.alpha = 0;
            }

        }, null, this);

        this.physics.add.collider(this.shield2, this.player, (a, b) => {

            if (game.settings.shield) {


            } else {

                this.addShield();
                this.shieldSound.play();
                this.shield2.alpha = 0;
            }

        }, null, this);

        //collider for spoon item






        // the first circle overlay
        this.smallCaveCircle = this.add.tileSprite(0, 0, 3760, 1280, 'smallCameraCircle').setOrigin(0, 0)
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
        this.endingBool = false;
        this.boolVar2 = true;

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


        //message item creation
        var messageConfig = {
            font: "16px Arial", fill: "#fff",
            align: "center", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
            boundsAlignH: "left",
            boundsAlignV: "top",
            wordWrap: true, wordWrapWidth: 300
        };
        this.title = this.add.text(centerX - 100, 500, '', messageConfig);
        this.title.setScrollFactor(0, 0);



        //create message item collider and grab one of the messages from the prefab

        this.physics.add.collider(this.messageItem, this.player, (a, b) => {
            this.title.alpha = 1;
            this.title.setText(a.itemActivated());
            this.changeMessageOpacity();
            a.destroy();


        }, null, this);
        this.physics.add.collider(this.messageItem1, this.player, (a, b) => {
            this.title.alpha = 1;
            this.title.setText(a.itemActivated());
            this.changeMessageOpacity();
            a.destroy();

        }, null, this);

        this.physics.add.collider(this.messageItem2, this.player, (a, b) => {
            this.title.alpha = 1;
            this.title.setText(a.itemActivated());
            this.changeMessageOpacity();
            a.destroy();

        }, null, this);

        this.physics.add.collider(this.messageItem3, this.player, (a, b) => {
            this.title.alpha = 1;
            this.title.setText(a.itemActivated());
            this.changeMessageOpacity();
            a.destroy();

        }, null, this);





        this.physics.add.collider(this.monsterGroup, this.player, (a, b) => {
            if (this.game.settings.canTakeDamage) {
                this.takeDamage();
                this.hitByMonster.play();
            }


        }, null, this);


    }

    update() {


        //LARGE CHUNK OF CODE TO GET ALL THE ANIMATIONS WORKING FOR EACH DIFFERENT PATH AHHHHHHH

        //Monster 1 Animation Pathing
        if (this.tempM1x < this.monsterOne.x) {
            this.monsterOne.animate('monsterWalkRight');
            this.tempM1x = this.monsterOne.x;
        } else if (this.tempM1x > this.monsterOne.x) {
            this.monsterOne.animate('monsterWalkLeft');
            this.tempM1x = this.monsterOne.x;
        }

        //Monster 2 Animation Pathing
        if (this.tempM2x < this.monsterTwo.x) {
            this.monsterTwo.animate('monsterWalkRight');
            this.tempM2x = this.monsterTwo.x;
        } else if (this.tempM2x > this.monsterTwo.x) {
            this.monsterTwo.animate('monsterWalkLeft');
            this.tempM2x = this.monsterTwo.x;
        }

        //Monster 3 Animation Pathing

        if (this.tempM3x < this.monsterThree.x) {
            this.monsterThree.animate('monsterWalkRight');
            this.tempM3x = this.monsterThree.x;
        } else if (this.tempM3x > this.monsterThree.x) {
            this.monsterThree.animate('monsterWalkLeft');
            this.tempM3x = this.monsterThree.x;
        }

        //Monster 4 Animation Pathing
        if (this.tempM4x < this.monsterFour.x) {
            this.monsterFour.animate('monsterWalkRight');
            this.tempM4x = this.monsterFour.x;
        } else if (this.tempM4x > this.monsterFour.x) {
            this.monsterFour.animate('monsterWalkLeft');
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

        //Monster 8 Animation Pathing
        if (this.tempM8x < this.monsterEightFast.x) {
            this.monsterEightFast.animate('monsterFlyRight');
            this.tempM8x = this.monsterEightFast.x;
        } else if (this.tempM8x > this.monsterEightFast.x) {
            this.monsterEightFast.animate('monsterFlyLeft');
            this.tempM8x = this.monsterEightFast.x;
        }

        // Monster 9 Animation Pathing
        if (this.tempM9x < this.monsterNine.x) {
            this.monsterNine.animate('monsterWalkRight');
            this.tempM9x = this.monsterNine.x;
        } else if (this.tempM9x > this.monsterNine.x) {
            this.monsterNine.animate('monsterWalkLeft');
            this.tempM9x = this.monsterNine.x;
        }



        if (!this.game.settings.gameOver) {

            //console.log(this.player.body.x);
            //console.log(this.player.body.y);

            this.player.update();
            if (Phaser.Input.Keyboard.JustDown(keyD)) {
                this.scene.start('forestScene');
            }



        } else {
            if (!this.endingBool) {

                var messageConfig = {
                    font: "16px Arial", fill: "#fff",
                    // align: "center", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
                    //boundsAlignH: "left",
                    //boundsAlignV: "top",
                    wordWrap: true, wordWrapWidth: 300
                };
                this.endMessage = this.add.text(this.player.x, this.player.y, 'You Died  Press R to start again', messageConfig);

                this.endingBool = true;
            }




            if (Phaser.Input.Keyboard.JustDown(keyR)) {
                this.game.settings.gameOver = false;
                this.game.settings.currentSpoons = 5;


                this.scene.start('worldScene');


            }
        };
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

        //  this.lampUI.x = this.player.body.x - 260;
        //this.lampUI.y = this.player.body.y - 145;


        // console.log(this.player.body.x);
        // console.log(this.player.body.y);

        console.log(this.player.body.x);

        console.log(this.player.body.y);




        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            this.scene.start('levelTwoCave');
        }

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
            this.damageClock = this.time.delayedCall(10000, () => {
                this.game.settings.canTakeDamage = true;
            }, null, this);






            this.cameras.main.flash();
            this.cameras.main.shake(500);


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

    addShield() {

        this.game.settings.canTakeDamage = false;
        this.shieldUI.alpha = 1;


        this.shieldClock = this.time.delayedCall(20000, () => {
            this.game.settings.canTakeDamage = true;
            this.shieldUI.alpha = 0;
        }, null, this);



    }

}