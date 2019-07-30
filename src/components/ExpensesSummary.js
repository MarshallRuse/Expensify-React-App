import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../redux/selectors/expenses';
import selectExpensesTotal from '../redux/selectors/expenses-total';

export const ExpensesSummary = ({expensesCount, expensesTotal}) => {
    const expenseWord = expensesCount === 1 ? ' expense' : ' expenses';

    return (
    <div>
        <h1 className='page-header__title'>You have <span>{expensesCount}</span>{expenseWord} totaling <span>{expensesTotal}</span></h1>
    </div>
)}


const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);

    return {
        expensesCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary)

