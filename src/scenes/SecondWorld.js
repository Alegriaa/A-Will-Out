class SecondWorld extends Phaser.Scene {
    constructor() {
        super('secondWorldScene');

    }

    create(){
        this.tempBackground = this.add.tileSprite(0, 0, 1200, 800, 'worldBackground').setOrigin(0, 0);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyD)){
            this.scene.start('forestScene');
        }
    }
}