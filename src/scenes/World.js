class World extends Phaser.Scene {
    constructor() {
        super('worldScene');

    }
    // thought of naming this world scene since it will be the scene
    // where the player walks around in the 'birds eye' view
    // https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6





    preload() {
        this.load.image('statueText', './assets/StatueText.png');
        this.load.image('worldBackground', './assets/OverWorld.png');
        this.load.tilemapTiledJSON('map', './assets/TiledWorldMap.json');


    }


    create() {
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("OverWorld", "worldBackground");
        const backgroundLayer = map.createStaticLayer("Background", tileset, 0, 0);
        const treeLayer = map.createStaticLayer("Tree", tileset, 0, 0);
        const colliderLayer = map.createStaticLayer("Collider", tileset, 0, 0);
       treeLayer.setCollisionByProperty({ collides: true });
       //treeLayer.setCollisionBetween(0, 244);


       //const debugGraphics = this.add.graphics().setAlpha(0.75);
       //treeLayer.renderDebug(debugGraphics, {
         //tileColor: null, // Color of non-colliding tiles
        // collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
         //faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      // });


        
        


        // temporary background to test player movement
       // this.tempBackground = this.add.tileSprite(0, 0, 1200, 800, 'worldBackground').setOrigin(0, 0);//set scale for testing scaled background
        // instance of player within world scene
        this.player = this.physics.add.sprite( centerX - 300, centerY - 165, 'player').setScale(0.3);
        this.player.isWalking = false;
        this.physics.add.collider(this.player, treeLayer);
        
        // temp collision detection square
        // i'm going to change the location of this to match the location of the cave in the background
        this.cave = this.physics.add.sprite(centerX + 620, centerY + 340, 'TempSpoon').setScale(0.3);

        this.statue = this.physics.add.sprite(centerX - 300, centerY - 250, 'TempSpoon').setScale(0.3);
        this.statueText = this.add.tileSprite(175, 200, 0, 0, 'statueText').setScale(.3,.3);//set scale for testing scaled background
        this.statueText.alpha = 0;
        this.statue.alpha = 0;

        this.statue.setImmovable();

        this.cave.alpha = 0;


        // this starts the battle scene once the player touches the cave
        this.physics.add.collider(this.cave, this.player, (a, b) => {
            this.scene.start('levelOneCave');
            this.walkingInFlowers.stop();

        }, null, this);

    


        // this allows us to quickly use up, left, down, right arroy keys
        cursors = this.input.keyboard.createCursorKeys();
        // variable for player speed
        playerSpeed = 2;


        //camera's boundaries matching the pixels for the background
        this.cameras.main.setBounds(0, 0, 1200, 800);
        //viewport of matching our canvas side.. (we can change this)
        this.cameras.main.setViewport(0, 0, 960, 640);

        //this.cameras.main.setZoom(.6)

        //camera follows player & zooms in on the surrounding area. 
        this.cameras.main.startFollow(this.player).setZoom(1.45);
        // this.cameras.main.setZoom(0.25);
        // testing


        this.spoonCount = this.game.settings.currentSpoons;//counter for array
        this.starter = 1;//counter for array
        this.spoonArray = ([]); // create spoon array
        this.xValue = centerX - 280; //x value for all of the spoon location spawns
        this.yValue = centerY - 200;


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

        // adding walking in flowers sound to scene
        this.walkingInFlowers = this.sound.add('WalkingInFlowers', {
            volume: 1.1,
            loop: true
        });
        // adding crying sound to scene
        this.cryingNearCave = this.sound.add('Crying', {
            volume: 1,
            loop: false
        });

        this.sea = this.add.image(960, 640, 'blackout').setScale(2,2).setAlpha(0);




    }


    update() {

        this.player.body.setVelocity(0);


        // player moves left
        if (cursors.left.isDown) {

            this.player.body.setVelocityX(-100);

        }else if (cursors.right.isDown) {
            this.player.body.setVelocityX(100);
          }

        // player moves right 
        if (cursors.up.isDown) {
            this.player.body.setVelocityY(-100);
          } else if (cursors.down.isDown) {
            this.player.body.setVelocityY(100);
          }
        // player moves down
        
        // plays walking through flowers sounds if player is moving.
        if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
            this.walkingInFlowers.play();

        } else if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
            this.walkingInFlowers.play();
        } else if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.walkingInFlowers.play();
        } else if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
            this.walkingInFlowers.play();
        }


        if(this.checkOverlap(this.player, this.statue)){
            this.statueText.alpha = 1;
            
        } else {
            this.statueText.alpha = 0;
        }

    


        // stops sounds if player is no longer moving
        if (!(cursors.up.isDown) && !(cursors.down.isDown) &&
            !(cursors.left.isDown) && !(cursors.right.isDown)) {
            this.walkingInFlowers.stop();
        }
        // centerX + 620, centerY + 340

        if (this.player.body.y > centerX + 100 && this.player.body.x < centerY + 270) {
            this.cryingNearCave.play();
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


    checkOverlap(spriteA, spriteB) {

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
    
        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);

    
    }








}
