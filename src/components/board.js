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
  const [sortOrder, setSortOrder] = useState({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 });
  const upperValue = Math.max(...filteredEntries.map((item) => item.price));
  const lowerValue = Math.min(...filteredEntries.map((item) => item.price));

  const getGradientColor = (value, clampLowerPercentile = 0.05, clampUpperPercentile = 0.95) => {
    // Normalize the range while clamping to remove extreme outliers
    const range = upperValue - lowerValue;
  
    // Clamp the value to ignore extreme outliers
    const clampedValue = Math.max(
      lowerValue + clampLowerPercentile * range,
      Math.min(value, lowerValue + clampUpperPercentile * range)
    );
  
    // Calculate normalized value after clamping
    const normalizedValue = (clampedValue - lowerValue) / range;
  
    // Handle very low and very high values by assigning specific colors
    if (value < lowerValue) {
      return `rgb(0, 0, 255)`; // Blue for extreme lows
    } else if (value > upperValue) {
      return `rgb(128, 0, 128)`; // Purple for extreme highs
    }
  
    // For values within range, interpolate between Green -> Yellow -> Red
    if (normalizedValue <= 0.5) {
      // For first half (Green to Yellow)
      const ratio = normalizedValue / 0.5; // Scale it within the [0, 0.5] range
      const green = 255;
      const red = Math.round(255 * ratio); // Red increases
      return `rgb(${red}, ${green}, 0)`; // Green to Yellow
    } else {
      // For second half (Yellow to Red)
      const ratio = (normalizedValue - 0.5) / 0.5; // Scale it within the [0.5, 1] range
      const red = 255;
      const green = Math.round(255 * (1 - ratio)); // Green decreases
      return `rgb(${red}, ${green}, 0)`; // Yellow to Red
    }
  };  

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
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
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
              className={`entry ${isUserEntry ? "user-entry" : ""}`}
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
              <div
                style={{
                  backgroundColor: getGradientColor(entry.price),
                }}
                className="board-profile"
              >
                
              </div>
              <div className="entry-deets">
                <div className="entry-items">
                  <em>
                    {entry.items.substring(0, 25)}
                    {entry.items.length > 18 && "..."}{" "}
                  </em>
                </div>
                <div className="entry-other-deets">
                  <em className="entry-paid-by">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-user"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                    {} {"  " + entry.paid_by} • {entry.date}{" "}
                    <div
                      style={{
                        color: "red",
                        fontWeight: 800
                      }}
                    >
                      {entry.updated_at !== "" && " • updated"}
                    </div>
                  </em>
                </div>
              </div>
              <div className="entry-right">
                <em className="entry-price">₹{entry.price}</em>
              </div>
              {/* <em>
                {entry.owed_all === true && "all"}
                {entry.owed_all === false && entry.owed_by.join(", ")}
              </em> */}
            </div>
          );
        })}
      </div>
      <Summary entries={filteredEntries} users={users} month={selectedMonth} setEditor={setEditor} setFilteredEntries={setFilteredEntries} setSelectedMonth={setSelectedMonth} selectedMonth={selectedMonth}/>
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
