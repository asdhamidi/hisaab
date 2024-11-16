import React, { useState, useEffect } from "react";

const Navbar = ({
  setEditor,
  setLoggedIn,
  entries,
  setEntries,
  filteredEntries,
  setFilteredEntries,
  selectedMonth,
  setSelectedMonth,
  sortOrder,
  setSortOrder,
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

  function filterYourEntries() {
    if (!yourEntries)
      setFilteredEntries(
        entries.filter((entry) => {
          const datePart = entry.date.split(",")[0];
          const month = datePart.split("/")[1];
          return (
            Number(month) === selectedMonth &&
            entry.paid_by === localStorage.getItem("user")
          );
        })
      );
    else
      setFilteredEntries(
        entries.filter((entry) => {
          const datePart = entry.date.split(",")[0];
          const month = datePart.split("/")[1];
          return Number(month) === selectedMonth;
        })
      );

    setyourEntries(!yourEntries);
    if(yourOweEntries) setyourOweEntries(!yourOweEntries)
  }
  function filterYourOweEntries() {
    if (!yourOweEntries)
      setFilteredEntries(
        entries.filter((entry) => {
          const datePart = entry.date.split(",")[0];
          const month = datePart.split("/")[1];
          return (
            Number(month) === selectedMonth &&
            entry.owed_by.includes(localStorage.getItem("user"))
          );
        })
      );
    else
      setFilteredEntries(
        entries.filter((entry) => {
          const datePart = entry.date.split(",")[0];
          const month = datePart.split("/")[1];
          return Number(month) === selectedMonth;
        })
      );

    setyourOweEntries(!yourOweEntries);
    if(yourEntries) setyourEntries(!yourEntries)
  }

  const [yourEntries, setyourEntries] = useState(false);
  const [yourOweEntries, setyourOweEntries] = useState(false);

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
  function parseDate(dateStr) {
    const [day, month, year] = dateStr.split("/").map(Number); // Convert to numbers
    // Months in JavaScript are 0-based (0 = January, 11 = December)
    return new Date(year, month - 1, day); // Month is 0-based
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

  const calculateSpent = () => {
    const currentUser = localStorage.getItem("user");
    let totalSpent = 0;

    filteredEntries.forEach((entry) => {
      if (entry.paid_by === currentUser) {
        totalSpent += Number(entry.price);
      }
    });

    return totalSpent;
  };

  return (
    <div className="top">
      <nav>
        <div className="nav-controls nc2">
          <button className="logout logd" onClick={handleDownload}>
            download
          </button>
        </div>

        <h1>हिसाब</h1>
        <div className="nav-controls nc2">
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
      <div className="nav-owe">
        <div className="no-1">
          <div className="summary-comp owe-1">
            <p className="summary-title">your spent:</p>
            <b>₹{calculateSpent()}</b>
          </div>
          <div className="summary-comp owe-2">
            <p className="summary-title">total spending:</p>
            <b>
              ₹
              {filteredEntries.reduce(
                (sum, item) => sum + Number(item.price),
                0
              )}
            </b>
          </div>
        </div>
        <div className="no-2">
          <button
            onClick={filterYourEntries}
            className={`${yourEntries ? "active-filter" : "filter"}`}
          >
            your entries
          </button>
          <button
            onClick={filterYourOweEntries}
            className={`${yourOweEntries ? "active-filter" : "filter"}`}
          >
            you owe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
