let keys = document.querySelectorAll('.key');
let letters = document.querySelectorAll('.letter');
let attemptedWord = '';
let guesses = [];
const correctWord = 'MONEY';

setGuesses = (text) => {
  guesses.push(text);
  console.log(guesses);
};

const setAttemptedWord = (key) => {
  attemptedWord += key;
  setLetter(key);
  console.log(attemptedWord);
};

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

const onEnter = () => {
  if (attemptedWord.length < 5) {
    alert('Word should be 5 characters long.');
    return;
  }

  if (attemptedWord.length == 5 && guesses.length < 6) {
    setGuesses(attemptedWord);
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

  if (letters[29].innerHTML) {
    alert('You exhausted all guesses');
    setLetter(key);
    return;
  }
  letters[letterPos].innerText = key;
  letterPos++;
};
