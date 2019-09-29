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

export default togglePopUp;