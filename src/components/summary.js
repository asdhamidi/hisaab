import React, { useState } from "react";
import OweDetails from "./owe-details";
import Activites from "./activities";
import Chart from "./stats";

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
  const [activitesScreen, setActivitesScreen] = useState(false);
  const [chartsScreen, setChartsScreen] = useState(false);

  return (
    <div className="summary">
      {activitesScreen && (
        <Activites
          entries={entries}
          setActivitesScreen={setActivitesScreen}
          activitesScreen={activitesScreen}
          month={month}
        />
      )}
      {oweScreen && (
        <OweDetails
          entries={entries}
          pop={oweScreen}
          setPop={setOwescreen}
          users={users}
        />
      )}
      {chartsScreen && (
        <Chart
          setChartsScreen={setChartsScreen}
          chartsScreen={chartsScreen}
          month={month}
          entries={entries}
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
        New Entry
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
      <div
        className="summary-comp"
        onClick={() => {
          setChartsScreen(!chartsScreen);
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
          className="icon icon-tabler icons-tabler-outline icon-tabler-file-analytics"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
          <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
          <path d="M9 17l0 -5" />
          <path d="M12 17l0 -1" />
          <path d="M15 17l0 -3" />
        </svg>
      </div>
      <div className="summary-comp">
        <svg
          onClick={() => {
            setActivitesScreen(!activitesScreen);
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-activity"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 12h4l3 8l4 -16l3 8h4" />
        </svg>
      </div>
    </div>
  );
};

export default Summary;
