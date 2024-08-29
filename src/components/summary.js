import React, { useState } from "react";
import OweDetails from "./owe-details";

const Summary = ({ entries, users }) => {
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

  return (
    <div className="summary">
      <div className="summary-comp"><p className="summary-title">your spending:</p>{calculateSpent()}</div>
      <div className="summary-comp">
      <p className="summary-title">combined spending:</p>{" "}
        {entries.reduce((accumulator, currentValue) => {
          return accumulator + Number(currentValue.price);
        }, 0)}
      </div>
      <div
        className="summary-comp owe"
        onClick={() => {
          if (pop === "pop") setPop("pop pop-active");
          else setPop("pop");
        }}
      >
        Owe Matrix
      </div>

      {pop.includes("pop-active") && (
        <div
          className="blur"
          onClick={() => {
            if (pop === "pop") setPop("pop pop-active");
            else setPop("pop");
          }}
        ></div>
      )}
      <OweDetails entries={entries} pop={pop} setPop={setPop} users={users} />
    </div>
  );
};

export default Summary;
