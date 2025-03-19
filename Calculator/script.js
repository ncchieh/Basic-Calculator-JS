const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let currentInput = "" //Stores current input
let previousInput = "" //Stores previous input
let operator = null;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    let value = button.dataset.value;

    switch (value) {
      case "C":
        clearDisplay();
        break;
      case "=":
        calculate();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        handleOperator(value);
        break;
      default:
        appendNumber(value);
        break;
    }
  });
});

function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operator = null;
  display.value = "";
}

function appendNumber(number) {
  currentInput += number;
  display.value = currentInput;
}

function handleOperator(op) {
  if (currentInput !== "" && previousInput !== "") {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = "";
}

function calculate() {
  if (currentInput !== "" && previousInput !== "" && operator !== null) {
    let result;
    const num1 = parseFloat(currentInput);
    const num2 = parseFloat(previousInput);

    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num2 - num1;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        if (num2 === 0) {
          result = "Error";
        } else {
          result = num2 / num1;
        }
        break;
      default:
        return;
    }

    display.value = result;
    previousInput = result.toString();
    currentInput = "";
    operator = null;
  }
}