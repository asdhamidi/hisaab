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

        <h1>हिसाब</h1>
        <div className="nav-controls nc2">
          <button
            className="logout"
            onClick={() => {
              setLoggedIn(false);
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              localStorage.removeItem("admin");
            }}
          >
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
          </button>
        </div>
      </nav>
      <div className="nav-owe">
        <div className="no-1">
          <div className="summary-comp owe-1">
            <b>₹{calculateSpent()}</b>
            <p className="summary-title">you have spent</p>
          </div>
          <div className="summary-comp owe-2">
            <b>
              ₹
              {filteredEntries.reduce(
                (sum, item) => sum + Number(item.price),
                0
              )}
            </b>
            <p className="summary-title">total spending</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
