const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

  const form = document.querySelectorAll('form[name="user_form"]');
  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'color: #c3c3c3; border-top: 1px solid #fff; border-bottom: 1px solid #fff; border-radius: 5px; display: inline-block; padding: 5px 10px; background-color: rgba(255, 255, 255, .1); margin: 10px;';

  form.forEach((item) => {
    item.addEventListener('submit', (event) => {
      event.preventDefault();
      item.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(item);
      
      postData(formData)
        .then ((response) => {
          if (response.status !== 200) {
            throw new Error ('Status network not 200');
          }
          statusMessage.textContent = successMessage;
          let clearD = item.querySelectorAll('input');
          clearD.forEach((item) => {
            item.value = '';
         });
        })
        .catch((error) => {
          statusMessage.textContent = errorMessage;
          console.error(error);
        });
    });
  });

  const postData = (formData) => {
    return fetch('./server.php', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: formData});
  };
};

export default sendForm;