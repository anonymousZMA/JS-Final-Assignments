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

window.addEventListener("keydown", handleKeyDown);
equal.addEventListener("mousedown", () => setOperation(equal.id));
clearBtn.addEventListener("mousedown", resetCalculator);
backspace.addEventListener("mousedown", deleteNumber);
operations.forEach((op) =>
  op.addEventListener("mousedown", () => {
    countDot = 0;
    dot.disabled = false;
    captureInput(op.textContent);
    setOperation(op.textContent);
  })
);
numbers.forEach((num) =>
  num.addEventListener("mousedown", () => {
    captureNumbers(num.textContent);
    captureInput(num.textContent);
  })
);
dot.addEventListener("mousedown", () => {
  countDot++;
  if (countDot > 0) dot.disabled = true;
});

function captureInput(btn) {
  if (secondOperand === "" && result !== null) {
    inputText = "";
  }
  inputText = inputText + " " + btn;
  showInput(inputText);
}

function captureNumbers(num) {
  selectedOperation ? (secondOperand += num) : (firstOperand += num);
}

function setOperation(operator) {
  if (firstOperand && secondOperand)
    numbersInput = [parseFloat(firstOperand), parseFloat(secondOperand)];

  if (numbersInput.length > 1 || operator == "equal") {
    evaluate();
    firstOperand = result;
    secondOperand = "";
    numbersInput = [];
  }

  selectedOperation = operator != "equal" ? operator : "";
  if (result) captureInput(`${result}  ${selectedOperation}`);
}

function deleteNumber() {
  let screenText = inputText.replace(/\s/g, "");
  if (Number.isInteger(+screenText.at(-1))) {
    if (secondOperand) secondOperand = secondOperand.toString().slice(0, -1);
    else firstOperand = firstOperand.toString().slice(0, -1);
    inputText = screenText.slice(0, -1).split("").join(" ") || "";
    showInput(inputText);
  } else if (screenText.at(-1) === ".") {
    countDot--;
    inputText = inputText.slice(0, -1);
    showInput(inputText);
  }
}

function showInput(inputText) {
  input.textContent = inputText;
}

function resetCalculator() {
  inputText = "";
  countDot = 0;
  dot.disabled = false;
  result = null;
  numbersInput = [];
  showInput("0");
  firstOperand = "";
  secondOperand = "";
  selectedOperation = "";
}

function handleKeyDown(e) {
  const key = e.key;
  switch (key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      captureNumbers(key);
      captureInput(key);
      break;
    case ".":
      countDot++;
      if (countDot > 1) dot.disabled = true;
      captureInput(key);
      break;
    case "+":
    case "-":
      captureInput(key);
      setOperation(key);
      break;
    case "*":
      captureInput("x");
      setOperation("x");
      break;
    case "/":
      captureInput("÷");
      setOperation("÷");
      break;
    case "Enter":
      setOperation("equal");
      evaluate();
      break;
    case "Backspace":
      deleteNumber();
      break;
    case "Escape":
      resetCalculator();
      break;
    default:
      break;
  }
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
  let sortedNumbers = numbers.sort((a, b) => b - a);
  result = sortedNumbers.reduce((a, b) => {
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
