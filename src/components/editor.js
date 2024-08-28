import React, { useState } from "react";

const Editor = ({
  entry,
  users,
  makeEntry,
  setEditor,
  updateEntry,
  setCurrentEntry,
}) => {
  const [updatedEntry, setUpdatedEntry] = useState(
    entry || {
      items: "",
      price: "",
      notes: "",
      owed_by: [],
      owed_all: false,
    }
  );
  const [owedByAll, setOwedByAll] = useState(updatedEntry.owed_all || false);
  const [error, setError] = useState("");

  const handleOwedByChange = (person, isChecked) => {
    let newOwedBy;
    if (isChecked) {
      newOwedBy = [...updatedEntry.owed_by, person];
    } else {
      newOwedBy = updatedEntry.owed_by.filter((p) => p !== person);
    }
    setUpdatedEntry((prevState) => ({
      ...prevState,
      owed_by: newOwedBy,
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
      entry["owed_all"] !== updatedEntry["owed_all"]
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
        {entry === null && <b>new entry</b>}
        {entry !== null && <b>edit entry</b>}
        {entry === null && <button onClick={handleSubmit}>submit</button>}
        {entry !== null && <button onClick={handleUpdate}>update</button>}
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
        <input
          placeholder="notes"
          type="text"
          value={updatedEntry.notes}
          onChange={(event) =>
            setUpdatedEntry((prevState) => ({
              ...prevState,
              notes: event.target.value,
            }))
          }
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
              checked={updatedEntry.owed_by.includes("aaryan")}
              onChange={(event) =>
                handleOwedByChange({ user }, event.target.checked)
              }
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default Editor;
