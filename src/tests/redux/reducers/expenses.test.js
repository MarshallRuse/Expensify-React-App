import expensesReducer from '../../../redux/reducers/expenses';
import expenses from '../../fixtures/expenses';
import moment from 'moment';

// Default values
test('Should set up the default filter values', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

// Remove expense by id
test('Should remove an expense based on id', () => {
    const state = expensesReducer(expenses, {
        type: 'REMOVE_EXPENSE',
         id: expenses[1].id
    });
    expect(state).toEqual([expenses[0], expenses[2]]);
});

// Dont remove expense with invalid id
test('Should remove an expense based on id', () => {
    const state = expensesReducer(expenses, {
        type: 'REMOVE_EXPENSE',
         id: '-1'
    });
    expect(state).toEqual(expenses);
});

// Add expense 
test('Should add an expense', () => {
    const expense = {
        description: 'Go to mall',
        notes: '',
        createdAt: moment().valueOf,
        amount: 3000
    };
    const state = expensesReducer(expenses, {
        type: 'ADD_EXPENSE',
        expense
    });
    expect(state).toEqual([...expenses, expense]);
});

// Edit an expense by id
test('Should edit an expense based on id', () => {
    const editedExpense =  Object.assign(expenses[1], {});
    editedExpense['notes'] = 'Heres my new note';

    const state = expensesReducer(expenses, {
        type: 'EDIT_EXPENSE',
         id: expenses[1].id,
         update: {
             notes: 'Heres my new note'
         }
    });

    expect(state[1]).toEqual(editedExpense);
});

// Dont edit an expense with an invalid id
test('Should not edit an expense with an invalid id', () => {
    const editedExpense =  Object.assign(expenses[1], {});
    editedExpense['notes'] = 'Heres my new note';

    const state = expensesReducer(expenses, {
        type: 'EDIT_EXPENSE',
         id: '-1',
         update: {
             notes: 'Heres my new note'
         }
    });
    expect(state).toEqual(expenses);
});