class CreditScene extends Phaser.Scene {
    constructor() {
        super('creditScene');

    }
    preload(){
        this.load.image('credits', './assets/Credits.png');
    }

    create(){
        this.credits = this.add.tileSprite(0, 0, 960, 640, 'credits').setOrigin(0,0);

    }

        
    

    update(){
       
        }
    }
        
    
