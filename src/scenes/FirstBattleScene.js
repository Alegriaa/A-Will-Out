class FirstBattleScene extends Phaser.Scene {
    constructor() {
        super('firstBattleScene');

    }

    preload() {
        this.load.image('caveBackground', './assets/CaveSketchOne.png');
        this.load.image('monsterSketch', './assets/Monster.png');


    }

    create() {

        this.caveBackground = this.add.tileSprite(0, 0, 940, 640, 'caveBackground').setOrigin(0,0);

        // instance of player in battle scene
        this.player = new Player(this, centerX - 200, centerY + 90, 'player').setScale(0.7);
        this.caveMonster = new CaveMonster(this, centerX + 250, centerY, 'monsterSketch');
        // set of cursors to use
        cursors = this.input.keyboard.createCursorKeys();
        // we can change the player speed in this scene here
        playerSpeed = 2;

        this.spoonCount = this.game.settings.currentSpoons;//counter for array
        this.starter = 1;//counter for array
        this.spoonArray = ([]); // create spoon array
        this.xValue = centerX - 350; //x value for all of the spoon location spawns
        this.yValue = 50;


        //a while loop to create the necessary amount of spoons according to the current spoons game settings number
        while (this.starter <= this.spoonCount) {
            this.spoon1 = new Spoon(this, this.xValue, this.yValue, 'TempSpoon').setScale(.2);
            this.spoon1.setScrollFactor(0, 0);
            this.spoonArray.push(this.spoon1);
            this.xValue += 40;
            this.starter++;
        }
        this.boolVar = true;
        this.boolVar2 = true;

        this.sea = this.add.image(960, 640, 'blackout').setScale(2, 2).setAlpha(0);


    }

    update() {

        // player moves left
        if (cursors.left.isDown) {
            this.player.body.x -= playerSpeed;
        }
        // player moves right 
        if (cursors.right.isDown) {
            this.player.body.x += playerSpeed;
        }

    }

    takeDamage() {
        this.temp = this.game.settings.currentSpoons - 1; //minus one bc stupid off by one error ew
        this.spoonArray[this.temp].alpha = 0; //alpha set to 0 is invis
        game.settings.currentSpoons -= 1;



        this.tweens.add({ //!!!!!!!! -------> this will eventually need to be changed into a switch statement
            targets: this.sea,
            alphaTopLeft: { value: .5, duration: 500, ease: 'Power1' },
            alphaTopRight: { value: .5, duration: 500, ease: 'Power1' },
            alphaBottomRight: { value: .5, duration: 500, ease: 'Power1' },
            alphaBottomLeft: { value: .5, duration: 500, ease: 'Power1' },//,delay: 5000 },

            yoyo: true,
            //loop: -1   
        });


    }

    restoreDamage() {

        this.temp = this.game.settings.currentSpoons; //no minus one, i dont understand math
        this.spoonArray[this.temp].alpha = 1; //alpha set to 1 is visible
        game.settings.currentSpoons += 1;

    }

}