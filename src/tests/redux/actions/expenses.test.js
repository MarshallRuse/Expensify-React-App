import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    startAddExpense, 
    addExpense, 
    removeExpense, 
    startRemoveExpense, 
    editExpense, 
    startEditExpense,
    setExpenses, 
    startSetExpenses
 } from '../../../redux/actions/expenses';
import expenses from '../../fixtures/expenses';
import database from '../../../firebase/firebase';
import expensesReducer from '../../../redux/reducers/expenses';


// Creating configuration of mock-store. Note, does not actually create
// the mock-store, just lays the blueprints for each test case to 
// create their own
const createMockStore = configureMockStore([thunk]);

const uid='testeruser';
const defaultState = { auth: {
    uid
}};

// populate the database with some dummy expenses before each test
beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(({ id, description, notes, amount, createdAt }) => {
        expenseData[id] = { description, notes, amount, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done());
});

// Remove Expense
test('Should setup remove expense action object', () => {
    const action = removeExpense({id: 'abc123'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'abc123'
    });
});

test('Should remove the specified expense from the database', (done) => {
    const store = createMockStore(defaultState);
    store.dispatch(startRemoveExpense({ id: expenses[1].id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id: expenses[1].id
        });
        return database.ref(`users/${uid}/expenses/${expenses[1].id}`).once('value');
    }).then((expense) => {
        expect(expense.val()).toBeNull();
        done();
    });
});


// Edit Expense
test('Should setup edit expense action object', () => {
    const action = editExpense('abc123', { notes: 'New expense note' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'abc123',
        updates: {
            notes: 'New expense note'
        }
    });
});

test('Should edit the expense in firebase', (done) => {
    const store = createMockStore(defaultState);
    const id = expenses[2].id;
    const updates = {
        description: 'This is the totally hot new expense',
        notes: 'Like for realz my guy'
    };

    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });

        database.ref(`users/${uid}/expenses/${id}`).once('value').then((expense) => {
            const updatedExpense = { 
                ...expense.val(),
                description: 'This is the totally hot new expense',
                notes: 'Like for realz my guy'
             };
            expect(expense.val()).toEqual(updatedExpense);
            done();
        })
    })
})

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
    const store = createMockStore(defaultState);
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
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });;
});

test('Should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultState);
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
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });;
});

test('Should set up SET EXPENSES action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('Should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
});

test('Should fetch the data from the database', (done) => {
    const store = createMockStore(defaultState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    })
});
