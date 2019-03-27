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

database.ref().on("value", function (snapshot) {
  playerOneNameLocal = snapshot.val().playerOne;
  playerTwoNameLocal = snapshot.val().playerTwo;
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

window.onload = function () {
  var playerOneActive = false;
  var playerTwoActive = false;
  var playerOneNameLocal = "";
  var playerTwoNameLocal = "";
  $("#login").html("<input type='text' id='playerOneNameInput'><button id='playerOneSubmit'>Player One Name</button>");
  $("status").html("Waiting on Players");
  $("#login2").html("<input type='text' id='playerTwoNameInput'><button id='playerTwoSubmit'>Player Two Name</button>");
  $("#status2").html("Waiting on Players");


  //WHEN THE PLAYER ONE SUBMITS THEIR NAME
  $("#playerOneSubmit").on("click", function () {
    playerOneActive = true;
    // loginCheck();
    playerOneNameLocal = $("#playerOneNameInput").val().trim();
    database.ref("playerOne").set({
      name: playerOneNameLocal,
      age: 30
    }).then(function () {
      var player;
      database.ref("playerOne").on('value', function (snapshot) {
        return player = snapshot.val();
      });
      $("#status").html("Player One logged in. Waiting on player 2.");
      $("#login").html("Hello " + player.name + ", age: " + player.age);
      $("#player1Name").html("<h1>" + player.name + "</h1>");
      loginCheck();
    }).catch(function (error) {
      if (error) throw error;
    })
  })

  //WHEN PLAYER TWO SUBMITS THEIR NAME
  $("#playerTwoSubmit").on("click", function () {
    playerTwoActive = true;
    playerTwoNameLocal = $("#playerTwoNameInput").val().trim();
    database.ref("playerTwo").set({
      name: playerTwoNameLocal,
      age: 30
    }).then(function () {
      var player2;
      firebase.database().ref("playerTwo").on('value', function (snapshot) {
        return player2 = snapshot.val();
      });
      $("#status2").html("Player Two logged in. Waiting on player 1.");
      $("#login2").html("Hello " + player2.name + ", age: " + player2.age);
      $("#player2Name").html("<h1>" + player2.name + "</h1>");
      loginCheck();
    }).catch(function (error) {
      if (error) throw error;
    })
  })

  //DETERMINE IF THEY ARE BOTH LOGGED IN
  function loginCheck() {
    if (playerOneActive === false && playerTwoActive === false) {
      // $("#status").html("Waiting on Players");
      // $("#status2").html("Waiting on Players");
      console.log('Nobody is logged in.');
    } else if (playerOneActive === true && playerTwoActive === false) {
      $("#status").html("Waiting on Player Two");
    } else if (playerOneActive === false && playerTwoActive === true) {
      $("#status2").html("Waiting on Player One");
    } else if (playerOneActive === true && playerTwoActive === true) {
      console.log("Ready");
      $("#status").empty();
      $("#status2").empty();
    }

    //ONCE THEY ARE BOTH LOGGED IN, THE GAME BEGINS:
    //--------------------------------------------------

    //display playerOne name

    $("#playerOneChoices").html("<button id='p1Rock'>Rock</button><br><button id='p1Paper'>Paper</button><br><button id='p1Scizzors'>Scizzors</button><br>");
    $("#playerTwoChoices").html("<button id='p2Rock'>Rock</button><br><button id='p2Paper'>Paper</button><br><button id='p2Scizzors'>Scizzors</button><br>");

    var playerOneChoice;
    var playerTwoChoice;
    var playerOneChosen = false;
    var playerTwoChosen = false;

    //PLAYER ONE CHOOSES THEIR WEAPON

    $("#p1Rock").on("click", function () {
      playerOneChoice = "rock";
      database.ref("/playerOne").update({
        p1choice: playerOneChoice
      // database.ref("/playerOne").update({
      //   p1choice: "rock"})
      
      //   playerOneChoice = database.ref("/playerOne").on(p1choice);

      }).then(function () { //child_added event handler?
        var p1chose;
        database.ref("/playerOne").on('value', function (snapshot) {
          p1chose = snapshot.val();
        });
        playerOneChosen = true;
        choiceCheck();
        $("#playerOneChoices").html("Player One has chosen " + p1chose.p1choice);

      }).catch(function (error) {
        if (error) throw error;
      })
    })

    // console.log(database.ref("/playerOne").p1chose.p1choice);

    $("#p1Scizzors").on("click", function () {
      playerOneChoice = "scizzors";
      database.ref("/playerOne").update({
        p1choice: playerOneChoice
      }).then(function () { //child_added event handler?
        var p1chose;
        database.ref("/playerOne").on('value', function (snapshot) {
          p1chose = snapshot.val();
        });
        playerOneChosen = true;
        choiceCheck();
        $("#playerOneChoices").html("Player One has chosen " + p1chose.p1choice);

      }).catch(function (error) {
        if (error) throw error;
      })
    })
    $("#p1Paper").on("click", function () {
      playerOneChoice = "paper";
      database.ref("/playerOne").update({
        p1choice: playerOneChoice
      }).then(function () { //child_added event handler?
        var p1chose;
        database.ref("/playerOne").on('value', function (snapshot) {
          p1chose = snapshot.val();
        });
        playerOneChosen = true;
        choiceCheck();
        $("#playerOneChoices").html("Player One has chosen " + p1chose.p1choice);

      }).catch(function (error) {
        if (error) throw error;
      })
    })

    //PLAYER TWO CHOOSES THEIR WEAPON

    $("#p2Rock").on("click", function () {
      playerTwoChoice = "rock";
      database.ref("/playerTwo").update({
        p2choice: playerTwoChoice
      }).then(function () { //child_added event handler?
        var p2chose;
        database.ref("/playerTwo").on('value', function (snapshot) {
          p2chose = snapshot.val();
        });
        playerTwoChosen = true;
        choiceCheck();
        $("#playerTwoChoices").html("Player Two has chosen " + p2chose.p2choice);

      }).catch(function (error) {
        if (error) throw error;
      })
    })

    $("#p2Scizzors").on("click", function () {
      playerTwoChoice = "scizzors";
      database.ref("/playerTwo").update({
        p2choice: playerTwoChoice
      }).then(function () { //child_added event handler?
        var p2chose;
        database.ref("/playerTwo").on('value', function (snapshot) {
          p2chose = snapshot.val();
        });
        playerTwoChosen = true;
        choiceCheck();
        $("#playerTwoChoices").html("Player Two has chosen " + p2chose.p2choice);

      }).catch(function (error) {
        if (error) throw error;
      })
    })

    $("#p2Paper").on("click", function () {
      playerTwoChoice = "paper";
      database.ref("/playerTwo").update({
        p2choice: playerTwoChoice
      }).then(function () { //child_added event handler?
        var p2chose;
        database.ref("/playerTwo").on('value', function (snapshot) {
          p2chose = snapshot.val();
        });
        playerTwoChosen = true;
        choiceCheck();
        $("#playerTwoChoices").html("Player Two has chosen " + p2chose.p2choice);

      }).catch(function (error) {
        if (error) throw error;
      })
    })

    //DETERMINE IF EACH PLAYER HAS CHOSEN A WEAPON

    function choiceCheck() {
      if (playerOneChosen === false && playerTwoChosen === false) {
        $("#winner").html("Waiting on Both Players to Choose Their Weapons");
      } else if (playerOneChosen === true && playerTwoChosen === false) {
        $("#winner").html("Waiting on Player Two to Choose Their Weapon");
      } else if (playerOneChosen === false && playerTwoChosen === true) {
        $("#winner").html("Waiting on Player One to Choose Their Weapon");
      } else if (playerOneChosen === true && playerTwoChosen === true) {
        console.log("Someone will win");
        $("#winner").html("Someone will win");

        //DETERMINE RESULTS HERE OR CALL A FUNCTION THAT WILL DO SO
        if (playerOneChoice === playerTwoChoice) {
          console.log("The game is a tie");
          // if (p1chose.p1choice === p2chose.p2choice) {}
          // if (database.ref().on(p1chose.p1choice) === database.ref().on(p1chose.p1Choice) {
          //   console.log("Holy shit, that worked!");
        }

      }


    
    }
  }













  //display winner
  //reset playerone choice && player two choice

  //display playerTwo name.
  //set playerTwoChoice to be empty
  //display 3 buttons: rock, paper, scizzors
  //hook up rock button to be user choice (use firebase)
  //hook up paper button to be user choice (use firebase)
  //hook up scizzors button to be user choice (use firebase)
  //display user choice (locally) when clicked. hide from other player
  //set playerTwo win count (use firebase)
  //set playerTwo lose count (use firebase)


  //set opponent win count (firebase)
  //set oppponent win count (firebase)

















  //------------------------------------------------------








} //closes logincheck

// } // closes onWindowLoad.










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


// database.ref().on("value", function (snapshot) {

//     // Console.log the "snapshot" value (a point-in-time representation of the database)
//     console.log(snapshot.val());
//     // This "snapshot" allows the page to get the most current values in firebase.

//     // Change the value of our clickCounter to match the value in the database
//     clickCounter = snapshot.val().clickCount;

//     // Console Log the value of the clickCounter
//     console.log(clickCounter);

//     // Change the HTML using jQuery to reflect the updated clickCounter value
//     $("#click-value").text(clickCounter);
//     // Alternate solution to the above line
//     // $("#click-value").html(clickCounter);

//   }, function (errorObject) {
//     console.log("The read failed: " + errorObject.code);
//   });