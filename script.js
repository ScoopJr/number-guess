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
    const saveButton = document.getElementById('save-button');
  
    // Function to start the game
    function startGame() {
      minRange = parseInt(minInput.value);
      maxRange = parseInt(maxInput.value);
  
      // Check if the range is valid
      if (isNaN(minRange) || isNaN(maxRange) || minRange >= maxRange) {
        showMessage('Please enter a valid range.', 'red');
        return;
      }
  
      // Generate a random number within the range
      randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
  
      // Enable guess input and button
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
        showMessage(`Congratulations! You guessed the correct number in ${attempts} attempts. Your score is ${score}.`, 'green');
        guessInput.disabled = true;
        guessButton.disabled = true;
        addScoreToHighScores(score);
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
      updateScoreDisplay(score);
    }
  
    // Function to calculate the score
    function calculateScore(attempts) {
      return 10000 / attempts;
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
        const li = document.createElement('li');
        li.textContent = `${score.name}: ${score.score}`;
        highScoresList.appendChild(li);
      });
    }
  
    // Attach event listener to the range button
    rangeButton.addEventListener('click', startGame);
  
    // Attach event listener to the guess button
    guessButton.addEventListener('click', handleGuess);
  
    // Attach event listener to the save score button
    saveButton.addEventListener('click', function() {
      const score = parseInt(scoreDisplay.textContent.split(': ')[1]);
      addScoreToHighScores(score);
    });
  });
  
  