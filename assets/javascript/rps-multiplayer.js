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

//DEACTIVATING THIS CODE BC I DON'T THINK I NEED IT, BUT DON'T WANT TO DELETE YET
// database.ref().on("value", function (snapshot) {
//   playerOneNameLocal = snapshot.val().playerOne;
//   playerTwoNameLocal = snapshot.val().playerTwo;
// }, function (errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });

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
    playerOneNameLocal = $("#playerOneNameInput").val().trim();
    //SEND THEIR NAME AND IF THEY ARE ACTIVE TO THE DATABASE. THEN GREET THEM AND PRINT THEIR NAME
    database.ref("playerOne").set({
      name: playerOneNameLocal,
      active: true,
      wins: 0,
      losses: 0
    }).then(function () {
      var player;
      database.ref("playerOne").on('value', function (snapshot) {
        return player = snapshot.val();
      });
      $("#status").html("Player One logged in. Waiting on player 2.");
      $("#login").html("Hello " + player.name + ".");
      $("#player1Name").html("<h1>" + player.name + "</h1>");
    }).catch(function (error) {
      if (error) throw error;
    })
  })

  //WHEN PLAYER TWO SUBMITS THEIR NAME
  $("#playerTwoSubmit").on("click", function () {
    playerTwoNameLocal = $("#playerTwoNameInput").val().trim();
    database.ref("playerTwo").set({
      name: playerTwoNameLocal,
      active: true,
      wins: 0,
      losses: 0
    }).then(function () {
      var player2;
      firebase.database().ref("playerTwo").on('value', function (snapshot) {
        return player2 = snapshot.val();
      });
      $("#status2").html("Player Two logged in. Waiting on player 1.");
      $("#login2").html("Hello " + player2.name + ".");
      $("#player2Name").html("<h1>" + player2.name + "</h1>");
    }).catch(function (error) {
      if (error) throw error;
    })
  })



// NOW CHECK THE DATABASE TO SEE IF THEY ARE BOTH ACTIVE
// I MUST BE HAVING SOME SORT OF SCOPE ISSUE HERE, AS I CAN'T SEEM TO REFERENCE EACH PLAYER IN THE DATABASE AT THE SAME TIME
    var playerOneActive = firebase.database().ref("playerOne").on('value', function (snapshot) {
      var isPlayerOneThere = snapshot.val().active;
      console.log("Is player one there? " + isPlayerOneThere);
      return playerOneActive = snapshot.val().active;;
    })

    var playerTwoActive = firebase.database().ref("playerTwo").on('value', function (snapshot) {
      var isPlayerTwoThere = snapshot.val().active;
      console.log("Is player two there? " + isPlayerTwoThere);
      return playerTwoActive = snapshot.val().active;
    })

    if (playerOneActive === true && playerTwoActive === true) {
      console.log("this works");
    }


//IF BOTH PLAYERS ARE ACTIVE, THE BATTLE OPTIONS DISPLAY. THIS NEEDS TO BE CALLED WHEN BOTH PLAYERES ARE ACTIVE. SINCE I HAVEN'T SOLVED HOW TO CHECK THE DATABASE TO CHECK IF BOTH PLAYERS ARE ACTIVE, I HAVE IT DISPLAY BY DEFAULT.
//--------------------------------------------------


$("#playerOneChoices").html("<button id='p1Rock'>Rock</button><br><button id='p1Paper'>Paper</button><br><button id='p1Scizzors'>Scizzors</button><br>");
$("#playerTwoChoices").html("<button id='p2Rock'>Rock</button><br><button id='p2Paper'>Paper</button><br><button id='p2Scizzors'>Scizzors</button><br>");

var playerOneChoice;
var playerTwoChoice;
var playerOneChosen = false;
var playerTwoChosen = false;

//PLAYER ONE CHOOSES THEIR WEAPON, SETS THE WEAPON IN THE DATABASE

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

//PLAYER TWO CHOOSES THEIR WEAPON, SETS THE WEAPON IN THE DATABASE

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

//DETERMINE IF EACH PLAYER HAS CHOSEN A WEAPON (THIS NEEDS TO BE DONE IN THE DATABASE, BUT ITS STORED WITH LOCAL VARIABLES FOR NOW)

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

    //DETERMINE RESULTS HERE, CHECKING THE DATABASE VARIABLES
    if (playerOneChoice === playerTwoChoice) {
      console.log("The game is a tie");

      //ADD THE REST OF GAME LOGIC TO DETERMINE WINNER. THIS WILL BE DONE THE SAME WAY IT WAS IN THE EARLIER EXERCISE, BUT BY CHECKING THE DATABASE
      //FOR REFERENCE, I"VE ADDED THE CODE FROM THE OLD RPS BELOW. BUT IT NEEDS TO BE REDONE FOR DATABASE:

    //   document.onkeyup = function (event) {
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


      //AFTER WINNER IS DETERMINED, INCREMENT WINS/LOSSES ON THE DATABASE FOR EACH PLAYER & DISLAY LOCALLY, CLEAR choice FOR BOTH PLAYERS IN THE DATABASE, RESET CHOICE BUTTONS AND EMPTY RESULTS AREA


    }

  }


}

//ADD CHAT FUNCTIONALITY. I WILL BE ABLE TO DO THIS EASIER ONCE I FULLY GRASP THE STEPS I'M MISSING
  }



















