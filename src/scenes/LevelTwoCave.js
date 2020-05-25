class LevelTwoCave extends Phaser.Scene {
    constructor() {
        super('levelTwoCave');

    }
    preload(){
        this.load.image('forestBackground', './assets/Level2Sketch.png');
    }

    create(){
        
        this.forestBackground = this.add.tileSprite(0, 0, 3760, 1280, 'forestBackground').setOrigin(0,0);

        // instance of player in battle scene
        this.player = new Player(this, centerX - 200, centerY + 245, 'player').setScale(0.4);
        this.caveMonster = new CaveMonster(this, centerX + 240, centerY + 200, 'monsterSketch');
        playerSpeed = 2;


         // this allows us to quickly use up, left, down, right arroy keys
         cursors = this.input.keyboard.createCursorKeys();

        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      
    }

    update(){
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

        if(Phaser.Input.Keyboard.JustDown(keyD)){
            this.scene.start('forestScene');
        }

    }
    
    
}