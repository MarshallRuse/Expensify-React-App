import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let startEditExpense, startRemoveExpense, history, wrapper;
// beforeEach is a global function provided by jest
beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<EditExpensePage 
                        startEditExpense={startEditExpense} 
                        startRemoveExpense={startRemoveExpense} 
                        history={history} 
                        expense={expenses[2]}
                        />);
});

test('Should render EditExpensePage', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
    expect(history.push).toHaveBeenLastCalledWith('/dashboard');
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);

});

test('Should handle startRemoveExpense', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/dashboard');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[2].id });

});



