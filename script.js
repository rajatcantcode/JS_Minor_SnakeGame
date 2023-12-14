//initially we want snake to be static
let inputDir = { x: 0, y: 0 };

const foodSound = new Audio("./assets/food.mp3");
const gameOverSound = new Audio("./assets/gameover.mp3");
const moveSound = new Audio("./assets/move.mp3");

// Every time we play game our screen gets refresh with loop
// Instead of doing with setInterval we will use
// requestAnimationFrame produces higher quality animation completely eliminating flicker and shear that can happen when using setTimeout or setInterval

let speed = 15;
let lastPaintTime = 0;
let score = 0;

let snakearr = [{ x: 13, y: 15 }]; //We can see the head of the snake at this points
let food = { x: 6, y: 7 }; //note its not going to be an array

// ----☝🏿 In javascript note: Origin is at left-top of game ------

// Game fxns
function main(currenttime) {
  window.requestAnimationFrame(main);
  // We can control FramePerSec by including else condition
  // This code checks if the time elapsed since the last paint operation is less than 1 divided by the specified speed.
  // If true, it returns, indicating not to perform another paint operation yet.
  if ((currenttime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = currenttime;
  gameEngine();
  // console.log(currenttime);
}

function gameEngine() {
  // ---------------------------Part 1 : Upadating the snake array & food---------------------------
  if (isCollide(snakearr)) {
    gameOverSound.play();

    inputDir = { x: 0, y: 0 };
    alert("GAME OVER! press ok to play again !");
    snakearr = [{ x: 13, y: 15 }];
    score = 0;
  }
  //------>IF THE SNAKE HAVE EATEN THE FOOD - increase score and regenerate food and increase size of snake
  // head of snake = food location
  if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
    foodSound.play();
    score += 1;
    // unshift add an element in array
    snakearr.unshift({
      x: snakearr[0].x + inputDir.x,
      y: snakearr[0].y + inputDir.y,
    });
    //food generate
    food = {
      // Random number between 2 - 16
      x: Math.floor(Math.random() * 16) + 1,
      y: Math.floor(Math.random() * 16) + 1,
    };
  }
  //------>Moving the snake body and head individually
  //moving the body of the snake from it's tail
  for (let i = snakearr.length - 2; i >= 0; i--) {
    snakearr[i + 1] = { ...snakearr[i] };
  }
  //this is for the head of the snake
  snakearr[0].x += inputDir.x;
  snakearr[0].y += inputDir.y;


  //---------------------------Part 2 : Dispaly the snake and food---------------------------
  game.innerHTML = "";
  //---------Snake------------
  snakearr.forEach((element, index) => {
    // Creating the snake via JS
    snakeElement = document.createElement("div");
    snakeElement.style.gridColumnStart = element.x;
    snakeElement.style.gridRowStart = element.y;
    //We are adding a class because we want to add CSS in it
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    game.appendChild(snakeElement);
  });
  //------------Food------------
  foodElement = document.createElement("div");
  foodElement.style.gridColumnStart = food.x;
  foodElement.style.gridRowStart = food.y;
  foodElement.classList.add("food");
  game.appendChild(foodElement);
}

function isCollide(snake) {
  // If you bump into yourself
  for (let i = 1; i < snakearr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // If you bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}
//-------------------------------main logic of game 👇 ahd created loop in 'main' fxn-------------------------------
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  // Press any key to Start the game
  inputDir = { x: 0, y: 1 };
  moveSound.play();
  // To know which key has been clicked
  switch (e.key) {
    case "ArrowUp":
      console.log("Arrow uppar ka hain");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      console.log("Arrow niche ka hain");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      console.log("Arrow left ka hain");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      console.log("Arrow right ka hain");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});
