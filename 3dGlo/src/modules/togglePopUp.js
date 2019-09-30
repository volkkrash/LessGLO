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
      if (screen.width > 480) {
        animatePop(0);
      }
    });
  });

  let closePopup = () => {
    let popupForm = popup.querySelector('form'),
        popupInputs = popupForm.querySelectorAll('input'),
        popupFormDiv = popupForm.querySelector('.status-message');
        if (popupFormDiv !== null) {
          popupFormDiv.remove();
        }
    popupInputs.forEach((item) => {
      item.value = '';
    });
    popup.style.display = 'none';
  };

  popup.addEventListener('click', (event) => {
    let target = event.target;

    if (target.classList.contains('popup-close')) {
      closePopup();
    } else {
      target = target.closest('.popup-content');
      if (!target) {
        closePopup();
      }
    }
  });
};

export default togglePopUp;