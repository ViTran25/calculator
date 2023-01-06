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

let finish = false;

/*Create the functions that populate the display 
when the user click the number buttons*/ 
const display = document.querySelector('.display-screen');

const digits = document.querySelectorAll('.digit');
digits.forEach(digit => digit.addEventListener('click', inputDigit));

const operators = document.querySelectorAll('.operator');
operators.forEach(operator => 
    operator.addEventListener('click', inputOperator))

function inputDigit(e) {
    if (finish) reset();
    display.textContent += e.target.id;
    currentNumber += e.target.id;
}
function inputOperator(e) {
    if (finish) finish = false;
    display.textContent += e.target.id;
    currentNumber = storeNumber(currentNumber);
    userInput.push(e.target.id);
}
// Function to push number to array
function storeNumber(number) {
    if (number != '') {
        userInput.push(Number(number));
        number = '';
    }
    return number;
}

// When user click the clear button
const clearKey = document.querySelector('.clear-button');
clearKey.addEventListener('click', reset);

// When user click the equal button
const equalKey = document.querySelector('.equal-button');
equalKey.addEventListener('click', equalClick);

// This function will iterate through the input array and execute
// any operator that matches the given operators
function calculateByOperators(inputs, ...operators) {
    for (let i=0; i< inputs.length; i++) {
        if (operators.includes(inputs[i])) {
          const result = operate(inputs[i-1], inputs[i+1], inputs[i]);
          inputs.splice(i-1, 3, result);
          i--;  
        }
    }
}

// Click even for equal '=' button
function equalClick(e) {
    if (!finish) {
        // Add the last number to the input array
        currentNumber = storeNumber(currentNumber);
        // Check only one input
        // Check the syntax of the input

        // Calculate the multiply and divide operators first
        calculateByOperators(userInput, 'x', '/');
        // Calculate the add and subtract operators later
        calculateByOperators(userInput, '+', '-');

        // Round up the result to 4 decimals
        let result = userInput[0];
        if (result % 1 !== 0) {
            result = result.toFixed(4);
        }

        // Display the result
        display.textContent = result;
        finish = true;
    }
}

function reset() {
    currentNumber = '';
    userInput = [];
    display.textContent = '';
    finish = false;
}
