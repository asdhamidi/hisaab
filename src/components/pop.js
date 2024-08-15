import React, { useEffect, useState } from "react";

const Popup = ({ entries, pop }) => {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    let people = [
      { name: "asad", amt: 0 },
      { name: "aaryan", amt: 0 },
      { name: "piyush", amt: 0 },
      { name: "sachin", amt: 0 },
      { name: "saurav", amt: 0 },
    ];

    people = people.filter((p) => p.name !== localStorage.getItem("user"));

    const modEntries = entries.filter(
      (e) => e.paid_by !== localStorage.getItem("user")
    );

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
      {details.map((people) => (
        <div>
          {people.name}: {people.amt}
        </div>
      ))}
    </div>
  );
};

export default Popup;
