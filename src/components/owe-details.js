import React, { useEffect, useState } from "react";

const OweDetails = ({ entries, pop, setPop, users }) => {
  const [balances, setBalances] = useState({});

  useEffect(() => calculateBalances(), [setBalances]);

  function calculateBalances() {
    const currBalance = {};
    const currentUser = localStorage.getItem("user");
    users.forEach((user) => {
      if (user !== currentUser) currBalance[user] = 0;
    });

    entries.forEach((entry) => {
      const totalPeople = entry.owed_by.length; // +1 for the person who paid
      const share = entry.price / totalPeople;
      const payer = entry.paid_by;

      if (payer === currentUser) {
        entry.owed_by.forEach((ower) => {
          currBalance[ower] += share;
        });
      } else {
        if (entry.owed_by.includes(currentUser)) currBalance[payer] -= share;
      }
    });

    users.forEach((user) => {
      currBalance[user] = Math.ceil(currBalance[user]);
    });

    setBalances(currBalance);
  }

  return (
    <div className="pop pop-active">
      <div className="pop-details">
        <div className="owe-controls">
          <h2>owe matrix</h2>
          <hr style={{ width: "100%" }}></hr>
        </div>
        {entries.length !== 0 && (
          <>
            <div className="profiles">
              {users
                .filter((user) => user !== localStorage.getItem("user"))
                .filter((user) => balances[user] < 0).length > 0 && (
                <h3>people you owe money to</h3>
              )}
              {users
                .filter((user) => user !== localStorage.getItem("user"))
                .filter((user) => balances[user] < 0)
                .map((user) => {
                  return (
                    <div className="profile" key={user}>
                      <div className="owe-profile-info">
                        <div className="owe-profile">
                          {user.substring(0, 1) +
                            user.substring(user.length, user.length - 1)}
                        </div>
                        <b>{user}</b>
                      </div>
                      <div className="owe-info">
                        <em>you owe</em>
                        <b>₹{Math.abs(balances[user])}</b>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="profiles">
              {users
                .filter((user) => user !== localStorage.getItem("user"))
                .filter((user) => balances[user] > 0).length > 0 && (
                <h3>people who owe money to you</h3>
              )}

              {users
                .filter((user) => user !== localStorage.getItem("user"))
                .filter((user) => balances[user] > 0)
                .map((user) => {
                  return (
                    <div className="profile" key={user}>
                      <div className="owe-profile-info">
                        <div className="owe-profile">
                          {user.substring(0, 1) +
                            user.substring(user.length, user.length - 1)}
                        </div>
                        <b>{user}</b>
                      </div>
                      <div className="owe-info">
                        <em>owes you</em>
                        <b>₹{balances[user]}</b>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
      <h1
        className="close"
        onClick={() => {
          setPop(!pop);
        }}
      >
        close
      </h1>
    </div>
  );
};

export default OweDetails;
