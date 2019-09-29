const formInputValid = () => {

  const inputs = document.querySelectorAll('form input');
  inputs.forEach((item) => {
      item.addEventListener('input', (event) => {
        let target = event.target;
        let targetAttrName = target.getAttribute('name');
        if (targetAttrName === 'user_phone') {
          target.value = target.value.replace(/[^0-9\+]+/g, '');
        } else if (targetAttrName === 'user_name' || targetAttrName === 'user_message') {
          target.value = target.value.replace(/[^а-я\s]+/gi, '');
        }
      });
    });
};

export default formInputValid;