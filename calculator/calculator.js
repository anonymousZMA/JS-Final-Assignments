let inputText = "";
let firstOperand = "";
let secondOperand = "";
let selectedOperation = "";
let numbersInput = [];
let result = null;
let countDot = 0;

const dot = document.getElementById("dot");
const clearBtn = document.getElementById("ac");
const backspace = document.getElementById("c");
const equal = document.getElementById("equal");
const buttons = document.querySelectorAll(".btn");
const input = document.getElementById("input");
const operations = document.querySelectorAll(".operation");
const numbers = document.querySelectorAll(".number");

equal.addEventListener("click", (e) => setOperation(e.target.id));

clearBtn.addEventListener("click", resetCalculator);
backspace.addEventListener("click", deleteNumber);

operations.forEach((op) =>
  op.addEventListener("click", () => {
    captureInput(op.textContent);
    setOperation(op.textContent);
  })
);

numbers.forEach((num) =>
  num.addEventListener("click", () => {
    countDot++;
    if (countDot > 1) dot.disabled = true;
    captureNumbers(num.textContent);
    captureInput(num.textContent);
  })
);

function captureInput(btn) {
  if (secondOperand === "" && result !== null) {
    inputText = "";
  }
  inputText = inputText + " " + btn;
  showInput(inputText);
}

function captureNumbers(num) {
  if (selectedOperation) secondOperand += num;
  else firstOperand += num;
}

function setOperation(operator) {
  if (firstOperand && secondOperand)
    numbersInput.push(+firstOperand, +secondOperand);

  if (numbersInput.length > 1 || operator == "equal") {
    evaluate();
    firstOperand = result;
    secondOperand = "";
    numbersInput = [];
  }

  selectedOperation = operator != "equal" ? operator : "";
  if (result) {
    captureInput(`${result}  ${selectedOperation}`);
  }
}

function deleteNumber() {
  let screeText = inputText.replace(/\s/g, "");
  if (Number.isInteger(+screeText.at(-1))) {
    if (secondOperand) secondOperand = secondOperand.toString().slice(0, -1);
    else firstOperand = firstOperand.toString().slice(0, -1);
    inputText = screeText.slice(0, -1).split("").join(" ") || "";
    showInput(inputText);
  }
}

function showInput(inputText) {
  input.textContent = inputText;
}

function resetCalculator() {
  inputText = "";
  result = null;
  numbersInput = [];
  showInput("0");
  firstOperand = "";
  secondOperand = "";
  selectedOperation = "";
}

function showResult(result) {
  result = result - Math.floor(result) !== 0 ? result.toFixed(1) : result;
  showInput(result);
  numbersInput = [result];
}

function sum(numbers) {
  result = numbers.reduce((total, currentNum) => total + currentNum, 0);
  showResult(result);
}

function subtract(numbers) {
  result = numbers.reduce((a, b) => {
    return a - b;
  });
  showResult(result);
}

function multiply(numbers) {
  result = numbers.reduce((total, currentNum) => total * currentNum, 1);
  showResult(result);
}

function division(numbers) {
  result = numbers.reduce((a, b) =>
    b > 0 ? a / b : "Error: can't divided by 0"
  );
  showResult(result);
}

function evaluate() {
  switch (selectedOperation) {
    case "+":
      sum(numbersInput);
      break;
    case "-":
      subtract(numbersInput);
      break;
    case "x":
      multiply(numbersInput);
      break;
    case "÷":
      division(numbersInput);
      break;

    default:
      break;
  }
}
