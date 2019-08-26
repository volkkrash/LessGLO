
let money = 25000,
    income = "Фриланс",
    addExpenses = "Транспорт, Обучение, Дом",
    deposit = false,
    mission = 120000,
    period = 6,
    daysInMonth = 30;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(income.length);

console.log("За " + period + " месяцев необходимо заработать " + mission + " гривен.");

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / daysInMonth;

console.log('budgetDay(результат): ', budgetDay);
console.log('budgetDay(остаток): ', money % daysInMonth);