import React, { useState } from "react";

const Editor = ({
  entry,
  users,
  filteredEntries,
  makeEntry,
  setEditor,
  updateEntry,
  setCurrentEntry,
  deleteEntry,
}) => {
  const [updatedEntry, setUpdatedEntry] = useState(
    entry || {
      items: "",
      price: "",
      notes: "",
      date: "",
      owed_by: [],
      owed_all: false,
    }
  );
  const [owedByAll, setOwedByAll] = useState(updatedEntry.owed_all || false);
  const [error, setError] = useState("");
  const [popUpVisible, setPopUpVisible] = useState("");

  function convertDateToISO(dateStr) {
    if (dateStr === "") return "";
    else if (dateStr.includes("-")) {
      const [year, month, day] = dateStr.split("-");
      const fullYear = `20${year}`; // Assuming '20' prefix for year
      return `${fullYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }

    const [day, month, year] = dateStr.split("/");
    const fullYear = `20${year}`; // Assuming '20' prefix for year
    return `${fullYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  const handleOwedByChange = (person, isChecked) => {
    let newOwedBy = updatedEntry.owed_by;
    if (isChecked) {
      if (!newOwedBy.includes(person["user"])) newOwedBy.push(person["user"]);
    } else {
      newOwedBy = updatedEntry.owed_by.filter((p) => p !== person["user"]);
    }
    setUpdatedEntry((prevState) => ({
      ...prevState,
      owed_by: newOwedBy.sort(),
    }));
  };

  const handleOwedByAllChange = (isChecked) => {
    setOwedByAll(isChecked);

    if (isChecked) {
      setUpdatedEntry((prevState) => ({
        ...prevState,
        owed_all: true,
        owed_by: users,
      }));
    } else {
      setUpdatedEntry((prevState) => ({
        ...prevState,
        owed_all: false,
        owed_by: [],
      }));
    }
  };

  const handleSubmit = () => {
    if (updatedEntry.items === "" || updatedEntry.price === "") {
      setError("Items and price fields cannot be empty.");
      return;
    }
    if (!updatedEntry.owed_all && updatedEntry.owed_by.length === 0) {
      setError("Please select at least one person who owes.");
      return;
    }

    // Clear the error and proceed with submission
    setError("");
    makeEntry(updatedEntry);
    setEditor(false);
  };

  const handleUpdate = () => {
    if (
      entry["items"] !== updatedEntry["items"] ||
      entry["price"] !== updatedEntry["price"] ||
      entry["owed_by"] !== updatedEntry["owed_by"] ||
      entry["owed_all"] !== updatedEntry["owed_all"] ||
      entry["date"] !== updatedEntry["date"] ||
      entry["notes"] !== updatedEntry["notes"]
    )
      updateEntry(entry._id, updatedEntry);
    else {
      setEditor(false);
    }
  };

  return (
    <div className="editor">
      <div className="editor-controls">
        <button
          onClick={() => {
            setEditor(false);
            setCurrentEntry(null);
          }}
        >
          back
        </button>
        {entry === null && <h1>new entry</h1>}
        {entry !== null && <h1>edit entry</h1>}
        {entry === null && <button onClick={handleSubmit}>submit</button>}
        {entry !== null && <button onClick={handleUpdate}>update</button>}
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="editor-inputs">
        <label>
          items
          <input
            placeholder="items"
            type="text"
            value={updatedEntry.items}
            onChange={(event) =>
              setUpdatedEntry((prevState) => ({
                ...prevState,
                items: event.target.value,
              }))
            }
          />
        </label>
        <label>
          price
          <input
            placeholder="price"
            type="number"
            value={updatedEntry.price}
            onChange={(event) =>
              setUpdatedEntry((prevState) => ({
                ...prevState,
                price: event.target.value,
              }))
            }
          />
        </label>
        <label>
          notes
          <textarea
            placeholder="notes"
            className="notes-entry"
            type="text"
            value={updatedEntry.notes}
            onChange={(event) => {
              setUpdatedEntry((prevState) => ({
                ...prevState,
                notes: event.target.value,
              }));
            }}
          />
        </label>
        <div className="edt-chk">
          <label>
            Owed by all
            <input
              type="checkbox"
              checked={owedByAll}
              onChange={(event) => handleOwedByAllChange(event.target.checked)}
            />
          </label>
        </div>

        <div className="edt-chk">
          {users.map((user) => (
            <label key={user}>
              {user}
              <input
                type="checkbox"
                disabled={owedByAll}
                checked={updatedEntry.owed_by.includes(user)}
                onChange={(event) =>
                  handleOwedByChange({ user }, event.target.checked)
                }
              />
            </label>
          ))}
        </div>
        <label>
          enter if backdated entry, else leave blank:
          <input
            type="date"
            value={convertDateToISO(updatedEntry.date)}
            onChange={(event) => {
              setUpdatedEntry((prevState) => ({
                ...prevState,
                date: event.target.value,
              }));
            }}
          />
        </label>
        {entry !== null && (
          <button
            className="delete-entry"
            onClick={() => {
              setPopUpVisible(entry._id);
            }}
          >
            delete entry
          </button>
        )}
        {updatedEntry.owed_by.length > 0 &&
          updatedEntry.owed_by.filter(
            (name) => name !== localStorage.getItem("user")
          ).length >= 1 &&
          updatedEntry.price !== "" && (
            <div>
              <p>
                {" "}
                <b>breakdown: </b>
                {updatedEntry.owed_by
                  .filter((name) => name !== localStorage.getItem("user"))
                  .join(", ")}{" "}
                {updatedEntry.owed_by.filter(
                  (name) => name !== localStorage.getItem("user")
                ).length > 1
                  ? "each owe"
                  : "owes"}{" "}
                <b>
                  ₹
                  {(updatedEntry.price / updatedEntry.owed_by.length).toFixed(
                    2
                  )}{" "}
                </b>
                to you for this expense.
              </p>
            </div>
          )}
        {popUpVisible !== "" && (
          <>
            <div
              className="blur"
              onClick={() => {
                setPopUpVisible("");
              }}
            />
            <div className="delete-msg">
              <h1>delete?</h1>
              <p>do you want to delete this entry?</p>
              <div className="delete-options">
                <button
                  onClick={() => {
                    deleteEntry(popUpVisible);
                    setCurrentEntry({
                      items: "",
                      price: "",
                      notes: "",
                      date: "",
                      owed_by: [],
                      owed_all: false,
                    });
                  }}
                >
                  yes
                </button>
                <button
                  onClick={() => {
                    setPopUpVisible("");
                  }}
                >
                  no
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Editor;
