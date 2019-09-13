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
    depositBank = document.querySelector('.deposit-bank'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItems = document.querySelectorAll('.income-items');

    const AppData = function() {
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
    };

    AppData.prototype.start = function() {
      if (salaryAmount.value === '') {
        start.addEventListener('click', (event) => {
          event.preventDefault();
        });
        return;
      }
      this.budget = +salaryAmount.value;

      const allInputs = document.querySelectorAll('.data input[type=text]'),
            checkbox = document.querySelectorAll('input[type="checkbox"]');
      allInputs.forEach((item) => {
        item.disabled = true;
      });
      checkbox.forEach((item) => {
        item.disabled = true;
      });
      addExpensesButton.style.visibility = 'hidden';
      addIncomeButton.style.visibility = 'hidden';
      start.style.display = 'none';
      cancel.style.display = 'inline-block';
      


      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getInfoDeposit();
      // this.getAddExpenses();
      // this.getAddIncome();
      this.getAddMoney(additionalIncomeItems, this.addIncome);
      this.getAddMoney(additionalExpensesItem, this.addExpenses);
      this.getBudget();
      
      this.showResult();
    };
    AppData.prototype.reset = function() {
      let allInput = document.querySelectorAll('input[type="text"]'),
          dataInput = document.querySelectorAll('.data input[type="text"]'),
          checkbox = document.querySelectorAll('input[type="checkbox"]');
      allInput.forEach((item) => {
        item.value = '';
      });
      dataInput.forEach((item) => {
        item.removeAttribute('disabled', 'true');
      });
      checkbox.forEach((item) => {
        item.removeAttribute('disabled', 'true');
        item.checked = false;
      });
      const removeAddBlock = function(arr) {
        let classElem = arr[0].className;
        arr = document.querySelectorAll('.' + classElem);
        arr.forEach((item, i) => {
          if (i >= 1) {
            item.remove();
          }
        });
      };
      removeAddBlock(expensesItems);
      removeAddBlock(incomeItems);
      addExpensesButton.style.visibility = '';
      addIncomeButton.style.visibility = '';
      addExpensesButton.style.display = '';
      addIncomeButton.style.display = '';
      
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';



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
    };
    AppData.prototype.showResult = function() {
      budgetMonthVal.value = this.budgetMonth;
      budgetDayVal.value = this.budgetDay;
      expensesMonthVal.value = this.expensesMonth;
      additionalExpensesVal.value = this.addExpenses.join(', ');
      additionalIncomeVal.value = this.addIncome.join(', ');
      targetMonthVal.value = Math.ceil(this.getTargetMonth());
      incomePeriodVal.value = this.calcPeriod();

      
      periodSelect.addEventListener('input', () => {
        incomePeriodVal.value = this.calcPeriod();
      });

    };
    AppData.prototype.addBlock = function(clonedItems, button) {
      let cloneItem = clonedItems[0].cloneNode(true);
      clonedItems[0].parentNode.insertBefore(cloneItem, button);
      let classElem = clonedItems[0].className;
      clonedItems = document.querySelectorAll('.' + classElem);
      if(clonedItems.length >= 3) {
        button.style.display = 'none';
      }
    };
    AppData.prototype.getExpenses = function() {
      expensesItems.forEach((item) => {
        const itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== '') {
          this.expenses[itemExpenses] = cashExpenses;
        }
      });
    };
    AppData.prototype.getIncome = function() {
      incomeItems.forEach((item) => {
        const itemIncome = item.querySelector('.income-title').value,
            cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== '') {
          this.income[itemIncome] = cashIncome;
        }
      });

      for (let key in this.income) {
        this.incomeMonth += +this.income[key];
      }
    };
    // СОВМЕСТИТЬ ------------------------------------------------------------------------------------
    // AppData.prototype.getAddExpenses = function() {
    //   const addExpenses = additionalExpensesItem.value.split(',');
    //   addExpenses.forEach((item) => {
    //     item = item.trim();
    //     if (item !== '') {
    //       this.addExpenses.push(item);
    //     }
    //   });
    // };
    AppData.prototype.getAddMoney = function(items, exportArr) {
      let itemsArr;
      if (typeof(items.value) === 'string') {
        itemsArr = items.value.split(',');
      } else {
        itemsArr = items;
      }
      console.log(itemsArr);
      itemsArr.forEach(function(item) {
        let itemValue;
        if (item.value === 'string' && item.value !== '') {
          itemValue = item.value.trim();
          console.log('exc:', item);
          exportArr.push(itemValue);
          
        } else {
          console.log('exp:', item);
          item = item.trim();
          
          if (item !== ''){
            exportArr.push(item);
          }
        }
        
      });
    };
    // AppData.prototype.getAddIncome = function() {
    //   additionalIncomeItems.forEach((item) => {
    //     let itemValue = item.value.trim();
    //     if (itemValue !== ''){
    //       this.addIncome.push(itemValue);
    //     }
    //   });
    // };
    AppData.prototype.getExpensesMonth = function() {
      for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
      }
      return this.expensesMonth;
    };
    AppData.prototype.getBudget = function() {
      this.budgetMonth = Math.floor(this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit)/12);
      this.budgetDay = Math.floor((this.budgetMonth / 30));
    };
    AppData.prototype.getTargetMonth = function() {
      const monthCompleteMission = targetAmount.value / this.budgetMonth;
      return monthCompleteMission;
    };
    AppData.prototype.getStatusIncome = function() {
      if (this.budgetDay >= 800) {
        return('Высокий уровень дохода');
      } else if ((this.budgetDay >= 300)) {
        return ('Средний уровень дохода');
      } else if ((this.budgetDay >= 0)) {
        return ('Низкий уровень дохода');
      } else {
        return ('Что-то пошло не так');
      }
    };
    AppData.prototype.getInfoDeposit = function() {
      if (this.deposit) {
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
      }
    };
    AppData.prototype.calcPeriod = function() {
      return this.budgetMonth * periodSelect.value;
    };
    AppData.prototype.eventsListeners = function() {
      depositCheck.addEventListener('click', () => {
        if(depositCheck.checked) {
          depositBank.style.display = 'inline-block';
          depositAmount.style.display = 'inline-block';
          appData.deposit = 'true';
          depositBank.addEventListener('change', function() {
            let selectIndex = this.options[this.selectedIndex].value;
            if(selectIndex === 'other') {
              depositPercent.style.display = 'inline-block';
              depositPercent.value = '';
            } else {
              depositPercent.style.display = 'none';
              depositPercent.value = selectIndex;
            }
          });
        } else {
          depositBank.style.display = 'none';
          depositAmount.style.display = 'none';
          depositAmount.value = '';
          appData.deposit = 'false';
        }
      });

      
      addExpensesButton.addEventListener('click', ()=> {
        this.addBlock(expensesItems, addExpensesButton);
      });
      addIncomeButton.addEventListener('click', ()=> {
        this.addBlock(incomeItems, addIncomeButton);
      });
      periodSelect.addEventListener('input', () => {
      periodAmount.textContent = periodSelect.value;
      });

      start.addEventListener('click', this.start.bind(this));
      cancel.addEventListener('click', this.reset.bind(this));
    };


   const appData = new AppData();
   appData.eventsListeners();

    
   console.log(appData);