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
      <div className="editor-inputs">
        <label id="price-entry">
          ₹
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
            owed by all
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
            <div className="breakdown">
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
                  {Math.ceil(updatedEntry.price / updatedEntry.owed_by.length).toFixed(
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
      {error && (
        <p className="error-msg">
          <svg
            width="16"
            height="16"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
          {error}
        </p>
      )}
      <div className="editor-controls">
        <button
          onClick={() => {
            setEditor(false);
            setCurrentEntry(null);
          }}
        >
          back
        </button>
        {entry === null && (
          <button onClick={handleSubmit}>
            submit{" "}
            <svg
              width="16"
              height="16"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        )}
        {entry !== null && <button onClick={handleUpdate}>update</button>}
      </div>
    </div>
  );
};

export default Editor;
