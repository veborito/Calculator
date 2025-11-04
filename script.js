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

function show_result(is_float, result) {
  if (is_float) {
    return Math.round(result * 1000) / 1000;
  } else {
    return result;  
  }
}

function parseInput(is_float, input) {
  if (is_float) {
    return parseFloat(input);
  } else {
    return parseInt(input);
  }
}

const display = document.querySelector("#screen");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const dot = document.querySelector("#dot");
const backspace = document.querySelector("#backspace");

let is_operator_clicked = false;
let is_number_cliked = false;
let is_float = false;
let curr_number = null;
let prec_number = null;
let prec_operator = null;


backspace.addEventListener("click", event => {
  let curr_numbers = display.textContent.split("");
  curr_numbers.pop();
  display.textContent = curr_numbers.join("");
  curr_number = parseInput(is_float, display.textContent);
})

dot.addEventListener("click", event => {
  if (!is_float)
    display.textContent += event.target.textContent;
  is_float = true;
});


numbers.forEach(element => {
  element.addEventListener("click", event => {
    is_number_cliked = true;
    if (is_operator_clicked) {
      display.textContent = "";
      is_operator_clicked = false;
      curr_number = null;
    }
    display.textContent += event.target.textContent;
    curr_number = parseInput(is_float, display.textContent);
  });
});

operators.forEach(element => {
  element.addEventListener("click", event => {
    const operator = event.target.textContent;
    
    if (operator == "clear") {
      display.textContent = "";
      curr_number = null
      prec_number = null
    } else if (operator == "=") {
      if (prec_number != null && is_number_cliked) {
        let result = operate(prec_operator, prec_number, curr_number);
        
        display.textContent = show_result(is_float, result);
        
        curr_number = result;
        prec_number = null;
        prec_operator = null;
      }
    } else {
      is_operator_clicked = true;
      if (prec_number == null) {
        prec_number = curr_number;
        prec_operator = operator;
      } else if (is_number_cliked) {
        if (!prec_operator)
          prec_operator = operator;
        let result = operate(prec_operator, prec_number, curr_number);
        if (result == "error") {
          prec_number = null;
          curr_number = null;
        } else {
          prec_number = result;
          prec_operator = operator;
        }
        display.textContent = show_result(is_float, result);
      } else {
        prec_operator = operator;
      }
    }
    is_float = false;
    is_number_cliked = false;
  });
});
