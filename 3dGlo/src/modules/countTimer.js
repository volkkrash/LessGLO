const countTimer = (deadline) => {
  let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

  const getTimeRemaining = () => {
    let dateStop = new Date(deadline).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      seconds = Math.floor(timeRemaining % 60),
      minutes = Math.floor((timeRemaining / 60) % 60),
      hours = Math.floor(timeRemaining / 60 / 60);
      return {
        timeRemaining,
        hours,
        minutes,
        seconds
      };
  };
  const updateClock = () => {
    let timer = getTimeRemaining();
    const timeCorrect = (time) => {
      if (time < 10) {
       time = '0' + time;
      }
      return time;
    };

    timerHours.textContent = timeCorrect(timer.hours);
    timerMinutes.textContent = timeCorrect(timer.minutes);
    timerSeconds.textContent = timeCorrect(timer.seconds);
    
    if (timer.timeRemaining < 0) {
      clearInterval(timerId);
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';
    }
    
  };
  let timerId = setInterval(updateClock, 1000);

};

export default countTimer;