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

  let endSaleTime = new Date().getTime() + 10000000;
  countTimer(endSaleTime);


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

  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
          slider = document.querySelector('.portfolio-content');
    
          const addSliderDots = () => {
            let dotsContainer = document.querySelector('.portfolio-dots');
            for (let i = 0; i < slide.length; i++) {
              let newDot = document.createElement('li');
              newDot.className = 'dot';
              dotsContainer.append(newDot);
              if (i === 0) {
                newDot.classList.add('dot-active');
              }
            }
      };
      addSliderDots();

    let currentSlide = 0,
    interval,
    dot = document.querySelectorAll('.dot');

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };
    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };
    const startSlide = (time = 4000) => {
      interval = setInterval(autoPlaySlide, time);
    };
    const stopSlide = () => {
      clearInterval(interval);
    };
    slider.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide();
      }
    });
    
    startSlide(4000);
  };
  slider();

  const imageReplacement = () => {
    let command = document.querySelector('.command'),
        defaultSrc = '';
    command.addEventListener('mouseover', (e) => {
      if (e.target.className === 'command__photo') {
        defaultSrc = e.target.src;
        e.target.src = e.target.dataset.img;
      }
    });
    command.addEventListener('mouseout', (e) => {
      if (e.target.className === 'command__photo') {
        e.target.src = defaultSrc;
        defaultSrc = '';
      }
    });
  };
  imageReplacement();

  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
          calcType = document.querySelector('.calc-type'),
          calcSquare = document.querySelector('.calc-square'),
          calcDay = document.querySelector('.calc-day'),
          calcCount = document.querySelector('.calc-count'),
          totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0,
          countValue = 1,
          dayValue = 1,
          typeValue = calcType.options[calcType.selectedIndex].value,
          squareValue = +calcSquare.value;
      
      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }
      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }
      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      totalValue.textContent = total;
    };

    calcBlock.addEventListener('change', (event) => {
      let target = event.target;
      if (target.matches('.calc-type') || 
          target.matches('.calc-square') ||
          target.matches('.calc-day') ||
          target.matches('.calc-count')) {
            countSum();
          }
    });
  };
  calc(100);
});