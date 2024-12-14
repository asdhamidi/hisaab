import React, { useEffect, useState } from "react";

const OweDetails = ({ entries, pop, setPop, users }) => {
  const [balances, setBalances] = useState({});
  const handleItemExpansion = (src) => {
    if (src.currentTarget.className === "profile-sup pro-items")
      src.currentTarget.className = "profile-sup pro-items-visible";
    else if (src.currentTarget.className === "profile-sup pro-items-visible")
      src.currentTarget.className = "profile-sup pro-items";
  };

  useEffect(() => calculateBalances(), [setBalances]);

  function calculateBalances() {
    const currBalance = {};
    const currentUser = localStorage.getItem("user");
    users.forEach((user) => {
      if (user !== currentUser) currBalance[user] = 0;
    });

    entries.forEach((entry) => {
      const owees = entry.owed_by;
      const totalPeople = owees.length; // +1 for the person who paid
      const share = Math.ceil(entry.price / totalPeople);
      const payer = entry.paid_by;

      if (payer === currentUser) {
        entry.owed_by.forEach((owee) => {
          currBalance[owee] += share;
        });
      } else {
        if (
          entry.owed_by.includes(currentUser) ||
          entry.owed_by === currentUser
        )
          currBalance[payer] -= share;
      }
    });

    users.forEach((user) => {
      currBalance[user] = Math.ceil(currBalance[user]);
    });
    console.log(currBalance);
    setBalances(currBalance);
  }

  return (
    <div className="pop pop-active">
      <>
        <div className="owe-controls">
          <h2>owe matrix</h2>
          <hr style={{ width: "100%" }}></hr>
        </div>
        <div className="pop-details">
          {entries.length !== 0 && (
            <>
              {users
                .filter((user) => user !== localStorage.getItem("user"))
                .filter((user) => balances[user] < 0).length > 0 && (
                <div className="profiles">
                  <h3>people you owe money to</h3>
                  {users
                    .filter((user) => user !== localStorage.getItem("user"))
                    .filter((user) => balances[user] < 0)
                    .map((user) => {
                      return (
                        <div
                          className="profile-sup pro-items"
                          key={user}
                          onClick={handleItemExpansion}
                        >
                          <div className="profile profile-owe">
                            <div className="owe-profile-info">
                              <div className="owe-profile">
                                {user.substring(0, 1) +
                                  user.substring(user.length, user.length - 1)}
                              </div>
                              <em className="owe-user-name">{user}</em>
                            </div>
                            <div className="owe-info">
                              <em>you owe</em>
                              <b
                                style={{
                                  color: "#F66",
                                }}
                              >
                                ₹{Math.abs(balances[user])}
                              </b>
                            </div>
                          </div>
                          <div className="owe-items">
                            <em className="sub-head">items you owe for:</em>
                            {entries
                              .filter((entry) => entry.paid_by === user)
                              .filter((entry) =>
                                entry.owed_by.includes(
                                  localStorage.getItem("user")
                                )
                              )
                              .map((entry) => (
                                <div className="owe-item">
                                  <em>
                                    {entry.items}
                                    <em
                                      style={{
                                        color: "#999",
                                        fontSize: "0.75rem",
                                        paddingLeft: "0.1rem",
                                      }}
                                    ></em>
                                  </em>
                                  <b>
                                    ₹
                                    {Math.ceil(
                                      entry.price / entry.owed_by.length
                                    )}
                                  </b>
                                </div>
                              ))}
                            <div className="owe-item items-total">
                              <em>total:</em>₹
                              {entries
                                .filter((entry) => entry.paid_by === user)
                                .filter((entry) =>
                                  entry.owed_by.includes(
                                    localStorage.getItem("user")
                                  )
                                )
                                .reduce(
                                  (acc, entry) =>
                                    acc +
                                    Math.ceil(
                                      entry.price / entry.owed_by.length
                                    ),
                                  0
                                )}
                            </div>
                          </div>
                          <div className="owe-items">
                            <em className="sub-head">
                              items {user} owes you for:
                            </em>
                            {entries
                              .filter(
                                (entry) =>
                                  entry.paid_by === localStorage.getItem("user")
                              )
                              .filter(
                                (entry) =>
                                  entry.owed_by.includes(user) ||
                                  entry.owed_by === user
                              )
                              .map((entry) => (
                                <div className="owe-item">
                                  <em>
                                    {entry.items}
                                    <em
                                      style={{
                                        color: "#999",
                                        fontSize: "0.75rem",
                                        paddingLeft: "0.1rem",
                                      }}
                                    ></em>
                                  </em>
                                  <b>
                                    ₹
                                    {Math.ceil(
                                      entry.price / entry.owed_by.length
                                    )}
                                  </b>
                                </div>
                              ))}
                            <div className="owe-item items-total">
                              <em>total:</em>₹
                              {entries
                                .filter(
                                  (entry) =>
                                    entry.paid_by ===
                                    localStorage.getItem("user")
                                )
                                .filter(
                                  (entry) =>
                                    entry.owed_by.includes(user) ||
                                    entry.owed_by === user
                                )
                                .reduce(
                                  (acc, entry) =>
                                    acc +
                                    Math.ceil(
                                      entry.price / entry.owed_by.length
                                    ),
                                  0
                                )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}

              {users
                .filter((user) => user !== localStorage.getItem("user"))
                .filter((user) => balances[user] > 0).length > 0 && (
                <div className="profiles">
                  <h3>people who owe money to you</h3>
                  {users
                    .filter((user) => user !== localStorage.getItem("user"))
                    .filter((user) => balances[user] > 0)
                    .map((user) => {
                      return (
                        <div
                          className="profile-sup pro-items"
                          key={user}
                          onClick={handleItemExpansion}
                        >
                          <div className="profile profile-owe">
                            <div className="owe-profile-info">
                              <div className="owe-profile">
                                {user.substring(0, 1) +
                                  user.substring(user.length, user.length - 1)}
                              </div>
                              <em className="owe-user-name">{user}</em>
                            </div>
                            <div className="owe-info">
                              <em>owes you</em>
                              <b
                                style={{
                                  color: "#6F6",
                                }}
                              >
                                ₹{Math.abs(balances[user])}
                              </b>
                            </div>
                          </div>
                          <div className="owe-items">
                            <em className="sub-head">
                              items {user} owes you for:
                            </em>
                            {entries
                              .filter(
                                (entry) =>
                                  entry.paid_by === localStorage.getItem("user")
                              )
                              .filter(
                                (entry) =>
                                  entry.owed_by.includes(user) ||
                                  entry.owed_by === user
                              )
                              .map((entry) => (
                                <div className="owe-item">
                                  <em>
                                    {entry.items}
                                    <em
                                      style={{
                                        color: "#999",
                                        fontSize: "0.75rem",
                                        paddingLeft: "0.1rem",
                                      }}
                                    ></em>
                                  </em>
                                  <b>
                                    ₹
                                    {Math.ceil(
                                      entry.price / entry.owed_by.length
                                    )}
                                  </b>
                                </div>
                              ))}
                            <div className="owe-item items-total">
                              <em>total:</em>₹
                              {entries
                                .filter(
                                  (entry) =>
                                    entry.paid_by ===
                                    localStorage.getItem("user")
                                )
                                .filter(
                                  (entry) =>
                                    entry.owed_by.includes(user) ||
                                    entry.owed_by === user
                                )
                                .reduce(
                                  (acc, entry) =>
                                    acc +
                                    Math.ceil(
                                      entry.price / entry.owed_by.length
                                    ),
                                  0
                                )}
                            </div>
                          </div>
                          <div className="owe-items">
                            <em className="sub-head">items you owe for:</em>
                            {entries
                              .filter(
                                (entry) =>
                                  entry.paid_by !== localStorage.getItem("user")
                              )
                              .filter((entry) => entry.paid_by === user)
                              .filter((entry) =>
                                entry.owed_by.includes(
                                  localStorage.getItem("user")
                                )
                              )
                              .map((entry) => (
                                <div className="owe-item">
                                  <em>
                                    {entry.items}
                                    <em
                                      style={{
                                        color: "#999",
                                        fontSize: "0.75rem",
                                        paddingLeft: "0.1rem",
                                      }}
                                    ></em>
                                  </em>
                                  <b>
                                    ₹
                                    {Math.ceil(
                                      entry.price / entry.owed_by.length
                                    )}
                                  </b>
                                </div>
                              ))}
                            <div className="owe-item items-total">
                              <em>total:</em>₹
                              {entries
                                .filter(
                                  (entry) =>
                                    entry.paid_by !==
                                    localStorage.getItem("user")
                                )
                                .filter((entry) => entry.paid_by === user)
                                .filter((entry) =>
                                  entry.owed_by.includes(
                                    localStorage.getItem("user")
                                  )
                                )
                                .reduce(
                                  (acc, entry) =>
                                    acc +
                                    Math.ceil(
                                      entry.price / entry.owed_by.length
                                    ),
                                  0
                                )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </>
          )}
        </div>
      </>
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
