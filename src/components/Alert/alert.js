import React from "react";

import "./alert.scss";

export default function Alert(props) {
  let classes = ["c-alert"];

  if (props.success) {
    classes = ["c-alert success"];
  }

  if (props.warning) {
    classes = ["c-alert warning"];
  }

  if (props.error) {
    classes = ["c-alert error"];
  }

  return <div className={classes}>{props.children}</div>;
}
