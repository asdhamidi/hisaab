import React from "react";

const Popup = ({ entry, popUpVisible, setPopUpVisible, setPopUpEntry }) => {
  return (
    <div className={popUpVisible}>
      <h2>Entry Details:</h2>
      <hr />
      <div className="pop-msg-details entries">
        {/* Display the main entry details */}
        <div className="entry">
          <em>Items:</em>
          <em>{entry.items}</em>
        </div>
        <div className="entry">
          <em>Price:</em>
          <em>{entry.price}</em>
        </div>
        <div className="entry">
          <em>Paid by:</em>
          <em>{entry.paid_by}</em>
        </div>
        {entry.notes !== "" && (
          <div className="entry">
            <em>Notes:</em>
            <em>{entry.notes}</em>
          </div>
        )}
        {entry.updated_at !== "" && (
          <div className="entry">
            <em>Updated at:</em>
            <em>{entry.updated_at}</em>
          </div>
        )}

        {/* Check for previous versions and display them if they exist */}
        {entry.previous_versions && entry.previous_versions.length > 0 && (
          <>
            <h3>Previous Versions:</h3>
            {entry.previous_versions.map((version, index) => (
              <div key={index} className="entries">
                <strong>Version {index + 1}:</strong>
                <div className="entry">
                  <em>Items:</em>
                  <em>{version.items}</em>
                </div>
                <div className="entry">
                  <em>Price:</em>
                  <em>{version.price}</em>
                </div>
                <div className="entry">
                  <em>Paid by:</em>
                  <em>{version.paid_by}</em>
                </div>
                {version.notes !== "" && (
                  <div className="entry">
                    <em>Notes:</em>
                    <em>{version.notes}</em>
                  </div>
                )}
                {version.updated_at !== "" && (
                  <div className="entry">
                    <em>Updated at:</em>
                    <em>{version.updated_at}</em>
                  </div>
                )}
                <hr />
              </div>
            ))}
          </>
        )}
      </div>

      {/* Close button */}
      <h1
        onClick={() => {
          setPopUpEntry({});
          setPopUpVisible("pop-up-details");
        }}
      >
        Close
      </h1>
    </div>
  );
};

export default Popup;
