import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = (props) => (
    <div>
        <Link to={`/edit/${props.id}`}><h2>{props.description}</h2></Link>
        <h3>Amount: {props.amount}</h3>
        <p>Created: {props.createdAt}</p>
    </div>
);

export default ExpenseListItem;

