class LevelOneCave extends Phaser.Scene {
    
    constructor() {
        super('levelOneCave');

    }
  

    preload() {
        var url;
  
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpathfollowerplugin.min.js';
        this.load.plugin('rexpathfollowerplugin', url, true);
        
        this.load.image('caveBackground', './assets/LevelOne.png');
        this.load.image('monsterSketch', './assets/Monster.png');
        // name of the tiled project
        this.load.tilemapTiledJSON('caveMap','./assets/TiledCaveMap.json');
        //this.load.plugin('rexmovetoplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmovetoplugin.min.js', true);


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
        this.player = this.physics.add.sprite( centerX - 250, centerY + 50, 'player').setScale(0.4);
        //this.player = new Player(this, 3500, 1100, 'player').setScale(0.4);

        // instance of monster in cave scene 1 
        //game.physics.arcade.enable(this.player);

       // const body = this.player.body;
        
        this.levelTwoDetection = this.physics.add.sprite(3603, 1260, 'TempSpoon').setDisplaySize(300, 30);
        
        this.levelTwoDetection.alpha = 0;
        var path = this.add.path(800, 480)
        .lineTo(100, 480)
        .lineTo(800, 480)
        .lineTo(100, 480)
        .lineTo(800, 480);
        this.monsterOne = new CaveMonster(this, 700, 452, 'monsterSketch').setScale(0.6);
        this.monsterOne.pathFollower = 
        this.plugins.get('rexpathfollowerplugin').add(this.monsterOne, {
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
            this.scene.start('caveBattleScene');
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
       
               
  // player moves left
  if (cursors.left.isDown) {
    this.player.body.x -= playerSpeed;
}
// player moves right 
if (cursors.right.isDown) {

    this.player.body.x += playerSpeed;
}
// player moves up
if (cursors.up.isDown) {
    this.player.body.y -= playerSpeed;
}
// player moves down
if (cursors.down.isDown) {
    this.player.body.y += playerSpeed;
}



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