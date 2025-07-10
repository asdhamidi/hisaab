import { act } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import axiosInstance from "./api-handling";

const AdminScreen = ({ entries, adminScreen, setAdminScreen, month }) => {
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);

  const [userData, setUserData] = useState([]);

  const handleItemExpansion = (src) => {
    if (src.currentTarget.className === "admin-profile-hidden")
      src.currentTarget.className = "admin-profile";
    else if (src.currentTarget.className === "admin-profile")
      src.currentTarget.className = "admin-profile-hidden";
  };

  useEffect(() => {
    axiosInstance
      .get("/activities/" + month)
      .then((res) => {
        setActivities(res.data);
      })
      .catch((err) => console.error(err));

    axiosInstance
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));

  }, [setActivities]);

  useEffect(() => {
    let userData = users.map(user => ({name: user}));
    for (let i = 0; i < userData.length; i++) {
        let name = userData[i].name;
        userData[i].no_of_entries = 0;
        userData[i].total_spend = 0;
        userData[i].visits = 0;
        userData[i].openedHisaab = "no visits this month";
        userData[i].last_entry = "no entry this month";

        let checklist = [true, true]
        for (let j = 0; j < activities.length; j++) {
            if (checklist[0] && activities[j].user === name && activities[j].activity.includes("opened Hisaab")) {
                userData[i].openedHisaab = activities[j].created_at;
                checklist[0] = false;
            }
            if (checklist[1] && activities[j].user === name && activities[j].activity.includes("created")) {
                userData[i].last_entry = activities[j].created_at;
                checklist[1] = false;
            }
            if (activities[j].user === name && activities[j].activity.includes("opened")) {
                userData[i].visits++;
            }

            if(activities[j].user === name && activities[j].activity.includes("created")) {
                userData[i].no_of_entries++;
            }
        }
        for(let k = 0; k < entries.length; k++) {
            if(entries[k].paid_by === name) {
                userData[i].total_spend += parseInt(entries[k].price);
            }
        }

        if (userData[i].total_spend > 0)
            userData[i].avg_spend = (userData[i].total_spend / userData[i].no_of_entries).toFixed(2);
        else
            userData[i].avg_spend = 0;
    }
    setUserData(userData)

  }, [activities, users]);

  return (
    <div className="pop pop-active ">
      <div className="owe-controls">
        <h2>admin dashboard</h2>
        <hr style={{ width: "100%" }}></hr>
      </div>
      <div className="admin-list" >
        {userData.map(user => (
            <div className="admin-profile-hidden" onClick={handleItemExpansion}>
                <div className="owe-profile-info">
                    <div className="owe-profile">
                    {user.name.substring(0, 1) +
                        user.name.substring(user.name.length, user.name.length - 1)}
                    </div>
                    <em className="owe-user-name">{user.name}</em>
                    <div className="profile-glance">
                        <div className="admin-profile-data">
                            {user.openedHisaab}
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-login"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M21 12h-13l3 -3" /><path d="M11 15l-3 -3" /></svg>
                        </div>
                        <div className="admin-profile-data">
                            {user.last_entry}
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /><path d="M19 16v6" /><path d="M22 19l-3 3l-3 -3" /></svg>
                        </div>
                        <div className="admin-profile-data">
                            {user.visits}
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trending-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 17l6 -6l4 4l8 -8" /><path d="M14 7l7 0l0 7" /></svg>
                        </div>
                    </div>
                </div>
                <div className="admin-profile-info">
                    <div className="admin-profile-data">entries: <b>{user.no_of_entries}</b></div>
                    <div className="admin-profile-data">total spending: <b>{user.total_spend}</b></div>
                    <div className="admin-profile-data">avg expense price: <b>{user.avg_spend}</b></div>
                </div>
            </div>
        ))}
      </div>
      <h1 className="close" onClick={() => setAdminScreen(!AdminScreen)}>
        close
      </h1>
    </div>
  );
};

export default AdminScreen;
