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

    }

    create() {
         // we need to make a unique key for this scene to access
        const caveTwoMap = this.make.tilemap({ key: "caveTwoMap"});

            // first name is the name of the tilesheet used is the first parameter,
          // the name we gave the asset within our project is the second parameter
        const tileset = caveTwoMap.addTilesetImage("CaveBackground", "cave2Background");
        // this is a layer within the tiled project
        const backgroundLayer1 = caveTwoMap.createStaticLayer("SecondCaveBackground", tileset, 0, 0);
        backgroundLayer1.setCollisionByProperty({ collision: true });
           const debugGraphics = this.add.graphics().setAlpha(0.75);
     
     
               backgroundLayer1.renderDebug(debugGraphics, {
               tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
       });

       


       
        this.smallCircle = this.physics.add.sprite(centerX - 200, centerY + 245, 'smallCircle').setOrigin(1880, 640);
        this.bigCircle = this.physics.add.sprite(centerX + 100, centerY + 200, 'bigCircle').setOrigin(1880, 640);
        this.bigCircle.setScrollFactor(0, 0);
        this.smallCircle.setScrollFactor(0, 0);

        // instance of player in battle scene
        this.player = new Player(this, centerX - 200, centerY + 245, 'characterWalk').setScale(0.5);
        this.caveMonster = new CaveMonster(this, centerX + 240, centerY + 200, 'monsterSketch');
        playerSpeed = 2;
        this.topLayer = this.add.tileSprite(0, 0, 3760, 1280, 'topLayer').setOrigin(0,0);
        this.spikes = this.add.tileSprite(0,0,3750,1280,'cave2SpikyOverlay').setOrigin(0,0);

           // bounds of the background asset 
           this.cameras.main.setBounds(0, 0, 3760, 1280); 
           // bounds of the canvas 
           this.cameras.main.setViewport(0, 0, 960, 640);
           // this follows the player & zoomed in 
           this.cameras.main.startFollow(this.player).setZoom(.5);


        // this allows us to quickly use up, left, down, right arroy keys
        cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, backgroundLayer1);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    }

    update() {
        this.player.update();
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            this.scene.start('forestScene');
        }

    }


}