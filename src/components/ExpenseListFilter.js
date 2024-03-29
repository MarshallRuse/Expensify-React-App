import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../redux/actions/filters';


export class ExpenseListFilter extends React.Component {

    state = {
        calendarFocused: null
    };

    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }

    onFocusChange = (calendarFocused) => (this.setState({calendarFocused }));

    onTextChange = (e) => {
        // Connect has the store.dispatch() method as a prop passed in
        // (Can be observed with React Dev Tools).
        // Use this dispatch to call actions to change the state to be reflected 
        // input's value
        this.props.setTextFilter(e.target.value)
    };

    onSortChange = (e) => {
        if (e.target.value === 'date'){
            this.props.sortByDate();
        } else if (e.target.value === 'amount'){
            this.props.sortByAmount();
        }
    };

    render() {
        return (
            <div className='content-container'>
                <div className='input-group'>
                    <div className='input-group__item'>
                        <input 
                            type='text'
                            className='text-input' 
                            value={this.props.filters.text} 
                            placeholder='Search expenses'
                            onChange={this.onTextChange} 
                        />
                    </div>
                    <div className='input-group__item'>
                        <select
                            value={this.props.filters.sortBy}
                            className='select' 
                            onChange={this.onSortChange}
                        >
                            <option value='date'>Date</option>
                            <option value='amount'>Amount</option>
                        </select>
                    </div>
                    <div className='input-group__item'>
                        <DateRangePicker 
                            startDateId="MyDatePickerStart"
                            endDateId="MyDatePickerEnd"
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            showClearDates={true}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                        />
                    </div>
                </div>
            </div>
        )
        
    }
}

const mapStateToFilter = (state) => {
    return {
        filters: state.filters
    }
}

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
})

export default connect(mapStateToFilter, mapDispatchToProps)(ExpenseListFilter)

