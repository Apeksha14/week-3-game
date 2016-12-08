// Play audio on loop when the window loads

window.onload = function() {

  //document.getElementById("myaudio").play();

}

// wordList Array to select random words from

var wordList = ["DAREDEVIL","POKEMON","GREENHOUSE","HONEYCOMB","PANCAKE"];

/*["LEONARDO DICAPRIO","ITALY",
"MOUNT RUSHMORE","SNOWBOARDING","QUICKSAND","MOUNTAIN BIKING",
"GAME OF THRONES","BREAKING BAD","HARRY POTTER","SHERLOCK HOLMES",
"SHAKESPEAR","COLUMBUS","THOMAS EDISON","ALBERT EINSTEIN","THE BEATLES",
"THOMAS JEFFERSON","PABLO PICASSO","CALIFORNIA","SWITZERLAND",
"LUKE SKYWALKER","BEETHOVAN","COLDPLAY","INDIANA JONES","BATMAN",
"TITANIC","STAR WARS","THE INCREDIBLES","CARDBOARD","CHOPSTICK",
"DAREDEVIL","POKEMON","GREENHOUSE","HONEYCOMB","PANCAKE","SANDCASTLE",
"WATERMELON","MICHAEL JORDON","NEIL ARMSTRONG","POCAHONTAS","INCEPTION",
"FLAMINGO","SWORDFISH","SCORPION","OCTOPUS","LOBSTER","DRAGON",
"CHAMELEON","CHIPMUNK","GOLDEN RETRIEVER","GREYHOUND","SILKWORM",
"SNAIL","BARACK OBAMA","SPIDERMAN","DARTH VADER","GEORGE WASHINGTON"];*/

var random = Math.floor((Math.random()*(wordList.length-1))); 
var word = wordList[random]; // the word to guess will be chosen from the array above
var currentword = new Array(word.length);

// every letter in the word is symbolized by an underscore in the currentword

  for (var i = 0; i < currentword.length; i++){
   
    currentword[i] =  "_ ";

  }
  

// Display the underscored current word to guess in the html file

var guessWord = function(){

  for (var i = 0; i < currentword.length; i++)
    { 
      var cword = document.getElementById("currentword");
      var newword = document.createTextNode(currentword[i]);
      cword.appendChild(newword);
    }
}

guessWord();


// function to reset the stickman figure in canvas

function resetFigure(){

context.clearRect(0, 0, 400, 400);

}


var wins=0; // variable to calculate number of wins
var loses=0; // variable to calculate number of loses
var MAX_GUESSES = 10; // Maximum number of guesses available at the start of the game

// animate function to draw hangman stick figure

var animate = function (){

    var drawMe = MAX_GUESSES ;
    drawArray[drawMe]();
}

// Displays Maximum guesses at the start of the game in the html 

document.getElementById("guessesleft").innerHTML= MAX_GUESSES;

document.onkeyup = function(event){
  
  var flag=false;


  // variable to store letter guessed by the user

  var userletter = String.fromCharCode(event.keyCode).toUpperCase();

  // Loop to check if the letter guessed by the user matches the letter in the current word

  for (var i = 0; i < word.length; i++)
    {
      if(word[i] === userletter){
      currentword[i] = userletter + " ";
      var correctword = true; // flag sets to true if letter matches
    }
  }

  document.getElementById("currentword").innerHTML="";
  guessWord();

  // if the letter guessed by user is not correct it's added 
  // to the letters already guessed list in the html. 
  
  if(!correctword)
  { 
    var letters = document.getElementById("letters");
    var newword = document.createTextNode(" " + userletter);
    letters.appendChild(newword);
    MAX_GUESSES=MAX_GUESSES-1;  // Maximum guesses decreased by 1 for every wrong guess
    document.getElementById("guessesleft").innerHTML=MAX_GUESSES;
    canvas();
    animate(); // draw stick figure for every wrong guess
  }
  

  var allwords = true; // allwords flag  set to true to check when all words are guessed by the user 

  // loop for checking if the word still has unmatched letters and set the allwords flag to false

  for (var i = 0; i < currentword.length; i++)
  {
    if(currentword[i] === "_ ")
      allwords = false;
  
  }

  /*  if the user guessed the correct word ,wins count is increased by 
      1 and result is displayed on html page.Also the flag is set to true */

  if(allwords)
  {
      
      wins=wins+1;
      document.getElementById("wins").innerHTML=wins;
      flag=true;
      alert("You win");
  }

  /* if the user cannot guess the correct word,lose count increases by 1 
     and the result is displayed on the html page.Also the flag is set to true */

  if(MAX_GUESSES === 0)
  {
      alert("Oops!!Looks like you ran out of guesses");
      loses=loses+1; 
      flag=true;

  }

  /* if the flag is true that means the game is over and new word is
     selected from the wordList and everything is reset */


  if(flag)
    {
       var play = confirm("Do you want to play again?");
        if(play)
        {
          random = Math.floor((Math.random()*(wordList.length-1))); 
          word = wordList[random]; // the word to guess will be chosen from the array above
          currentword = new Array(word.length);
          MAX_GUESSES =10;
          for (var i = 0; i < currentword.length; i++){
            currentword[i] =  "_ ";
          }
          document.getElementById("currentword").innerHTML="";
          guessWord();
          document.getElementById("letters").innerHTML="";
          document.getElementById("guessesleft").innerHTML=MAX_GUESSES;
          resetFigure();
        }
    }
  }

  // Hangman - functions to animate stickman figure on the canvas

  canvas =  function(){

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#55ff55";
    context.lineWidth = 3;
  }
  
  head = function(){

      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.arc(80, 35, 20, 0, Math.PI*2, true);
      context.stroke();
  }
    
  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke(); 
  }

   frame1 = function() {

     draw (0, 150,150,150);

   };
   
   frame2 = function() {
     draw (10,0, 10, 900);
   };
  
   frame3 = function() {
     draw (0, 5, 150, 5);
   };
  
   frame4 = function() {
     draw (80, 5, 80, 15);
   };
  
   torso = function() {
     draw (80, 56, 80, 130);
   };
  
   rightArm = function() {
     draw (80, 56, 120, 80);
   };
  
   leftArm = function() {
     draw (80, 56, 40, 80);
   };
  
   rightLeg = function() {
     draw (80, 100, 120, 130);
   };
  
   leftLeg = function() {
     draw (80, 100, 40, 130);
   };
  
  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 
    
// Pop up js










