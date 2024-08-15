import React, { useState } from "react";
import Navbar from "./navbar";

const Board = ({ entries, makeEntry, loadEntries, setLoggedIn, setEditor }) => {
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
        {filteredEntries.map((entry) => (
          <div className="entry" key={entry._id}>
            <em>{entry.items}</em>
            <em>{entry.price}</em>
            <em>{entry.paid_by}</em>
            <em>
              {entry.owed_all === true && "all"}
              {entry.owed_all === false && entry.owed_by.join(", ")}
            </em>
            <em>{entry.date}</em>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
