class LevelOneCave extends Phaser.Scene {
    
    constructor() {
        super('levelOneCave');

    }
  

    preload() {
        var url;
        // importing the plugin used for the monster behavior. 
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpathfollowerplugin.min.js';
        // loading it into this scene
        this.load.plugin('rexpathfollowerplugin', url, true);
        
        this.load.image('caveBackground', './assets/LevelOne.png');
        this.load.image('monsterSketch', './assets/Monster.png');
        this.load.image('smallCameraCircle', './assets/SmallCameraCircle.png');
        this.load.image('bigCameraCircle', './assets/BigCameraCircle.png');
        this.load.image('lamp', './assets/Lamp.png');
        // name of the tiled project
        this.load.tilemapTiledJSON('caveMap','./assets/TiledCaveMap.json');
        //this.load.plugin('rexmovetoplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmovetoplugin.min.js', true);
        this.load.spritesheet('characterWalk','./assets/characterWalking.png',{frameWidth:50,frameHeight:150,startFrame:0,endFrame:31});

    }

    create() {
        
        
        // we need to make a unique key for this scene to access
        const caveMap = this.make.tilemap({ key: "caveMap"});
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

       

        // this is the instance we will use for the game
        // feel free to make more for testing
        // but these coordinates must remain the same
        this.player = new Player(this, centerX - 150, centerY + 600, 'characterWalk',0).setScale(0.4);

        // this.player = new Player(this, centerX - 250, centerY + 50, 'player').setScale(0.4);
        // this.player = new Player(this, 3672, 1039, 'player').setScale(0.4);
        
        this.levelTwoDetection = this.physics.add.sprite(3603, 1260, 'TempSpoon').setDisplaySize(300, 30);
        
        this.levelTwoDetection.alpha = 0;

        // each monster needs a path to follow that is saved in a variable
        var path = this.add.path(800, 480)
        // here its moving left
        .lineTo(100, 480)
        

        .lineTo(800, 480)

        // this is the first monster the player will most likely see, 
        // simple movement from left to right 
        this.monsterOne = new CaveMonster(this, 700, 452, 'monsterSketch').setScale(0.6);
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

        this.monsterTwo = new CaveMonster(this, 1724, 236, 'monsterSketch').setScale(0.6);
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
        this.monsterThree = new CaveMonster(this, 1724, 236, 'monsterSketch').setScale(0.6);
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
        this.monsterFour = new CaveMonster(this, 48, 48, 'monsterSketch').setScale(0.5);
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
        this.monsterFive = new CaveMonster(this, 1848, 50, 'monsterSketch').setScale(0.5);
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
        this.monsterSix = new CaveMonster(this, 2081, 50, 'monsterSketch').setScale(0.6);
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
        this.monsterSeven = new CaveMonster(this, 1803, 976, 'TempSpoon').setScale(0.6);
        // each monster needs a path to follow that is saved in a variable
        var pathSeven = this.add.path(1803, 976)
        .lineTo(1800, 976)
  
        // we access the plugin here & attach the object we want to have follow the above path
        this.monsterSeven.pathFollower = this.plugins.get('rexpathfollowerplugin').add(this.monsterSeven, {
            path: pathSeven,
            t: 0,
            rotateToPath: false
        });
        this.tweens.add({
            targets: this.monsterSeven.pathFollower,
            t: 1,
            ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 10,
            repeat: -1,
            yoyo: true
        });

        // this is a fast monster, that aims to
        // scare the player but push the player to be extra careful
        // as they cross it's path.
        this.monsterEightFast = new CaveMonster(this, 2875, 740, 'monsterSketch').setScale(0.6);
        // each monster needs a path to follow that is saved in a variable
        var pathEight = this.add.path(2875, 740)
        .lineTo(2597, 740)
        .lineTo(2875, 740)
        .lineTo(2571, 896)
        .lineTo(2889, 953)
        .lineTo(2579, 1016)
        .lineTo(2857, 1016)
  
        // we access the plugin here & attach the object we want to have follow the above path
        this.monsterEightFast.pathFollower =  this.plugins.get('rexpathfollowerplugin').add(this.monsterEightFast, {
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
        this.monsterNine = new CaveMonster(this, 3472, 1023, 'monsterSketch',0).setScale(0.6);
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

        // *** there may be a need for more monsters ***

        // the first circle overlay
        this.smallCaveCircle = this.add.tileSprite(0, 0, 3760, 1280, 'smallCameraCircle').setOrigin(0,0);
        this.smallCaveCircle.alpha = 0.9
        // second circle overlay
        this.bigCaveCircle = this.add.tileSprite(0, 0, 3760, 1280, 'bigCameraCircle').setOrigin(0,0);
        

    
        // here we have collisions detection between the player & the later from tiled
         this.physics.add.collider(this.player, backgroundLayer);

      
   
        cursors = this.input.keyboard.createCursorKeys();
        // we can change the player speed in this scene here
        playerSpeed = 2;

        this.spoonCount = this.game.settings.currentSpoons;//counter for array
        this.starter = 1;//counter for array
        this.spoonArray = ([]); // create spoon array
        this.xValue = centerX - 400; //x value for all of the spoon location spawns
        this.yValue = 50;


        //a while loop to create the necessary amount of spoons according to the current spoons game settings number
        while (this.starter <= this.spoonCount) {
            this.spoon1 = new Spoon(this, this.xValue, this.yValue, 'TempSpoon').setScale(.2);
            this.spoon1.setScrollFactor(0, 0);
            this.spoonArray.push(this.spoon1);
            this.xValue += 40;
            this.starter++;
        }
        this.boolVar = true;
        this.boolVar2 = true;

        this.sea = this.add.image(960, 640, 'blackout').setScale(2, 2).setAlpha(0);

        this.physics.add.collider(this.monsterOne, this.player, (a, b) => {
            console.log('you have been hit');
        }, null, this);
        this.physics.add.collider(this.monsterTwo, this.player, (a, b) => {
            console.log('you have been hit');
        }, null, this);

        this.physics.add.collider(this.levelTwoDetection, this.player, (a, b) => {
            this.scene.start('levelTwoCave');
        }, null, this);

        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // bounds of the background asset 
        this.cameras.main.setBounds(0, 0, 3760, 1280); 
        // bounds of the canvas 
        this.cameras.main.setViewport(0, 0, 960, 640);
        // this follows the player & zoomed in 
        this.cameras.main.startFollow(this.player).setZoom(1.45);

        

   
       
    }

    update() {
       
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

        console.log(this.player.body.x);
        console.log(this.player.body.y);

        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            this.scene.start('levelTwoCave');
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