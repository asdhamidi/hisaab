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

  function formatDate(date) {
    // Get hours, minutes, and determine AM/PM
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12 || 12; // Convert 0 (midnight) to 12

    // Get day, month, and year (last two digits)
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

    // Format minutes to be always two digits
    const formattedMinutes = minutes.toString().padStart(2, "0");

    // Return the formatted date string
    return `${hours}:${formattedMinutes} ${period} - ${day}/${month}/${year}`;
  }

  function parseDate(dateStr, isUTC = true) {
    const [timePart, datePart] = dateStr.split(" - ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [time, period] = timePart.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12)
      hours += 12; // PM means 12-hour offset unless it's noon (12:00 PM)
    else if (period === "AM" && hours === 12) hours = 0; // Midnight case

    const fullYear = 2000 + year; // Assuming the year is 20xx

    let date;
    if (isUTC) date = new Date(Date.UTC(fullYear, month - 1, day, hours, minutes));
    else date = new Date(fullYear, month - 1, day, hours, minutes);

    if (isUTC) return formatDate(date);
    return formatDate(date);
  }

  return (
    <div className="pop pop-active ">
      <div className="owe-controls">
        <h2>activities</h2>
        <hr style={{ width: "100%" }}></hr>
      </div>
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
              <i> - {parseDate(entry.created_at)}</i>
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
