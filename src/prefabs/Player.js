
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.isAlive = true;
        this.isWalking = true;
        scene.physics.add.existing(this);
        this.setImmovable(true);





    }
    create() {


    }

    update() {
        
        this.setVelocity(0);

      
        if (cursors.left.isDown) {
            this.setVelocityX(-100);


        } else if (cursors.right.isDown) {
            this.setVelocityX(100);
        }

      
        if (cursors.up.isDown) {
            this.setVelocityY(-100);
        } else if (cursors.down.isDown) {
            this.setVelocityY(100);
        }




    }
}