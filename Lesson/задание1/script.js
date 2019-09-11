
function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.addElem = function() {
  let el;
  if (this.selector[0] === '#') {
    el = document.createElement('p');
  } else if (this.selector[0] === '.') {
    el = document.createElement('div');
  } else {
    return;
  }
  
  el.style.cssText = `height: ${elem.height}; width: ${elem.width}; background: ${elem.bg}; font-size: ${elem.fontSize};`;
  document.body.prepend(el);
};

let elem = new DomElement('.hello', '100px', '100px', 'red', '24px');
elem.addElem();
console.log('elem: ', elem);