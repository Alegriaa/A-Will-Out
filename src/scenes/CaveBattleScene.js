class CaveBattleScene extends Phaser.Scene {
    constructor() {
        super('caveBattleScene');

    }

    create(){
        let menuConfig = {
            fontFamily: 'Impact',
            fontSize: '28px',

            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
            
        }

        this.caveBackground = this.add.tileSprite(0, 0, 940, 640, 'blackout').setOrigin(0,0);
        this.add.text(centerX, centerY, 'Battle Scene with Text Functionality', menuConfig).setOrigin(0.5);
        this.player = new Player(this, centerX - 200, centerY + 200, 'player').setScale(1.4);
    }

    update(){

    
    }
}