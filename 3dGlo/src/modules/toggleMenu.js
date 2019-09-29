import isMobile from './isMobile';

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

export default toggleMenu;