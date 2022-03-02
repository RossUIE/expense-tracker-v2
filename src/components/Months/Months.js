import React, { useEffect, useState, useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import monthNames from "../../constants/months";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentMonth } from "../../redux/month/month.selector";
import { setMonth } from "../../redux/month/month.actions";

import "./months.scss";

const Months = ({ month, setMonth }) => {
  const container = useRef(null);

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
        {monthNames.map((el, i) => (
          <div
            key={i}
            className={`row ${i === month.month ? "active" : "inactive"}`}
            onClick={(e) => setMonth(i)}
          >
            {el}
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
