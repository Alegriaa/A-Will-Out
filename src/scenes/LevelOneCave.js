class LevelOneCave extends Phaser.Scene {
    constructor() {
        super('levelOneCave');

    }
  

    preload() {
        this.load.image('caveBackground', './assets/LevelOne.png');
        this.load.image('monsterSketch', './assets/Monster.png');
        // name of the tiled project
        this.load.tilemapTiledJSON('caveMap','./assets/TiledCaveMap.json');


    }

    create() {
        // we need to make a unique key for this scene to access
        const caveMap = this.make.tilemap({ key: "caveMap"});
        // first name is the name of the tilesheet used is the first parameter,
        // the name we gave the asset within our project is the second parameter
        const tileset = caveMap.addTilesetImage("Level1Sketch", "caveBackground");
        // this is a layer within the tiled project
        const backgroundLayer = caveMap.createStaticLayer("Background", tileset, 0, 0);
        // this is required, to have the player collide with pixel tiles
        // that have the collides property attached to them
       backgroundLayer.setCollisionByProperty({ collides: true });
       //treeLayer.setCollisionBetween(0, 244);


    //    const debugGraphics = this.add.graphics().setAlpha(0.75);
    //    backgroundLayer.renderDebug(debugGraphics, {
    //      tileColor: null, // Color of non-colliding tiles
    //      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    //    });

       // this.caveBackground = this.add.tileSprite(0, 0, 3760, 1280, 'caveBackground').setOrigin(0,0);

        // instance of player in cave scene 1
        this.player = new Player(this, centerX - 250, centerY - 250, 'player').setScale(0.4);

        // instance of monster in cave scene 1 
        //this.caveMonster = new CaveMonster(this, centerX + 240, centerY + 200, 'monsterSketch');
        this.monsterDetection = this.physics.add.sprite(centerX + 100, centerY + 200, 'monsterSketch');
        this.monsterDetection.alpha = 0;
        // here we have collisions detection between the player & the later from tiled
        this.physics.add.collider(this.player, backgroundLayer);

        let graphics = this.add.graphics();
        graphics.lineStyle(2, 0xFFFFFF, 0.75);


        this.monsterPath = this.add.path(240,200); // start of path
         // next path point
        this.monsterPath.lineTo(400, 200);          // next
         
        this.monsterPath.lineTo(240, 200);  

        this.monsterPath.draw(graphics);            // draw path
        let s = this.monsterPath.getStartPoint();   // get start point of path
        // add path follower: follower(path, x, y, texture [, frame])
        this.monster = this.add.follower(this.monsterPath, s.x, s.y, 'monsterSketch').setScale(0.6);
        // start path follow with config
        // note: you can mix properties from both types of config objects
        // https://photonstorm.github.io/phaser3-docs/Phaser.Types.Tweens.html#.NumberTweenBuilderConfig
        // https://photonstorm.github.io/phaser3-docs/Phaser.Types.GameObjects.PathFollower.html#.PathConfig
        this.monster.startFollow({
            from: 0,            // points allow a path are values 0–1
            to: 1,
            delay: 0,
            duration: 20000,
            ease: 'Power0',
            hold: 0,
           // repeat: -1,
            yoyo: true,
           // rotateToPath: true
        });

        this.checkPath = this.add.path(780, 330);  // start of path
        this.checkPath.circleTo(300);                // radius of circle path
        this.checkPath.draw(graphics);               // draw path
        s = this.checkPath.getStartPoint();          // get start point
        // add path follower
        this.boat = this.add.follower(this.checkPath, s.x, s.y, 'monsterSketch').setScale(0.5);
        // start path follow with config
        this.boat.startFollow({
            duration: 15000,
            from: 0,
            to: 1,
            rotateToPath: true,
            startAt: 0,
            repeat: -1
        });


        // set of cursors to use
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

        this.physics.add.collider(this.monsterDetection, this.player, (a, b) => {
            this.scene.start('caveBattleScene');
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