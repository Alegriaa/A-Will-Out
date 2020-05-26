class EndingScene extends Phaser.Scene {
    constructor() {
        super("endingScene");
    }

    preload() {

        // getting these ready for the world scene
        


    }

    create() {
        let menuConfig = {
            fontFamily: 'Impact',
            fontSize: '28px',

            color: '#ff9c97',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
            
        }
        
        this.add.text(centerX, centerY - 300, 'Final Game Ending Scene', menuConfig).setOrigin(0.5);

        //the name for the monster 
        var monsterText = this.add.text(100, 150, 'Inner Self:', { fontFamily: 'Arial', fontSize: 32, color: '#00ff00' }); 
        //the name for the player
        this.playerText = this.add.text(100, 400, 'You:', { fontFamily: 'Arial', fontSize: 32, color: '#00ff00' });
        //the monster text
        this.monsterDialogue = this.add.text(200, 200, 'You\'ve come a long way', { fontFamily: 'Arial', fontSize: 32, color: '#00ff00' });
        //the text telling the character how to continue
        this.continueText = this.add.text(550, 500, 'Press W to continue', { fontFamily: 'Arial', fontSize: 32, color: '#00ff00' });

        //key declarations
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        cursors = this.input.keyboard.createCursorKeys(); //arrow keys are now assigned and can be used
       
        this.playerTextBoxBool = false; //connected to the player name and current dialogue visibility
        this.playerTurnBool = false;
        this.playerChoice = false;  //bool for if the player is making a choice, not sure if this works correctly tho
        this.playerOptionA = false; //if the player chooses option for A key
        this.endingFlag = false;    //if the scene is at the end
        this.playerOptionD = false; //if the player choses the optiuon for the D key
        

        // reserving these keys for future interactions we implement
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.monsterArray = ([]);//array for monster text
        this.monsterArray.push('You\'ve come a long way');
        this.monsterArray.push('*more monster text*');
        this.monsterArray.push('*even more monster text');
        this.monsterArray.push('additional monster text');
        this.monsterArray.push('does this text even show up');
      

        
        this.monsterNumber = 0; //starting number for the monster dialogue
        this.playerNumber = 0;  //starting number for the player dialogue
        this.playerEndingNumber = 5; //number where the dialogue will stop in the array

        this.playerArray = ([]);//array for player intro text
        this.playerArray.push('Player intro text');
        this.playerArray.push('Player talkin 1');
        this.playerArray.push('Player talkin 2');
        this.playerArray.push('Playier talkin 3');
        this.playerArray.push('Player talkin 4');
        this.playerArray.push('Player talkin 5');
        this.playerArray.push('Press A to respond    Press B to stay silent');
        this.playerTextBox = this.add.text(150, 450, 'Sure', { fontFamily: 'Arial', fontSize: 32, color: '#00ff00' });


        this.playerTextPointer = this.playerArray[this.playerNumber]; //pointer for where the player text box is pulling from

        this.playerAChoice = ([]);//array for player
        this.playerAChoice.push('talkin choice 1');
        this.playerAChoice.push('talkin choice 2');
        this.playerAChoice.push('talkin choice 3');
        this.playerAChoice.push('talkin choice 4');
        this.playerAChoice.push('talkin choice 5');


        this.playerDChoice = ([]);//array for player
        this.playerDChoice.push('silent choice 1');
        this.playerDChoice.push('silent choice 2');
        this.playerDChoice.push('silent choice 3');
        this.playerDChoice.push('silent choice 4');
        this.playerDChoice.push('silent choice 5');
    }

    update() {
        this.monsterDialogue.text = this.monsterArray[this.monsterNumber]; //updates the monster text
        this.playerTextBox.text = this.playerTextPointer; //updates the plater text
        
        if (Phaser.Input.Keyboard.JustDown(keyW)) {
            
            if(this.playerTextBoxBool && !this.playerTurnBool){
                this.advancePlayerDialogue(); //if its not the players turn advance the monster dialogue
            } else {
                this.advanceDialogue(); //advance the dialogue
            }

            if (this.endingFlag){   //starting next scene on W key once the end of the scene is reached
                this.scene.start('menuScene');
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keyA)) {
            if(this.playerChoice && !this.playerOptionD && !this.playerOptionA){ //if its the players turn to choose and hasnt chosen already chance the source array for the player
                this.playerEndingNumber = 4;                                     //dialogue and reset variables
                this.playerNumber = 0;
                this.playerTextPointer = this.playerAChoice[this.playerNumber];
                this.playerOptionA = true;
            } 
        }  
        
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            if(this.playerChoice&&!this.playerOptionD && !this.playerOptionA){//if its the players turn to choose and hasnt chosen already chance the source array for the player
                this.playerEndingNumber = 4;                                     //dialogue and reset variables
                this.playerEndingNumber = 4;
                this.playerNumber = 0;
                this.playerTextPointer = this.playerDChoice[this.playerNumber];
                this.playerOptionD = true;
            } 
        }   

        if (this.playerTextBoxBool){ 
            this.playerText.alpha = 1;
            this.playerTextBox.alpha = 1;
         
        } else {
            this.playerText.alpha = 0;
            this.playerTextBox.alpha = 0;
        }


        if(this.playerChoice && !this.playerOptionA &&!this.playerOptionD){
            this.continueText.alpha = 0;

        }
        
        
    }

    advanceDialogue(){

        if(this.monsterNumber<this.monsterArray.length-1){
            this.monsterNumber++;

        } else {
            this.playerTextBoxBool = true; //turn on the player textbox once the monster is done talking
        }

    }

    advancePlayerDialogue(){

        if(this.playerNumber<=this.playerEndingNumber){
            this.playerNumber++;
            if(this.playerOptionA){ //if option A is chosen advance that array
                this.playerTextPointer = this.playerAChoice[this.playerNumber];
            } else if(this.playerOptionD){

                this.playerTextPointer = this.playerDChoice[this.playerNumber];//if option D is chosen advance that array
            }
            else{
                this.playerTextPointer = this.playerArray[this.playerNumber]//if no option is chosen adance the original array
                this.playerChoice = true;
                
            }


            if (this.playerEndingNumber-1 == this.playerNumber&&(this.playerOptionA||this.playerOptionD)){
                this.endingFlag = true;
        }
            
        } 
        
    }

    
}


