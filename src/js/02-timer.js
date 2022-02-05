import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const daysEll = document.querySelector('span[data-days]');
const hoursEll = document.querySelector('span[data-hours]');
const minutesEll = document.querySelector('span[data-minutes]');
const secondsEll = document.querySelector('span[data-seconds]');
const style = document.querySelector('.timer');
const stuleInputEll = document.querySelector('#datetime-picker');

startBtn.classList.add('style-btn-start-timer');
style.classList.add('style-timer');
stuleInputEll.classList.add('style-input');

let selectedDate = 0;
let intervalId = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - options.defaultDate > 0) {
      selectedDate = selectedDates[0].getTime();
      startBtn.disabled = false;
    } else {
      Notiflix.Notify.warning('Please choose a date in the future');
      startBtn.disabled = true;
    }
  },
};
const fp = flatpickr('#datetime-picker', options);
startBtn.addEventListener('click', startTimer);

function startTimer() {
  let intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;
    const time = convertMs(deltaTime);
    updateClockface(time);
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  if (ms <= 0) {
    clearInterval(intervalId);
    ms = 0;
  }

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateClockface({ days, hours, minutes, seconds }) {
  daysEll.textContent = days;
  hoursEll.textContent = hours;
  minutesEll.textContent = minutes;
  secondsEll.textContent = seconds;
}
