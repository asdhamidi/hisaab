const Activites = ({ entries, activitesScreen, setActivitesScreen }) => {
  return (
    <div className="pop pop-active pop-details">
      <div className="owe-controls">
        <h2>activties</h2>
      </div>
      <hr style={{ width: "100%" }}></hr>
      <div className="activites-list">
        {entries.map((entry) => (
          <div className="activity">
            <div className="owe-profile activity-profile">
              {entry.paid_by.substring(0, 1) +
                entry.paid_by.substring(
                  entry.paid_by.length,
                  entry.paid_by.length - 1
                )}
            </div>
            <p>
              <b>
                {entry.paid_by === localStorage.getItem("user")
                  ? "You"
                  : entry.paid_by}{" "}
              </b>
              <i>
                {entry.updated_at !== ""
                  ? "updated entry "
                  : "created an entry "}
              </i>
              for {entry.items} at{" "}
              {entry.updated_at !== "" ? entry.updated_at : entry.created_at}
              <b>
                {entry.owed_by.includes(localStorage.getItem("user"))
                  ? ` - You owe ₹${Math.round(entry.price / entry.owed_by.length)}`
                  : ""}
              </b>
            </p>
          </div>
        ))}
      </div>
      <h1
        className="activities-close close"
        onClick={() => setActivitesScreen(!activitesScreen)}
      >
        close
      </h1>
    </div>
  );
};

export default Activites;
