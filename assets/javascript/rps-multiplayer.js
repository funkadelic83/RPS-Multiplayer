
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD837J3WCp3T_t9drbsQ3zpLi23NHxvNFk",
    authDomain: "rps-multiplayer-1e814.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-1e814.firebaseio.com",
    projectId: "rps-multiplayer-1e814",
    storageBucket: "",
    messagingSenderId: "457074219036"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

 



//   * Only two users can play at the same time.

//   * Both players pick either `rock`, `paper` or `scissors`. After the players make their selection, the game will tell them whether a tie occurred or if one player defeated the other.

//   * The game will track each player's wins and losses.

//   * Throw some chat functionality in there! No online multiplayer game is complete without having to endure endless taunts and insults from your jerk opponent.

//   * Styling and theme are completely up to you. Get Creative!

//   * Deploy your assignment to Github Pages.





// OLD RPS GAME CODE BELOW

// var computerOptions = ["r", "p", "s"];

// // Let's start by grabbing a reference to the <span> below.
// var userChoiceElement = document.getElementById("user-text");

// var tieCount = 0;
// var winCount = 0;
// var loseCount = 0;

// var winsElement = document.getElementById("wins");
// var tiesElement = document.getElementById("ties");
// var lossesElement = document.getElementById("losses");

// Next, we give JavaScript a function to execute when onkeyup event fires.


// document.onkeyup = function (event) {
//     var userChoice = event.key;
//     if (computerOptions.includes(userChoice)) {
//         var computerChoice = computerOptions[Math.floor(Math.random() * computerOptions.length)];
//         userChoiceElement.textContent = userChoice;

//         if (userChoice === computerChoice) {
//             tieCount++;
//             tiesElement.textContent = tieCount.toString();
//         }
//         else if (userChoice === "r" && computerChoice === "s") {
//             winCount++;
//             winsElement.textContent = winCount.toString();
//         }
            
//             else if (userChoice === "r" && computerChoice === "p") { 
//             loseCount++; 
//             lossesElement.textContent = loseCount.toString();
//         }
//             else if (userChoice === "p" && computerChoice === "s") {
//             loseCount++;
//             lossesElement.textContent = loseCount.toString();
//         }
//             else if (userChoice === "p" && computerChoice === "r") {
//             winCount++;
//             winsElement.textContent = winCount.toString();
//         }
//             else if (userChoice === "s" && computerChoice === "r") {
//             loseCount++;
//             lossesElement.textContent = loseCount.toString();
//         }
//             else if (userChoice === "s" && computerChoice === "p") {
//             winCount++;
//             winsElement.textContent = winCount.toString();
//         }
//     }
// }


