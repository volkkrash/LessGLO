document.addEventListener('DOMContentLoaded', function() {
  'use strict';

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
  countTimer('24 September 2019');

  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      if (screen.width > 480) {
        menu.classList.toggle('active-menu');
      } else {
        if (!menu.style.transform || menu.style.transform === 'translate(-100%)') {
          menu.style.transform = 'translate(0)';
        } else {
          menu.style.transform = 'translate(-100%)';
        }
      }
      
    };
    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);

    for(let i = 0; i < menuItems.length; i++) {
      menuItems[i].addEventListener('click', handlerMenu);
    }
    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
  };
  toggleMenu();

  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupClose = document.querySelector('.popup-close');

          

          const animatePop = (a, speed) => {
            requestAnimationFrame(() => {
              if (a < 1) {
                popup.style.opacity = `${a}`;
                a += 0.05;
                animatePop(a);
              } else {
                a = 1;
              }
            });
          };


    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        popup.style.display = 'block';
        if (screen.width > 480) {
          animatePop(0);
        }
      });
    });
    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  };
  togglePopUp();


});