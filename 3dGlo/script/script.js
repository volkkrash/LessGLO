document.addEventListener('DOMContentLoaded', () => {
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


  const isMobile = () => {
    return (screen.width > 480);
    };

  const toggleMenu = () => {
    const menu = document.querySelector('menu'),
          body = document.querySelector('body');

    const handlerMenu = () => {
      if (isMobile()) {
        menu.removeAttribute('style');
        menu.classList.toggle('active-menu');
        }  else {
        if(!menu.style.transform || menu.style.transform === `translate(-100%)`) {
          menu.style.transform = `translate(0)`;
        } else {
          menu.style.transform = `translate(-100%)`;
        }
      }
    };

      body.addEventListener('click', (event) => {
        let target = event.target;
        console.log(target);
          if (target.closest('.menu')) {
            handlerMenu();
          } else if (menu.classList.contains('active-menu') && !(target.closest('.active-menu'))) {
            handlerMenu();
          }  else if (target.closest('.active-menu') && !target.classList.contains('active-menu')) {
            handlerMenu();
        }
      });
    
  };
  toggleMenu();

  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn');

          const animatePop = (a) => {
            requestAnimationFrame(() => {
              if (a < 1.01) {
                popup.style.opacity = `${a}`;
                a += 0.05;
                animatePop(a);
              }
            });
          };
    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        popup.style.display = 'block';
        if (isMobile()) {
          animatePop(0);
        }
      });
    });

    popup.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popup.style.display = 'none';
        }
      }
    });
  };
  togglePopUp();

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabContent =document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for(let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };
    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
          target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();

});