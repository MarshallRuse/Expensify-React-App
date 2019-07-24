import React from 'react';
import {connect} from 'react-redux';

import selectExpenses from '../redux/selectors/expenses';

import ExpenseListItem from './ExpenseListItem';
import ExpenseListFilter from './ExpenseListFilter';


export const ExpenseList = (props) => (
    <div>
        {props.expenses.length > 0 && <ExpenseListFilter />}
        { props.expenses.length === 0 ? (
            <p>No Expenses</p>
        ) : (
            
            props.expenses.map((expense) => <ExpenseListItem key={expense.id} {...expense}/>)
        ) 
        }
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
