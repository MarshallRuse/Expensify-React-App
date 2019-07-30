// React
import React from 'react';
import ReactDOM from 'react-dom';
import LoadingPage from './components/LoadingPage';

// Redux 
import configureStore from './redux/store/configureStore';
import { startSetExpenses } from './redux/actions/expenses';
import { login, logout } from './redux/actions/auth';

// React-Redux
import { Provider } from 'react-redux';

import 'normalize.css/normalize.css';
import './styles/style.scss';
import 'react-dates/lib/css/_datepicker.css';

import AppRouter, {history} from './routers/AppRouter';

// Firebase
import { firebase } from './firebase/firebase';

const store = configureStore();

// Provider is a HOC that holds the Redux store.
// It works with 'connect', used in the ExpenseList component, for instance
const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// for use with logging in and out, dont want to re-render whole 
// app each time
let hasRendered = false;
const renderApp = () => {
    if (!hasRendered){
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
}


firebase.auth().onAuthStateChanged((user) => {
    if (user){
        store.dispatch(login(user.uid));
        // only want to fetch expenses when logged in
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
        });
        // only want to redirect to dashboard if currently on login page
        // (ie. will not redirect a logged in user from another page if they
        // refresh the page)
        if (history.location.pathname === '/'){
            history.push('/dashboard');
        }
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});



