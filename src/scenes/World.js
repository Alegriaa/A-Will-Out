class World extends Phaser.Scene {
    constructor() {
        super('worldScene');
    }

    preload() {

    }


    create() {

        this.tempBackground = this.add.tileSprite(0,0, 1940, 1280,'background').setOrigin(0,0);
        this.player = new Player(this, centerX, centerY, 'player');
        


    }

    update() {

    }
}
