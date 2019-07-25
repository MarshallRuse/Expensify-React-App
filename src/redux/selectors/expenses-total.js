import numeral from 'numeral';

const selectExpensesTotal = (expenses) => {

    let total = expenses.reduce((total, expense) => {
        return total + expense.amount;
    }, 0);
    return numeral(total / 100).format('$0,0.00');
}

export default selectExpensesTotal;