import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./progress-bar.scss";

const ProgressBar = () => {
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setPercentage(66);
    }, 100);
  }, []);
  return (
    <div class="progress-bar">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        maxValue={1000}
        styles={{
          path: {
            // Path color
            stroke:
              parseFloat(percentage) >= parseFloat(1000)
                ? "red"
                : `rgba(62, 152, 199, ${percentage / 100})`,
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "round",
            // Customize transition animation
            transition: "stroke-dashoffset 0.5s ease 0s",
            // Rotate the path
            transform: "rotate(0.25turn)",
            transformOrigin: "center center",
          },
          // Customize the circle behind the path, i.e. the "total progress"
          trail: {
            // Trail color
            stroke: "#d6d6d6",
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "butt",
            // Rotate the trail
            transform: "rotate(0.25turn)",
            transformOrigin: "center center",
          },
          // Customize the text
          text: {
            // Text color
            fill: "#f88",
            // Text size
            fontSize: "16px",
          },
          // Customize background - only used when the `background` prop is true
          background: {
            fill: "#3e98c7",
          },
        }}
      />
    </div>
  );
};

export default ProgressBar;
