 import uuid from 'uuid';
 
 // ADD_EXPENSE
export const addExpense = ({
    id = undefined,
    description = '',
    notes = '',
    amount = 0, 
    createdAt = 0
} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: id ? id : uuid(), // note this works here, not in the arguments
        description,
        notes,
        amount,
        createdAt
    }
});

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