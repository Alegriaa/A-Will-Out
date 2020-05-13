class World extends Phaser.Scene {
    constructor() {
        super('worldScene');

    }
    // thought of naming this world scene since it will be the scene
    // where the player walks around in the 'birds eye' view



    preload() {

    }


    create() {
        // temporary background to test player movement
        this.tempBackground = this.add.tileSprite(centerX, centerY, game.config.width, game.config.height, 'background').setScale(1); //set scale for testing scaled background
        // instance of player within world scene
        this.player = new Player(this, centerX, centerY, 'player').setScale(0.4);
        // this allows us to quickly use up, left, down, right arroy keys
        cursors = this.input.keyboard.createCursorKeys();
        // variable for player speed
        playerSpeed = 2.8;

        //camera's boundaries
        this.cameras.main.setBounds(-100, -100, 1500, 1000);
        //camera follows player
        this.cameras.main.startFollow(this.player);

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
    }
}
