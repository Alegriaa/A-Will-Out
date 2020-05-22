class CaveScene extends Phaser.Scene {
    constructor() {
        super('caveScene');

    }

    preload() {
        this.load.image('caveBackground', './assets/Level1Sketch.png');
        this.load.image('monsterSketch', './assets/Monster.png');
        this.load.tilemapTiledJSON('map','./assets/TiledCave.json');


    }

    create() {

        const map = this.make.tilemap({ key: "map"});
        const tileset = map.addTilesetImage("Level1Sketch", "caveBackground");
        const backgroundLayer = map.createStaticLayer("Background", tileset, 0, 0);
        
       backgroundLayer.setCollisionByProperty({ collides: true });
       //treeLayer.setCollisionBetween(0, 244);


       const debugGraphics = this.add.graphics().setAlpha(0.75);
       backgroundLayer.renderDebug(debugGraphics, {
         tileColor: null, // Color of non-colliding tiles
         collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
         faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
       });

       // this.caveBackground = this.add.tileSprite(0, 0, 3760, 1280, 'caveBackground').setOrigin(0,0);

        // instance of player in battle scene
        this.player = this.physics.add.sprite( centerX - 300, centerY - 165, 'player').setScale(0.4);
        this.caveMonster = new CaveMonster(this, centerX + 240, centerY + 200, 'monsterSketch');
        this.monsterDetection = this.physics.add.sprite(centerX + 100, centerY + 200, 'monsterSketch');
        this.monsterDetection.alpha = 0;

        this.physics.add.collider(this.player, backgroundLayer);
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

        this.cameras.main.setBounds(0, 0, 3760, 1280);
        this.cameras.main.setViewport(0, 0, 960, 640);
        this.cameras.main.startFollow(this.player).setZoom(1.45);



    }

    update() {


        this.player.body.setVelocity(0);
        // player moves left
        if (cursors.left.isDown) {
            this.player.body.setVelocityX(-100);

        } else if (cursors.right.isDown) {
            this.player.body.setVelocityX(100);
        }

        // player moves right 
        if (cursors.up.isDown) {
            this.player.body.setVelocityY(-100);
        } else if (cursors.down.isDown) {
            this.player.body.setVelocityY(100);
        }

        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            this.scene.start('secondWorldScene');
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