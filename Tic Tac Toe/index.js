//Declare every related variable for all the boxes
let button = [];
for(let i=0; i<9; i++){
    button.push(document.getElementById(`box-${i+1}`));
}

//Function to decide the turn of the player
let counter =0;
function playerTurn(){
    counter++;
    if(counter % 2 == 0){
        player.innerText = "O player";       
    }
    else 
        player.innerText = "X player";

    return (counter % 2 == 0);  
}

//Declare a variable to store the move of both players
let xPlayersMove = [];
let oPlayersMove = [];

//standard winner's move
let standardMove = [ 
    [1,2,3], 
    [4,5,6], 
    [7,8,9],
    [1,4,7], 
    [2,5,8], 
    [3,6,9],
    [1,5,9], 
    [3,5,7]   ];

//Add some effect on clicking button
const audio = new Audio();
audio.src = "button-sound.wav";
//Add a sound effect for winning a game 
const victory = new Audio();
victory.src = "victory-sound.mp3";
//Add a sound effect when the game is draw
const draw = new Audio();
draw.src = "draw-sound.wav";

let player = document.getElementById("whichPlayerTurn");
playerTurn();
//Assign a click function to each button 
for(let i=0; i<9; i++){
    button[i].addEventListener("click", function(){
       
        //Play the audio whenever the button is clicked
        audio.play();

        //Make sure that the button can only be clicked once before restarting the game
        button[i].disabled= true;

        //Need to decide the 'X' and the 'O' (solved but the value is changeable)
        if(playerTurn()){
            
            button[i].innerText = `X`;
            xPlayersMove.push(`${i+1}`);   
        }
        else{
            button[i].innerText = `O`;
            oPlayersMove.push(`${i+1}`);
        }

        //Trigger to function to check if which player already become the winner
        whichWinner();
    })
}

//Decide the winner
let winner = document.getElementById("winnerDeclaration");
function whichWinner(){

    console.log(xPlayersMove);
    console.log(oPlayersMove);

    //X player
   
    for (let i = 0; i < standardMove.length; i++) {
        if (standardMove[i].every(position => xPlayersMove.includes( `${position}`))) {
           
            //Play the music
            victory.play();
            winner.innerText = "The winner is X player";
            // //Diable all the button once the winner is found
            for(let i=0; i<9; i++){
                button[i].disabled= true;
            }
           
            return;
        }
    }
   
    //O Player

    for (let i = 0; i < standardMove.length; i++) {

        if (standardMove[i].every(position => oPlayersMove.includes(`${position}`))) {
            //Play the music
            victory.play();
            winner.innerText = "The winner is O player";
            // //Diable all the button once the winner is found
            for(let i=0; i<9; i++){
                button[i].disabled= true;
            }
            return;

        }
       
            
    }
    
    
    //Draw
    if(xPlayersMove.length + oPlayersMove.length ==9){
        //Play the related music
        draw.play();
        winner.innerText = "Draw!";
        return;
    }
    else{
        winner.innerText = ""; 
    }

}


    
//Resart the game
let restartButton = document.getElementById("restart-button")
restartButton.addEventListener("click", function(){
    //Assign a click function to each button 
    for(let i=0; i<9; i++){
            button[i].disabled= false;
            button[i].innerText = ``;
    }
    winner.innerText = "";
    xPlayersMove = [];
    oPlayersMove = [];
})