import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, removeExpense, editExpense } from '../../../redux/actions/expenses';
import expenses from '../../fixtures/expenses';
import database from '../../../firebase/firebase';


// Creating configuration of mock-store. Note, does not actually create
// the mock-store, just lays the blueprints for each test case to 
// create their own
const createMockStore = configureMockStore([thunk]);

// Remove Expense
test('Should setup remove expense action object', () => {
    const action = removeExpense({id: 'abc123'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'abc123'
    });
});


// Edit Expense
test('Should setup edit expense action object', () => {
    const action = editExpense('abc123', { note: 'New expense note' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'abc123',
        updates: {
            note: 'New expense note'
        }
    });
});

// Add Expense
test('Should setup add expense action object with SPECIFIED expense', () => {

    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});


// BELOW FROM BEFORE REFACTORING WITH REDUX-THUNK,
// SAVED FOR POSTERITY
// test('Should setup add expense action object with DEFAULT expense', () => {
//     const expenseData = {
//         description: '',
//         notes: '',
//         amount: 0,
//         createdAt: 0,
//     }

//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             ...expenseData,
//             id: expect.any(String)
//         }
//     });
// });


// Testing Asynchronous DB actions

// Note the use of 'done' as an argument.
// The test will not finish until done is called, forcing it to 
// wait until the child async function call is completed rather 
// than just passing around it and assuming its complete
test('Should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Some expense',
        notes: 'Some note about an expense',
        amount: 5000,
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expenseData)).then(() => {
        // Test if the store was called with the action
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        // Test if the database was updated
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });;
});

test('Should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: '',
        notes: '',
        amount: 0,
        createdAt: 0
    }
    store.dispatch(startAddExpense()).then(() => {
        // Test if the store was called with the action
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        // Test if the database was updated
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });;
});