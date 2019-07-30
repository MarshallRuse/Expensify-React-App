import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = (props) => (
    <Link className='list__item' to={`/edit/${props.id}`}>
        <div>
            <h2 className='list__item__title'>{props.description}</h2>
            <span className='list__item__subtitle'>
                {moment(props.createdAt).format('MMMM Do, YYYY')}
            </span>
        </div>
        <div>
            <h3 className='list__item__amount'>
                {numeral(props.amount / 100).format('$0,0.00')}
            </h3>
        </div>
    </Link>
);

export default ExpenseListItem;

