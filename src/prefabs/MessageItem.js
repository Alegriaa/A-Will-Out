class MessageItem extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.textArray = ([]); 

    }

/*
'Your present situation is not your final destination' - Zig Ziegler
"Happiness comes in waves, it'll find you again." - Unknown
*/

    create() {
        var txt = this.scene.make.text({
            x: 500,
            y: 500,
            text: "",
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: '25px Arial',
                fill: 'white',
                wordWrap: { width: 600 }
            }
        });
        
        


    }

    update() {

    }

    itemActivated(){

       
       this.messageArray = ([]);
       this.messageArray.push("Keep going, you can do this.");
       this.messageArray.push("You have what it takes to keep pushing forward.");
       this.messageArray.push("The light is near.");
       this.messageArray.push("You've come a long way, you have what it takes.");
       this.messageArray.push("You're strong enough to get through this.");
       this.messageArray.push("Believe in yourself.");
       this.messageArray.push("You're capable of more than you think.");
       this.messageArray.push("The present situation is not your final destination.");
       this.messageArray.push("Happiness comes in waves, it'll find you again.");
      
       

       this.randomNumber = Math.floor((Math.random() * 10) + 0);

      return this.messageArray[this.randomNumber];
        //this.messageText.setScrollFactor(0,0);


    }

    opacity(){
       
    }


}