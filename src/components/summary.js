import React, { useState } from "react";
import Popup from "./pop";

const Summary = ({ entries }) => {
  const [pop, setPop] = useState("pop");
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

  const calculateOwed = () => {
    const currentUser = localStorage.getItem("user");
    let totalOwed = 0;

    entries.forEach((entry) => {
      if (entry.paid_by !== currentUser && entry.owed_by.includes(currentUser)) {
        if (entry.owed_by.length !== 0)
          totalOwed += Number(entry.price) / entry.owed_by.length;
        else totalOwed += Number(entry.price) / 5;
      }
    });

    return Math.round(totalOwed);
  };

  return (
    <div className="summary">
      <div className="summary-comp">You spent: {calculateSpent()}</div>
      <div
        className="summary-comp owe"
        onClick={() => {
          if (pop === "pop") setPop("pop pop-active");
          else setPop("pop");
        }}
      >
        You owe: {calculateOwed()}
      </div>
      <Popup entries={entries} pop={pop} setPop={setPop}/>
    </div>
  );
};

export default Summary;
