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

// Add session stats tracking
let sessionStats = {
	startTime: Date.now(),
	highestWinMargin: 0,
	highestLossMargin: 0,
	longestWinStreak: 0,
	longestLoseStreak: 0,
	currentWinStreak: 0,
	currentLoseStreak: 0,
	totalRounds: 0,
	roundsUnder50: 0,
	bestWinRateUnder50: 0,
	fastestWin: null,  // Time to reach 5 wins
	moveFrequency: { rock: 0, paper: 0, scissors: 0 }
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
  // Display session stats before resetting
  displaySessionStats();
  
  // Reset score as before
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };

  localStorage.setItem("score", JSON.stringify(score));
  
  // Reset session stats
  sessionStats = {
    startTime: Date.now(),
    highestWinMargin: 0,
    highestLossMargin: 0,
    longestWinStreak: 0,
    longestLoseStreak: 0,
    currentWinStreak: 0,
    currentLoseStreak: 0,
    totalRounds: 0,
    roundsUnder50: 0,
    bestWinRateUnder50: 0,
    fastestWin: null,
    moveFrequency: { rock: 0, paper: 0, scissors: 0 }
  };

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
	// Get elements
	const moveButton = document.querySelector(`.js-choose-${playerMove}`);
	const moveIcon = moveButton.querySelector('.move-icon');
	const resultElement = document.querySelector('.js-result');
	
	// Apply animation to the chosen move button
	moveIcon.classList.add('chosen');
	setTimeout(() => {
		moveIcon.classList.remove('chosen');
	}, 300);
	
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

	// Update session stats with the result and player's move
	updateSessionStats(result, playerMove);

	updateScoreElement();

	// When updating results
	resultElement.classList.add('updated');
	setTimeout(() => {
		resultElement.classList.remove('updated');
	}, 400);

	document.querySelector(".js-result").innerHTML = result;

	document.querySelector(".js-moves").innerHTML = `You
			<img src="images/${playerMove}-emoji.png" class="move-icon" />
			<img src="images/${computerMove}-emoji.png" class="move-icon" />
			Computer`;

	// When adding result icons
	const resultIcons = document.querySelectorAll('.result-icon');
	resultIcons.forEach(icon => {
		icon.classList.add('updated');
		setTimeout(() => {
			icon.classList.remove('updated');
		}, 300);
	});
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

// Add function to update the stats dropdown content
function updateStatsDropdown() {
  const statsContent = document.querySelector('.js-stats-content');
  if (!statsContent) return;
  
  // Skip if no games were played
  if (sessionStats.totalRounds === 0) {
    statsContent.innerHTML = '<p>No games played yet in this session.</p>';
    return;
  }
  
  // Calculate some additional stats
  const sessionDuration = Math.floor((Date.now() - sessionStats.startTime) / 1000); // in seconds
  const favoriteMove = Object.entries(sessionStats.moveFrequency)
    .sort((a, b) => b[1] - a[1])[0][0];
  const winRate = ((score.wins / sessionStats.totalRounds) * 100).toFixed(1);
  
  // Create stats HTML
  statsContent.innerHTML = `
    <ul>
      <li>Total Rounds: <span class="stats-highlight">${sessionStats.totalRounds}</span></li>
      <li>Session Time: <span class="stats-highlight">${formatTime(sessionDuration)}</span></li>
      <li>Win Rate: <span class="stats-highlight">${winRate}%</span></li>
      <li>Highest Win Margin: <span class="stats-highlight">${sessionStats.highestWinMargin}</span></li>
      <li>Highest Loss Margin: <span class="stats-highlight">${sessionStats.highestLossMargin}</span></li>
      <li>Longest Win Streak: <span class="stats-highlight">${sessionStats.longestWinStreak}</span></li>
      <li>Longest Loss Streak: <span class="stats-highlight">${sessionStats.longestLoseStreak}</span></li>
      <li>Favorite Move: <span class="stats-highlight">${favoriteMove}</span></li>
      ${sessionStats.fastestWin ? `<li>Time to 5 Wins: <span class="stats-highlight">${formatTime(sessionStats.fastestWin/1000)}</span></li>` : ''}
      ${sessionStats.bestWinRateUnder50 > 0 ? `<li>Best Win Rate (First 50): <span class="stats-highlight">${(sessionStats.bestWinRateUnder50*100).toFixed(1)}%</span></li>` : ''}
    </ul>
  `;
}

