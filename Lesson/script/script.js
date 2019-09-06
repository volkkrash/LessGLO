"use strict";

let money,
    cashIncome;

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
      percentDeposit: 0,
      moneyDeposit: 0,
      mission: 150000,
      period: 6,
      asking: function() {
        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
          let itemIncome;
          do {
          itemIncome = prompt('Какой у вас дополнительный заработок?', 'Пишу стихи');
          }
          while (itemIncome === '' || itemIncome === null);
          do {
          cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '3000');
          }
          while (cashIncome === null || cashIncome === '' || isNaN(cashIncome));
          cashIncome = +cashIncome;

          appData.income[itemIncome] = cashIncome;
        }
          let addExpenses;
          do {
          addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'пиво,пиво,водочка');
          }
          while (addExpenses === '' || addExpenses === null);
          appData.addExpenses = addExpenses.toLowerCase().split(',');
          
          appData.deposit = confirm('Есть ли у вас депозит в банке?');
             
          let a, b;
          for (let i = 0; i < 2; i++) {
                
            do {
              a = prompt ('Какие обязательные ежемесячные расходы у вас есть?', 'Подруга' + (i+1));
            }
            while (typeof(a) != 'string' || a === '' || a === null);
            do {
              b = +prompt ('Во сколько это обойдется?', '5000');
            }
            while (b  === 0 || isNaN(b) || b === '' || b === null);
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
        appData.budgetMonth = money - appData.expensesMonth + cashIncome;
        
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
      },
      getInfoDeposit: function() {
        if (appData.deposit) {
          do {
            appData.percentDeposit = +prompt('Какой годовой процент?', '10');
            }
            while (appData.percentDeposit === 0 || isNaN(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === null);
          do {
            appData.moneyDeposit = +prompt('Какая сумма заложена?', '10000');
            }
            while (appData.moneyDeposit === 0 || isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === null);
        }
      },
      calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
      }
    };

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
if (appData.deposit) {
  appData.getInfoDeposit();
}


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


// Возможные расходы (addExpenses) вывести строкой в консоль каждое слово с большой буквы слова разделены запятой и пробелом
let expToStr = function(arr) {
  let modifiedArr = [];
  arr.forEach(function(item) {
    let upperFirstElem = item[0].toUpperCase() + item.slice(1);
    modifiedArr.push(upperFirstElem);
  });
  
  return modifiedArr.join(', ');
};

console.log(expToStr(appData.addExpenses));
