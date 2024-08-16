import React, { useState } from "react";
import Navbar from "./navbar";

const Board = ({
  entries,
  makeEntry,
  loadEntries,
  setLoggedIn,
  setEditor,
  setCurrentEntry,
}) => {
  const [filteredEntries, setFilteredEntries] = useState(entries);

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
              className={`entry ${isUserEntry ? "user-entry" : ""}`}
              key={entry._id}
              onClick={
                isUserEntry
                  ? () => {
                      setCurrentEntry(entry);
                      setEditor(true);
                    }
                  : undefined
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
    </div>
  );
};

export default Board;