function updateSessionStats(result, playerMove) {
  // Increment total rounds
  sessionStats.totalRounds++;
  
  // Track move frequency
  sessionStats.moveFrequency[playerMove]++;
  
  // Update win/loss margin
  const winMargin = score.wins - score.losses;
  const lossMargin = score.losses - score.wins;
  
  if (winMargin > sessionStats.highestWinMargin) {
    sessionStats.highestWinMargin = winMargin;
  }
  
  if (lossMargin > sessionStats.highestLossMargin) {
    sessionStats.highestLossMargin = lossMargin;
  }
  
  // Track win/lose streaks
  if (result === "You win.") {
    sessionStats.currentWinStreak++;
    sessionStats.currentLoseStreak = 0;
    
    if (sessionStats.currentWinStreak > sessionStats.longestWinStreak) {
      sessionStats.longestWinStreak = sessionStats.currentWinStreak;
    }
  } else if (result === "You lose.") {
    sessionStats.currentLoseStreak++;
    sessionStats.currentWinStreak = 0;
    
    if (sessionStats.currentLoseStreak > sessionStats.longestLoseStreak) {
      sessionStats.longestLoseStreak = sessionStats.currentLoseStreak;
    }
  } else {
    // Tie doesn't affect streaks
    sessionStats.currentWinStreak = 0;
    sessionStats.currentLoseStreak = 0;
  }
  
  // Track stats for games under 50 rounds
  if (sessionStats.totalRounds <= 50) {
    sessionStats.roundsUnder50 = sessionStats.totalRounds;
    const winRate = score.wins / sessionStats.totalRounds;
    
    if (winRate > sessionStats.bestWinRateUnder50 && sessionStats.totalRounds >= 10) {
      sessionStats.bestWinRateUnder50 = winRate;
    }
  }
  
  // Track fastest time to 5 wins
  if (score.wins === 5 && sessionStats.fastestWin === null) {
    sessionStats.fastestWin = Date.now() - sessionStats.startTime;
  }
  
  // Update the stats dropdown
  updateStatsDropdown();
}

function displaySessionStats() {
  // Skip if no games were played
  if (sessionStats.totalRounds === 0) return;
  
  // Calculate some additional stats
  const sessionDuration = Math.floor((Date.now() - sessionStats.startTime) / 1000); // in seconds
  const favoriteMove = Object.entries(sessionStats.moveFrequency)
    .sort((a, b) => b[1] - a[1])[0][0];
  const winRate = ((score.wins / sessionStats.totalRounds) * 100).toFixed(1);
  
  // Create stats HTML
  const statsHTML = `
    <div class="session-stats">
      <h3>Session Stats</h3>
      <ul>
        <li>Total Rounds: ${sessionStats.totalRounds}</li>
        <li>Session Time: ${formatTime(sessionDuration)}</li>
        <li>Win Rate: ${winRate}%</li>
        <li>Highest Win Margin: ${sessionStats.highestWinMargin}</li>
        <li>Highest Loss Margin: ${sessionStats.highestLossMargin}</li>
        <li>Longest Win Streak: ${sessionStats.longestWinStreak}</li>
        <li>Longest Loss Streak: ${sessionStats.longestLoseStreak}</li>
        <li>Favorite Move: ${favoriteMove}</li>
        ${sessionStats.fastestWin ? `<li>Time to 5 Wins: ${formatTime(sessionStats.fastestWin/1000)}</li>` : ''}
        ${sessionStats.bestWinRateUnder50 > 0 ? `<li>Best Win Rate (First 50): ${(sessionStats.bestWinRateUnder50*100).toFixed(1)}%</li>` : ''}
      </ul>
      <button class="close-stats-button">Close</button>
    </div>
  `;
  
  // Create modal container
  const modalContainer = document.createElement('div');
  modalContainer.className = 'stats-modal';
  modalContainer.innerHTML = statsHTML;
  document.body.appendChild(modalContainer);
  
  // Add event listener to close button
  modalContainer.querySelector('.close-stats-button').addEventListener('click', () => {
    document.body.removeChild(modalContainer);
  });
}

function formatTime(seconds) {
  if (seconds < 60) return `${seconds} sec`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}

// Add to the end of your file if not already present
document.addEventListener('DOMContentLoaded', function() {
    // Instructions toggle
    const instrToggleButton = document.querySelector('.js-instructions-toggle');
    if (instrToggleButton) {
        instrToggleButton.addEventListener('click', function() {
            const content = document.querySelector('.js-instructions-content');
            const arrow = this.querySelector('.down-arrow');
            
            // Toggle the content visibility
            content.classList.toggle('show');
            arrow.classList.toggle('open');
            
            // Log to console to confirm the action is working
            console.log('Instructions toggled');
        });
    }
    
    // Stats toggle
    const statsToggleButton = document.querySelector('.js-stats-toggle');
    if (statsToggleButton) {
        statsToggleButton.addEventListener('click', function() {
            const content = document.querySelector('.js-stats-content');
            const arrow = this.querySelector('.down-arrow');
            
            // Toggle the content visibility
            content.classList.toggle('show');
            arrow.classList.toggle('open');
            
            // Update stats when opened
            if (content.classList.contains('show')) {
                updateStatsDropdown();
            }
        });
    }
    
    // Initialize stats dropdown content
    updateStatsDropdown();
});
