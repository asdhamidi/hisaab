import React from "react";

const Popup = ({ title, ques, yesHandler, yesText, noHandler, noText }) => {
  return (
    <div className="pop">
      <h2>{title}</h2>
      <div>{ques}</div>
      <div className="controls">
        <button className="delete-btn" onClick={yesHandler}>
          {yesText}
        </button>
        <button className="submit-btn" onClick={noHandler}>
          {noText}
        </button>
      </div>
    </div>
  );
};

export default Popup;
