import React from "react";
import ReactTooltip from "react-tooltip";

const ToolTip = ({ title }) => {
  return (
    <ReactTooltip
      id="main"
      place="top"
      type="dark"
      effect="solid"
      backgroundColor={"#FF8A8A"}
    />
  );
};

export default ToolTip;
