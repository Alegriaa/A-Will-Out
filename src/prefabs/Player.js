
class Player extends Phaser.Physics.Arcade.Sprite{     // use phasers sprite
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);             
        scene.physics.add.existing(this); 
    }
    create(){

        
    }
   
    update() {


    }
}