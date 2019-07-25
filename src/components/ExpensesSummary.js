import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../redux/selectors/expenses';
import selectExpensesTotal from '../redux/selectors/expenses-total';

export const ExpensesSummary = ({expensesCount, expensesTotal}) => {
    const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';

    return (
    <div>
        <h2>Expenses Summary</h2>
        <h3>You have {expensesCount} {expenseWord} totaling {expensesTotal}</h3>
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

