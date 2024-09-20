import React, { useState } from "react";
import OweDetails from "./owe-details";
import Activites from "./activities";
import Chart from "./stats";

const Summary = ({ entries, users, month }) => {
  const [oweScreen, setOwescreen] = useState(false);
  const [activitesScreen, setActivitesScreen] = useState(false);
  const [chartsScreen, setChartsScreen] = useState(false);

  const calculateSpent = () => {
    const currentUser = localStorage.getItem("user");
    let totalSpent = 0;

    entries.forEach((entry) => {
      if (entry.paid_by === currentUser) {
        totalSpent += Number(entry.price);
      }
    });

    return totalSpent;
  };

  return (
    <div className="summary">
      <div className="summary-comp owe">
        <p className="summary-title">your have spent:</p>
        <b>₹{calculateSpent()}</b>
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
    </div>
  );
};

export default Summary;
