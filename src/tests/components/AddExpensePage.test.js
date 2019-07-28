import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let startAddExpense, history, wrapper;
// beforeEach is a global function provided by jest
beforeEach(() => {
    startAddExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
})

test('Should render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});


test('Should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')({...expenses[1], id: expenses[1].id});
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startAddExpense).toHaveBeenLastCalledWith({
            ...expenses[1],
            id: "2"
        });
})


