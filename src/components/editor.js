import React, { useState } from "react";

const Editor = ({
  entry,
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
        owed_by: ["aaryan", "asad", "piyush", "sachin", "saurav"],
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
        {entry === null && <button onClick={handleSubmit}>submit</button>}
        {entry !== null && (
          <button onClick={() => updateEntry(entry._id, updatedEntry)}>
            update
          </button>
        )}
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
        <input
          type="checkbox"
          checked={owedByAll}
          onChange={(event) => handleOwedByAllChange(event.target.checked)}
        />
        <label>Owed by all</label>
      </div>
      <div className="edt-chk">
        <input
          type="checkbox"
          disabled={owedByAll}
          checked={updatedEntry.owed_by.includes("aaryan")}
          onChange={(event) =>
            handleOwedByChange("aaryan", event.target.checked)
          }
        />
        <label>aaryan</label>
        <input
          type="checkbox"
          disabled={owedByAll}
          checked={updatedEntry.owed_by.includes("asad")}
          onChange={(event) => handleOwedByChange("asad", event.target.checked)}
        />
        <label>asad</label>
        <input
          type="checkbox"
          disabled={owedByAll}
          checked={updatedEntry.owed_by.includes("piyush")}
          onChange={(event) =>
            handleOwedByChange("piyush", event.target.checked)
          }
        />
        <label>piyush</label>
        <input
          type="checkbox"
          disabled={owedByAll}
          checked={updatedEntry.owed_by.includes("sachin")}
          onChange={(event) =>
            handleOwedByChange("sachin", event.target.checked)
          }
        />
        <label>sachin</label>
        <input
          type="checkbox"
          disabled={owedByAll}
          checked={updatedEntry.owed_by.includes("saurav")}
          onChange={(event) =>
            handleOwedByChange("saurav", event.target.checked)
          }
        />
        <label>saurav</label>
      </div>
    </div>
  );
};

export default Editor;
