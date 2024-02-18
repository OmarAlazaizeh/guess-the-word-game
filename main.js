// Game Name
let gameName = "Guess the Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game created by Omar Alazaizeh with help from Elzero Web School &copy; ${new Date().getFullYear()}`;

// Game Options
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

// Manage Words
let wordToGuess = "";
let words = [
  "Create",
  "Update",
  "Delete",
  "Master",
  "Branch",
  "Mainly",
  "Elzero",
  "School",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");

// Manage Hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);

function generateInput() {
  let inputContainer = document.querySelector(".inputs");

  // Creat main try div
  for (let i = 1; i <= numberOfTries; i++) {
    let tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disabled-inputs");

    // Creat inputs
    for (let j = 1; j <= numberOfLetters; j++) {
      let input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }

    inputContainer.appendChild(tryDiv);
  }

  inputContainer.children[0].children[1].focus();
  // focusedInput = inputContainer.children[0].children[1];

  // Disable all inputs exept first one
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));

  // t
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      // console.log(index);
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      // console.log(event);

      const currentIndex = Array.from(inputs).indexOf(this);
      // console.log(currentIndex);

      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
      if (event.key === "Backspace") {
        const prevIndex = currentIndex - 1;
        if (inputs[currentIndex].value.length !== 0) {
          inputs[currentIndex].value = "";
        } else if (prevIndex >= 0) {
          inputs[prevIndex].value = "";
          inputs[prevIndex].focus();
        }
        // console.log(inputs[prevIndex].value.length);
      }
    });
  });
}

console.log(wordToGuess);

const guessButton = document.querySelector(".check");
const hintButton = document.querySelector(".hint");

guessButton.addEventListener("click", handleGuesses);

function handleGuesses() {
  let successGuess = true;

  for (let i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const realLetter = wordToGuess[i - 1];

    // Game Logic
    if (letter === realLetter) {
      // letter is correct and in place
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && inputField.value !== "") {
      // letter is correct but not in place
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      // letter in wrong
      inputField.classList.add("wrong");
      successGuess = false;
    }
  }

  // chech if user won or lost
  if (successGuess) {
    messageArea.innerHTML = `Congrats, you win. The word is <span>${wordToGuess}</span>`;

    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

    guessButton.disabled = true;
    hintButton.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputs");
    const currentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryInputs.forEach((input) => (input.disabled = true));

    currentTry++;

    const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInputs.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-inputs");
      el.children[1].focus();
    } else {
      guessButton.disabled = true;
      hintButton.disabled = true;

      messageArea.innerHTML = `Sorry, you lost. The word is <span>${wordToGuess}</span>`;
    }
  }
}

function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) {
    getHintButton.disabled = true;
  }
  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  // console.log(enabledInputs);
  const EmptyEnabledInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );
  // console.log(EmptyEnabledInputs);

  if (EmptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * EmptyEnabledInputs.length);
    const randomInbut = EmptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInbut);
    // console.log(randomIndex);
    // console.log(randomInbut);
    // console.log(indexToFill);

    if (indexToFill !== -1) {
      randomInbut.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}

window.onload = () => {
  generateInput();
  // focusedInput.focus();
};

// window.addEventListener("load", (e) => {
//   focusedInput.focus(); // adding the focus
//   generateInput();
// });
