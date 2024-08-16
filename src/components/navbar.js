import React, { useState, useEffect } from "react";
import Summary from "./summary";

const Navbar = ({
  setEditor,
  setLoggedIn,
  entries,
  setEntries,
  filteredEntries,
  setFilteredEntries,
}) => {
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  useEffect(() => {
    setFilteredEntries(
      entries.filter((entry) => {
        const datePart = entry.date.split(",")[0];
        const month = datePart.split("/")[1];
        return Number(month) === selectedMonth;
      })
    );
  }, [entries, selectedMonth, setFilteredEntries]);

  return (
    <div className="top">
      <nav>
        <h1>hi, {localStorage.getItem("user")}!</h1>
        <div className="nav-controls">
          <select
            className="month"
            name="month"
            id="month"
            value={selectedMonth}
            onChange={(event) => {
              const selected = Number(event.target.value);
              setSelectedMonth(selected);
              setFilteredEntries(
                entries.filter((entry) => {
                  const datePart = entry.date.split(",")[0];
                  const month = datePart.split("/")[1];
                  return Number(month) === selected;
                })
              );
            }}
          >
            <option value="1">jan</option>
            <option value="2">feb</option>
            <option value="3">mar</option>
            <option value="4">apr</option>
            <option value="5">may</option>
            <option value="6">jun</option>
            <option value="7">jul</option>
            <option value="8">aug</option>
            <option value="9">sept</option>
            <option value="10">oct</option>
            <option value="11">nov</option>
            <option value="12">dec</option>
          </select>
          <button className="new-entry" onClick={() => setEditor(true)}>
            new
          </button>
          <button
            className="logout"
            onClick={() => {
              setLoggedIn(false);
              localStorage.removeItem("token");
              localStorage.removeItem("user");
            }}
          >
            logout
          </button>
        </div>
      </nav>
      <Summary entries={filteredEntries} />
      <div className="entry entry-header">
        <em>items</em>
        <em>price</em>
        <em>paid by</em>
        <em>owed by</em>
        <em>date</em>
      </div>
    </div>
  );
};

export default Navbar;
