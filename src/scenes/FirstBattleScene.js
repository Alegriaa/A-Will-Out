class FirstBattleScene extends Phaser.Scene {
    constructor() {
        super('firstBattleScene');

    }

    create() {
        // temporary background
        this.tempBackground = this.add.tileSprite(centerX, centerY, game.config.width, game.config.height, 'background').setScale(1);

        // instance of player in battle scene
        this.player = new Player(this, centerX - 200, centerY + 90, 'player').setScale(0.2);
        this.caveMonster = new CaveMonster(this, centerX + 250, centerY, 'monsterSketch');
        // set of cursors to use
        cursors = this.input.keyboard.createCursorKeys();
        // we can change the player speed in this scene here
        playerSpeed = 2.8;

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

    }

}