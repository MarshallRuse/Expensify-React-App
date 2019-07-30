import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../redux/actions/auth';

export const LoginPage = (props) => (
    <div className='box-layout'>
        <div className='box-layout__box'>
            <h1 className='box-layout__title'>Expensify</h1>
            <p>Buy things, track them, realize how much you've been eating out...</p>
            <button className='button' onClick={props.startLogin}>Login with Google</button>
        </div>
    </div>
)

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage);