import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Summary from "./summary";
import Popup from "./pop-up";
import ClockLoader from "react-spinners/ClockLoader";

const override = {
  borderColor: "#666",
};

const Board = ({
  entries,
  filteredEntries,
  setFilteredEntries,
  users,
  setLoggedIn,
  setEditor,
  setCurrentEntry,
  loadingEntries,
}) => {
  const [popUpEntry, setPopUpEntry] = useState({});
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  return (
    <div className="board">
      <Navbar
        setLoggedIn={setLoggedIn}
        entries={entries}
        setEditor={setEditor}
        filteredEntries={filteredEntries}
        setFilteredEntries={setFilteredEntries}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      {loadingEntries && (
        <div className="loader">
          <ClockLoader
            className="loading-spinner"
            loading={true}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
            cssOverride={override}
          />
        </div>
      )}
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
      <Summary entries={filteredEntries} users={users} month={selectedMonth} />
      {popUpVisible && (
        <>
          <div
            className="blur"
            onClick={() => {
              setPopUpVisible(false);
              setPopUpEntry({});
            }}
          ></div>
          <Popup
            entry={popUpEntry}
            popUpVisible={popUpVisible}
            setPopUpVisible={setPopUpVisible}
            setPopUpEntry={setPopUpEntry}
          />
        </>
      )}
    </div>
  );
};

export default Board;
