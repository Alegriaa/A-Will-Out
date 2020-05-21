class SecondWorld extends Phaser.Scene {
    constructor() {
        super('secondWorldScene');

    }

    create(){
        this.tempBackground = this.add.tileSprite(0, 0, 1200, 800, 'worldBackground').setOrigin(0, 0);

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
         this.cameras.main.startFollow(this.player).setZoom(1.45);
         // this.cameras.main.setZoom(0.25);
         // testing
 

        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyD)){
            this.scene.start('forestScene');
        }

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
        
    }
}