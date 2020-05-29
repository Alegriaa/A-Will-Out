
class CaveMonster extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.isAlive = true;
        scene.physics.add.existing(this);
       // this.setImmovable(true);
       
    }
    create() {
      

    }

    update() {
       
     

    }
}
