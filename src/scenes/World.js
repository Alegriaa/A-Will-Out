class World extends Phaser.Scene {
    constructor() {
        super('worldScene');

    }
    // thought of naming this world scene since it will be the scene
    // where the player walks around in the 'birds eye' view



    preload() {


    }


    create() {

        
        // temporary background to test player movement
        this.tempBackground = this.add.tileSprite(0, 0, 1200, 800, 'worldBackground').setOrigin(0,0);//set scale for testing scaled background
        // instance of player within world scene
        this.player = new Player(this, centerX, centerY, 'player').setScale(0.1);
        // temp collision detection square
        // i'm going to change the location of this to match the location of the cave in the background
        this.cave = this.physics.add.sprite(centerX + 620, centerY + 340, 'TempSpoon').setScale(0.3);
      

        // this starts the battle scene once the player touches the cave
        this.physics.add.collider(this.cave, this.player, (a, b) => {
            this.scene.start('firstBattleScene');

        }, null, this);


        // this allows us to quickly use up, left, down, right arroy keys
        cursors = this.input.keyboard.createCursorKeys();
        // variable for player speed
        playerSpeed = 2;

        const viewportW = game.config.width/2;
        const viewportH = game.config.height/2;

        //camera's boundaries
        this.cameras.main.setBounds(0, 0, 1200, 800);
       // this.cameras.main.setViewport(viewportH - 500, viewportW - 350, 1200, 800);
         this.cameras.main.setViewport(viewportH, viewportW - 300, 350, 350);

        //camera follows player
        this.cameras.main.startFollow(this.player).setZoom(1.2);
       // this.cameras.main.setZoom(0.25);



        this.spoonCount = this.game.settings.currentSpoons;//counter for array
        this.starter = 1;//counter for array
        this.spoonArray = ([]); // create spoon array
        this.xValue = centerX - 400; //x value for all of the spoon location spawns


        //a while loop to create the necessary amount of spoons according to the current spoons game settings number
        while (this.starter <= this.spoonCount) {
            this.spoon1 = new Spoon(this, this.xValue, centerY - 300, 'TempSpoon').setScale(.5);
            this.spoon1.setScrollFactor(0, 0);
            this.spoonArray.push(this.spoon1);
            this.xValue += 100;
            this.starter++;
        }
        this.boolVar = true;
        this.boolVar2 = true;
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
        // player moves up
        if (cursors.up.isDown) {
            this.player.body.y -= playerSpeed;
        }
        // player moves down
        if (cursors.down.isDown) {
            this.player.body.y += playerSpeed;
        }
    }



    takeDamage() {
        this.temp = this.game.settings.currentSpoons - 1; //minus one bc stupid off by one error ew
        this.spoonArray[this.temp].alpha = 0; //alpha set to 0 is invis
        game.settings.currentSpoons -= 1;

    }

    restoreDamage() {

        this.temp = this.game.settings.currentSpoons; //no minus one, i dont understand math
        this.spoonArray[this.temp].alpha = 1; //alpha set to 1 is visible
        game.settings.currentSpoons += 1;

    }







}
