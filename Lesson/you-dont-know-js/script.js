// Восстановить порядок книг

let books = document.querySelector('.books');
let book = document.querySelectorAll('.book');
console.log('book: ', book);

books.prepend(book[1]);
books.append(book[2]);
book[3].before(book[4]);

// Заменить картинку заднего фона на другую из папки image

document.querySelector('body').style.backgroundImage='url(./image/adv.jpg)';

// Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")

book[4].querySelector('a').innerText='Книга 3. this и Прототипы Объектов';

// Удалить рекламу со страницы

document.querySelector('.adv').remove();

// Восстановить порядок глав во второй и пятой книге

let li2 = book[0].querySelectorAll('li');
li2[9].append(li2[2]);
li2[3].append(li2[6]);
li2[3].append(li2[8]);

let li5 = book[5].querySelectorAll('li');
li5[1].append(li5[9]);
li5[8].prepend(li5[5]);
li5[4].append(li5[2]);

// в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место

let li6 = book[2].querySelectorAll('li');
let newLi = document.createElement('li');
newLi.textContent = 'Глава 8: За пределами ES6';
li6[8].append(newLi);