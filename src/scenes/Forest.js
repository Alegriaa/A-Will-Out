class Forest extends Phaser.Scene {
    constructor() {
        super('forestScene');

    }
    preload(){
        this.load.image('worldBackground', './assets/OverWorld.png');

    }

    create(){
        this.background = this.add.tileSprite(0, 0, 1200, 800, 'worldBackground').setOrigin(0,0);

        this.player = new Player(this, centerX - 300, centerY - 165, 'player').setScale(0.3);

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
         this.cameras.main.startFollow(this.player).setZoom(1.1);
         // this.cameras.main.setZoom(0.25);
         // testing
 

        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            this.scene.start('meditationScene');
        }


        this.player.update();

    }
}