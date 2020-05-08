class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {


    }

    create() {
        let menuConfig = {
            fontFamily: 'Impact', // changed the font
            fontSize: '28px',

            color: '#ff9c97',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0

        }
  




        this.add.text(centerX, centerY, 'Final Game Menu Scene', menuConfig).setOrigin(0.5);
     



    }

    update() {

            
        }
    }


