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
             
              let a, b;
              for (let i = 0; i < 2; i++) {
                
                do {
                  a = prompt ('Какие обязательные ежемесячные расходы у вас есть?', 'Подруга' + (i+1));
                }
                while (a === '' || a === null);
                do {
                  b = prompt ('Во сколько это обойдется?', '5000');
                }
                while (isNaN(b) || b === '' || b === null);
                appData.expenses[a] = b;
              }
        },
      budget: money,
      budgetDay: 0,
      budgetMonth: 0,
      expensesMonth: 0,

      getExpensesMonth: function() {
        for (let key in appData.expenses) {
          appData.expensesMonth += +appData.expenses[key];
        }
        return appData.expensesMonth;
      },
      getBudget: function() {
        appData.budgetMonth = money - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
      },
      getTargetMonth: function() {
        let monthCompleteMission = appData.mission / appData.budgetMonth;
        return Math.floor(monthCompleteMission);
      },
      getStatusIncome: function() {
        if (appData.budgetDay >= 800) {
          return('Высокий уровень дохода');
        } else if ((appData.budgetDay >= 300)) {
          return ('Средний уровень дохода');
        } else if ((appData.budgetDay >= 0)) {
          return ('Низкий уровень дохода');
        } else {
          return ('Что-то пошло не так');
        }
      }
    };

appData.asking();
appData.getExpensesMonth();
appData.getBudget();



console.log(appData.getStatusIncome());
console.log('Расходы за месяц составляют: ' + appData.expensesMonth);

if (appData.getTargetMonth() > 0) {
  console.log('Для достижения цели требуется: ' + appData.getTargetMonth() + ' месяца.');
} else {
  console.log('Цель не будет достигнута');
}

console.log('Наша программа включает в себя данные:');
for (let key in appData) {
  console.log(key + ' : ', appData[key]);
}