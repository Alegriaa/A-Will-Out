class LevelTwoCave extends Phaser.Scene {
    constructor() {
        super('levelTwoCave');

    }
    preload() {
        this.load.image('forestBackground', './assets/Level2Sketch.png');
        this.load.image('caveTwoBackground', './assets/CaveLevelTwo.png');
        this.load.image('monsterSketch', './assets/Monster.png');
        this.load.tilemapTiledJSON('caveTwoMap', './assets/TiledCaveTwo.json');
        this.load.image('smallCircle', './assets/smallLightCircle.png');
        this.load.image('bigCircle', './assets/bigLightCircle.png');
        this.load.image('topLayer', './assets/caveTwoTopLayer.png');
        this.load.image('cave2Background', './assets/level2Graphics.png')
        this.load.spritesheet('characterWalk', './assets/characterWalking.png', { frameWidth: 50, frameHeight: 150, startFrame: 0, endFrame: 31 });
        this.load.image('cave2SpikyOverlay', './assets/psCaveTwoOverlay.png');
        this.load.image('shield', './assets/Shield.png');
        this.load.image('spoonItem', './assets/Spoon.png');
        this.load.image('hopeItem', './assets/Hope.png')
    }

    create() {
        // we need to make a unique key for this scene to access
        const caveTwoMap = this.make.tilemap({ key: "caveTwoMap" });

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
        this.player = new Player(this, centerX - 200, centerY + 245, 'characterWalk').setScale(0.5);
        this.caveMonster = new CaveMonster(this, centerX + 240, centerY + 200, 'monsterSketch');

        //create the shield in the cave
        this.shield = new Shield(this, centerX - 200, centerY + 100, 'shield').setScale(.5);
        //create spoon in cave
        this.spoonItem = new Spoon(this, centerX - 150, centerY + 200, 'spoonItem').setScale(.5);
        //create Message Item 

        this.messageItem = new MessageItem(this, centerX - 150, centerY + 400, 'hopeItem').setScale(.25);
        //non movable shield and spoon
        this.shield.setImmovable();
        this.spoonItem.setImmovable();
        this.messageItem.setImmovable();

        playerSpeed = 2;
        this.topLayer = this.add.tileSprite(0, 0, 3760, 1280, 'topLayer').setOrigin(0, 0);
        this.spikes = this.add.tileSprite(0, 0, 3750, 1280, 'cave2SpikyOverlay').setOrigin(0, 0);

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
        this.physics.add.collider(this.player, this.spoonItem);
        this.physics.add.collider(this.player, this.mess);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //add a function call for the player when a shield is collected
        this.physics.add.collider(this.shield, this.player, (a, b) => {

            if (game.settings.shield) {


            } else {

                this.addShield();
                a.destroy();
            }

        }, null, this);

        //function call for the player when a spoon is collected
        this.physics.add.collider(this.spoonItem, this.player, (a, b) => {


            if (game.settings.currentSpoons < 5) {

                this.restoreDamage();
                a.destroy();

            }





        }, null, this);

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


        //create spoon UI
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


    }

    update() {
        this.player.update();
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            this.scene.start('forestScene');
        }

    }
    //add the shield to the player options
    addShield() {

        game.settings.shield = true;
        console.log(game.settings.shield);



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

    changeMessageOpacity(){
        if(this.title.alpha >= .1){

            this.title.alpha = this.title.alpha - .1;
            this.lampClock = this.time.delayedCall(1000, () => { 
                this.changeMessageOpacity();
             }, null, this);
        }
        
    }


}