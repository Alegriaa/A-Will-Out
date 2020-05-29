
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
        // this.body.setVelocity(0);
        // if(this.x < 1000 && monsterMoving){
        //     this.body.setVelocityX(-100);
        //     monsterMoving = true;
        // } 
        // if(this.x == 90){
        //     this.body.setVelocityX(0);
        //     monsterMoving = false;

        // } 
       
        //  if (this.x < 100 && !monsterMoving) {
        //     this.body.setVelocityX(100);
        // }
        
     

    }
}
