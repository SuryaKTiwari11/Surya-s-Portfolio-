let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new");

let counter = 0; // will help out in figuring out draws

let turn0 = true; // we shall turn on and off to switch between players

const win_pos = [
  [0, 1, 2], //! Horizontal wins
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], //! Vertical wins
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], //! Diagonal wins
  [2, 4, 6],
];
// these are the possible winning possibilities;

let player1Wins = 0;
let player2Wins = 0;

const updateScore = () => {
  document.getElementById(
    "player1"
  ).innerText = `Player 1 Wins: ${player1Wins}`;
  document.getElementById(
    "player2"
  ).innerText = `Player 2 Wins: ${player2Wins}`;
};
// now we have to create to functions that enable and disable the boxes according to our needs

// enable
const enableBoxes = () => {
  // we are gonna run a for each loop so that every box can be enabled
  for (let box of boxes) {
    box.disabled = false;
    // we should also set the inner value of the boxes to null value in the case where we wish to reset the game
    box.innerText = "";
  }
};
const disableBoxes = () => {
  // we are gonna run a for each loop so that every box can be disabled
  for (let box of boxes) {
    box.disabled = true; // disable the boxes
  }
};

const reset_game = () => {
  // i wish to reset the turn0 value back to original
  turn0 = true;
  counter = 0;
  enableBoxes();
  let ans = document.getElementById("message");
  ans.innerText = ""; // to set the inner message that displays the winning status to 0;
};

const resetScore = () => {
  player1Wins = 0;
  player2Wins = 0;
  updateScore();
};

const checkWinner = () => {
  // we shall check every box to see if the winning combination has been achieved or not
  for (let pattern of win_pos) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      // if the input is empty no need to check
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // if all required inputs are filled we check whether it's equal to the win_pos
        console.log("winner");
        disableBoxes();
        showWinner(pos1Val);
        if (pos1Val === "X") {
          player1Wins++;
        } else {
          player2Wins++;
        }
        updateScore();
        // disable all boxes after the person wins
        return true;
      }
    }
  }
  return false;
};
const tie = (counter) => {
  const msg = document.getElementById("message");
  if (counter >= 9) msg.innerText = "It's a DRAW";
};
// this function simply checks that if the counter is >=9 and the winning condition has not been applied yet it tells the user that it's a DRAW;

const showWinner = (winner) => {
  const msg = document.getElementById("message");
  if (msg) {
    msg.innerText = `Congratulations, the winner is ${winner}`;
  }
};
// this function will simply print the msg that the given input is the winner

// now we just need a function that changes the value of X to O, O to X

// we want this function to trigger for all the values of the box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    counter++;
    if (turn0) {
      box.innerText = "X";
      turn0 = false;
    } else {
      box.innerText = "O";
      turn0 = true;
    }
    box.disabled = true;
    if (!checkWinner()) {
      tie(counter);
    }
  });
});
// it takes the value disables it after an input, also checks if the winner has been found or not;

newGameBtn.addEventListener("click", resetScore);
newGameBtn.addEventListener("click", reset_game);
resetBtn.addEventListener("click", reset_game); // Changed from reset_game to resetScore to reset the scores on click
// to reset the game on click
