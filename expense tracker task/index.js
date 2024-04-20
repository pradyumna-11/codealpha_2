let expensesList = getExpensesListFromLocalStorage();
let itemsCount = expensesList.length;

let expenditurePurposeInputEl = document.getElementById("purposeInput");
let expenditureAmountInputEl = document.getElementById("expenditureAmount");

let expensesItemsContainerEl = document.getElementById("expensesItemsContainer");


function editExpenseItem(inputElId, purposeElId) {
    let purposeEl = document.getElementById(purposeElId);
    let inputEl = document.getElementById(inputElId);
    if (purposeEl.textContent !== '') {
        inputEl.style.display = 'inline';
        purposeEl.style.display = 'none';
    }
}

function onDeleteExpenseItem(expenseItemId) {
    let filteredList = expensesList.filter((each) => {
        let itemId = "expenseItem" + each.id;
        return itemId !== expenseItemId;
    });
    expensesList = filteredList;
    let deleteExpenseItem = document.getElementById(expenseItemId);
    expensesItemsContainerEl.removeChild(deleteExpenseItem);
}

function saveItemsToLocalStorage() {
    let stringifiedList = JSON.stringify(expensesList);
    localStorage.setItem("localExpensesList", stringifiedList);
}

function getExpensesListFromLocalStorage() {
    let stringifiedStoredList = localStorage.getItem("localExpensesList");
    console.log(stringifiedStoredList);
    if (stringifiedStoredList === null) {
        return [];
    } else {
        let parsedList = JSON.parse(stringifiedStoredList);
        return parsedList;
    }

}



function createAndAppendEachExpense(eachExpense) {
    let {
        id,
        purpose,
        amount
    } = eachExpense;
    let expenseItem = document.createElement("li");
    //let length = expensesList.length;
    //let expenseItemId = "expenseItem" + length
    expenseItem.id = "expenseItem" + id;
    expenseItem.classList.add("expense-item");

    let expenseItemPurposeEl = document.createElement("p");
    expenseItemPurposeEl.id = "purpose" + id;
    expenseItemPurposeEl.textContent = purpose;
    expenseItemPurposeEl.classList.add("expense-item-purpose");
    expenseItem.appendChild(expenseItemPurposeEl);

    let editInputEl = document.createElement("input");
    editInputEl.type = "text";
    editInputEl.classList.add("edit-input-style");
    editInputEl.id = "editInput" + id;
    editInputEl.addEventListener("keydown", function(event) {
        if (event.key === 'Enter' && event.target.value !== '') {
            expenseItemPurposeEl.textContent = event.target.value;
            editInputEl.style.display = 'none';
            expenseItemPurposeEl.style.display = 'inline';
            for (let each of expensesList) {
                if (each.id === id) {
                    each.purpose = event.target.value;
                }
            }
        }
        if (event.key === 'Enter' && event.target.value === '') {
            editInputEl.style.display = 'none';
            expenseItemPurposeEl.style.display = 'inline';
        }
    });
    expenseItem.appendChild(editInputEl);

    let expenseItemAmountEl = document.createElement("p");
    expenseItemAmountEl.id = "amount" + id;
    expenseItemAmountEl.textContent = amount;
    expenseItemAmountEl.classList.add("expense-item-amount");
    expenseItem.appendChild(expenseItemAmountEl);




    let expenseItemEditButtonEl = document.createElement("button");
    expenseItemEditButtonEl.textContent = "Edit";
    expenseItemEditButtonEl.classList.add("expense-item-edit-button");
    expenseItemEditButtonEl.id = "edit" + id;
    expenseItemEditButtonEl.onclick = function() {
        editExpenseItem(editInputEl.id, expenseItemPurposeEl.id);
    };
    expenseItem.appendChild(expenseItemEditButtonEl);

    let expenseItemDeleteButtonEl = document.createElement("button");
    expenseItemDeleteButtonEl.id = "delete" + id;
    expenseItemDeleteButtonEl.classList.add("expense-item-delete-button");
    expenseItemDeleteButtonEl.onclick = function() {
        onDeleteExpenseItem(expenseItem.id);
    };

    let deleteIconEl = document.createElement("i");
    deleteIconEl.classList.add("fa-solid", "fa-trash-can");
    expenseItemDeleteButtonEl.appendChild(deleteIconEl);





    expenseItem.appendChild(expenseItemDeleteButtonEl);

    expensesItemsContainerEl.appendChild(expenseItem);
}

let addNewExpense = function() {
    if (expenditurePurposeInputEl.value === '') {
        alert("Enter valid purpose");
    }
    if (expenditureAmountInputEl.value === '' || expenditureAmountInputEl.value <= 0) {
        alert("Enter valid amount");
    }
    if (expenditurePurposeInputEl.value !== '' && expenditureAmountInputEl.value !== '' && expenditureAmountInputEl.value > 0) {
        itemsCount = itemsCount + 1;
        let newExpense = {
            id: itemsCount,
            purpose: expenditurePurposeInputEl.value,
            amount: expenditureAmountInputEl.value
        };
        expensesList.push(newExpense);
        createAndAppendEachExpense(newExpense);
        expenditurePurposeInputEl.value = '';
        expenditureAmountInputEl.value = '';
    }

};


let displayItems = () => {
    for (let each of expensesList) {
        createAndAppendEachExpense(each);
    }
};

displayItems();