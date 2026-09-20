const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];
const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
];
const date_container_id_element = document.getElementById("date_container");
const day_name_class_elements = document.getElementsByClassName("day_name");
const showExpensePopupIdElement = document.getElementById("show_expense_popup");
const addExpenseForm = document.getElementById("add_expense_form");
const localStorageExpenseKey = "localExpenses";
let today = new Date();
let popUpDateOpened = "";

function getDay() {
    return months.at(today.getMonth());
}

function totalDaysInMonth() {
    return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
}

function getDayOfFirstDate() {
    return days.at(new Date(today.getFullYear(), today.getMonth(), 1).getDay());
}

function getDayOfLastDate() {
    return days.at(new Date(today.getFullYear(), today.getMonth(), totalDaysInMonth()).getDay());
}

function previousMonth() {
    today = new Date(today.getFullYear(), today.getMonth() - 1)
    date_container_id_element.replaceChildren();
    main()
}

function nextMonth() {
    today = new Date(today.getFullYear(), today.getMonth() + 1)
    date_container_id_element.replaceChildren();
    main();
}

async function fetchExpenseData() {
    const response = await fetch("./db.json");
    return response.json();
}

function hasExpense(date) {
    let expenseData = getExpenseDataJson();
    return expenseData[date] && Object.keys(expenseData[date]["expenses"]).length !== 0;
}

function getExpenseFromDate(date) {
    let expenseData = getExpenseDataJson();
    if (!expenseData[date]) {
        expenseData[date] = {
            "expenses": {},
            "total": 0
        };
        localStorage.setItem(localStorageExpenseKey, JSON.stringify(expenseData));
    }
    return expenseData[date];
}

function showExpense(date, event) {
    event.stopPropagation()
    showExpensePopupIdElement.style.display = "flex";
    popUpDateOpened = date;
    renderExpensePopup(date);
}

function renderExpensePopup(date) {
    const expenseItem = getExpenseFromDate(date);

    const currentDateIdElement = document.getElementById("current_date");
    const dateSplit = date.split("_");
    currentDateIdElement.innerText = dateSplit[2] + "-" + dateSplit[1] + "-" + dateSplit[0];

    const listExpensesIdElement = document.getElementById("list_expenses");
    const totalAmountIdElement = document.getElementById("total_amount");
    listExpensesIdElement.innerHTML = "";
    totalAmountIdElement.innerText = "0";

    for (const [expenseKey, expense] of Object.entries(expenseItem.expenses)) {

        const expenseItemDiv = document.createElement("div");
        expenseItemDiv.classList.add("expense_item");

        const expenseKeyP = document.createElement("p");
        expenseKeyP.classList.add("expense_key");
        expenseKeyP.textContent = expenseKey;

        const expenseValueP = document.createElement("p");
        expenseValueP.classList.add("expense_value");
        expenseValueP.textContent = expense.amount;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete_expense");
        deleteButton.textContent = "X";

        deleteButton.addEventListener("click", () => {
            deleteExpense(date, expenseKey);
        });

        expenseItemDiv.appendChild(expenseKeyP);
        expenseItemDiv.appendChild(expenseValueP);
        expenseItemDiv.appendChild(deleteButton);

        listExpensesIdElement.appendChild(expenseItemDiv);

        totalAmountIdElement.innerText =
            Number(totalAmountIdElement.innerText) + expense.amount;
    }
}

function renderCalendar() {

    date_container_id_element.replaceChildren();

    for (const day_name_class_element of day_name_class_elements) {
        day_name_class_element.innerText = getDay() + " " + today.getFullYear();
    }

    const date_container_fragment = document.createDocumentFragment();
    for (let j = days.indexOf(getDayOfFirstDate()); j > 0; j--) {
        let divElement = document.createElement("div")
        divElement.classList = "box";
        divElement.innerText = new Date(today.getFullYear(), today.getMonth(), -j + 1).getDate();
        divElement.addEventListener("click", () => previousMonth());
        date_container_fragment.appendChild(divElement);
    }
    for (let i = 1; i <= totalDaysInMonth(); i++) {
        let date = today.getFullYear() + "_" + (today.getMonth() + 1) + "_" + i;
        let divElement = document.createElement("div")
        divElement.classList.add("box")
        if (hasExpense(date)) {
            divElement.classList.add("expense_added");
        }
        divElement.innerText = i;
        divElement.id = date;
        divElement.addEventListener("click", (event) => showExpense(date, event));
        date_container_fragment.appendChild(divElement);
    }
    let j = 1;
    for (let i = days.indexOf(getDayOfLastDate()); i < days.length-1; i++) {
        let divElement = document.createElement("div")
        divElement.classList = "box";
        divElement.innerText = j++;
        divElement.addEventListener("click", () => nextMonth());
        date_container_fragment.appendChild(divElement);
    }
    date_container_id_element.appendChild(date_container_fragment);
}

function getExpenseDataJson() {
    return JSON.parse(localStorage.getItem(localStorageExpenseKey));
}

function calculateExpenseTotal(expenses) {
    let total = 0;
    for (const expenseValue of Object.values(expenses)) {
        total += Number(expenseValue.amount)
    }
    return total;
}

function deleteExpense(date, expenseKey) {
    const expenseData = getExpenseDataJson();
    delete expenseData[date]["expenses"][expenseKey]
    localStorage.setItem(localStorageExpenseKey, JSON.stringify(expenseData));
    renderExpensePopup(date);
}

async function main() {
    if (localStorage.getItem(localStorageExpenseKey) == null) {
        let data = await fetchExpenseData();
        localStorage.setItem(localStorageExpenseKey, JSON.stringify(data));
    }

    renderCalendar();
}

document.addEventListener("click", (event) => {
    if (!showExpensePopupIdElement.contains(event.target)) {
        showExpensePopupIdElement.style.display = "none";
        renderCalendar();
    }
});

addExpenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const expenseData = getExpenseDataJson();
    const expenses = expenseData[popUpDateOpened].expenses;
    const expenseKey = addExpenseForm.elements["expense_name"].value.toUpperCase();
    const expenseAmount = Number(addExpenseForm.elements["expense_amount"].value);

    if (expenses[expenseKey]) {
        expenses[expenseKey].amount += expenseAmount;
    } else {
        expenses[expenseKey] = {
            amount: expenseAmount
        };
    }

    expenseData[popUpDateOpened].total = calculateExpenseTotal(expenses);

    localStorage.setItem(
        localStorageExpenseKey,
        JSON.stringify(expenseData)
    );

    addExpenseForm.elements["expense_name"].value = "";
    addExpenseForm.elements["expense_amount"].value = "";

    renderExpensePopup(popUpDateOpened);
});

main();
