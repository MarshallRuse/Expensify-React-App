import moment from 'moment';
import filtersReducer from '../../../redux/reducers/filters';

// Default values
test('Should set up the default filter values', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

// Sort by amount
test('Should set up sort by amount', () => {
    const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT', sortBy: 'amount'});
    expect(state.sortBy).toBe('amount');
});

// Sort by date
test('Should set up sort by date', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const state = filtersReducer(currentState, {type: 'SORT_BY_DATE', sortBy: 'date'});
    expect(state.sortBy).toBe('date');
});


// Set text filter
test('Should set up text filter state', () => {
    const state = filtersReducer(undefined, {type: 'SET_TEXT_FILTER', text: 'avalanche'});
    expect(state.text).toBe('avalanche');
});

// Set start date filter
test('Should set up start date state', () => {
    const state = filtersReducer(undefined, {type: 'SET_START_DATE', startDate: 500});
    expect(state.startDate).toBe(500);
});

// Sort end date filter
test('Should set up end date state', () => {
    const state = filtersReducer(undefined, {type: 'SET_END_DATE', endDate: 1000});
    expect(state.endDate).toBe(1000);
});
