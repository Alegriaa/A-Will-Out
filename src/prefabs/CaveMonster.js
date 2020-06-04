
class CaveMonster extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.isAlive = true;
        this.currentAnimation = "";
        // scene.physics.add.existing(this);
        // this.create();
       // this.setImmovable(true);
       
    }

    create() {
       

    }
   
    update() {
       
     

    }

    //CHECKS IF ANIMATION IS ALREADY PLAYING SO IT DOESNT JUST PLAY FRAME 1 OVER AND OVER AGAINs
    animate(animation) {
        if (animation == 'fastMonsterWalkRight') {
            if (this.currentAnimation != animation) {
                this.anims.play('fastMonsterWalkRight');
                this.currentAnimation = 'fastMonsterWalkRight';
            }
        } else if (animation == 'fastMonsterWalkLeft') {
            if (this.currentAnimation != animation) {
                this.anims.play('fastMonsterWalkLeft');
                this.currentAnimation = 'fastMonsterWalkLeft';
            }
        }
        else if (animation == 'monsterWalkRight'){
            if (this.currentAnimation != animation) {
                this.anims.play('monsterWalkRight');
                this.currentAnimation = 'monsterWalkRight';
            }
        }else if (animation == 'monsterWalkLeft'){
            if (this.currentAnimation != animation) {
                this.anims.play('monsterWalkLeft');
                this.currentAnimation = 'monsterWalkLeft';
            }
        }else if (animation == 'monsterFlyRight'){
            if (this.currentAnimation != animation) {
                this.anims.play('monsterFlyRight');
                this.currentAnimation = 'monsterFlyRight';
            }
        }
        else if (animation == 'monsterFlyLeft'){
            if (this.currentAnimation != animation) {
                this.anims.play('monsterFlyLeft');
                this.currentAnimation = 'monsterFlyLeft';
            }
        }
    }
}
