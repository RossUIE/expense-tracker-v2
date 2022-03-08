import React, { useEffect, useState, useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import monthNames from "../../constants/months";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentMonth } from "../../redux/month/month.selector";
import { setMonth } from "../../redux/month/month.actions";

import "./months.scss";

const Months = ({ month, setMonth, getExpenses }) => {
  const container = useRef(null);

  const handleChange = (month) => {
    setMonth(month);
    getExpenses(month);
  };
  useEffect(() => {
    if (container.current) {
      container.current.children[month.month].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [month]);
  return (
    <div className="months">
      <ScrollContainer
        horizontal={true}
        className="container"
        innerRef={container}
      >
        {monthNames?.map((el, i) => (
          <div
            key={i}
            className={`row ${i === month.month ? "active" : "inactive"}`}
            onClick={(e) => handleChange(i)}
          >
            {el.name}
          </div>
        ))}
      </ScrollContainer>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  month: selectCurrentMonth,
});

const mapDispatchToProps = (dispatch) => ({
  setMonth: (month) => dispatch(setMonth(month)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Months);
