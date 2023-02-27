import { Notify } from 'notiflix/build/notiflix-notify-aio';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    const selectedDate = selectedDates;

    if (selectedDate.getTime() < Date.now()) {
      Notify.warning('Please choose a date in the future');
      startButton.disabled = true;
      return;
    }

    startButton.disabled = false;

    let countdownInterval;

    function displayTime(days, hours, minutes, seconds) {
      daysField.textContent = days.toString().padStart(2, '0');
      hoursField.textContent = hours.toString().padStart(2, '0');
      minutesField.textContent = minutes.toString().padStart(2, '0');
      secondsField.textContent = seconds.toString().padStart(2, '0');
    }

    function startCountdown() {
      clearInterval(countdownInterval);
      countdownInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDifference = selectedDate.getTime() - currentTime;

        if (timeDifference < 0) {
          clearInterval(countdownInterval);
          Notify.warning('The countdown is finished!');
          return;
        }

        const { days, hours, minutes, seconds } = convertMs(timeDifference);

        displayTime(days, hours, minutes, seconds);
      }, 1000);
    }

    startButton.addEventListener('click', () => {
      startCountdown();
    });
  },
};

flatpickr(datePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
