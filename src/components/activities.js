import React, { useEffect, useState } from "react";
import axiosInstance from "./api-handling";

const Activites = ({ activitesScreen, setActivitesScreen, month }) => {
  const [activities, setActivites] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/activities/" + month)
      .then((res) => {
        setActivites(res.data);
      })
      .catch((err) => console.error(err));
  }, [setActivites]);

  return (
    <div className="pop pop-active ">
      <div className="owe-controls">
        <h2>activities</h2>
      </div>
      <hr style={{ width: "100%" }}></hr>
      <div className="activites-list">
        {activities.map((entry) => (
          <div className="activity">
            <div className="owe-profile activity-profile">
              {entry.user.substring(0, 1) +
                entry.user.substring(entry.user.length, entry.user.length - 1)}
            </div>
            <p>
              <b>
                {entry.user === localStorage.getItem("user")
                  ? "You"
                  : entry.user}{" "}
              </b>
              <i>{entry.activity}</i>
            </p>
          </div>
        ))}
      </div>
      <h1
        className="close"
        onClick={() => setActivitesScreen(!activitesScreen)}
      >
        close
      </h1>
    </div>
  );
};

export default Activites;
