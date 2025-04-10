/*************  ✨ Codeium Command ⭐  *************/
/**
 * Simulates a game of Rock, Paper, Scissors between the player and the computer.
 * Determines the result based on the player's move and the computer's randomly
 * generated move, then displays the result in an alert.
 *
 * @param {string} playerMove - The player's move, either "rock", "paper", or "scissors".
 */

let score = JSON.parse(localStorage.getItem("score")) || {
	wins: 0,
	losses: 0,
	ties: 0,
};

updateScoreElement();

/*document.querySelector(".js-result").innerHTML = result;

document.querySelector(".js-moves").innerHTML = `You ${playerMove} - ${computerMove} Computer`;*/

let isAutoPlaying; //= false;
let intervalId;

/*const autoPlay = () => {
	
};*/ // => fx not as concise. no hoisting

//regular fx can use hoisting
function autoPlay() {
	if (!isAutoPlaying) {
		intervalId = setInterval(() => {
			const playerMove = pickComputerMove();
			playGame(playerMove);
		}, 1000);
		isAutoPlaying = true;
	} else {
		clearInterval(intervalId);
		isAutoPlaying = false;
	}
}

function resetScore() {
	score = {
		wins: 0,
		losses: 0,
		ties: 0,
	};

	localStorage.setItem("score", JSON.stringify(score));

	updateScoreElement();
}

function displayConfirmation() {
	document.querySelector('.js-reset-confirmation')
		.innerHTML = `
			Are you sure you want to reset the score?
			<button class="js-reset-confirm-yes reset-confirm-button">
				Yes
			</button>
			<button class="js-reset-confirm-no reset-confirm-button">
				No
			</button>
		`;

		document.querySelector('.js-reset-confirm-yes')
    .addEventListener('click', () => {
      resetScore();
      hideResetConfirmation();
    });
  
  document.querySelector('.js-reset-confirm-no')
    .addEventListener('click', () => {
      hideResetConfirmation();
    });
}

// A helper function (it helps us reuse the
// code for hiding the confirmation message).
function hideResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = '';
}		

// button clicks
document.querySelector(".js-auto-play").addEventListener("click", autoPlay);

document.querySelector(".js-reset-score").addEventListener("click", displayConfirmation);

document.querySelector(".js-choose-rock").addEventListener("click", () => {
	playGame("rock");
});

document.querySelector(".js-choose-paper").addEventListener("click", () => {
	playGame("paper");
});

document.querySelector(".js-choose-scissors").addEventListener("click", () => {
	playGame("scissors");
});

// keydowns
document.body.addEventListener("keydown", (event) => {
	if (event.key === "a" || event.key === "A") {
		autoPlay(); // Toggle auto-playing
} else if (event.key === "Backspace") {
		displayConfirmation(); // Show reset confirmation
} else if (event.key === "r") {
		playGame("rock");
} else if (event.key === "p") {
		playGame("paper");
} else if (event.key === "s") {
		playGame("scissors");
}
});

function playGame(playerMove) {
	const computerMove = pickComputerMove();

	let result = "";

	if (playerMove === "scissors") {
		if (computerMove === "rock") {
			result = "You lose.";
		} else if (computerMove === "paper") {
			result = "You win.";
		} else if (computerMove === "scissors") {
			result = "Tie.";
		}
	} else if (playerMove === "paper") {
		if (computerMove === "rock") {
			result = "You win.";
		} else if (computerMove === "paper") {
			result = "Tie.";
		} else if (computerMove === "scissors") {
			result = "You lose.";
		}
	} else if (playerMove === "rock") {
		if (computerMove === "rock") {
			result = "Tie.";
		} else if (computerMove === "paper") {
			result = "You lose.";
		} else if (computerMove === "scissors") {
			result = "You win.";
		}
	}

	if (result === "You win.") {
		score.wins++;
		document.querySelector(".js-result").style.color = "lime";
	} else if (result === "You lose.") {
		score.losses++;
		document.querySelector(".js-result").style.color = "magenta";
	} else if (result === "Tie.") {
		score.ties++;
		document.querySelector(".js-result").style.color = "cyan";
	}

	localStorage.setItem("score", JSON.stringify(score));

	updateScoreElement();

	document.querySelector(".js-result").innerHTML = result;

	document.querySelector(".js-moves").innerHTML = `You
			<img src="images/${playerMove}-emoji.png" class="move-icon" />
			<img src="images/${computerMove}-emoji.png" class="move-icon" />
			Computer`;
}

/*
 * Updates the score display element with the latest score.
 * Also clears any existing result message.
 */
function updateScoreElement() {
	document.querySelector(
		".js-score"
	).innerHTML = `Wins: <span class="wins">${score.wins}</span> Losses: <span class="losses">${score.losses}</span> Ties: <span class="ties">${score.ties}</span>`;

	document.querySelector(".js-result").innerHTML = "";

	document.querySelector(".js-moves").innerHTML = "";
}
function pickComputerMove() {
	const randoNum = Math.random();

	let computerMove = "";

	if (randoNum >= 0 && randoNum < 1 / 3) {
		computerMove = "rock";
	} else if (randoNum >= 1 / 3 && randoNum < 2 / 3) {
		computerMove = "paper";
	} else {
		computerMove = "scissors";
	}

	return computerMove;
}
