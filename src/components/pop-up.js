import React from "react";

const Popup = ({ entry, popUpVisible, setPopUpVisible, setPopUpEntry }) => {
  return (
    <div className="msg-details-pop-up pop-up-details pop-up-details-active ">
      <h2>entry details</h2>
      <hr />
      <div className="pop-msg-details entries">
        <div className="entry">
          <em>items</em>
          <em>{entry.items}</em>
        </div>
        <div className="entry">
          <em>price</em>
          <em>{entry.price}</em>
        </div>
        <div className="entry">
          <em>paid by</em>
          <em>{entry.paid_by}</em>
        </div>
        <div className="entry">
          <em>owed by:</em>
          <em>{entry.owed_by && entry.owed_by.join(", ")}</em>
        </div>
        <div className="entry">
          <em>date</em>
          <em>{entry.date}</em>
        </div>
        {entry.notes !== "" && (
          <div className="entry">
            <em>notes</em>
            <em>{entry.notes}</em>
          </div>
        )}
        {entry.updated_at !== "" && (
          <div className="entry">
            <em>updated at</em>
            <em>{entry.updated_at}</em>
          </div>
        )}

        {/* Check for previous versions and display them if they exist */}
        {entry.previous_versions && entry.previous_versions.length > 0 && (
          <>
            <h3>Previous Versions:</h3>
            {entry.previous_versions.map((version, index) => (
              <div key={index} className="entries">
                <strong>version {index + 1}:</strong>
                <div className="entry">
                  <em>items</em>
                  <em>{version.items}</em>
                </div>
                <div className="entry">
                  <em>price</em>
                  <em>{version.price}</em>
                </div>
                <div className="entry">
                  <em>paid by:</em>
                  <em>{version.paid_by}</em>
                </div>
                <div className="entry">
                  <em>owed by:</em>
                  <em>{version.owed_by.join(", ")}</em>
                </div>
                <div className="entry">
                  <em>date</em>
                  <em>{version.date}</em>
                </div>
                {version.notes !== "" && (
                  <div className="entry">
                    <em>notes</em>
                    <em>{version.notes}</em>
                  </div>
                )}
                {version.updated_at !== "" && (
                  <div className="entry">
                    <em>updated at</em>
                    <em>{version.updated_at}</em>
                  </div>
                )}
                <hr />
              </div>
            ))}
          </>
        )}
      </div>
      <h1
        onClick={() => {
          setPopUpVisible(false);
          setPopUpEntry({});
        }}
      >
        close
      </h1>
    </div>
  );
};

export default Popup;
