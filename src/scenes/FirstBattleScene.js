class FirstBattleScene extends Phaser.Scene {
    constructor() {
        super('firstBattleScene');

    }

    create(){
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.tempBackground = this.add.tileSprite(centerX, centerY, game.config.width, game.config.height, 'background').setScale(1);
        

        this.player = new Player(this, centerX - 200, centerY, 'player').setScale(0.4);
        cursors = this.input.keyboard.createCursorKeys();

        playerSpeed = 2.8;

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

    }

}