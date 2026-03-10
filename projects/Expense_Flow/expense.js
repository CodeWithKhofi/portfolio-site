const totalBadge = document.getElementById("total-badge");
const itemName = document.getElementById("itemName");
const itemAmount = document.getElementById("itemAmount");
const categoryMenu = document.getElementById("itemCategory");
const addItemBtn = document.getElementById("addBtn");
const displayArea = document.getElementById("tableBody");


// let expenses = [];
let expenses = JSON.parse(localStorage.getItem("myExpenses")) || [];

addItemBtn.addEventListener('click',() =>{
    const nameofItem = itemName.value;
    const amountofItem = parseFloat(itemAmount.value);
    const categoryValue = categoryMenu.value;


    if(!nameofItem || !amountofItem) return

    let newExpene = {
        id: Date.now(),
        name: nameofItem,
        amount: amountofItem,
        category: categoryValue
    };
    expenses.push(newExpene);
    // console.log(expenses);

    calcTotal();
    render();

    itemName.value = "";
    itemAmount.value = "";
    categoryMenu.value = "";
});



function calcTotal(){
    let total = 0;
    for(let item of expenses){
        total += item.amount;
    }
    totalBadge.textContent = `${total.toFixed(2)}`;

    totalBadge.classList.add("pulse");

    setTimeout(() =>{
        totalBadge.classList.remove("pulse");
    },300);
}

function render(){
    displayArea.innerHTML = "";
    expenses.forEach(item =>{
        const tableRow = `
            <tr>
                <td>${item.name}</td>
                <td>${item.amount.toFixed(2)}</td>
                <td>${item.category}</td>
                <td style = "text-align:right;">
                    <button class = "delete-btn" onclick = "deleteItem(${item.id})">Delete</button>
                </td>
            </tr>
        `;

        displayArea.innerHTML += tableRow;
    });

    saveData();
}

function deleteItem(id){
    expenses = expenses.filter(item => item.id !==id);
    calcTotal();
    render();
    saveData();

}

function saveData(){
    let savingExpense = JSON.stringify(expenses);
    localStorage.setItem("myExpenses",savingExpense);
}


render();
calcTotal();