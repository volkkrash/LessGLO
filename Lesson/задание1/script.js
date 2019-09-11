
function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.addElem = function() {
  let el,
      body = document.querySelector('body');
  if (this.selector[0] === '#') {
    el = document.createElement('p');
    // el.textContent = 'Привет!!!!!!';
  } else if (this.selector[0] === '.') {
    el = document.createElement('div');
  } else {
    return;
  }
  
  el.style.cssText = `height: ${elem.height}px; width: ${elem.width}px; background: ${elem.bg}; font-size: ${elem.fontSize}px;`;
  // el.classList.add(`${elem.selector}`);
  body.prepend(el);
};

let elem = new DomElement('.hello', '100', '100', 'red', '24');
elem.addElem();
console.log('elem: ', elem);