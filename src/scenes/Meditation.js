class Meditation extends Phaser.Scene {
    constructor() {
        super('meditationScene');

    }
    preload(){
        this.load.image('Meditation', './assets/Meditation.png');
        this.load.image('MeditationTree', './assets/MeditationTree.png');
        this.load.image('ShadowSelf', './assets/ShadowLeftSmallSprite.png');
        this.load.spritesheet('characterWalk', './assets/characterWalking.png', { frameWidth: 50, frameHeight: 150, startFrame: 0, endFrame: 31 })
        this.load.tilemapTiledJSON('meditationMap','./assets/TiledMeditation.json');
    }

    create(){
        const meditationMap = this.make.tilemap({ key: "meditationMap"});
        const tileset = meditationMap.addTilesetImage("Meditation", "Meditation");
        const backgroundLayer = meditationMap.createStaticLayer("Background", tileset, 0, 0);
        backgroundLayer.setCollisionByProperty({ collides: true });








        this.player = new Player(this, centerX - 450, centerY - 40, 'characterWalk',0).setScale(0.4);
        this.shadowSelf = this.add.sprite(centerX + 100, centerY + 50, 'ShadowSelf').setScale(0.4);
        this.detectionArea = this.physics.add.sprite(centerX + 100, centerY + 50, 'TempSpoon');
        this.detectionArea.alpha = 0;
        this.tree = this.add.tileSprite(0, 0, 960, 640, 'MeditationTree').setOrigin(0,0);
        this.physics.add.collider(this.player, backgroundLayer);

        this.physics.add.collider(this.detectionArea, this.player, (a, b) => {
            this.scene.start('endingSce');
        }, null, this);


         // this allows us to quickly use up, left, down, right arroy keys
         cursors = this.input.keyboard.createCursorKeys();
         // variable for player speed
 
 
         //camera's boundaries matching the pixels for the background
         this.cameras.main.setBounds(0, 0, 960, 640);
         //viewport of matching our canvas side.. (we can change this)
         this.cameras.main.setViewport(0, 0, 960, 640);
 
         //this.cameras.main.setZoom(.6)
 
       
         //camera follows player & zooms in on the surrounding area. 
         this.cameras.main.startFollow(this.player).setZoom(1.45);
         // this.cameras.main.setZoom(0.25);

        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.walkingInFlowers = this.sound.add('WalkingInFlowers', {
            volume: 1.9,
            loop: true
        });

    }

        
    

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyD)){
            this.scene.start('endingScene');
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
            this.walkingInFlowers.play();

        } else if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
            this.walkingInFlowers.play();
        } else if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.walkingInFlowers.play();
        } else if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
            this.walkingInFlowers.play();
        }

        if (!(cursors.up.isDown) && !(cursors.down.isDown) &&
            !(cursors.left.isDown) && !(cursors.right.isDown)) {
            this.walkingInFlowers.stop();
        }

        this.player.update();
        }
    }
        
    
