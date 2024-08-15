import React from "react";

const Summary = ({ entries }) => {
  const calculateSpent = () => {
    const currentUser = localStorage.getItem("username");
    let totalSpent = 0;

    entries.forEach((entry) => {
      if (entry.paid_by === currentUser) {
        totalSpent += Number(entry.price);
      }
    });

    return totalSpent;
  };

  const calculateOwed = () => {
    const currentUser = localStorage.getItem("username");
    let totalOwed = 0;

    entries.forEach((entry) => {
      if (entry.paid_by !== currentUser) {
        if (entry.owed_by.length !== 0)
          totalOwed += Number(entry.price) / entry.owed_by.length;
        else totalOwed += Number(entry.price) / 5;
      }
    });

    return totalOwed;
  };

  return (
    <div className="summary">
      <div className="summary-comp">You have spent: {calculateSpent()}</div>
      <div className="summary-comp">You owe: {calculateOwed()}</div>
    </div>
  );
};

export default Summary;
