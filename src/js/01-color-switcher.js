function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const PROMPT_DELAY = 1000;

const startChangeColorBtn = document.querySelector('button[data-start]');
const stopChangeColorBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

startChangeColorBtn.addEventListener('click', changeColor);

function changeColor() {
  startChangeColorBtn.disabled = true;
  timer = setInterval(() => {
    bodyEl.style.backgroundColor = `${getRandomHexColor()}`;
  }, PROMPT_DELAY);
}

stopChangeColorBtn.addEventListener('click', () => {
  clearInterval(timer);
  startChangeColorBtn.disabled = false;
});
