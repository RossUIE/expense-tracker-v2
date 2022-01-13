import React from "react";

import './expenses-summary.scss';

const ExpensesSummary = () => {

    return (
        <div className="expenses-summary">
            <p>January</p>
            <div className="expenses-summary-graph">
                Graph
            </div>
            <p>£24 of £1000</p>
        </div>
    )
}

export default ExpensesSummary;