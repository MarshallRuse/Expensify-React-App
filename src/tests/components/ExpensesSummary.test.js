import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

let wrapper;

beforeEach(() => {
    wrapper = shallow(<ExpensesSummary expenses={[]}/>);
});


test('Should render the ExpensesSummary component with no expenses', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should render the ExpensesSummary component with expenses', () => {
    wrapper.setProps({ expenses });
    expect(wrapper).toMatchSnapshot();
});
