"use strict";

let money,
    income = "Фриланс",
    addExpenses,
    deposit = false,
    mission = 120000,
    period = 6,
    daysInMonth = 30;


let start = function() {
  do {
    money = prompt('Ваш месячный доход?', '');
  } while (isNaN(money) || money === '' || money === null);
};

start();

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');

deposit = confirm('Есть ли у вас депозит в банке?');


let showTypeof = function(data) {
  console.log(typeof data);
};

showTypeof(money);
showTypeof(income);
showTypeof(deposit);


// обязательные месячные расходы
function getExpensesMonth() {
  let obligatoryExpenses = {};
  let summObligatoryExpenses = 0;

  for (let i = 0; i < 2; i++) {
    let a = prompt ('Какие обязательные ежемесячные расходы у вас есть?', ''),
        b = +prompt ('Во сколько это обойдется?', '');

    if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
      obligatoryExpenses[a] = b;
    } else {
        i--;
    }
  }

  for (let key in obligatoryExpenses) {
    summObligatoryExpenses += obligatoryExpenses[key];
  }
  return summObligatoryExpenses;
}


// доход за месяц с учетом обязательных расходов
function getAccumulatedMonth() {
  let budgetMonth = money - getExpensesMonth();
  return budgetMonth;
}
let accumulatedMonth = getAccumulatedMonth();
console.log('Накопления за период: ' + accumulatedMonth);

// считаем кол-во месяцев для достижения mission
let getTargetMonth = function() {
  let monthCompleteMission = mission / accumulatedMonth;
  Math.floor(monthCompleteMission);
  return Math.floor(monthCompleteMission);
};
if (getTargetMonth() > 0) {
  console.log('Для достижения цели требуется: ' + getTargetMonth() + ' месяца.');
} else {
  console.log('Цель не будет достигнута');
}

//бюджет на день
let budgetDay = accumulatedMonth / daysInMonth;
console.log('Бюджет на день: ' + Math.floor(budgetDay));

//уровень дохода
let getStatusIncome = function() {
  if (budgetDay >= 800) {
    return('Высокий уровень дохода');
  } else if ((budgetDay >= 300)) {
    return ('Средний уровень дохода');
  } else if ((budgetDay >= 0)) {
    return ('Низкий уровень дохода');
  } else {
    return ('Что-то пошло не так');
  }
};
console.log(getStatusIncome());