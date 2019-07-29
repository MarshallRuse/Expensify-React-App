import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({
    isAuthorized,
    component: Component,
    ...rest // rest operator destructors the rest of the props
}) => (
    <Route {...rest} component={(props) => (
        isAuthorized ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
        ) : (
            <Redirect to='/' />
        ))
    }/>
);

const mapStateToProps = (state) => ({
    isAuthorized: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);