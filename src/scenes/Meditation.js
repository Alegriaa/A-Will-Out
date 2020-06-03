class Meditation extends Phaser.Scene {
    constructor() {
        super('meditationScene');

    }
    preload(){
        this.load.image('Meditation', './assets/Meditation.png');
        this.load.image('MeditationTree', './assets/MeditationTree.png');
        this.load.tilemapTiledJSON('meditationMap','./assets/TiledMeditation.json');
    }

    create(){
        const meditationMap = this.make.tilemap({ key: "meditationMap"});
        const tileset = meditationMap.addTilesetImage("Meditation", "Meditation");
        const backgroundLayer = meditationMap.createStaticLayer("Background", tileset, 0, 0);
        backgroundLayer.setCollisionByProperty({ collides: true });








        this.player = new Player(this, centerX - 450, centerY - 40, 'characterWalk',0).setScale(0.4);
        this.tree = this.add.tileSprite(0, 0, 960, 640, 'MeditationTree').setOrigin(0,0);
        this.physics.add.collider(this.player, backgroundLayer);

         // this allows us to quickly use up, left, down, right arroy keys
         cursors = this.input.keyboard.createCursorKeys();
         // variable for player speed
         playerSpeed = 2;
 
 
         //camera's boundaries matching the pixels for the background
         this.cameras.main.setBounds(0, 0, 960, 640);
         //viewport of matching our canvas side.. (we can change this)
         this.cameras.main.setViewport(0, 0, 960, 640);
 
         //this.cameras.main.setZoom(.6)
 
         //camera follows player & zooms in on the surrounding area. 
         this.cameras.main.startFollow(this.player);
         // this.cameras.main.setZoom(0.25);
         // testing
 

        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyD)){
            this.scene.start('endingScene');
        }
        this.player.update();
        }
    }
        
    
