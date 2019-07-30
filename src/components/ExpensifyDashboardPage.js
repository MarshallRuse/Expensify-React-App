import React from 'react';
import { Link } from 'react-router-dom';

import ExpenseList from './ExpenseList';
import ExpensesSummary from './ExpensesSummary';

const ExpensifyDashboardPage = () => (
    <div>
        <div className='page-header'>
            <div className='content-container'>
                <ExpensesSummary />
                <div className='page-header__actions'>
                    <Link className='button' to='/create'>Add Expense</Link>
                </div>
            </div>
        </div>
        <ExpenseList />
    </div>
);

export default ExpensifyDashboardPage;