import React from 'react';

import ExpenseList from './ExpenseList';
import ExpensesSummary from './ExpensesSummary';

const ExpensifyDashboardPage = () => (
    <div>
        <ExpensesSummary />
        <ExpenseList />
    </div>
);

export default ExpensifyDashboardPage;