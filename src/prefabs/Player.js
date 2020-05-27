
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.isAlive = true;
        this.isWalking = false;
        scene.physics.add.existing(this);
        this.setImmovable(true);
       

    }
    create() {

    }

    update() {
    
        this.body.setVelocity(0);
        // player moves left
        if (cursors.left.isDown) {
            this.body.setVelocityX(-100);

        } else if (cursors.right.isDown) {
            this.body.setVelocityX(100);
        }

        // player moves right 
        if (cursors.up.isDown) {
            this.body.setVelocityY(-100);
        } else if (cursors.down.isDown) {
            this.body.setVelocityY(100);
        }

    }
}