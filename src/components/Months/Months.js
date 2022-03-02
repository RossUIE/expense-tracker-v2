import React, { useEffect, useState, useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import monthNames from "../../constants/months";

import "./months.scss";

const Months = () => {
  const container = useRef(null);
  const [activeIndex, setActiveIndex] = useState(11);
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
            className={`row ${i === activeIndex ? "active" : "inactive"}`}
            // onClick={(e) => getMonth(i, e)}
          >
            {el}
          </div>
        ))}
      </ScrollContainer>
    </div>
  );
};

export default Months;
