const cardContent = document.querySelector("#content");

const resetBtn = document.querySelector("#reset-btn");
const selectBtn = document.querySelectorAll(".scale-button");
const customTipInput = document.querySelector("#btn-input");

const bill = document.querySelector("input[name='bill-input']");
const person = document.querySelector("input[name='people-input']");

const totalOutput = document.querySelector("#total-output");
const amountOutput = document.querySelector("#amount-output");

const errorText = document.querySelectorAll(".error-text");

let currentTip = 0;

function isValid(value) {
    const trimmed = value.trim();
    return trimmed !== ""
        && !isNaN(Number(trimmed)) && Number(trimmed) > 0;
}

function checkInput(e) {
    const item = e.target;
    errorText.forEach(btn => btn.style.display = "none");
    if (item.classList.contains("text-input")) {
        if (isValid(item.value)) {
            item.classList.add("acvitve-input");
            item.classList.remove("error-input");
        } else {
            item.classList.remove("acvitve-input");
            item.classList.add("error-input");
        }
    }
}

function updateDisplay() {
    const billValue = Number(bill.value);
    const personValue = Number(person.value);

    if (!isValid(bill.value) || !isValid(person.value) || currentTip === 0) {
        return;
    }

    const billPerPerson = billValue / personValue;
    const tipAmount = (billPerPerson * currentTip).toFixed(2);
    const totalAmount = (billPerPerson + Number(tipAmount)).toFixed(2);

    amountOutput.textContent = `$${tipAmount}`;
    totalOutput.textContent = `$${totalAmount}`;
}

function handleTipSelection(e) {
    const billValue = Number(bill.value);
    const personValue = Number(person.value);

    if (!isValid(bill.value) || !isValid(person.value)) {
        bill.classList.add("error-input");
        person.classList.add("error-input");
        errorText.forEach(btn => btn.style.display = "block");
        return;
    }

    errorText.forEach(btn => btn.style.display = "none");
    bill.classList.add("acvitve-input");
    person.classList.add("acvitve-input");

    currentTip = Number(e.target.textContent.replace("%", "")) / 100;

    selectBtn.forEach(btn => {
        btn.classList.remove("click-button");
        btn.classList.add("normal-button");
    });

    e.target.classList.remove("normal-button");
    e.target.classList.add("click-button");

    customTipInput.value = "";
    updateDisplay();
    resetBtn.classList.add("reset-btn-active");
}

function handleReset() {
    bill.value = "";
    person.value = "";
    customTipInput.value = "";
    currentTip = 0;

    totalOutput.textContent = "$0.00";
    amountOutput.textContent = "$0.00";

    selectBtn.forEach(btn => {
        btn.classList.remove("click-button");
        btn.classList.add("normal-button");
    });

    bill.classList.add("acvitve-input");
    bill.classList.remove("error-input");

    person.classList.add("acvitve-input");
    person.classList.remove("error-input");

    errorText.forEach(btn => btn.style.display = "none");

    resetBtn.classList.remove("reset-btn-active");
    resetBtn.classList.add("btn");
}

function handleCustomTip(e) {
    const customValue = e.target.value.trim();

    if (customValue === "") {
        currentTip = 0;
        return;
    }

    if (!isNaN(Number(customValue)) && Number(customValue) > 0) {
        currentTip = Number(customValue) / 100;

        selectBtn.forEach(btn => {
            btn.classList.remove("click-button");
            btn.classList.add("normal-button");
        });

        updateDisplay();
        resetBtn.classList.add("reset-btn-active");
    }
}

function calc(e) {
    if (e.target.classList.contains("scale-button")) {
        handleTipSelection(e);
    } else if (e.target.id === "reset-btn") {
        handleReset();
    }
}

cardContent.addEventListener("click", calc);
cardContent.addEventListener("input", checkInput);
customTipInput.addEventListener("input", handleCustomTip);