import React from "react";

const OweDetails = ({ entries, pop, setPop }) => {
  function calculateBalances() {
    const users = ["asad", "aaryan", "piyush", "sachin", "saurav"];
    const balances = {};

    // Initialize balances for each user
    users.forEach((user) => {
      balances[user] = {};
      users.forEach((other) => {
        if (user !== other) {
          balances[user][other] = 0;
        }
      });
    });

    entries.forEach((entry) => {
      const totalPeople = entry.owed_by.length; // +1 for the person who paid
      const share = entry.price / totalPeople;
      const payer = entry.paid_by;

      // Payer receives money from others
      entry.owed_by.forEach((ower) => {
        balances[ower][payer] -= Math.round(share);
        balances[payer][ower] += Math.round(share);
      });
    });

    let table = "<div class=\"entry\">";

    // Header row with user names
    table += `<em><b>users</b></em>`;
    users.forEach((user) => {
      table += `<em><b>${user}</b></em>`;
    });
    table += "</div>";

    // Data rows
    users.forEach((user) => {
      table += `<div class="entry"><em>${user}</em>`;
      users.forEach((other) => {
        if (user === other) {
          table += "<em>-</em>"; // No one owes themselves
        } else {
          table += "<em style=\"color: "+(balances[user][other] >= 0 ? "green": "red")+"\">₹"+balances[user][other].toFixed(2)+"</em>";
        }
      });
      table += "</div>";
    });

    return table;
  }

  return (
    <div className={pop}>
      <h1
        onClick={() => {
          if (pop === "pop") setPop("pop pop-active");
          else setPop("pop");
        }}
      >
        close
      </h1>
      <div className="pop-details">
        <h2>owe matrix:</h2>
        <hr style={{ width: "100%" }}></hr>
        <div className="entries" dangerouslySetInnerHTML={{ __html: calculateBalances() }}></div>
        <em>Note: Negative amount means that the Row person owes that to Column person. Conversely, positive amount means the column person owes that to row person.</em>
      </div>
    </div>
  );
};

export default OweDetails;
