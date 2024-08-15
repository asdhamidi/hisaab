import React, { useState } from "react";
import Navbar from "./navbar";
import Summary from "./summary";
import Editor from "./editor";

const Board = ({ entries, makeEntry, loadEntries, setLoggedIn }) => {
  const [editor, setEditor] = useState(false);
  return (
    <div className="board">
      <Navbar
        setEditor={setEditor}
        setLoggedIn={setLoggedIn}
        entries={entries}
      />
      {editor === true && (
        <Editor
          makeEntry={makeEntry}
          setEditor={setEditor}
          loadEntries={loadEntries}
        />
      )}
      {editor === false && (
        <div className="entries">
          {entries.map((entry) => (
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
      )}
    </div>
  );
};

export default Board;
