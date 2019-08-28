"use strict";

let money,
    income = "Фриланс",
    addExpenses,
    deposit = false,
    mission = 120000,
    period = 6,
    daysInMonth = 30,
    budgetMonth;


money = prompt('Ваш месячный доход?', '');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
console.log(addExpenses.split(', '));

deposit = confirm('Есть ли у вас депозит в банке?');

console.log('money: ', money);
console.log('income: ', income);
console.log('deposit: ', deposit);


// обязательные месячные расходы
let obligatoryExpenses = {};
for (let i = 0; i < 2; i++) {
  let a = prompt ('Какие обязательные ежемесячные расходы у вас есть?', ''),
      b = prompt ('Во сколько это обойдется?', '');

  if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
    obligatoryExpenses[a] = b;
  } else {
      i--;
  }
}


// доход за месяц с учетом обязательных расходов
budgetMonth = money;
for (let key in obligatoryExpenses) {
  budgetMonth -= obligatoryExpenses[key];
}
console.log(budgetMonth);

// считаем кол-во месяцев для достижения mission
let monthCompleteMission = mission / budgetMonth;
console.log('monthCompleteMission: ', Math.ceil(monthCompleteMission));

//бюджет на день
let budgetDay = budgetMonth / daysInMonth;
console.log('budgetDay: ', Math.floor(budgetDay));

//уровень дохода
if (budgetDay >= 800) {
  console.log('Высокий уровень дохода');
} else if ((budgetDay >= 300)) {
  console.log('Средний уровень дохода');
} else if ((budgetDay >= 0)) {
  console.log('Низкий уровень дохода');
} else {
  console.log('Что-то пошло не так');
}