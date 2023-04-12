// Get DOM elements
const expenseForm = document.getElementById('expenseForm');
const expenseNameInput = document.getElementById('expenseName');
const expenseAmountInput = document.getElementById('expenseAmount');
const expenseList = document.getElementById('expenseList');

// Load expenses from local storage
const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Render expense list
function renderExpenses() {
  // Clear expense list
  expenseList.innerHTML = '';

  // Render each expense item
  expenses.forEach((expense, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${expense.name}: $${expense.amount}</span>
      <button class="edit" data-index="${index}">Edit</button>
      <button class="delete" data-index="${index}">Delete</button>
    `;
    expenseList.appendChild(listItem);
  });

  // Add event listeners for edit and delete buttons
  const editButtons = document.querySelectorAll('.edit');
  editButtons.forEach(button => {
    button.addEventListener('click', editExpense);
  });

  const deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach(button => {
    button.addEventListener('click', deleteExpense);
  });

  // Save expenses to local storage
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Add expense
function addExpense(e) {
  e.preventDefault();

  const name = expenseNameInput.value;
  const amount = parseFloat(expenseAmountInput.value);

  if (name && amount) {
    const expense = { name, amount };
    expenses.push(expense);
    renderExpenses();
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
  }
}

// Edit expense
function editExpense(e) {
  const index = e.target.getAttribute('data-index');
  const expense = expenses[index];
  expenseNameInput.value = expense.name;
  expenseAmountInput.value = expense.amount;
  expenses.splice(index, 1);
  renderExpenses();
}

// Delete expense
function deleteExpense(e) {
  const index = e.target.getAttribute('data-index');
  expenses.splice(index, 1);
  renderExpenses();
}

// Event listener for form submission
expenseForm.addEventListener('submit', addExpense);

// Initial render
renderExpenses();