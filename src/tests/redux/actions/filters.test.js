import moment from 'moment';
import { setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount } from '../../../redux/actions/filters';

// Set Start Date
test('Should return a set start date action object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

// Set End Date
test('Should return a set end date action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});

// Set Text Filter
test('Should return a set text filter action object for SPECIFIED text', () => {
    const action = setTextFilter('Bill');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'Bill'
    });
});

// Set Text Filter
test('Should return a set text filter action object for DEFAULT text', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

// Set sort-by Date object
test('Should return a sort-by Date action object', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE',
        sortBy: 'date'
    });
});

// Set sort-by Amount object
test('Should return a sort-by Amount action object', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT',
        sortBy: 'amount'
    });
});