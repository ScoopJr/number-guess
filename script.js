document.addEventListener('DOMContentLoaded', function() {
    let minRange;
    let maxRange;
    let randomNumber;
    let attempts = 0;
    let score = 0;
    let highScores = [];
  
    const minInput = document.getElementById('min-input');
    const maxInput = document.getElementById('max-input');
    const rangeButton = document.getElementById('range-button');
    const guessInput = document.getElementById('guess-input');
    const guessButton = document.getElementById('guess-button');
    const message = document.getElementById('message');
    const progressBar = document.getElementById('progress-bar');
    const scoreDisplay = document.getElementById('score');
    const highScoresList = document.getElementById('score-list');
    const playerNameInput = document.getElementById('name-input');
    const playAgainButton = document.getElementById('play-again');
  
    // Function to start the game
    function startGame() {
      if (playerNameInput.value.trim() === '') {
        showMessage('Please enter a name.', 'red');
        return;
      }
  
      minRange = parseInt(minInput.value);
      maxRange = parseInt(maxInput.value);
  
      // Check if the range is valid
      if (isNaN(minRange) || isNaN(maxRange) || minRange >= maxRange) {
        showMessage('Please enter a valid range.', 'red');
        return;
      }

        // Check if the range is 9 or greater
        if (maxRange - minRange < 9) {
        showMessage('Please enter a range of 10 or greater.', 'red');
        return;
        }
  
      // Generate a random number within the range
      randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
  
      // Disable range button and enable guess input and button
      rangeButton.disabled = true;
      rangeButton.classList.add('disabled');
      guessInput.disabled = false;
      guessButton.disabled = false;
      guessInput.min = minRange;
      guessInput.max = maxRange;
  
      showMessage('Enter your guess.', 'black');
      guessInput.value = '';
      guessInput.focus();
      updateProgressBar(0);
    }
  
    // Function to handle user guesses
    function handleGuess() {
      const userGuess = parseInt(guessInput.value);
  
      // Check if the user's guess is valid
      if (isNaN(userGuess) || userGuess < minRange || userGuess > maxRange) {
        showMessage('Please enter a valid number within the range.', 'red');
        return;
      }
  
      attempts++;
  
      // Compare the user's guess with the random number
      if (userGuess === randomNumber) {
        score += calculateScore(attempts);
        showMessage(`Congratulations! You guessed the correct number in ${attempts} attempts. Your score is ${Math.round(score)}.`, 'green');
        guessInput.disabled = true;
        guessButton.disabled = true;
        addScoreToHighScores(score);
        playAgainButton.disabled = false;
        playAgainButton.classList.remove('disabled');
      } else if (userGuess < randomNumber) {
        showMessage('Too low! Try again.', 'red');
        const progressPercentage = (userGuess - minRange) / (randomNumber - minRange) * 100;
        updateProgressBar(progressPercentage);
      } else {
        showMessage('Too high! Try again.', 'red');
        const progressPercentage = (maxRange - userGuess) / (maxRange - randomNumber) * 100;
        updateProgressBar(progressPercentage);
      }
  
      guessInput.value = '';
      guessInput.focus();
      updateScoreDisplay(Math.round(score));
    }
  
    // Function to calculate the score
    function calculateScore(attempts) {
        const range = maxRange - minRange + 1;
        const maxScore = range * 100;
        const score = maxScore / attempts;
        return score;
    }
  
    // Function to display a message
    function showMessage(text, color) {
      message.textContent = text;
      message.style.color = color;
    }
  
  // Function to update the progress bar
  function updateProgressBar(percentage) {
    progressBar.style.width = `${percentage}%`;
  }

  // Function to update the score display
  function updateScoreDisplay(score) {
    scoreDisplay.textContent = `Score: ${score}`;
  }

  // Function to add a score to the high scores array
  function addScoreToHighScores(score) {
    const playerName = playerNameInput.value.trim();
    if (!playerName) return;
    highScores.push({ name: playerName, score: score });
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 5); // Keep only the top 5 scores
    updateLeaderboard();
  }

  // Function to update the leaderboard
  function updateLeaderboard() {
    highScoresList.innerHTML = '';
    highScores.forEach((score, index) => {
      const rank = index + 1;
      const tr = document.createElement('tr');
      const rankTd = document.createElement('td');
      rankTd.textContent = rank;
      const nameTd = document.createElement('td');
      nameTd.textContent = score.name;
      const scoreTd = document.createElement('td');
      scoreTd.textContent = Math.round(score.score);
      tr.appendChild(rankTd);
      tr.appendChild(nameTd);
      tr.appendChild(scoreTd);
      highScoresList.appendChild(tr);
    });
  }

  // Attach event listener to the range button
  rangeButton.addEventListener('click', startGame);

  // Attach event listener to the guess button
  guessButton.addEventListener('click', handleGuess);

  // Attach event listener to the play again button
  playAgainButton.addEventListener('click', function() {
    playAgainButton.disabled = true;
    playAgainButton.classList.add('disabled');
    rangeButton.disabled = false;
    rangeButton.classList.remove('disabled');
    guessInput.disabled = true;
    guessButton.disabled = true;
    minInput.value = '';
    maxInput.value = '';
    playerNameInput.value = '';
    minInput.focus();
  });
});


  