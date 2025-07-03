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
                </div>
                <div className="admin-profile-info">
                    <div className="admin-profile-data">last visit: {user.openedHisaab}</div>
                    <div className="admin-profile-data">last entry: {user.last_entry}</div>
                    <div className="admin-profile-data">visits this month: {user.visits}</div>
                    <div className="admin-profile-data">entries this month: {user.no_of_entries}</div>
                    <div className="admin-profile-data">total spending: {user.total_spend}</div>
                    <div className="admin-profile-data">average expense price: {user.avg_spend}</div>
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
