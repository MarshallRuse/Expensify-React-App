import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('Should render ExpenseForm component', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseForm component with previous Expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseForm component with error upon bad submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    // the second argument simulates arguments passed to the event
    // the empty arrow function is a placeholder for e.preventDefault
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
});

test('Should update ExpenseForm state with description input change', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {
        target: { value: 'Description change'}
    });
    expect(wrapper.state('description')).toBe('Description change');
});

test('Should update ExpenseForm state with note input change', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', {
        target: { value: 'Note change'}
    });
    expect(wrapper.state('notes')).toBe('Note change');
});

test('Should update ExpenseForm state with VALID amount input change', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value: '123'}
    });
    expect(wrapper.state('amount').length).toBe(3);
});

test('Should NOT update ExpenseForm state with INVALID  amount input change', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value: 'abc'}
    });
    expect(wrapper.state('amount').length).toBe(0);
});

test('Should submit ExpenseForm with valid submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        notes: expenses[0].notes,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt
    });
});

test('Should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('Should set calendar focus on change', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused: true});
    expect(wrapper.state('calendarFocused')).toEqual(true);
})