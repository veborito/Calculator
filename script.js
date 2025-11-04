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
    if (decimals.length > 2)
      return Math.round(result * 100) / 100;
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




const display = document.querySelector("#screen");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

let is_operator_clicked = false;
let curr_number = null;
let prec_number = null;
let curr_operator = null;

numbers.forEach(element => {
  element.addEventListener("click", event => {
    if (is_operator_clicked) {
      display.textContent = "";
      is_operator_clicked = false;
    }
    display.textContent += event.target.textContent;
  });
});

operators.forEach(element => {
  element.addEventListener("click", event => {
    const operator = event.target.textContent;
    const curr_number = parseInt(display.textContent);

    is_operator_clicked = true;
    if (operator == "clear") {
      display.textContent = "";
      prec_number = null
    } else if (operator == "="){
      let result = operate(curr_operator, prec_number, curr_number);
      prec_number = null;
      curr_operator = null;
      display.textContent = result;  
    } else {
      if (!prec_number) {
        curr_operator = operator;
        prec_number = curr_number;
      } else {
        let result = operate(curr_operator, prec_number, curr_number);
        if (result == "error") {
          prec_number = null;
        } else {
          prec_number = result;
          curr_operator = operator;
        }
        display.textContent = result;
      }
    }
  });
});
