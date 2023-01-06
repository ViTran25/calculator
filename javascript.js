// function for basic math operators
const add = (a, b) => a+b;

const subtract = (a, b) => a-b;

const multiply = (a, b) => a*b;

const divide = (a, b) => a/b;
//
function operate(a, b, operator) {
    let result = 0;
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case 'x':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
    }
    return result;
}

// Create variables to store the input.
// Each number and operator will be stored in 
// the array by the user's click order.
let currentNumber = '';
let userInput = [];

/*Create the functions that populate the display 
when the user click the number buttons*/ 
const display = document.querySelector('.display-screen');

const digits = document.querySelectorAll('.digit');
digits.forEach(digit => digit.addEventListener('click', inputDigit));

const operators = document.querySelectorAll('.operator');
operators.forEach(operator => 
    operator.addEventListener('click', inputOperator))

function inputDigit(e) {
    display.textContent += e.target.id;
    currentNumber += e.target.id;
}
function inputOperator(e) {
    display.textContent += e.target.id;
    if (currentNumber != '') {
        userInput.push(Number(currentNumber));
        currentNumber = '';
    }
    userInput.push(e.target.id);
}
