import React, { useState } from "react";
import OweDetails from "./owe-details";
import AdminScreen from "./admin-screen";

const Summary = ({
  entries,
  users,
  month,
  setEditor,
  setSelectedMonth,
  selectedMonth,
  setFilteredEntries,
}) => {
  const [oweScreen, setOwescreen] = useState(false);
  const [adminScreen, setAdminScreen] = useState(false);

  return (
    <div className="summary">
      {oweScreen && (
        <OweDetails
          entries={entries}
          pop={oweScreen}
          setPop={setOwescreen}
          users={users}
        />
      )}
      {adminScreen && (
        <AdminScreen
          entries={entries}
          setAdminScreen={setAdminScreen}
          adminScreen={adminScreen}
          month={month}
        />
      )}
      <div className="nc1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-month"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
          <path d="M16 3v4" />
          <path d="M8 3v4" />
          <path d="M4 11h16" />
          <path d="M7 14h.013" />
          <path d="M10.01 14h.005" />
          <path d="M13.01 14h.005" />
          <path d="M16.015 14h.005" />
          <path d="M13.015 17h.005" />
          <path d="M7.01 17h.005" />
          <path d="M10.01 17h.005" />
        </svg>
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
      </div>
      <button className="new-entry" onClick={() => setEditor(true)}>
        new entry
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        className="summary-comp"
        onClick={() => {
          setOwescreen(!oweScreen);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-list-details"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M13 5h8" />
          <path d="M13 9h5" />
          <path d="M13 15h8" />
          <path d="M13 19h5" />
          <path d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
          <path d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
        </svg>
      </div>
      {localStorage.getItem("admin") === 'true' && (
        <div
          className="summary-comp"
          onClick={() => {
            setAdminScreen(!adminScreen);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-device-desktop-code"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12.5 16h-8.5a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v8" />
            <path d="M7 20h4" />
            <path d="M9 16v4" />
            <path d="M20 21l2 -2l-2 -2" />
            <path d="M17 17l-2 2l2 2" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Summary;
