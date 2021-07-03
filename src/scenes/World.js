class World extends Phaser.Scene {
    constructor() {
        super('worldScene');

    }

    // resource for creating modular worlds with tilemaps in phaser 3 
    // https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6


    // loading assets used in the world scene
    preload() {
        this.load.image('statueText', './assets/StatueText.png');
        this.load.image('worldBackground', './assets/OverWorld.png');
        this.load.tilemapTiledJSON('map', './assets/TiledWorldMap.json');
        this.load.spritesheet('characterWalk','./assets/characterWalking.png',{frameWidth:50,frameHeight:150,startFrame:0,endFrame:31});
        this.load.image('treeOver', './assets/Canopy.png'); 
    }

    create() {
        // setting up the file map to overlay the world scene space
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("OverWorld", "worldBackground");
        const treeLayer = map.createStaticLayer("Tree", tileset, 0, 0);
        // ensures the player can collide with the tiles we 
        // designated collidable propety in Tiled
        treeLayer.setCollisionByProperty({ collide: true });
       
        
        // instance of player within world scene
        this.player = new Player (this, centerX - 350, centerY - 170, 'characterWalk',0).setScale(0.3);
        // providing collision detection
        this.physics.add.collider(this.player, treeLayer);

        this.sea = this.add.image(960, 640, 'blackout').setScale(2, 2).setAlpha(0);
        this.cave = this.physics.add.sprite(centerX + 620, centerY + 340, 'TempSpoon').setScale(0.3);
        this.cave.alpha = 0;

        this.statue = this.physics.add.sprite(centerX - 300, centerY - 250, 'TempSpoon').setScale(0.3);
        this.statue.setImmovable();


        this.statueText = this.add.tileSprite(175, 200, 0, 0, 'statueText').setScale(.3, .3);
        this.statueText.alpha = 0;
        this.statue.alpha = 0;

        this.treeOverlay = this.add.tileSprite(0,0,3750,1280,'treeOver').setOrigin(0,0);

        // this allows us to quickly use up, left, down, right arroy keys
        cursors = this.input.keyboard.createCursorKeys();
       
        this.boolVar = true;
        this.boolVar2 = true;

        this.sea = this.add.image(960, 640, 'blackout').setScale(2, 2).setAlpha(0);

        // music and sound integration
        // adding walking in flowers sound to scene here
        this.walkingInFlowers = this.sound.add('WalkingInFlowers', {
            volume: 1.5,
            loop: true
        });
        // adding crying sound to scene here
        this.cryingNearCave = this.sound.add('Crying', {
            volume: 1,
            loop: false
        });

        worldMusic = this.sound.add('WorldMusic', { volume: 0.1, loop: true });
       // worldMusic.play();

        // camera work
        // camera's boundaries matching the pixels for the background
        this.cameras.main.setBounds(0, 0, 1200, 800);
        // camera's viewport matching our canvas side.. (we can change this)
        this.cameras.main.setViewport(0, 0, 960, 640);
        // camera follows player & zooms in on the surrounding area. 
        this.cameras.main.startFollow(this.player).setZoom(1.45);


        // transitions to the first cave level after collision
        this.physics.add.collider(this.cave, this.player, (a, b) => {
        this.scene.start('levelOneCave');
        this.walkingInFlowers.stop();
        worldMusic.stop();

    }, null, this);
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

    update() {

        this.player.update();

        // activating the walking in flowers sound when the player
        // moves within this scene
        if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
            this.walkingInFlowers.play();
        } 
        if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
            this.walkingInFlowers.play();
        } 
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.walkingInFlowers.play();
        } 
        if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
            this.walkingInFlowers.play();
        }

        // activates text near statue
        if (this.checkOverlap(this.player, this.statue)) {
            this.statueText.alpha = 1;
        } else {
            this.statueText.alpha = 0;
        }

        // deactivates walking in flowers sound when the player
        // is not moving
        if (!(cursors.up.isDown) && !(cursors.down.isDown) &&
            !(cursors.left.isDown) && !(cursors.right.isDown)) {
            this.walkingInFlowers.stop();
        }

        // activates crying sound effect only if 
        // the player is near the cave 
        if (this.player.body.y > centerX + 100 && this.player.body.x < centerY + 270) {
            this.cryingNearCave.play();
        }
    }
}
