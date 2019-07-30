import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        <div className='page-header'>
            <div className='content-container'>
                <h1>404!</h1> 
                <h2>No expenses or expense related things to be found here.</h2>
            </div>
        </div>
    </div>
);

export default NotFoundPage;