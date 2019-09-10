"use strict";

let start = document.querySelector('#start'),
    cancel = document.querySelector('#cancel'),
    addIncomeButton = document.querySelector('.income button'),
    addExpensesButton = document.querySelector('.expenses button'),
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    budgetDayVal = document.querySelector('.budget_day-value'),
    budgetMonthVal = document.querySelector('.budget_month-value'),
    expensesMonthVal = document.querySelector('.expenses_month-value'),
    additionalIncomeVal = document.querySelector('.additional_income-value'),
    additionalExpensesVal = document.querySelector('.additional_expenses-value'),
    incomePeriodVal = document.querySelector('.income_period-value'),
    targetMonthVal = document.querySelector('.target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItems = document.querySelectorAll('.income-items');


    let appData = {
      budget: 0,
      budgetDay: 0,
      budgetMonth: 0,
      expensesMonth: 0,
      income: {},
      incomeMonth: 0,
      addIncome: [],
      expenses: {},
      addExpenses: [],
      deposit: false,
      percentDeposit: 0,
      moneyDeposit: 0,
      start: function() {
        if (salaryAmount.value === '') {
          start.addEventListener('click', function(event) {
            event.preventDefault();
          });
          return;
        }
        appData.budget = +salaryAmount.value;

        let allInputs = document.querySelectorAll('.data input[type=text]'),
            checkbox = document.querySelectorAll('input[type="checkbox"]');
        allInputs.forEach(function(item){
          item.disabled = true;
        });
        checkbox.forEach(function(item){
          item.disabled = true;
        });
        addExpensesButton.style.visibility = 'hidden';
        addIncomeButton.style.visibility = 'hidden';
        periodSelect.disabled = true;
        start.style.display = 'none';
        cancel.style.display = 'inline-block';
        


        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        
        this.showResult();
      },
      reset: function() {
        let allInput = document.querySelectorAll('input[type="text"]'),
            dataInput = document.querySelectorAll('.data input[type="text"]'),
            checkbox = document.querySelectorAll('input[type="checkbox"]');
        allInput.forEach(function(item) {
          item.value = '';
        });
        dataInput.forEach(function(item) {
          item.removeAttribute('disabled', 'true');
        });
        checkbox.forEach(function(item) {
          item.removeAttribute('disabled', 'true');
          item.checked = false;
        });
        let removeAddBlock = function(arr) {
          arr.forEach(function(item, i) {
            if (i >= 1) {
              item.remove();
            }
          });
        };
        removeAddBlock(expensesItems);
        removeAddBlock(incomeItems);
        periodSelect.removeAttribute('disabled', 'true');
        addExpensesButton.style.visibility = '';
        addIncomeButton.style.visibility = '';
        addExpensesButton.style.display = '';
        addIncomeButton.style.display = '';
        

        cancel.style.display = 'none';
        start.style.display = 'inline-block';

        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
      },
      showResult: function() {
        budgetMonthVal.value = this.budgetMonth;
        budgetDayVal.value = this.budgetDay;
        expensesMonthVal.value = this.expensesMonth;
        additionalExpensesVal.value = this.addExpenses.join(', ');
        additionalIncomeVal.value = this.addIncome.join(', ');
        targetMonthVal.value = Math.ceil(this.getTargetMonth());
        incomePeriodVal.value = this.calcPeriod();

        
        periodSelect.addEventListener('input', function() {
          incomePeriodVal.value = appData.calcPeriod();
        });

      },
      addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpensesButton);
            expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
          addExpensesButton.style.display = 'none';
        }
      },
      addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncomeButton);
            incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
          addIncomeButton.style.display = 'none';
        }
      },
      getExpenses: function() {
        expensesItems.forEach(function(item) {
          let itemExpenses = item.querySelector('.expenses-title').value,
              cashExpenses = item.querySelector('.expenses-amount').value;
          if(itemExpenses !== '' && cashExpenses !== '') {
            appData.expenses[itemExpenses] = cashExpenses;
          }
        });
      },
      getIncome: function() {
        incomeItems.forEach(function(item) {
          let itemIncome = item.querySelector('.income-title').value,
              cashIncome = item.querySelector('.income-amount').value;
          if(itemIncome !== '' && cashIncome !== '') {
            appData.income[itemIncome] = cashIncome;
          }
        });

        for (let key in this.income) {
          this.incomeMonth += +this.income[key];
        }
      },
      getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
          item = item.trim();
          if (item !== '') {
            appData.addExpenses.push(item);
          }
        });
      },
      getAddIncome: function() {
        
        additionalIncomeItems.forEach(function(item) {
          let itemValue = item.value.trim();
          if (itemValue !== ''){
            appData.addIncome.push(itemValue);
          }
        });
      },
      getExpensesMonth: function() {
        for (let key in this.expenses) {
          this.expensesMonth += +this.expenses[key];
        }
        return this.expensesMonth;
      },
      getBudget: function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        
        this.budgetDay = Math.floor((this.budgetMonth / 30));
      },
      getTargetMonth: function() {
        let monthCompleteMission = targetAmount.value / this.budgetMonth;
        return monthCompleteMission;
      },
      getStatusIncome: function() {
        if (this.budgetDay >= 800) {
          return('Высокий уровень дохода');
        } else if ((this.budgetDay >= 300)) {
          return ('Средний уровень дохода');
        } else if ((this.budgetDay >= 0)) {
          return ('Низкий уровень дохода');
        } else {
          return ('Что-то пошло не так');
        }
      },
      getInfoDeposit: function() {
        if (this.deposit) {
          do {
            this.percentDeposit = +prompt('Какой годовой процент?', '10');
            }
            while (this.percentDeposit === 0 || isNaN(this.percentDeposit));
          do {
            this.moneyDeposit = +prompt('Какая сумма заложена?', '10000');
            }
            while (this.moneyDeposit === 0 || isNaN(this.moneyDeposit));
        }
      },
      calcPeriod: function() {
        return this.budgetMonth * periodSelect.value;
      }
    };

start.addEventListener('click', appData.start.bind(appData));
addExpensesButton.addEventListener('click', appData.addExpensesBlock);
addIncomeButton.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function() {
  periodAmount.textContent = periodSelect.value;
});
cancel.addEventListener('click', appData.reset.bind(appData));




// if (appData.deposit) {
//   appData.getInfoDeposit();
// }




// if (appData.getTargetMonth() > 0) {
//   console.log('Для достижения цели требуется: ' + appData.getTargetMonth() + ' месяца.');
// } else {
//   console.log('Цель не будет достигнута');
// }

// console.log('Наша программа включает в себя данные:');
// for (let key in appData) {
//   console.log(key + ' : ', appData[key]);
// }


// // Возможные расходы (addExpenses) вывести строкой в консоль каждое слово с большой буквы слова разделены запятой и пробелом
// let expToStr = function(arr) {
//   let modifiedArr = [];
//   arr.forEach(function(item) {
//     let upperFirstElem = item[0].toUpperCase() + item.slice(1);
//     modifiedArr.push(upperFirstElem);
//   });
  
//   return modifiedArr.join(', ');
// };

// console.log(expToStr(appData.addExpenses));




