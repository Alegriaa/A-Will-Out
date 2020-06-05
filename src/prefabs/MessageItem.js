class MessageItem extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

    }
    create() {

    }

    update() {

    }

    itemActivated(xPos, yPos){


       this.messageArray = ([]);
       this.messageArray.push("Keep going, you can do this.");
       this.messageArray.push("you have what it takes to keep pushing forward");
       this.messageArray.push("2");
       this.messageArray.push("3");
       this.messageArray.push("4");
       this.messageArray.push("5");
       this.messageArray.push("6");
       this.messageArray.push("7");
       this.messageArray.push("8");
       this.messageArray.push("9");
       

       this.randomNumber = Math.floor((Math.random() * 10) + 0);
        var txt = this.scene.make.text({
            x: 500,
            y: 500,
            text: this.messageArray[this.randomNumber],
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: '25px Arial',
                fill: 'white',
                wordWrap: { width: 600 }
            }
        });
        txt.setScrollFactor(0,0);
        //this.messageText.setScrollFactor(0,0);

    }


}