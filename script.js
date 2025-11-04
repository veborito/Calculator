function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b != 0) {
    const result = a / b;
    const decimals = result.toString().split(".")[1];
    if (decimals && decimals.length > 2)
      return Math.round(result * 1000) / 1000;
    return result;
  } else {
    return "error";
  }
}

function operate(operator, a, b) {
  switch(operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '×':
      return multiply(a, b);
    case '÷':
      return divide(a, b);
    default:
      return "This is not a valid operator";
  }  
}

function show_result(isFloat, result) {
  if (isFloat) {
    return Math.round(result * 1000) / 1000;
  } else {
    return result;  
  }
}

function parseInput(isFloat, input) {
  if (isFloat) {
    return parseFloat(input);
  } else {
    return parseInt(input);
  }
}

function process_calculations(operator){
  isOperatorClicked = true;
  if (precNumber == null) {
    precNumber = currNumber;
    precOperator = operator;
  } else if (isNumberClicked) {
    if (!precOperator)
      precOperator = operator;
    let result = operate(precOperator, precNumber, currNumber);
    if (result == "error") {
      precNumber = null;
      currNumber = null;
    } else {
      precNumber = result;
      precOperator = operator;
    }
    display.textContent = show_result(isFloat, result);
  } else {
    precOperator = operator;
  }
  isFloat = false;
}

function process_operator(operator) {
    if (operator == "clear") {
      display.textContent = "";
      currNumber = null
      precNumber = null
    } else if (operator == "=") {
      if (precNumber != null && isNumberClicked) {
        let result = operate(precOperator, precNumber, currNumber);
        if (result == "error")
          isOperatorClicked = true;
        display.textContent = show_result(isFloat, result);
        
        currNumber = result;
        precNumber = null;
        precOperator = null;
      }
    } else {
      console.log("here");
      process_calculations(operator);
    }
}


function isOperator (operator) {
  switch (operator) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
    case 'Enter':
      return true;
    default:
      return false;
  }
}

function removeElement() {
    let currNumbers = display.textContent.split("");
    currNumbers.pop();
    display.textContent = currNumbers.join("");
    currNumber = parseInput(isFloat, display.textContent);
}


const display = document.querySelector("#screen");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const dot = document.querySelector("#dot");
const backspace = document.querySelector("#backspace");

let isOperatorClicked = false;
let isNumberClicked = false;
let isFloat = false;
let currNumber = null;
let precNumber = null;
let precOperator = null;


backspace.addEventListener("click", () => {
  removeElement();
})

dot.addEventListener("click", event => {
  if (!isFloat)
    display.textContent += event.target.textContent;
  isFloat = true;
});


numbers.forEach(element => {
  element.addEventListener("click", event => {
    isNumberClicked = true;
    if (isOperatorClicked) {
      display.textContent = "";
      isOperatorClicked = false;
      currNumber = null;
    }
    display.textContent += event.target.textContent;
    currNumber = parseInput(isFloat, display.textContent);
  });
});

operators.forEach(element => {
  element.addEventListener("click", event => {
    const operator = event.target.textContent;
    process_operator(operator);
  });
});

document.addEventListener("keydown", (event) => {
  if (Number.isInteger(parseInt(event.key))) {
    isNumberClicked = true;
    if (isOperatorClicked) {
      display.textContent = "";
      isOperatorClicked = false;
      currNumber = null;
    }
    display.textContent += event.key;
  } else if (event.key == '.' && !isFloat) {
    isFloat = true;
    display.textContent += event.key;
  } else if (isOperator (event.key)){
    console.log(event.key);
    currNumber = parseInput(isFloat, display.textContent)
    let operator = event.key;
    if (operator == '/')
      operator = '÷';
    else if (operator == '*')
      operator = '×';
    else if (operator == "Enter")
      operator = '=';
    process_operator(operator);
  } else if (event.key == "Backspace") {
    removeElement();
  }
});


// pour améliorer ce code ajouter des objets avec les différentes variable pour
// rendre le code plus lisible et moins prone aux erreurs d'assignations de 
// variables. Cependant, ici le but était de finir le plus rapidement possible
// sans optimiser le code. Ce sera un exercice pour une prochaine fois...