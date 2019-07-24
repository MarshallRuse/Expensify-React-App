import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

////////////////////
// Action Generators
////////////////////

    // ADD_EXPENSE
const addExpense = ({
    description = '',
    notes = '',
    amount = 0, 
    createdAt = 0
} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(), // note this works here, not in the arguments
        description,
        notes,
        amount,
        createdAt
    }
});

    // REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

    // EDIT EXPENSE
const editExpense = (id = '', updates = {}) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

    // SET TEXT FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

    // SORT BY AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
    sortBy: 'amount'
});

    // SORT BY DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE',
    sortBy: 'date'
});

    // SET START DATE
const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate
});

// SET END DATE
const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate
});


///////////////////////////////////////////////////
// The Reducers, their defaults, and combining them
///////////////////////////////////////////////////

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
        default:
            return state;
    }
}

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = ( state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: action.sortBy
            };
        case 'SORT_BY_DATE':
            return {
               ...state,                        
                sortBy: action.sortBy
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
}

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
)

//////////////////////////////
// Function to use the Filters
//////////////////////////////

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if (sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1;
        } else {
            return a.amount < b.amount ? 1 : -1;
        }
        
    });
}


store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses);
})

///////////////////////
// Dispatch the Actions
///////////////////////

// ADD EXPENSE dispatch
const expenseOne = store.dispatch(addExpense({
    description: 'February Rent',
    amount: 55500
}));

const expenseTwo = store.dispatch(addExpense({
    description: 'Pet the fat cat',
    amount: 1
}));


// REMOVE EXPENSE dispatch
//store.dispatch(removeExpense({ id : expenseTwo.expense.id }));

// EDIT EXPENSE dispatch
store.dispatch(editExpense(expenseTwo.expense.id, { 
    description: 'Pet AND FEED the fat cat' 
}));

// SET_TEXT_FILTER dispatch
store.dispatch(setTextFilter('cat'));

// // SORT_BY_AMOUNT dispatch
// store.dispatch(sortByAmount());
// // SORT_BY_DATE dispatch
// store.dispatch(sortByDate());

// // SET_START_DATE dispatch
// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// // SET_END_DATE dispatch
// store.dispatch(setEndDate(500));
// store.dispatch(setEndDate());



const demoState = {
    expenses: [{
        id: 'knckrgnkcn',
        description: 'January Rent',
        notes: 'This is the last rent paymnet for this address',
        amount: 0,
        createdAt: undefined,
    }],
    filters: {
        text: '',
        sortBy: 'date', // date or description
        startDate: undefined,
        endDate: undefined
    }
}