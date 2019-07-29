import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../redux/actions/auth';

export const LoginPage = (props) => (
    <div>
        <h1>Login</h1>
        <button onClick={props.startLogin}>Login</button>
    </div>
)

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage);