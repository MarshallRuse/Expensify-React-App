import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../redux/actions/expenses';

export class AddExpensePage extends React.Component {

    onSubmit = (expense) => {
        // ** The below has been replaced due to mapDispatchToProps,
        // which allows for easier testing **

        // props.dispatch(addExpense(expense));
        this.props.addExpense(addExpense(expense));

        // history.push is used to redirect programatically.
        // this comes from components used within react-router
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm 
                    onSubmit={this.onSubmit}    
                />
            </div>
        )
    }
}


// The second argument to connect(), mapDispatchToProps, 
// can be explicitly set so that onSubmit can be accessed by the 
// testing functions
const mapDispatchToProps = (expense) => {
    return {
        addExpense: (expense) => dispatch(addExpense(expense))
    }
}

export default connect(undefined, mapDispatchToProps)(AddExpensePage);