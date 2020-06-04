class LevelTwoCave extends Phaser.Scene {
    constructor() {
        super('levelTwoCave');

    }
    preload() {
        this.load.image('forestBackground', './assets/Level2Sketch.png');
        this.load.image('caveTwoBackground', './assets/CaveLevelTwo.png');
        this.load.image('monsterSketch', './assets/Monster.png');
        this.load.tilemapTiledJSON('caveTwoMap','./assets/TiledCaveTwo.json');
        this.load.image('smallCircle', './assets/smallLightCircle.png');
        this.load.image('bigCircle', './assets/bigLightCircle.png');
        this.load.image('topLayer', './assets/caveTwoTopLayer.png');
        this.load.image('cave2Background', './assets/level2Graphics.png')
        this.load.spritesheet('characterWalk','./assets/characterWalking.png',{frameWidth:50,frameHeight:150,startFrame:0,endFrame:31});
        this.load.image('cave2SpikyOverlay', './assets/psCaveTwoOverlay.png')
        this.load.image('shield', './assets/Shield.png')
    }

    create() {
         // we need to make a unique key for this scene to access
        const caveTwoMap = this.make.tilemap({ key: "caveTwoMap"});

        // first name is the name of the tilesheet used is the first parameter,
        // the name we gave the asset within our project is the second parameter
        const tileset = caveTwoMap.addTilesetImage("CaveBackground", "cave2Background");
        // this is a layer within the tiled project
        const backgroundLayer1 = caveTwoMap.createStaticLayer("SecondCaveBackground", tileset, 0, 0);
        //the set up for collision in tiled
        backgroundLayer1.setCollisionByProperty({ collision: true });

        //debug for testing purposese
           const debugGraphics = this.add.graphics().setAlpha(0.75);
     
     
               backgroundLayer1.renderDebug(debugGraphics, {
               tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
       });

    

        // instance of player in battle scene
        this.player = new Player(this, centerX - 200, centerY + 245, 'player').setScale(0.5);
        this.caveMonster = new CaveMonster(this, centerX + 240, centerY + 200, 'monsterSketch');

        //create the shield in the cave
        this.shield = new Shield(this, centerX - 200, centerY + 100, 'shield').setScale(.5);
        //non movable shield
        this.shield.setImmovable();
        playerSpeed = 2;
        this.topLayer = this.add.tileSprite(0, 0, 3760, 1280, 'topLayer').setOrigin(0,0);
        this.spikes = this.add.tileSprite(0,0,3750,1280,'cave2SpikyOverlay').setOrigin(0,0);

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
        //collision between shield and the player
        this.physics.add.collider(this.player, this.shield);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

       //add a function call for the player 
        this.physics.add.collider(this.shield, this.player, (a, b) => {
            console.log("pp");
            if(game.settings.shield){


            }else{
                this.addShield();
                a.destroy();
            }

        }, null, this);


    }

    update() {
        this.player.update();
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            this.scene.start('forestScene');
        }

    }
    //add the shield to the player options
    addShield(){

        game.settings.shield = true;
        console.log(game.settings.shield);

    }


}