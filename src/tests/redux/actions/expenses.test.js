import { addExpense, removeExpense, editExpense } from '../../../redux/actions/expenses';

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
    const expenseData = {
        description: 'New expense',
        notes: 'New expense note',
        amount: 109500,
        createdAt: 1000,
    }

    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('Should setup add expense action object with DEFAULT expense', () => {
    const expenseData = {
        description: '',
        notes: '',
        amount: 0,
        createdAt: 0,
    }

    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});