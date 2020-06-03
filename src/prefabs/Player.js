
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.isAlive = true;
        this.isWalking = true;
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.create(); //You need this to make it accessible 
        this.check = 'idle';
    }

    //These have to have this.create(); so it's accessible for all the different scenes
    //this.check is specifically if you're checking for a key being pressed and want the animation to stop at a specific time like I did

    preload() {
        //Loads the sprite sheet and MAKE SURE YOU LOAD IT IN THE WORLD, LEVEL 1, ECT FILES AS WELL OR IT WONT WORK (Examples of how I did it for the player character are in World.js and LevelOneCave.js)
        this.load.spritesheet('characterWalk', './assets/characterWalking.png', { frameWidth: 50, frameHeight: 150, startFrame: 0, endFrame: 15 })
    }

    create() {

        //These create the animations
        this.scene.anims.create({
            key: 'idle',
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers('characterWalk', { start: 0, end: 0, first: 0 }),
            frameRate: 8,
        })

        this.scene.anims.create({
            key: 'walkRight',
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers('characterWalk', { start: 0, end: 3, first: 0 }),//Start and end is for what frames of the sprite sheet it is, 0 is the first one, 1 is second ect. like an array
            frameRate: 8,
        });


        this.scene.anims.create({
            key: 'walkLeft',
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers('characterWalk', { start: 4, end: 7, first: 4 }),//4-7 is the left walking animation
            frameRate: 8,
        });

        this.scene.anims.create({
            key: 'walkDown',
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers('characterWalk', { start: 8, end: 11, first: 8 }),//8-11 is the down walking animation, you get the point lol
            frameRate: 8,
        });

        this.scene.anims.create({
            key: 'walkUp',
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers('characterWalk', { start: 12, end: 15, first: 12 }),
            frameRate: 8,
        });

    }

    update() {

        this.setVelocity(0);


        //Player moves left

        if (cursors.left.isDown) {
            this.setVelocityX(-100);

            //These check if you're pressing a button and if you are then that animation plays, can't have it as just if cursor.left.isDown since it resets the animation for as long as the player holds it

            if (this.check != 'walkLeft') {
                this.check = 'walkLeft';
                this.anims.play('walkLeft');
            }

            //Player moves right
        } else if (cursors.right.isDown) {
            this.setVelocityX(100);
            if (this.check != 'walkRight') {
                this.check = 'walkRight';
                this.anims.play('walkRight');
            }
        }


        // player moves up and down
        else if (cursors.up.isDown) {


            if (cursors.up.isDown) {
                this.setVelocityY(-100);
                if (this.check != 'walkUp') {
                    this.check = 'walkUp';
                    this.anims.play('walkUp');
                }

            } else if (cursors.down.isDown) {
                this.setVelocityY(100);
                if (this.check != 'walkDown') {
                    this.check = 'walkDown';
                    this.anims.play('walkDown');
                }

            } else {
                //Idle animation used to replace moving animations when player is checked as not pressing a button
                if (this.check != 'idle') {
                    this.check = 'idle';
                    this.anims.play('idle');
                }
            }

        }
    }
}


