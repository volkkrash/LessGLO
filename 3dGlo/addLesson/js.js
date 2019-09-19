'use strict';

let hello = document.querySelector('.hello'),
    day = document.querySelector('.day'),
    time = document.querySelector('.time'),
    timeRemaining = document.querySelector('.time-remaining');



let dateNow = new Date(),
    dateNY = new Date(2020, 0, 1),
    dateRemainig = Math.floor((dateNY.getTime() - dateNow.getTime()) / 1000 / 60 / 60 / 24);

if (dateNow.getHours() < 6) {
  hello.textContent = 'Доброй ночи';
} else if (dateNow.getHours() < 12) {
  hello.textContent = 'Доброе утро';
} else if (dateNow.getHours() < 18) {
  hello.textContent = 'Добрый день';
} else {
  hello.textContent = 'Добрый вечер';
}
day.textContent = 'Сегодня: ' + dateNow.toLocaleString('Ru', {  weekday: 'long' });
time.textContent = 'Текущее время: ' + dateNow.toLocaleString("en-US", {  hour: 'numeric', minute: 'numeric', second: 'numeric' })
timeRemaining.textContent = `До нового года осталось ${dateRemainig} дней`;
