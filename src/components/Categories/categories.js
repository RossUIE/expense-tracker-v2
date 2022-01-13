import React, { useState, useEffect } from "react";
// import { DateHelper } from "../../Helpers/DateHelper/DateHelper";

import "./categories.scss";

export default function Categories(props) {
  const [totalAmountSpent, setTotalAmountSpent] = useState(0);

  const CATEGORY_BUCKETS = {
    Groceries: {
      data: [],
      total: 0,
    },
    onlineShopping: {
      data: [],
      total: 0,
    },
    fuel: {
      data: [],
      total: 0,
    },
    bills: {
      data: [],
      total: 0,
    },
    eatingOut: {
      data: [],
      total: 0,
    },
    savings: {
      data: [],
      total: 0,
    },
    other: {
      data: [],
      total: 0,
    },
  };

  useEffect(() => {
    // getTotalAmountSpent();
  }, [props.expenses]);

  //   const filteredExpensesCount = props.expenses.map((current) => {
  //     if (current.category === "Groceries") {
  //       CATEGORY_BUCKETS.Groceries.data.push(current);
  //       CATEGORY_BUCKETS.Groceries.total += parseFloat(current.price);
  //     } else if (current.category === "Online Shopping") {
  //       CATEGORY_BUCKETS.onlineShopping.data.push(current);
  //       CATEGORY_BUCKETS.onlineShopping.total += parseFloat(current.price);
  //     } else if (current.category === "Fuel") {
  //       CATEGORY_BUCKETS.fuel.data.push(current);
  //       CATEGORY_BUCKETS.fuel.total += parseFloat(current.price);
  //     } else if (current.category === "Bills") {
  //       CATEGORY_BUCKETS.bills.data.push(current);
  //       CATEGORY_BUCKETS.bills.total += parseFloat(current.price);
  //     } else if (current.category === "Eating Out") {
  //       CATEGORY_BUCKETS.eatingOut.data.push(current);
  //       CATEGORY_BUCKETS.eatingOut.total += parseFloat(current.price);
  //     } else if (current.category === "Savings") {
  //       CATEGORY_BUCKETS.savings.data.push(current);
  //       CATEGORY_BUCKETS.savings.total += parseFloat(current.price);
  //     } else if (current.category === "Other") {
  //       CATEGORY_BUCKETS.other.data.push(current);
  //       CATEGORY_BUCKETS.other.total += parseFloat(current.price);
  //     } else {
  //       return null;
  //     }
  //   });

  const formatMoney = (price) => {
    return price.toLocaleString("en", {
      useGrouping: false,
      minimumFractionDigits: 2,
    });
  };

  const getTotalAmountSpent = () => {
    let total = 0;

    props.expenses.forEach((expense) => {
      total += parseFloat(expense.price);
      return total.toFixed(2);
    });

    var totalFormat = formatMoney(total);

    setTotalAmountSpent(totalFormat);
  };

  return (
    <>
      <div className="c-categories-tile">
        <div className="c-categories-tile_header">
          {/* <p>SPENDING FOR {DateHelper(props.chosenMonth)}</p> */}
          <p>Spending for January</p>
          <p>£{totalAmountSpent}</p>
        </div>
        <div className="c-categories-tile_content">
          <div className="category">
            <div className="category-title">
              <i className="material-icons">shopping_basket</i>
              <p>Groceries</p>
            </div>
            <p>£{CATEGORY_BUCKETS.Groceries.total.toFixed(2)}</p>
          </div>
          <div className="category">
            <div className="category-title">
              <i className="material-icons">shopping_cart</i>
              <p>Online Shopping</p>
            </div>
            <p>£{CATEGORY_BUCKETS.onlineShopping.total.toFixed(2)}</p>
          </div>
          <div className="category">
            <div className="category-title">
              <i className="material-icons">local_gas_station</i>
              <p>Fuel</p>
            </div>
            <p>£{CATEGORY_BUCKETS.fuel.total.toFixed(2)}</p>
          </div>
          <div className="category">
            <div className="category-title">
              <i className="material-icons">receipt_long</i>
              <p>Bills</p>
            </div>
            <p>£{CATEGORY_BUCKETS.bills.total.toFixed(2)}</p>
          </div>
          <div className="category">
            <div className="category-title">
              <i className="material-icons">fastfood</i>
              <p>Eating Out</p>
            </div>
            <p>£{CATEGORY_BUCKETS.eatingOut.total.toFixed(2)}</p>
          </div>
          <div className="category">
            <div className="category-title">
              <i className="material-icons">savings</i>
              <p>Savings</p>
            </div>
            <p>£{CATEGORY_BUCKETS.savings.total.toFixed(2)}</p>
          </div>
          <div className="category">
            <div className="category-title">
              <i className="material-icons">storefront</i>
              <p>Retail</p>
            </div>
            <p>£{CATEGORY_BUCKETS.savings.total.toFixed(2)}</p>
          </div>
          <div className="category">
            <div className="category-title">
              <i className="material-icons">card_giftcard</i>
              <p>Gifts</p>
            </div>
            <p>£{CATEGORY_BUCKETS.savings.total.toFixed(2)}</p>
          </div>
          <div className="category">
            <div className="category-title">
              <i className="material-icons">workspaces</i>
              <p>Other</p>
            </div>
            <p>£{CATEGORY_BUCKETS.other.total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </>
  );
}
