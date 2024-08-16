import React from "react";

const Popup = ({ entry, popUpVisible, setPopUpVisible, setPopUpEntry }) => {
  return (
    <div className={popUpVisible}>
      <h2>entry details:</h2>
      <div className="pop-msg-details">
        <hr></hr>
        <p>
          items:<b>{entry.items}</b>
        </p>
        <p>
          price: <b>{entry.price}</b>
        </p>
        <p>
          paid by: <b>{entry.paid_by}</b>
        </p>
        <p>
          notes: <b>{entry.notes}</b>
        </p>
        {entry.updated_at !== "" && (
          <p>
            updated_at: <b>{entry.updated_at}</b>
          </p>
        )}
      </div>
      <h1
        onClick={() => {
          setPopUpEntry({});
          setPopUpVisible("pop-up-details");
        }}
      >
        close
      </h1>
    </div>
  );
};

export default Popup;
