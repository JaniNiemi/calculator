const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.querySelector("#clear-btn");

let firstValue = 0;
let operatorValue = "";
let waitingSecondValue = false;

// Calculate first and second values depending on operator
const calculate = {
    "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
    "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
    "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
    "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
    "=": (firstNumber, secondNumber) => secondNumber,
};

function sendNumberValue(number) {
    // Replace current display value if first value is entered
    if (waitingSecondValue) {
        calculatorDisplay.textContent = number;
        waitingSecondValue = false;
    } else {
        // if current display is 0, replace it, if not add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === "0" ? number : displayValue + number;
    }
}

function addDecimal() {
    // If operator pressed, don't add decimal
    if (waitingSecondValue) return;
    // If no decimal, add one
    if (!calculatorDisplay.textContent.includes(".")) {
        calculatorDisplay.textContent += ".";
    }
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if (operatorValue && waitingSecondValue) {
        operatorValue = operator;
        return;
    }
    // Assign first value if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // Ready for next value, store operator
    waitingSecondValue = true;
    operatorValue = operator;
}

// Reset display
function resetAll() {
    firstValue = 0;
    operatorValue = "";
    waitingSecondValue = false;
    calculatorDisplay.textContent = "0";
}

// Add event listeners for numbers, operators and decimal buttons
inputBtns.forEach(inputBtn => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains("operator")) {
        inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains("decimal")) {
        inputBtn.addEventListener("click", addDecimal);
    }
});

// Event listeners
clearBtn.addEventListener("click", resetAll);