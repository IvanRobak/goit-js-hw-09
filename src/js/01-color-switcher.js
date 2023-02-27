const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId;

startButton.addEventListener('click', startChangingBackgroundColor);
stopButton.addEventListener('click', stopChangingBackgroundColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startChangingBackgroundColor() {
  startButton.disabled = true;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChangingBackgroundColor() {
  startButton.disabled = false;
  clearInterval(intervalId);
}
