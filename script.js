document.addEventListener('DOMContentLoaded', function() {
  let minRange;
  let maxRange;
  let randomNumber;
  let attempts = 0;

  const minInput = document.getElementById('min-input');
  const maxInput = document.getElementById('max-input');
  const rangeButton = document.getElementById('range-button');
  const guessInput = document.getElementById('guess-input');
  const guessButton = document.getElementById('guess-button');
  const message = document.getElementById('message');
  const progressBar = document.getElementById('progress-bar');

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
      showMessage(`Congratulations! You guessed the correct number in ${attempts} attempts.`, 'green');
      guessInput.disabled = true;
      guessButton.disabled = true;
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

  // Attach event listener to the range button
  rangeButton.addEventListener('click', startGame);

  // Attach event listener to the guess button
  guessButton.addEventListener('click', handleGuess);
});
