import React, { useState } from "react";
import Navbar from "./navbar";
import Summary from "./summary";
import Popup from "./pop-up";

const Board = ({ entries, setLoggedIn, setEditor, setCurrentEntry }) => {
  const [filteredEntries, setFilteredEntries] = useState(entries);
  const [popUpEntry, setPopUpEntry] = useState({});
  const [popUpVisible, setPopUpVisible] = useState("pop-up-details");

  return (
    <div className="board">
      <Navbar
        setLoggedIn={setLoggedIn}
        entries={entries}
        setEditor={setEditor}
        filteredEntries={filteredEntries}
        setFilteredEntries={setFilteredEntries}
      />

      <div className="entries">
        {filteredEntries.map((entry) => {
          const currentUser = localStorage.getItem("user");
          const isUserEntry = entry.paid_by === currentUser;

          return (
            <div
              className={`entry ${isUserEntry ? "user-entry" : ""} ${
                entry.updated_at !== "" ? "updated" : ""
              }`}
              key={entry._id}
              onClick={
                isUserEntry
                  ? () => {
                      setCurrentEntry(entry);
                      setEditor(true);
                    }
                  : () => {
                      setPopUpEntry(entry);
                      setPopUpVisible("pop-up-details pop-up-details-active");
                    }
              }
            >
              <em>{entry.items}</em>
              <em>{entry.price}</em>
              <em>{entry.paid_by}</em>
              <em>
                {entry.owed_all === true && "all"}
                {entry.owed_all === false && entry.owed_by.join(", ")}
              </em>
              <em>{entry.date}</em>
            </div>
          );
        })}
      </div>
      <Summary entries={filteredEntries} />
      {popUpVisible.includes("pop-up-details-active") && (
        <div
          className="blur"
          onClick={() => {
            setPopUpVisible("pop-up-details");
            setPopUpEntry({});
          }}
        ></div>
      )}
      <Popup
        entry={popUpEntry}
        popUpVisible={popUpVisible}
        setPopUpVisible={setPopUpVisible}
        setPopUpEntry={setPopUpEntry}
      />
    </div>
  );
};

export default Board;
