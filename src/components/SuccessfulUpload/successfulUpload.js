import React, { useEffect } from "react";

import "./successful-upload.scss";

const SuccessfulUpload = () => {
  return (
    <div className="successful-upload">
      <div className="success-checkmark">
        <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </div>
      <p className="upload-successful-text">Expense uploaded</p>
      <div className="succces-backdrop"></div>
    </div>
  );
};

export default SuccessfulUpload;
