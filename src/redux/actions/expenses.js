 import uuid from 'uuid';
 import database from '../../firebase/firebase';
 
 // ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});


// To be used with redux-thunk
export const startAddExpense = (expenseData = {}) => {
    // redux-thunk library allows this to work, 
    // does not with redux by default
    return (dispatch) => {
        const {
            description = '',
            notes = '',
            amount = 0, 
            createdAt = 0
        } = expenseData;
    
        const expense = { description, notes, amount, createdAt };
        
        // returning the below promise for promise-chaining in the 
        // testing functions
        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    }
    
};

    // REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

    // EDIT EXPENSE
export const editExpense = (id = '', updates = {}) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

// SET EXPENSES AFTER FETCH FROM DB
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES', 
    expenses
});

// ASYNC FUNCTION FOR SETTING EXPENSES
export const startSetExpenses = () => {
    // redux-thunk library allows this to work, 
    // does not with redux by default
    return (dispatch) => {

        return database.ref('expenses').once('value').then((expenses) => {
            let expensesData = [];
            expenses.forEach((expense) => {
                expensesData.push({
                    id: expense.key,
                    ...expense.val()
                });
            });
            dispatch(setExpenses(expensesData))
        });
    }
}