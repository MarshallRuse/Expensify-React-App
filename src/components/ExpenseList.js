import React from 'react';
import {connect} from 'react-redux';

import selectExpenses from '../redux/selectors/expenses';

import ExpenseListItem from './ExpenseListItem';
import ExpenseListFilter from './ExpenseListFilter';


export const ExpenseList = (props) => (
    <div>
        {props.expenses.length > 0 && <ExpenseListFilter />}
        <div className='content-container'>
            <div className='list__header'>
                <div className='show-for-mobile'>Expenses</div>
                <div className='show-for-desktop'>Expense</div>
                <div className='show-for-desktop'>Amount</div>
            </div>
            { props.expenses.length === 0 ? (
                <div className='list__item--empty'>
                    <span>No Expenses</span>
                </div>
            ) : (
                
                props.expenses.map((expense) => <ExpenseListItem key={expense.id} {...expense}/>)
            ) 
            }
        </div>
    </div>
    
);

/*

*/

// Note, unlike ./playground/higher-order-components,
// connect() returns a function to be called with ExpenseList.
// Props can be passed as a callback function to connect as an argument

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
};

// By convention just default export the connect function
export default connect(mapStateToProps)(ExpenseList);
