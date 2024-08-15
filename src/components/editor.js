import React, { useState } from "react";

const Editor = ({ entry, makeEntry, setEditor, loadEntries }) => {
  const [updatedEntry, setUpdatedEntry] = useState(
    entry || {
      items: "",
      price: "",
      owed_by: [],
      owed_all: false,
    }
  );
  const [owedByAll, setOwedByAll] = useState(updatedEntry.owed_all || false);

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

  return (
    <div className="editor">
      <div className="editor-controls">
        <button onClick={() => setEditor(false)}>back</button>
        <button
          onClick={() => {
            makeEntry(updatedEntry);
            setEditor(false);
            loadEntries();
          }}
        >
          submit
        </button>
      </div>
      <label>items</label>
      <input
        placeholder="items"
        value={updatedEntry.items}
        onChange={(event) =>
          setUpdatedEntry((prevState) => ({
            ...prevState,
            items: event.target.value,
          }))
        }
      />
      <label>price</label>
      <input
        placeholder="price"
        value={updatedEntry.price}
        onChange={(event) =>
          setUpdatedEntry((prevState) => ({
            ...prevState,
            price: event.target.value,
          }))
        }
      />
      <label>owed by</label>
      <div>
        <input
          type="checkbox"
          checked={owedByAll}
          onChange={(event) => handleOwedByAllChange(event.target.checked)}
        />
        <label>Owed by all</label>
      </div>
      <div>
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
