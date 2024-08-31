import React, { useState, useEffect } from "react";

const Navbar = ({
  setEditor,
  setLoggedIn,
  entries,
  setEntries,
  filteredEntries,
  setFilteredEntries,
  selectedMonth, 
  setSelectedMonth
}) => {
  
  useEffect(() => {
    setFilteredEntries(
      entries.filter((entry) => {
        const datePart = entry.date.split(",")[0];
        const month = datePart.split("/")[1];
        return Number(month) === selectedMonth;
      })
    );
  }, [entries, selectedMonth, setFilteredEntries]);

  // Function to download JSON data as CSV
  function downloadJSONAsCSV(filteredEntries) {
    let csvData = jsonToCsv(filteredEntries); // Convert JSON to CSV
    let blob = new Blob([csvData], { type: "text/csv" });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); // Clean up
  }

  // Function to convert JSON data to CSV format
  function jsonToCsv(jsonData) {
    if (!jsonData || jsonData.length === 0) {
      return ""; // Handle empty or undefined JSON data
    }

    let csv = "";

    // Extract headers from the first object
    let headers = Object.keys(jsonData[0]).map((header) => {
      // Convert nested fields to string if necessary
      return Array.isArray(jsonData[0][header]) ? `${header}[]` : header;
    });
    csv += headers.join(",") + "\n";

    // Convert each row of JSON data to CSV format
    jsonData.forEach(function (row) {
      let rowData = headers
        .map((header) => {
          let key = header.replace("[]", ""); // Remove array notation for lookup
          let value = row[key];

          // Handle arrays (e.g., "owed_by")
          if (Array.isArray(value)) {
            return `"${value.join(", ")}"`; // Join array elements into a string
          } else {
            // Convert to string and handle special characters
            return `"${String(value).replace(/"/g, '""')}"`;
          }
        })
        .join(",");

      csv += rowData + "\n";
    });

    return csv;
  }

  const handleDownload = () => {
    downloadJSONAsCSV(filteredEntries);
  };

  return (
    <div className="top">
      <nav>
        <div className="nc1">
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
          <button className="download" onClick={handleDownload}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-download"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
              <path d="M7 11l5 5l5 -5" />
              <path d="M12 4l0 12" />
            </svg>
          </button>
        </div>
        <h1>हिसाब</h1>
        <div className="nav-controls nc2">
          <button className="new-entry" onClick={() => setEditor(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
              <path d="M9 12h6" />
              <path d="M12 9v6" />
            </svg>
          </button>
          <button
            className="logout"
            onClick={() => {
              setLoggedIn(false);
              localStorage.removeItem("token");
              localStorage.removeItem("user");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-logout"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
              <path d="M9 12h12l-3 -3" />
              <path d="M18 15l3 -3" />
            </svg>
          </button>
        </div>
      </nav>
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
