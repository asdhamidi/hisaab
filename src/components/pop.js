import React, { useEffect, useState } from "react";

const Popup = ({ entries, pop, setPop }) => {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    let currentUser = localStorage.getItem("user");
    let people = [
      { name: "asad", amt: 0 },
      { name: "aaryan", amt: 0 },
      { name: "piyush", amt: 0 },
      { name: "sachin", amt: 0 },
      { name: "saurav", amt: 0 },
    ];

    people = people.filter((p) => p.name !== currentUser);

    let modEntries = entries.filter((e) => e.paid_by !== currentUser);
    modEntries = modEntries.filter((e) => e.owed_by.includes(currentUser));

    people.forEach((p) => {
      let totalOwed = 0;
      modEntries.forEach((e) => {
        if (e.paid_by === p.name) {
          if (e.owed_by.length !== 0)
            totalOwed += Number(e.price) / e.owed_by.length;
          else totalOwed += Number(e.price) / 5;
        }
      });
      p.amt = Math.round(totalOwed);
    });

    setDetails(people);
  }, [entries]);

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
      <div>
        <h2>breakup:</h2>
        {details.map((people) => (
          <div key={people.name}>
            {people.name}: {people.amt}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popup;
