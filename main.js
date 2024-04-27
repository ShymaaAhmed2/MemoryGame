document.querySelector(".control span").onclick = function () {
  document.querySelector(".control").remove();
};

let blocks = document.querySelectorAll(".game-block");
let game = document.querySelector(".game");
let flippedCards = [];
let resetButton= document.querySelector(".reset");


blocks.forEach(function (card) {
  card.addEventListener("click", cardClick);
});

resetButton.addEventListener("click",resetGame);

let keys = [...blocks.keys()];
console.log(keys);

changecards(keys);

console.log(keys);

blocks.forEach((block , index ) => {
  block.style.order = keys[index] ; 
})

function cardClick() {
  if (flippedCards.length < 2) {
    this.classList.add("flip");
    flippedCards.push(this);
  }

  if (flippedCards.length === 2) {
    stopClicking();
    checkcard(flippedCards[0], flippedCards[1]);
  }
}

function resetGame(){
  blocks.forEach((block)=>{
    block.classList.remove("flip","match");
  });
  let keys = [...blocks.keys()];
console.log(keys);

changecards(keys);

console.log(keys);

blocks.forEach((block , index ) => {
  block.style.order = keys[index] ; 
})
}

function stopClicking() {
  game.classList.add("noClick");

  setTimeout(function () {
    game.classList.remove("noClick");
  }, 1000);
}

function checkcard(firstCard, secondCard) {
  if (firstCard.dataset.technology === secondCard.dataset.technology) {
    // Match case: disable further interaction with matched cards
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    firstCard.classList.add("match");
    secondCard.classList.add("match");

    checkGameCompletion()
  } else {
    // Not a match case: flip the cards back after a delay
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
    }, 1000);
  }

  // Clear the flippedCards array
  flippedCards = [];

  // Re-enable clicking after the delay
  setTimeout(() => {
    game.classList.remove("noClick");
  }, 1000);
}

function changecards(array) {
  let temp;
  for (let i = 0; i < array.length; i++) {
    // to generate for each loop random number
    let random = Math.floor(Math.random() * array.length);
    temp = array[i];
    array[i] = array[random];
    array[random] = temp;
  }
  return array;
}

function checkGameCompletion() {
  let matchedBlocks = document.querySelectorAll(".game-block.match");
  if (matchedBlocks.length === blocks.length) {
    // All blocks are matched, show celebration 
    showCelebration();
  }
}

function showCelebration() {
  alert("Congratulations! You've completed the game!");
}
