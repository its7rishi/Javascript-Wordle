let keys = document.querySelectorAll('.key');
let letters = document.querySelectorAll('.letter');
let attemptedWord = '';
let attempt1 = document.querySelectorAll('#attempt1');
let attempt2 = document.querySelectorAll('#attempt2');
let attempt3 = document.querySelectorAll('#attempt3');
let attempt4 = document.querySelectorAll('#attempt4');
let attempt5 = document.querySelectorAll('#attempt5');
let attempt6 = document.querySelectorAll('#attempt6');
let guesses = [];
let wordList;
let correctWord;
let currentAttempt;
let gameWon = false;

fetch('./wordlist.txt')
  .then((res) => res.text())
  .then((data) => {
    wordList = data.split('\n');
    correctWord = wordList[Math.floor(Math.random() * wordList.length)]
      .trim()
      .toUpperCase();

    console.log(correctWord, correctWord.length);
  });

setGuesses = (text) => {
  guesses.push(text);
};

const setAttemptedWord = (key) => {
  attemptedWord += key;
  setLetter(key);
};

// CLICK EVENTS

keys.forEach((key) => {
  key.addEventListener('click', (e) => {
    let keyVal = e.target.innerText;
    if (
      /[a-zA-Z]/.test(keyVal) &&
      keyVal !== 'ENTER' &&
      keyVal !== 'DELETE' &&
      attemptedWord.length !== 5
    ) {
      setAttemptedWord(keyVal);
      return;
    }

    if (keyVal === 'ENTER') {
      onEnter();
      return;
    }

    if (keyVal === 'DELETE') {
      onDelete();
      return;
    }
  });
});

// KEYBOARD EVENTS

document.addEventListener('keypress', (e) => {
  let keyVal = e.key;
  if (
    /[a-zA-Z]/.test(keyVal) &&
    keyVal !== 'Enter' &&
    keyVal !== 'Backspace' &&
    attemptedWord.length !== 5
  ) {
    attemptedWord += keyVal.toUpperCase();
    setLetter(keyVal.toUpperCase());
    return;
  }

  if (keyVal === 'Enter') {
    onEnter();
    return;
  }

  if (keyVal === 'Backspace') {
    onDelete();
    return;
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    onDelete();
    return;
  } else if (e.key === 'Delete') {
    onDelete();
    return;
  } else {
    return;
  }
});

const onEnter = () => {
  if (attemptedWord.length < 5) {
    alert('Word should be 5 characters long.');
    return;
  }

  if (attemptedWord.length == 5 && guesses.length < 6) {
    setGuesses(attemptedWord);
    console.log(currentAttempt);
    const attemptArr = [
      attempt1,
      attempt2,
      attempt3,
      attempt4,
      attempt5,
      attempt6,
    ];
    currentAttempt = attemptArr[guesses.length - 1];

    if (currentAttempt) {
      for (let i = 0; i < correctWord.length; i++) {
        if (
          correctWord.includes(currentAttempt[i].textContent) &&
          correctWord[i] === currentAttempt[i].innerText &&
          correctWord[i].backgroundColor !== '#538D4E'
        ) {
          currentAttempt[i].style.transition = 'all 3s ease';
          currentAttempt[i].style.transform = 'rotateX(360deg)';
          currentAttempt[i].style.backgroundColor = '#538D4E';
          keys.forEach((key) => {
            if (
              key.innerText.toLowerCase() ===
              currentAttempt[i].innerText.toLowerCase()
            ) {
              key.style.backgroundColor = '#538D4E';
            }
          });
        } else if (
          correctWord.includes(currentAttempt[i].innerText) &&
          correctWord[i] !== currentAttempt[i].innerText &&
          correctWord[i].backgroundColor !== '#B59F3B' &&
          correctWord[i].backgroundColor !== '#538D4E' // green
        ) {
          currentAttempt[i].style.transition = 'all 3s ease';
          currentAttempt[i].style.transform = 'rotateX(360deg)';
          currentAttempt[i].style.backgroundColor = '#B59F3B';
          keys.forEach((key) => {
            if (
              key.innerText.toLowerCase() ===
              currentAttempt[i].innerText.toLowerCase()
            ) {
              key.style.backgroundColor = '#B59F3B';
            }
          });
        } else {
          currentAttempt[i].style.transition = 'all 3s ease';
          currentAttempt[i].style.transform = 'rotateX(360deg)';
          currentAttempt[i].style.backgroundColor = '#3A3A3C';
          keys.forEach((key) => {
            if (
              key.innerText.toLowerCase() ===
              currentAttempt[i].innerText.toLowerCase()
            ) {
              key.style.backgroundColor = '#3A3A3C';
            }
          });
        }
      }

      if (attemptedWord === correctWord) {
        gameWon = true;
        setTimeout(() => {
          alert('Great! you guessed correctly');
          location.reload();
        }, 2000);

        return;
      }
    }

    // GAME LOST
    if (guesses.length === 6 && gameWon === false) {
      alert('Never mind, you are out of guesses');
      location.reload();
    }

    attemptedWord = '';
    return;
  }
};

const onDelete = () => {
  if (attemptedWord === '') return;

  if (attemptedWord !== '') {
    attemptedWord = attemptedWord.slice(0, attemptedWord.length - 1);
    console.log(attemptedWord);
    setLetter('DELETE');
    return;
  }
};

// ENTER LETTERS IN THE GRID

let letterPos = 0;
const setLetter = (key) => {
  console.log('letter; ' + key);
  if (key === 'DELETE') {
    if (!letters[0].innerText) return;

    if (letters[0].innerText) {
      attemptedWord.slice(0, attemptedWord.length - 1);
      for (let i = 1; i < letters.length; i++) {
        if (letters[i].innerText === '') {
          letters[i - 1].innerText = '';
          letterPos--;
          return;
        }
      }
    }
  }

  if (letters[29].innerText) {
    setLetter(key);
    callGameLost();
  }
  letters[letterPos].innerText = key;
  letterPos++;
};
