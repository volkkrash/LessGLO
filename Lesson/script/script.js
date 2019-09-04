"use strict";

let money;

let start = function() {
  do {
    money = prompt('Ваш месячный доход?', '50000');
  } while (isNaN(money) || money === '' || money === null);
  money = +money;
};
    
start();

    let appData = {
      income: {},
      addIncome: [],
      expenses: {},
      addExpenses: [],
      deposit: false,
      mission: 150000,
      period: 6,
      asking: function() {
          let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'пиво,пиво,водочка');
              appData.addExpenses = addExpenses.toLowerCase().split(',');
              appData.deposit = confirm('Есть ли у вас депозит в банке?');
             
              for (let i = 0; i < 2; i++) {
                let a = prompt ('Какие обязательные ежемесячные расходы у вас есть?', ''),
                    b = +prompt ('Во сколько это обойдется?', '');
            
                if (typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
                  appData.expenses[a] = b;
                } else {
                    i--;
                }
              }
        },
      budget: money,
      budgetDay: 0,
      budgetMonth: 0,
      expensesMonth: 0
    };

appData.asking();


// обязательные месячные расходы
appData.getExpensesMonth = function() {
  for (let key in appData.expenses) {
    appData.expensesMonth += appData.expenses[key];
  }
  return appData.expensesMonth;
};


// доход за месяц с учетом обязательных расходов
appData.getBudget = function() {
  appData.budgetMonth = money - appData.getExpensesMonth();
  appData.budgetDay = appData.budgetMonth / 30;
};
appData.getBudget();

// считаем кол-во месяцев для достижения mission
appData.getTargetMonth = function() {
  let monthCompleteMission = appData.mission / appData.budgetMonth;
  
  return Math.ceil(monthCompleteMission);
};


//уровень дохода
appData.getStatusIncome = function() {
  if (appData.budgetDay >= 800) {
    return('Высокий уровень дохода');
  } else if ((appData.budgetDay >= 300)) {
    return ('Средний уровень дохода');
  } else if ((appData.budgetDay >= 0)) {
    return ('Низкий уровень дохода');
  } else {
    return ('Что-то пошло не так');
  }
};
console.log(appData.getStatusIncome());
console.log('Расходы за месяц составляют: ' + appData.getExpensesMonth());

if (appData.getTargetMonth() > 0) {
  console.log('Для достижения цели требуется: ' + appData.getTargetMonth() + ' месяца.');
} else {
  console.log('Цель не будет достигнута');
}

console.log('Наша программа включает в себя данные:');
for (let key in appData) {
  console.log(key + ' : ', appData[key]);
}