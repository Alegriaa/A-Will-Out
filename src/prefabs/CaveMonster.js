
class CaveMonster extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.isAlive = true;
         scene.physics.add.existing(this);
        // this.create();
       // this.setImmovable(true);
       
    }

    preload(){
        // this.load.spritesheet('walkLeft','./assets/enemy1WalkLeft.png',{frameWidth:150, frameHeight: 200, startFrame: 0, endFrame: 3})
        // this.load.spritesheet('walkRight','./assets/enemy1WalkRight.png',{frameWidth:150,frameHeight:200,startFrame:0,endFrame:3})
    }

    create() {
        // this.scene.anims.create({
        //     key: 'monsterWalkRight',
        //     repeat: -1,
        //     frames: this.scene.anims.generateFrameNumbers('walkRight', { start: 0, end: 3, first: 0 }),
        //     frameRate: 10,
        // })

        // this.scene.anims.create({
        //     key: 'monsterWalkLeft',
        //     repeat: -1,
        //     frames: this.scene.anims.generateFrameNumbers('walkLeft', { start: 0, end: 3, first: 0 }),
        //     frameRate: 10,
        // })



        // this.anims.play('monsterWalkRight');

    }
   
    update() {
       
     

    }
}
