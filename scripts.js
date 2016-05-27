var userChoice = '',
  compChoice = '',
  turnNum = 0,
  gameon = true,
  userCells = [],
  compCells = [];
var cells = [
  'top-left' /*0*/ , 'top-middle' /*1*/ , 'top-right' /*2*/ ,
  'center-left' /*3*/ , 'center-middle' /*4*/ , 'center-right' /*5*/ ,
  'bottom-left' /*6*/ , 'bottom-middle' /*7*/ , 'bottom-right' /*8*/
];
var winningCombos = [
  [cells[0], cells[1], cells[2]],
  [cells[3], cells[4], cells[5]],
  [cells[6], cells[7], cells[8]],
  [cells[0], cells[3], cells[6]],
  [cells[1], cells[4], cells[7]],
  [cells[2], cells[5], cells[8]],
  [cells[0], cells[4], cells[8]],
  [cells[6], cells[4], cells[2]]
];

function reset() {
  turnNum = 1;
  gameon = true;
  userCells = [];
  compCells = [];
  $('.top').html('');
  $('.middle').html('');
  $('.bottom').html('');
  $('.top').css('background-color', 'white');
  $('.middle').css('background-color', 'white');
  $('.bottom').css('background-color', 'white');
  compTurnRandom();
}

function checkForWin() {
  winningCombos.forEach(function(combo) {
    if (userCells.indexOf(combo[0]) !== -1 &&
      userCells.indexOf(combo[1]) !== -1 &&
      userCells.indexOf(combo[2]) !== -1) {
      $('#' + combo[0]).css('background-color', 'rgb(0,230,100)');
      $('#' + combo[1]).css('background-color', 'rgb(0,230,100)');
      $('#' + combo[2]).css('background-color', 'rgb(0,230,100)');
      alert('User Wins');
      gameon = false;
    } else if (compCells.indexOf(combo[0]) !== -1 &&
      compCells.indexOf(combo[1]) !== -1 &&
      compCells.indexOf(combo[2]) !== -1) {
      $('#' + combo[0]).css('background-color', 'rgb(0,230,100)');
      $('#' + combo[1]).css('background-color', 'rgb(0,230,100)');
      $('#' + combo[2]).css('background-color', 'rgb(0,230,100)');
      alert('Computer Wins');
      gameon = false;
    }
  });
}
//Computer's first turn is random
function compTurnRandom() {
  var btnId = cells[Math.floor(Math.random() * cells.length)];
  if (userCells.indexOf(btnId) === -1 && compCells.indexOf(btnId) === -1) {
    $('#' + btnId).html(compChoice);
    compCells.push(btnId);
  } else {
    compTurnRandom();
  }
}

function compOffense() {
  var test = 0,
    oneTurn = true;
  winningCombos.forEach(function(arr) { // first array
    // test now equals 0
    userCells.forEach(function(item) { //each cell of user
      if (arr.indexOf(item) === -1) {
        test++;
        if (test === 3) { //none of elements in the winning combo array have user clicks
          compCells.forEach(function(compItem) {
            if (arr.indexOf(compItem) !== -1) {
              //There is a comp click in winning combo
              arr.forEach(function(arrItem) {
                if (compCells.indexOf(arrItem) === -1 && userCells.indexOf(arrItem) === -1 && oneTurn) { //Find the arr item not used
                  oneTurn = false;
                  $('#' + arrItem).html(compChoice);
                  compCells.push(arrItem);
                }
              });
            }
          })
        }
      } else {
        test = 0;
      }
    });
  });
}

function goForWin() { //This guy right here <<
  var test = 0,
    oneTurn = true;
  winningCombos.forEach(function(arr) {
    test = 0;
    arr.forEach(function(item) {
      if (compCells.indexOf(item) !== -1) {
        test++;
      }
      if (test === 2 && oneTurn) {
        arr.forEach(function(combo) {
          if (compCells.indexOf(combo) === -1 && userCells.indexOf(combo) === -1) {
            oneTurn = false;
            $('#' + combo).html(compChoice);
            compCells.push(combo);
          }
        });
      }
    })
  })
}
//computer's second turn
function compSecondTurn() {
  var test = 0,
    oneTurn = true;
  winningCombos.forEach(function(arr) {
    test = 0;
    arr.forEach(function(item) {
      userCells.forEach(function(cell) {
        if (cell === item) {
          test++;
        }
        if (test === 2 || turnNum === 1) {
          arr.forEach(function(combo) {
            if (userCells.indexOf(combo) === -1 && compCells.indexOf(combo) === -1 && oneTurn) {
              oneTurn = false;
              $('#' + combo).html(compChoice);
              compCells.push(combo);
            }
          });
        }
      });
    });
  });
  if (oneTurn) {
    compOffense(); //Saves the day sometimes <<<
  }
}
$(document).ready(function() {
  $('#grid').hide();
  $('#title').hide();
  $('.choiceBtn').click(function() {
      userChoice = $(this).attr('value');
      if (userChoice === 'X') {
        compChoice = 'O';
      } else {
        compChoice = 'X';
      }
      $('#choice').hide();
      $('#grid').show();
      $('#title').show();
      compTurnRandom();
      turnNum++;
    })
    //Functions triggered per turn
  $('.cell').click(function() {
    var btnId = $(this).attr('id');
    console.log(compCells);
    if (compCells.indexOf(btnId) === -1 && userCells.indexOf(btnId) === -1) {
      $(this).html(userChoice);
      userCells.push(btnId);
      goForWin();
      checkForWin();
      if (turnNum === 1 && gameon) { // -----------------  TURN 1
        compSecondTurn();
        turnNum++;
      } else if (turnNum === 2 && gameon) { // ----------------  TURN 2
        compSecondTurn();
        turnNum++;
      } else if (turnNum === 3 && gameon) { // ------------------  TURN 3
        compSecondTurn();
        turnNum++;
      } else if (turnNum === 4 && gameon) { // ------------------  TURN 4
        compSecondTurn();
        alert("Cat's Game");
        reset();
      } else if (gameon === false) {
        reset();
      }
    } else {
      alert('Pick Another Spot')
    }
  })
});