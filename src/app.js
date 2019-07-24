// React
import React from 'react';
import ReactDOM from 'react-dom';

// Redux 
import configureStore from './redux/store/configureStore';
import { addExpense } from './redux/actions/expenses';
import getVisibleExpenses from './redux/selectors/expenses';

// React-Redux
import { Provider } from 'react-redux';

import 'normalize.css/normalize.css';
import './styles/style.scss';
import 'react-dates/lib/css/_datepicker.css';


import AppRouter from './routers/AppRouter';

const store = configureStore();
store.subscribe(() => {
    console.log(store.getState());
})

console.log(store.getState());

store.dispatch(addExpense({
    description: 'Water bill',
    amount: 500
}));
store.dispatch(addExpense({
    description: 'Food bill',
    amount: 1000
}));
store.dispatch(addExpense({
    description: 'Rent',
    amount: 5000,
    createdAt: 1000
}));
store.dispatch(addExpense({
    description: 'Vet Bill',
    amount: 2000,
    createdAt: -500
}));


const state = store.getState();

console.log(getVisibleExpenses(state.expenses, state.filters));

// Provider is a HOC that holds the Redux store.
// It works with 'connect', used in the ExpenseList component, for instance
const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));

