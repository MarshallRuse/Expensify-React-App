const expensesReducerDefaultState = [];

const expensesReducer = ( state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            // .concat() doesn't mutate state directly like .push() would,
            // returns a new array
            return state.concat(action.expense);
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return { ...expense, ...action.updates};
                } else {
                    return expense;
                }
            })
        case 'SET_EXPENSES':
            return action.expenses;
        default:
            return state;
    }
}

export default expensesReducer;