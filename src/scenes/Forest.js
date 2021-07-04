class Forest extends Phaser.Scene {
    constructor() {
        super('forestScene');

    }

    // loading assets needed in the forest scene here 
    preload() {
        this.load.image('longOverworld', './assets/LongOverworld.png');
        this.load.image('forestOverWorld', './assets/ForestOverWorld.png');
        this.load.audio('ForestMeditationMusic', './assets/ForestMeditationMusic.wav');
        this.load.spritesheet('characterWalk', './assets/characterWalking.png', { frameWidth: 50, frameHeight: 150, startFrame: 0, endFrame: 31 })
        this.load.tilemapTiledJSON('longWorldMap', './assets/TiledLongOverWorld.json');
    }

    create() {

        // integrating the tiled map for this scene
        const forestMap = this.make.tilemap({ key: "longWorldMap" });
        // first name is the name of the tilesheet used is the first parameter,
        // the name we gave the asset within our project is the second parameter
        const tileset = forestMap.addTilesetImage("LongOverworld", "longOverworld");
        // this is a layer within the tiled project
        const backgroundLayer1 = forestMap.createStaticLayer("Background", tileset, 0, 0);
        backgroundLayer1.setCollisionByProperty({ collide: true });
        this.overlay = this.add.tileSprite(0, 0, 1200, 640, 'forestOverWorld').setOrigin(0,0);


        // creating player instance 
        this.player = new Player(this, 80, 320, 'characterWalk').setScale(0.4);
        // adding collision detection
        this.physics.add.collider(this.player, backgroundLayer1);

        // this allows us to quickly use up, left, down, right arroy keys
        cursors = this.input.keyboard.createCursorKeys();


        // camera work 
        // camera's boundaries matching the pixels for the background
        this.cameras.main.setBounds(0, 0, 1200, 800);
        // viewport of matching our canvas side.. (we can change this)
        this.cameras.main.setViewport(0, 0, 960, 640);
        // camera follows player & zooms in on the surrounding area. 
        this.cameras.main.startFollow(this.player).setZoom(1.45);

        // this is where we activate the scene transition to
        // the meditation scene
        this.meditationSceneDetection = this.physics.add.sprite(1195, 300, 'TempSpoon').setDisplaySize(30, 100);
        this.meditationSceneDetection.alpha = 0;
        // trigger to start meditation scene
        this.physics.add.collider(this.meditationSceneDetection, this.player, (a, b) => {
            this.scene.start('meditationScene');
            this.walkingInFlowers.stop();
        }, null, this);

        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


        // music and sound effects integration
        forestMeditationMusic = this.sound.add('ForestMeditationMusic', {
            volume: 0.4,
            loop: true
        });
        forestMeditationMusic.play();
        this.walkingInFlowers = this.sound.add('WalkingInFlowers', {
            volume: 1.9,
            loop: true
        });
    }

    update() {

        // updating the player object 
        this.player.update();

        // for developers to skip through scenes
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            this.scene.start('meditationScene');
            this.walkingInFlowers.stop();
        }
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
        // deactivates walking in flowers sound when the player
        // is not moving
        if (!(cursors.up.isDown) && !(cursors.down.isDown) &&
            !(cursors.left.isDown) && !(cursors.right.isDown)) {
            this.walkingInFlowers.stop();
        }
    }
}