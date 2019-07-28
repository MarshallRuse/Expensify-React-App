// React
import React from 'react';
import ReactDOM from 'react-dom';

// Redux 
import configureStore from './redux/store/configureStore';
import { startSetExpenses } from './redux/actions/expenses';

// React-Redux
import { Provider } from 'react-redux';

import 'normalize.css/normalize.css';
import './styles/style.scss';
import 'react-dates/lib/css/_datepicker.css';

import AppRouter from './routers/AppRouter';

import './firebase/firebase';

const store = configureStore();

// Provider is a HOC that holds the Redux store.
// It works with 'connect', used in the ExpenseList component, for instance
const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));
});



