import selectExpensesTotal from '../../../redux/selectors/expenses-total';
import numeral from 'numeral';
import expenses from '../../fixtures/expenses';

test('Should return 0 if no expenses passed', () => {
    const total = selectExpensesTotal([]);
    expect(total).toBe(numeral(0).format('$0,0.00'));
});

test('Should correctly add up a single expense', () => {
    const total = selectExpensesTotal([expenses[0]]);
    expect(total).toBe(numeral(expenses[0].amount / 100).format('$0,0.00'));
});

test('Should correctly add up multiple expenses', () => {
    const total = selectExpensesTotal(expenses);
    expect(total).toBe(numeral(114195 / 100).format('$0,0.00'));
});
