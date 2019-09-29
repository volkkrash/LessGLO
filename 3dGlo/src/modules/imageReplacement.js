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

export default imageReplacement;